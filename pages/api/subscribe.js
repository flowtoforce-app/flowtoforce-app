const rateLimit = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const max = 3
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
    return res.status(429).json({ error: 'Trop de tentatives, réessaie dans une minute.' })
  }

  const { email } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
    return res.status(400).json({ error: 'Email invalide' })
  }

  const clean = email.toLowerCase().trim()

  if (!process.env.RESEND_API_KEY) {
    console.log('[FlowToForce] Inscription (Resend non configuré):', clean)
    return res.status(200).json({ success: true })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FlowToForce <hello@flowtoforce.com>',
        to: ['hello@flowtoforce.com'],
        subject: '🤍 Nouvelle inscription app FlowToForce',
        html: `<p>Nouvelle personne inscrite pour l'accès prioritaire à l'app :</p><p><strong>${clean}</strong></p>`,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[Resend error]', err)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Subscribe error]', err)
    return res.status(200).json({ success: true })
  }
}
