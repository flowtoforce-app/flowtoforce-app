import { emailTemplate } from '../../../lib/emailTemplate'

export default function handler(req, res) {
  const html = emailTemplate({
    bodyHtml: `
      <p style="font-size:17px;margin:0 0 20px;">Hello Lys 🤍</p>
      <p style="margin:0 0 16px;">Tu es officiellement sur la waiting list de l'application FlowToForce.</p>
      <p style="margin:0 0 16px;">On construit quelque chose de beau, pensé pour toi, avec soin. Les premières inscrites seront les premières à y entrer, et tu en fais partie.</p>
      <p style="margin:0 0 32px;">En attendant, retrouve les programmes sur <a href="https://flowtoforce.com" style="color:rgba(255,255,255,0.92);text-decoration:underline;">flowtoforce.com</a> pour démarrer maintenant.</p>
      <p style="margin:0;">À très vite 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
    `,
    ctaLabel: 'Découvrir',
    ctaUrl: 'https://flowtoforce.com',
  })
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
