import { emailTemplate } from '../../../lib/emailTemplate'

export default function handler(req, res) {
  const html = emailTemplate({
    bodyHtml: `
      <p style="font-size:17px;margin:0 0 20px;">Hello Lys 🤍</p>
      <p style="margin:0 0 16px;">Merci pour ton achat et ta confiance. Ton accès à <strong>FlowToForce Bundle</strong> est confirmé.</p>
      <p style="margin:0 0 16px;">Ton programme sera disponible très prochainement. Tu recevras un email avec ton lien d'accès dès que tout est prêt.</p>
      <p style="margin:0 0 32px;">Si tu as des questions, n'hésite pas à répondre à ce mail.</p>
      <p style="margin:0;">À très vite, enjoy 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
    `,
    ctaLabel: 'Accéder au programme',
    ctaUrl: 'https://flowtoforce.com',
  })
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
