import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: { bodyParser: false },
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

const programNames = {
  'FlowToForce V1 - Programme en salle': { label: 'FlowToForce V1' },
  'FlowToForce V2 - Home Programme': { label: 'FlowToForce V2' },
  'FlowToForce Bundle - V1 + V2': { label: 'FlowToForce Bundle' },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const sig = req.headers['stripe-signature']
  const rawBody = await getRawBody(req)

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const customerEmail = session.customer_details?.email
    if (!customerEmail) return res.status(200).json({ received: true })

    const fullName = session.customer_details?.name || ''
    const prenom = fullName.split(' ')[0] || ''

    let programLabel = 'ton programme'

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const itemName = lineItems.data[0]?.description || ''
      const info = programNames[itemName]
      if (info) programLabel = info.label
    } catch (e) {
      console.error('Line items error:', e)
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FlowToForce <hello@flowtoforce.com>',
        to: [customerEmail],
        subject: `Ta méthode ${programLabel} 🤍`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
            <p style="font-size: 22px; font-weight: bold; margin-bottom: 32px; letter-spacing: 2px;">FLOWTOFORCE</p>
            <p style="font-size: 17px; margin-bottom: 20px;">Hello ${prenom || 'toi'} 🤍</p>
            <p style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 16px;">
              Merci pour ton achat et ta confiance. Ton accès à <strong>${programLabel}</strong> est confirmé.
            </p>
            <p style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 32px;">
              Ton programme sera disponible très prochainement. Tu recevras un email avec ton accès dès que tout est prêt.
            </p>
            <p style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 24px;">
              Si tu as des questions, n'hésite pas à m'écrire à la suite de ce mail, je te réponds personnellement.
            </p>
            <p style="font-size: 15px; color: #1a1a1a;">À très vite, enjoy 🤍</p>
            <p style="font-size: 14px; color: #888; margin-top: 8px;">Lys</p>
          </div>
        `,
      }),
    })
  }

  return res.status(200).json({ received: true })
}
