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
  'FlowToForce V1 - Programme en salle': { label: 'FlowToForce V1', file: 'flowtoforce-v1.pdf' },
  'FlowToForce V2 - Home Programme': { label: 'FlowToForce V2', file: 'flowtoforce-v2.pdf' },
  'FlowToForce Bundle - V1 + V2': { label: 'FlowToForce Bundle', files: ['flowtoforce-v1.pdf', 'flowtoforce-v2.pdf'] },
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

    // Récupérer le nom du programme depuis les line items
    let programLabel = 'ton programme'
    let downloadLinks = ''

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const itemName = lineItems.data[0]?.description || ''
      const info = programNames[itemName]
      if (info) {
        programLabel = info.label
        const base = 'https://www.flowtoforce.com/downloads/'
        if (info.files) {
          downloadLinks = info.files.map(f =>
            `<a href="${base}${f}" style="display:inline-block;margin:8px 0;color:#1a1a1a;font-weight:bold;">⬇ Télécharger ${f.includes('v1') ? 'V1' : 'V2'}</a>`
          ).join('<br/>')
        } else {
          downloadLinks = `<a href="${base}${info.file}" style="display:inline-block;margin:8px 0;color:#1a1a1a;font-weight:bold;">⬇ Télécharger ${programLabel}</a>`
        }
      }
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
        subject: `${programLabel} — ton accès est prêt 🤍`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
            <p style="font-size: 22px; font-weight: bold; margin-bottom: 8px;">flow / force</p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin-bottom: 32px;" />
            <p style="font-size: 17px; margin-bottom: 16px;">Merci pour ta confiance 🤍</p>
            <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 24px;">
              Ton accès à <strong>${programLabel}</strong> est confirmé.
              Télécharge ton PDF ci-dessous — garde ce mail précieusement, c'est ton accès définitif.
            </p>
            <div style="background: #f9f9f9; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
              ${downloadLinks || '<p style="color:#888;">Ton lien de téléchargement arrive sous peu.</p>'}
            </div>
            <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 16px;">
              Des questions ? Réponds directement à cet email, je te réponds personnellement.
            </p>
            <p style="font-size: 14px; color: #888;">À très vite sur le tapis,<br/>Lys — FlowToForce</p>
          </div>
        `,
      }),
    })
  }

  return res.status(200).json({ received: true })
}
