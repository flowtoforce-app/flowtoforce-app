import Head from 'next/head'
import styles from '../styles/landing.module.css'

const programNames = {
  v1: 'FlowToForce V1 · Programme en Salle',
  v2: 'FlowToForce V2 · Home Programme',
  bundle: 'FlowToForce Bundle · V1 + V2',
}

export default function Success({ programName }) {
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
              Bienvenue dans la team 🤍
            </p>
            {programName && (
              <p style={{ color: 'white', fontSize: 17, fontWeight: 500, marginBottom: 24 }}>
                {programName}
              </p>
            )}
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              Merci pour ta confiance et bienvenue dans la communauté FlowToForce. Ton programme arrive par email, profite bien de ta méthode.
            </p>
            <a
              href="/"
              style={{ display: 'inline-block', marginTop: 8, color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'underline' }}
            >
              Retour à l'accueil
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { program } = query
  const programName = programNames[program] || null
  return { props: { programName } }
}
