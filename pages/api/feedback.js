export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'config' })

  const { prenom, impression, clarte, progression, conseil, manque, prefere, note } = req.body

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #060d1f; color: #fff;">
      <h2 style="font-weight: 300; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.6); font-size: 13px;">FlowToForce V1 — Retour Beta</h2>
      ${prenom ? `<p style="color: rgba(255,255,255,0.5); font-size: 13px;">De : ${prenom}</p>` : ''}
      <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Première impression</strong><br/>${impression || '—'}</p>
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Clarté des séances</strong><br/>${clarte || '—'}</p>
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Progression logique</strong><br/>${progression || '—'}</p>
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Conseil de Lys</strong><br/>${conseil || '—'}</p>
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Ce qui manque</strong><br/>${manque || '—'}</p>
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Ce qu'elle a préféré</strong><br/>${prefere || '—'}</p>
      <p><strong style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Note globale</strong><br/>${note ? `${note} / 5` : '—'}</p>
    </div>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'FlowToForce <hello@flowtoforce.com>',
      to: ['hello@flowtoforce.com'],
      subject: `Retour beta V1${prenom ? ` — ${prenom}` : ''}`,
      html,
    }),
  })

  if (!response.ok) return res.status(500).json({ error: 'send' })
  return res.status(200).json({ ok: true })
}
