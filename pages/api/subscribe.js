import { emailTemplate } from '../../lib/emailTemplate'

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
      html: emailTemplate({
        bodyHtml: `
          <p style="font-size:17px;margin:0 0 20px;">Hello ${prenom || 'toi'} 🤍</p>
          <p style="margin:0 0 16px;">Tu es officiellement inscrite sur la waiting list de l'application FlowToForce.</p>
          <p style="margin:0 0 16px;">Tu seras une des premières à l'utiliser pour construire ton chemin vers la force.</p>
          <p style="margin:0 0 32px;">En attendant, retrouve les programmes sur <a href="https://flowtoforce.com" style="color:rgba(255,255,255,0.92);text-decoration:underline;">flowtoforce.com</a> pour démarrer maintenant.</p>
          <p style="margin:0;">À très vite 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
        `,
        ctaLabel: 'Voir les programmes',
        ctaUrl: 'https://flowtoforce.com',
      }),
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Subscribe error]', err)
    return res.status(200).json({ success: true })
  }
}
