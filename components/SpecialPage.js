import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/programme.module.css'

export default function SpecialPage({ title, content, token, version, backLabel, nextHref, nextLabel, type }) {
  const paragraphs = content.split('\n').filter(l => l.trim())

  return (
    <>
      <Head>
        <title>{`${title} — FlowToForce ${version.toUpperCase()}`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href={`/programme/${version}?token=${token}`} className={styles.back}>←</Link>
          <div className={styles.headerLogo}>
            <span className={styles.logoFlow}>flow</span>
            <span className={styles.logoLine} />
            <span className={styles.logoForce}>force</span>
          </div>
          <div className={styles.version}>{version.toUpperCase()}</div>
        </header>

        <div className={styles.specialHero}>
          <div className={styles.logoHero}>
            <span className={styles.logoHeroFlow}>flow</span>
            <span className={styles.logoHeroLine} />
            <span className={styles.logoHeroForce}>force</span>
          </div>
          <h1 className={styles.specialTitle}>{title}</h1>
        </div>

        <div className={styles.specialContent}>
          {paragraphs.map((line, i) => {
            const clean = line.replace(/^#{1,3}\s/, '').replace(/\*\*/g, '').replace(/^→\s/, '→ ')
            if (line.startsWith('###') || line.startsWith('##')) {
              return <h3 key={i} className={styles.specialH3}>{clean}</h3>
            }
            if (line.startsWith('→')) {
              return <p key={i} className={styles.specialArrow}>{clean}</p>
            }
            if (line.startsWith('---')) return null
            return <p key={i} className={styles.specialP}>{clean}</p>
          })}
        </div>

        {type === 'final' && (
          <div className={styles.finalLinks}>
            <p className={styles.blockLabel}>Reste connectée</p>
            <div className={styles.socialFinal}>
              <a href="https://www.instagram.com/flowtoforce/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Instagram</a>
              <a href="https://www.tiktok.com/@flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>TikTok</a>
              <a href="mailto:hello@flowtoforce.com" className={styles.socialBtn}>Écrire à Lys</a>
            </div>
          </div>
        )}

        <div className={styles.seanceActions}>
          {nextHref && (
            <Link href={nextHref} className={styles.btnValider} style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              {nextLabel}
            </Link>
          )}
          <Link href={`/programme/${version}?token=${token}`} className={styles.btnRetour}>
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
