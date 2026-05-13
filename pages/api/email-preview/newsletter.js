import { emailTemplate } from '../../../lib/emailTemplate'

export default function handler(req, res) {
  const html = emailTemplate({
    bodyHtml: `
      <p style="font-size:17px;margin:0 0 20px;">Hello Lys 🤍</p>
      <p style="margin:0 0 16px;">Tu es inscrite à la newsletter FlowToForce.</p>
      <p style="margin:0 0 32px;">Chaque mois, des conseils sport, alimentation et mindset conçus pour avancer à ton rythme. Tu seras informée des nouveautés en avant-première.</p>
      <p style="margin:0;">Enjoy<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
    `,
    ctaLabel: 'Voir les programmes',
    ctaUrl: 'https://flowtoforce.com',
  })
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
