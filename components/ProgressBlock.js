import { useState, useEffect } from 'react'
import { chapitresV1, chapitresV2 } from '../lib/chapters'
import styles from '../styles/programme.module.css'

export default function ProgressBlock({ version, token }) {
  const [completed, setCompleted] = useState([])

  const chapitres = version === 'v1' ? chapitresV1 : chapitresV2
  const allSeances = chapitres
    .filter(ch => !ch.special)
    .flatMap(ch => ch.seances.map(s => ({ seance: s, chapitre: ch })))

  useEffect(() => {
    try {
      const done = []
      allSeances.forEach(({ seance }) => {
        const data = JSON.parse(localStorage.getItem(`ftf_${version}_${seance}`) || '{}')
        if (data.done) done.push(seance)
      })
      setCompleted(done)
    } catch {}
  }, [version])

  const total = allSeances.length
  const count = completed.length
  const pct = Math.round((count / total) * 100)
  const nextItem = allSeances.find(({ seance }) => !completed.includes(seance))
  const currentCh = nextItem?.chapitre
  const finished = count === total

  return (
    <div className={styles.progressBlock}>
      <div className={styles.progressHeader}>
        <p className={styles.blockLabel}>Ta progression</p>
        <span className={styles.progressPct}>{pct}%</span>
      </div>

      <div className={styles.progressBarWrap}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>

      <div className={styles.progressStats}>
        <span className={styles.progressCount}>{count} séances complétées</span>
        <span className={styles.progressTotal}>sur {total}</span>
      </div>

      {finished ? (
        <p className={styles.progressDone}>Programme terminé 🤍</p>
      ) : nextItem && (
        <a href={`/programme/${version}/${nextItem.seance}?token=${token}`} className={styles.progressNextLink}>
          <div className={styles.progressNextBlock}>
            <div>
              <span className={styles.progressNextLabel}>Prochaine séance</span>
              <span className={styles.progressNextSeance}>Séance {nextItem.seance.toUpperCase()}</span>
              {currentCh && <span className={styles.progressNextCh}>{currentCh.titre}</span>}
            </div>
            <span className={styles.progressNextArrow}>→</span>
          </div>
        </a>
      )}
    </div>
  )
}
