import { emailTemplate } from '../lib/emailTemplate'

export async function getServerSideProps() {
  const waitingList = emailTemplate({
    bodyHtml: `
      <p style="font-size:17px;margin:0 0 20px;">Hello Lys 🤍</p>
      <p style="margin:0 0 16px;">Tu es officiellement sur la waiting list de l'application FlowToForce.</p>
      <p style="margin:0 0 16px;">On construit quelque chose de beau, pensé pour toi, avec soin. Les premières inscrites seront les premières à y entrer, et tu en fais partie.</p>
      <p style="margin:0 0 32px;">En attendant, les programmes sont disponibles sur flowtoforce.com si tu veux démarrer maintenant.</p>
      <p style="margin:0;">À très vite 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
    `,
    ctaLabel: 'Découvrir',
    ctaUrl: 'https://flowtoforce.com',
  })

  const achat = emailTemplate({
    bodyHtml: `
      <p style="font-size:17px;margin:0 0 20px;">Hello Lys 🤍</p>
      <p style="margin:0 0 16px;">Merci pour ton achat et ta confiance. Ton accès à <strong>FlowToForce Bundle</strong> est confirmé.</p>
      <p style="margin:0 0 16px;">Ton programme sera disponible très prochainement. Tu recevras un email avec ton lien d'accès dès que tout est prêt.</p>
      <p style="margin:0 0 32px;">Si tu as des questions, n'hésite pas à répondre à ce mail — je te réponds personnellement.</p>
      <p style="margin:0;">À très vite, enjoy 🤍<br><span style="font-size:13px;color:rgba(255,255,255,0.45);display:block;margin-top:6px;">Lys</span></p>
    `,
    ctaLabel: 'Accéder au programme',
    ctaUrl: 'https://flowtoforce.com',
  })

  return { props: { waitingList, achat } }
}

export default function EmailPreview({ waitingList, achat }) {
  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span style={{ color: '#fff', fontFamily: 'Georgia', fontSize: 13, letterSpacing: 4 }}>PRÉVISUALISATION EMAILS</span>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
          <a href="?type=waiting" style={{ color: '#4a8fd4', fontFamily: 'Georgia', fontSize: 12, letterSpacing: 2 }}>Waiting List</a>
          <span style={{ color: '#444' }}>·</span>
          <a href="?type=achat" style={{ color: '#4a8fd4', fontFamily: 'Georgia', fontSize: 12, letterSpacing: 2 }}>Confirmation achat</a>
        </div>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <p style={{ color: '#666', fontFamily: 'Georgia', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>— Email Waiting List —</p>
        <iframe srcDoc={waitingList} style={{ width: '100%', height: 700, border: 'none', borderRadius: 8, marginBottom: 48 }} />
        <p style={{ color: '#666', fontFamily: 'Georgia', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>— Email Confirmation achat —</p>
        <iframe srcDoc={achat} style={{ width: '100%', height: 700, border: 'none', borderRadius: 8 }} />
      </div>
    </div>
  )
}
