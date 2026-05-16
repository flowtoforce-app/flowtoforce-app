import { emailTemplate } from '../../../lib/emailTemplate'

export default function handler(req, res) {
  const html = emailTemplate({
    bodyHtml: `
      <p style="font-size:17px;margin:0 0 20px;">Hello Lys 🤍</p>
      <p style="margin:0 0 32px;">C'est parti. Ton accès à <strong>FlowToForce Bundle</strong> est confirmé. Clique sur le bouton et programme ta première séance dans ton profil dès aujourd'hui.</p>
      <p style="margin:0;">Enjoy,<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
    `,
    ctaLabel: 'Accéder au programme',
    ctaUrl: 'https://flowtoforce.com',
  })
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
