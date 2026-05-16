import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const rateLimit = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const max = 10
  const entry = rateLimit.get(ip) || { count: 0, start: now }
  if (now - entry.start > windowMs) {
    rateLimit.set(ip, { count: 1, start: now })
    return false
  }
  if (entry.count >= max) return true
  rateLimit.set(ip, { count: entry.count + 1, start: entry.start })
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Trop de tentatives.' })
  }

  const { programId } = req.body

  const prices = {
    v1: 2999,
    v2: 2999,
    bundle: 3999,
  }

  const names = {
    v1: 'FlowToForce V1 - Programme en salle',
    v2: 'FlowToForce V2 - Home Programme',
    bundle: 'FlowToForce Bundle - V1 + V2',
  }

  const amount = prices[programId]
  const name = names[programId]

  if (!amount || !name) {
    return res.status(400).json({ error: 'Invalid program' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?program=${programId}`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return res.status(500).json({ error: 'Failed to create checkout session' })
  }
}
