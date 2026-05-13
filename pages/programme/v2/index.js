import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { chapitresV2 } from '../../../lib/chapters'
import { canAccessVersion } from '../../../lib/token'
import styles from '../../../styles/programme.module.css'
import PlanningSection from '../../../components/PlanningSection'
import ProgressBlock from '../../../components/ProgressBlock'

export default function V2Index({ token }) {
  const [completed, setCompleted] = useState([])

  useEffect(() => {
    try {
      const done = []
      chapitresV2.filter(ch => !ch.special).forEach(ch => {
        ch.seances.forEach(s => {
          const data = JSON.parse(localStorage.getItem(`ftf_v2_${s}`) || '{}')
          if (data.done) done.push(s)
        })
      })
      setCompleted(done)
    } catch {}
  }, [])

  return (
    <>
      <Head>
        <title>FlowToForce V2 — Home Programme</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.back}> </Link>
          <div className={styles.headerLogo}>
            <span className={styles.logoFlow}>flow</span>
            <span className={styles.logoLine} />
            <span className={styles.logoForce}>force</span>
          </div>
          <div className={styles.version}>V2</div>
        </header>

        <div className={styles.heroBlock}>
          <p className={styles.heroLabel}>Home Programme</p>
          <h1 className={styles.heroTitle}>FlowToForce V2</h1>
          <p className={styles.heroMeta}>12 semaines · 20 séances · 8 chapitres</p>
          <div className={styles.heroBadge}>Maison</div>
        </div>

        <div className={styles.faqPillWrap}>
          <Link href={`/programme/profil?token=${token}`} className={styles.faqPill}>
            Mon profil
          </Link>
          <Link href={`/programme/faq?token=${token}&from=v2`} className={styles.faqPill}>
            Mode d'emploi
          </Link>
        </div>

        <div className={styles.chapitresList}>
          <ProgressBlock version="v2" token={token} />
        </div>

        <div className={styles.chapitresList} style={{ marginTop: '20px' }}>
          {chapitresV2.map((ch) => {
            if (ch.special) {
              return (
                <div key={ch.id} className={styles.chapitreCardSpecial}>
                  <Link href={`/programme/v2/${ch.special}?token=${token}`} className={styles.specialLink}>
                    <div>
                      <span className={styles.specialLinkSub}>{ch.semaines}</span>
                      <span className={styles.specialLinkLabel}>{ch.titre}</span>
                    </div>
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
                    <Link key={s} href={`/programme/v2/${s}?token=${token}`} className={styles.seanceItem}>
                      <span className={styles.seanceLabel}>Séance {s.toUpperCase()}</span>
                      {completed.includes(s) && <span className={styles.doneCheck}>✓</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.chapitresList} style={{ marginTop: '20px' }}>
          <PlanningSection version="v2" />
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
  if (!canAccessVersion(token, 'v2')) {
    return { redirect: { destination: '/', permanent: false } }
  }
  return { props: { token: token || '' } }
}
