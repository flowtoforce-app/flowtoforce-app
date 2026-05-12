import { kv } from '@vercel/kv'
import { emailTemplate } from '../../../lib/emailTemplate'

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

// 0=Lundi … 6=Dimanche (notre convention)
function getTomorrowDayIndex() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (tomorrow.getDay() + 6) % 7
}

export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end()
  }

  if (!process.env.KV_REST_API_URL) {
    return res.status(200).json({ sent: 0, reason: 'KV non configuré' })
  }

  const tomorrowDay = getTomorrowDayIndex()
  const JOURS_FR = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  const jourNom = JOURS_FR[tomorrowDay]

  let cursor = 0
  let sent = 0

  do {
    const [nextCursor, keys] = await kv.scan(cursor, { match: 'planning:*', count: 100 })
    cursor = nextCursor

    for (const key of keys) {
      const plan = await kv.get(key)
      if (!plan || !plan.days.includes(tomorrowDay)) continue

      const html = emailTemplate({
        bodyHtml: `
          <p style="font-size:17px;margin:0 0 20px;">Hello ${plan.prenom || 'toi'} 🤍</p>
          <p style="margin:0 0 16px;">Demain c'est <strong>${jourNom}</strong> — ta séance FlowToForce ${plan.version?.toUpperCase() || ''} t'attend.</p>
          <p style="margin:0 0 16px;">Prépare tes affaires, hydrate-toi et arrive prête à te dépasser. Tu as déjà fait le plus dur : t'y engager.</p>
          <p style="margin:0;">À demain 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
        `,
        ctaLabel: 'Voir mon programme',
        ctaUrl: 'https://flowtoforce.com',
      })

      await sendEmail({
        to: [plan.email],
        subject: `Ta séance FlowToForce, c'est demain 🤍`,
        html,
      })

      sent++
    }
  } while (cursor !== 0)

  return res.status(200).json({ sent })
}
