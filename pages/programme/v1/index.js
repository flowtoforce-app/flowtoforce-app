import Head from 'next/head'
import Link from 'next/link'
import { chapitresV1 } from '../../../lib/chapters'
import { canAccessVersion } from '../../../lib/token'
import styles from '../../../styles/programme.module.css'
import PlanningSection from '../../../components/PlanningSection'
import ProgressBlock from '../../../components/ProgressBlock'

export default function V1Index({ token }) {
  return (
    <>
      <Head>
        <title>FlowToForce V1 — Programme en Salle</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.back}>←</Link>
          <div className={styles.headerLogo}>
            <span className={styles.logoFlow}>flow</span>
            <span className={styles.logoLine} />
            <span className={styles.logoForce}>force</span>
          </div>
          <div className={styles.version}>V1</div>
        </header>

        <div className={styles.heroBlock}>
          <p className={styles.heroLabel}>Programme en Salle</p>
          <h1 className={styles.heroTitle}>FlowToForce V1</h1>
          <p className={styles.heroMeta}>12 semaines · 24 séances · 8 chapitres</p>
          <div className={styles.heroBadge}>Salle</div>
        </div>

        <div className={styles.chapitresList}>
          <ProgressBlock version="v1" token={token} />
        </div>

        <div className={styles.chapitresList} style={{ marginTop: '20px' }}>
          {chapitresV1.map((ch) => {
            if (ch.special) {
              return (
                <div key={ch.id} className={styles.chapitreCardSpecial}>
                  <Link href={`/programme/v1/${ch.special}?token=${token}`} className={styles.specialLink}>
                    <div>
                      <span className={styles.specialLinkSub}>{ch.semaines}</span>
                      <span className={styles.specialLinkLabel}>{ch.titre}</span>
                    </div>
                    <span className={styles.seanceArrow}>→</span>
                  </Link>
                </div>
              )
            }
            return (
              <div key={ch.id} className={styles.chapitreCard}>
                <div className={styles.chapitreHeader}>
                  <span className={styles.chapitreNum}>0{ch.id}</span>
                  <div>
                    <p className={styles.chapitreSemaines}>{ch.semaines}</p>
                    <h2 className={styles.chapitreTitre}>{ch.titre}</h2>
                  </div>
                </div>
                <div className={styles.seancesList}>
                  {ch.seances.map((s) => (
                    <Link key={s} href={`/programme/v1/${s}?token=${token}`} className={styles.seanceItem}>
                      <span className={styles.seanceLabel}>Séance {s.toUpperCase()}</span>
                      <span className={styles.seanceArrow}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.chapitresList} style={{ marginTop: '20px' }}>
          <PlanningSection version="v1" />
        </div>

        <footer className={styles.footer}>
          <p>FlowToForce © 2026</p>
        </footer>
      </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { token } = query
  if (!canAccessVersion(token, 'v1')) {
    return { redirect: { destination: '/', permanent: false } }
  }
  return { props: { token: token || '' } }
}
