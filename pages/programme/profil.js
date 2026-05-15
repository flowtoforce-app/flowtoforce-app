import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { canAccessVersion } from '../../lib/token'
import { chapitresV1, chapitresV2 } from '../../lib/chapters'
import styles from '../../styles/programme.module.css'

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.23 8.23 0 004.84 1.56V6.81a4.85 4.85 0 01-1.07-.12z"/>
  </svg>
)

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
)

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
  const [resetConfirm, setResetConfirm] = useState(false)

  function handleReset() {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith('ftf_'))
        .forEach(k => localStorage.removeItem(k))
      setSeances([])
      setResetConfirm(false)
    } catch {}
  }

  useEffect(() => {
    try {
      const results = []
      versions.forEach(version => {
        const chapters = version === 'v1' ? chapitresV1 : chapitresV2
        chapters.filter(ch => !ch.special).forEach(ch => {
          ch.seances.forEach(s => {
            const data = JSON.parse(localStorage.getItem(`ftf_${version}_${s}`) || '{}')
            if (data.done || data.rating > 0) {
              results.push({
                version,
                seanceId: s,
                chapitre: ch.titre,
                done: data.done || false,
                hearts: data.rating || 0,
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

        <div className={styles.resetWrap}>
          {!resetConfirm ? (
            <button className={styles.resetBtn} onClick={() => setResetConfirm(true)}>
              Remettre à zéro
            </button>
          ) : (
            <div className={styles.resetConfirmRow}>
              <span className={styles.resetConfirmText}>Tout effacer ?</span>
              <button className={styles.resetConfirmYes} onClick={handleReset}>Oui</button>
              <button className={styles.resetConfirmNo} onClick={() => setResetConfirm(false)}>Annuler</button>
            </div>
          )}
        </div>

        <div className={styles.finalLinks} style={{ marginBottom: '8px' }}>
          <div className={styles.socialFinal}>
            <a href="https://www.instagram.com/flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <IconInstagram /> Instagram
            </a>
            <a href="https://www.tiktok.com/@flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <IconTikTok /> TikTok
            </a>
            <a href="mailto:hello@flowtoforce.com" className={styles.socialBtn}>
              <IconMail /> Contact
            </a>
          </div>
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
