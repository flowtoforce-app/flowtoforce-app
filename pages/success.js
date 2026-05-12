import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/landing.module.css'

const programInfo = {
  v1: {
    name: 'FlowToForce V1 — Programme en Salle',
    files: [{ label: 'Télécharger V1 PDF', href: '/downloads/flowtoforce-v1.pdf' }],
  },
  v2: {
    name: 'FlowToForce V2 — Home Programme',
    files: [{ label: 'Télécharger V2 PDF', href: '/downloads/flowtoforce-v2.pdf' }],
  },
  bundle: {
    name: 'FlowToForce Bundle — V1 + V2',
    files: [
      { label: 'Télécharger V1 PDF', href: '/downloads/flowtoforce-v1.pdf' },
      { label: 'Télécharger V2 PDF', href: '/downloads/flowtoforce-v2.pdf' },
    ],
  },
}

export default function Success() {
  const router = useRouter()
  const { program } = router.query
  const info = programInfo[program]

  return (
    <>
      <Head>
        <title>FlowToForce — Merci !</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.container}>
        <section className={styles.hero} style={{ minHeight: '100vh', justifyContent: 'center' }}>
          <div className={styles.heroContent} style={{ maxWidth: 520, textAlign: 'center' }}>
            <div className={styles.logoText}>
              <span className={styles.logoFlow}>flow</span>
              <span className={styles.logoLine}></span>
              <span className={styles.logoForce}>force</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 20, marginTop: 32, marginBottom: 8 }}>
              🤍 Paiement confirmé
            </p>
            {info ? (
              <>
                <p style={{ color: 'white', fontSize: 17, fontWeight: 500, marginBottom: 32 }}>
                  {info.name}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {info.files.map((f) => (
                    <a
                      key={f.href}
                      href={f.href}
                      download
                      className={styles.ctaFinalButton}
                      style={{ display: 'block', textDecoration: 'none' }}
                    >
                      {f.label}
                    </a>
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 24 }}>
                  Garde bien cette page ou ce lien — il te donne accès direct à ton programme.
                </p>
              </>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
                Ton achat est confirmé. Un email va t'être envoyé sous peu.
              </p>
            )}
            <a
              href="/"
              style={{ display: 'inline-block', marginTop: 40, color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'underline' }}
            >
              ← Retour à l'accueil
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
