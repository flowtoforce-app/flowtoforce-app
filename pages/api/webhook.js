import Stripe from 'stripe'
import { emailTemplate } from '../../lib/emailTemplate'

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
        html: emailTemplate({
          bodyHtml: `
            <p style="font-size:17px;margin:0 0 20px;">Hello ${prenom || 'toi'} 🤍</p>
            <p style="margin:0 0 16px;">Merci pour ton achat et ta confiance. Ton accès à <strong>${programLabel}</strong> est confirmé.</p>
            <p style="margin:0 0 16px;">Ton programme sera disponible très prochainement. Tu recevras un email avec ton lien d'accès dès que tout est prêt.</p>
            <p style="margin:0 0 32px;">Si tu as des questions, n'hésite pas à répondre à ce mail.</p>
            <p style="margin:0;">À très vite, enjoy 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
          `,
          ctaLabel: 'Accéder au programme',
          ctaUrl: 'https://flowtoforce.com',
        }),
      }),
    })
  }

  return res.status(200).json({ received: true })
}
