import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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
            product_data: {
              name: name,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true&program=${programId}`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return res.status(500).json({ error: 'Failed to create checkout session' })
  }
}
