import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { canAccessVersion } from '../../lib/token'
import { chapitresV1, chapitresV2 } from '../../lib/chapters'
import styles from '../../styles/programme.module.css'

function Hearts({ count }) {
  return (
    <span className={styles.profilHeartBadge}>
      <span className={styles.profilHeartIcon}>♥</span>
      <span className={styles.profilHeartCount}>{count}</span>
    </span>
  )
}

export default function Profil({ token, versions }) {
  const [seances, setSeances] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const results = []
      versions.forEach(version => {
        const chapters = version === 'v1' ? chapitresV1 : chapitresV2
        chapters.filter(ch => !ch.special).forEach(ch => {
          ch.seances.forEach(s => {
            const data = JSON.parse(localStorage.getItem(`ftf_${version}_${s}`) || '{}')
            if (data.done || data.hearts > 0) {
              results.push({
                version,
                seanceId: s,
                chapitre: ch.titre,
                done: data.done || false,
                hearts: data.hearts || 0,
              })
            }
          })
        })
      })
      results.sort((a, b) => b.hearts - a.hearts)
      setSeances(results)
    } catch {}
    setLoaded(true)
  }, [])

  const backHref = versions.includes('v1')
    ? `/programme/v1?token=${token}`
    : `/programme/v2?token=${token}`

  return (
    <>
      <Head>
        <title>Mon profil — FlowToForce</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href={backHref} className={styles.back}> </Link>
          <div className={styles.headerLogo}>
            <span className={styles.logoFlow}>flow</span>
            <span className={styles.logoLine} />
            <span className={styles.logoForce}>force</span>
          </div>
          <div className={styles.version} />
        </header>

        <div className={styles.faqHero}>
          <p className={styles.heroLabel}>Mon espace</p>
          <h1 className={styles.heroTitle} style={{ fontSize: '34px' }}>Profil</h1>
        </div>

        <div className={styles.chapitresList}>
          <p className={styles.blockLabel} style={{ marginBottom: '12px' }}>Mes séances</p>

          {!loaded ? null : seances.length === 0 ? (
            <p className={styles.profilEmpty}>
              Tes séances notées ou validées apparaîtront ici.
            </p>
          ) : (
            <div className={styles.profilList}>
              {seances.map((s, i) => (
                <Link
                  key={i}
                  href={`/programme/${s.version}/${s.seanceId}?token=${token}`}
                  className={styles.profilItem}
                >
                  <div className={styles.profilItemLeft}>
                    <span className={styles.profilVersion}>{s.version.toUpperCase()}</span>
                    <div>
                      <p className={styles.profilChapitre}>{s.chapitre}</p>
                      <p className={styles.profilSeanceId}>Séance {s.seanceId.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={styles.profilItemRight}>
                    <Hearts count={s.hearts} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={styles.faqPillWrap} style={{ marginTop: '40px' }}>
          <Link href={backHref} className={styles.faqPill}>
            Retour au programme
          </Link>
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
  const v1 = canAccessVersion(token, 'v1')
  const v2 = canAccessVersion(token, 'v2')
  if (!v1 && !v2) {
    return { redirect: { destination: '/', permanent: false } }
  }
  const versions = []
  if (v1) versions.push('v1')
  if (v2 && !v1) versions.push('v2')
  if (v1 && v2) versions.push('v2')
  return { props: { token: token || '', versions } }
}
