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

async function sendEmail({ to, subject, html }) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: 'FlowToForce <hello@flowtoforce.com>', to, subject, html }),
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Trop de tentatives, réessaie dans une minute.' })
  }

  const { email, firstName } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
    return res.status(400).json({ error: 'Email invalide' })
  }

  const clean = email.toLowerCase().trim()
  const prenom = firstName?.trim() || ''

  if (!process.env.RESEND_API_KEY) {
    console.log('[FlowToForce] Inscription:', clean, prenom)
    return res.status(200).json({ success: true })
  }

  try {
    await sendEmail({
      to: ['hello@flowtoforce.com'],
      subject: 'Nouvelle inscription app FlowToForce',
      html: `<p>Nouvelle inscription :</p><p><strong>${prenom} — ${clean}</strong></p>`,
    })

    await sendEmail({
      to: [clean],
      subject: `L'application FlowToForce 🤍`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
          <p style="font-size: 22px; font-weight: bold; margin-bottom: 32px; letter-spacing: 2px;">FLOWTOFORCE</p>
          <p style="font-size: 17px; margin-bottom: 20px;">Hello ${prenom || 'toi'} 🤍</p>
          <p style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 16px;">
            Tu es officiellement sur la waiting list de l'application FlowToForce.
          </p>
          <p style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 16px;">
            On construit quelque chose de beau, pensé pour toi, avec soin. Les premières inscrites seront les premières à y entrer, et tu en fais partie.
          </p>
          <p style="font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 32px;">
            En attendant, les programmes PDF sont disponibles sur <a href="https://www.flowtoforce.com" style="color: #1a1a1a;">flowtoforce.com</a> si tu veux démarrer maintenant.
          </p>
          <p style="font-size: 15px; color: #1a1a1a;">À très vite 🤍</p>
          <p style="font-size: 14px; color: #888; margin-top: 8px;">Lys</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Subscribe error]', err)
    return res.status(200).json({ success: true })
  }
}
