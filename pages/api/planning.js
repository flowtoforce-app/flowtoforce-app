import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, prenom, days, time, version } = req.body

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide' })
  }
  if (!Array.isArray(days) || days.length === 0) {
    return res.status(400).json({ error: 'Choisis au moins un jour' })
  }

  const clean = email.toLowerCase().trim()

  if (!process.env.KV_REST_API_URL) {
    console.log('[Planning] KV non configuré — données:', { clean, prenom, days, time, version })
    return res.status(200).json({ success: true })
  }

  try {
    await kv.set(`planning:${clean}`, {
      email: clean,
      prenom: prenom?.trim() || '',
      days,
      time: time || '18:00',
      version: version || 'v1',
      updatedAt: Date.now(),
    })
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[Planning error]', err)
    return res.status(200).json({ success: true })
  }
}
