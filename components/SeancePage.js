import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/programme.module.css'

const cleanNom = (nom) => {
  if (!nom) return ''
  const parts = nom.split(/ [–—] /)
  return (parts.length > 1 ? parts[parts.length - 1] : parts[0]).trim()
}

export default function SeancePage({ seance, seanceId, chapitre, token, version }) {
  const [activeModal, setActiveModal] = useState(null)
  const [photoFailed, setPhotoFailed] = useState(false)
  const [rating, setRating] = useState(0)
  const [done, setDone] = useState(false)

  const storageKey = `ftf_${version}_${seanceId}`

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const data = JSON.parse(saved)
        setRating(data.rating || 0)
        setDone(data.done || false)
      }
    } catch {}
  }, [storageKey])

  useEffect(() => {
    setPhotoFailed(false)
  }, [activeModal])

  const saveRating = (r) => {
    const next = rating === r ? 0 : r
    setRating(next)
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({ ...existing, rating: next }))
    } catch {}
  }

  const saveDone = () => {
    setDone(true)
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({ ...existing, done: true }))
    } catch {}
  }

  const exoModal = activeModal !== null ? seance.exercices[activeModal] : null

  if (!seance) return null

  return (
    <>
      <Head>
        <title>{`${seance.titre} · FlowToForce ${version.toUpperCase()}`}</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* MODAL EXERCICE PLEIN ÉCRAN */}
      {exoModal && (
        <div className={styles.modal}>
          <button className={styles.modalClose} onClick={() => setActiveModal(null)}>←</button>
          <div className={styles.modalPhoto}>
            {!photoFailed ? (
              <img
                src={`/photos/${version}/${seanceId}/${activeModal}.jpg`}
                alt={exoModal.nom}
                className={styles.photoImg}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                <span className={styles.photoHint}>(photo)</span>
              </div>
            )}
            {!photoFailed && (
              <div className={styles.photoNameOverlay}>{cleanNom(exoModal.nom)}</div>
            )}
          </div>
          <div className={styles.modalContent}>
            <h2 className={styles.modalExoNom}>{cleanNom(exoModal.nom)}</h2>
            {exoModal.objectif && (
              <div className={styles.exoField}>
                <p className={styles.exoFieldLabel}>Objectif</p>
                <p className={styles.exoFieldValue}>{exoModal.objectif}</p>
              </div>
            )}
            {exoModal.muscles && (
              <div className={styles.exoField}>
                <p className={styles.exoFieldLabel}>Muscles</p>
                <p className={styles.exoFieldValue}>{exoModal.muscles}</p>
              </div>
            )}
            {exoModal.materiel && (
              <div className={styles.exoField}>
                <p className={styles.exoFieldLabel}>Matériel</p>
                <p className={styles.exoFieldValue}>{exoModal.materiel}</p>
              </div>
            )}
            {exoModal.execution?.length > 0 && (
              <div className={styles.exoField}>
                <p className={styles.exoFieldLabel}>Exécution</p>
                <ol className={styles.execList}>
                  {exoModal.execution.map((step, j) => <li key={j}>{step}</li>)}
                </ol>
              </div>
            )}
            {exoModal.tips?.length > 0 && (
              <div className={styles.exoField}>
                <p className={styles.exoFieldLabel}>Tips</p>
                <ul className={styles.tipsList}>
                  {exoModal.tips.map((tip, j) => <li key={j}>{tip}</li>)}
                </ul>
              </div>
            )}
            {exoModal.series && (
              <div className={styles.seriesTag}>{exoModal.series}</div>
            )}
          </div>
          <div className={styles.modalNav}>
            <button className={styles.btnRetourCalme} onClick={() => setActiveModal(null)}>
              ← Retour au calme
            </button>
            {activeModal < seance.exercices.length - 1 && (
              <button className={styles.btnExoSuivant} onClick={() => setActiveModal(activeModal + 1)}>
                Exercice suivant →
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.page}>
        <header className={styles.header}>
          <Link href={`/programme/${version}?token=${token}`} className={styles.back}> </Link>
          <div className={styles.headerLogo}>
            <span className={styles.logoFlow}>flow</span>
            <span className={styles.logoLine} />
            <span className={styles.logoForce}>force</span>
          </div>
          <div className={styles.version}>{version.toUpperCase()}</div>
        </header>

        <div className={styles.seanceHeroContent}>
          <p className={styles.chapitreTag}>{chapitre?.titre}</p>
          <p className={styles.seanceIdTag}>Séance {seanceId.toUpperCase()}</p>
          <h1 className={styles.seanceTitre}>{seance.titre}</h1>
          {seance.sousTitre && <p className={styles.seanceSousTitre}>{seance.sousTitre}</p>}
          {seance.materiel && (
            <div className={styles.seanceMeta}>
              <span className={styles.metaTag}>{seance.materiel}</span>
            </div>
          )}
        </div>

        {seance.conseilLys && (
          <div className={styles.conseilBlock}>
            <p className={styles.conseilLabel}>Le conseil de Lys 🤍</p>
            <p className={styles.conseilText}>{seance.conseilLys}</p>
          </div>
        )}

        {seance.muscles && (
          <div className={styles.musclesBlock}>
            <p className={styles.blockLabel}>Muscles sollicités</p>
            <p className={styles.musclesText}>{seance.muscles}</p>
          </div>
        )}

        {seance.echauffement.length > 0 && (
          <div className={styles.block}>
            <p className={styles.blockLabel}>Échauffement · 10 min</p>
            <ul className={styles.simpleList}>
              {seance.echauffement.map((ex, i) => (
                <li key={i} className={styles.simpleItem}>{ex}</li>
              ))}
            </ul>
          </div>
        )}

        {seance.exercices.length > 0 && (
          <div className={styles.block}>
            <p className={styles.blockLabel}>Corps de séance · {seance.exercices.length} exercices</p>
            <div className={styles.exosList}>
              {seance.exercices.map((exo, i) => (
                <button key={i} className={styles.exoRow} onClick={() => setActiveModal(i)}>
                  <span className={styles.exoNum}>{i + 1}</span>
                  <span className={styles.exoNom}>{cleanNom(exo.nom)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {seance.retourCalme.length > 0 && (
          <div className={styles.block}>
            <p className={styles.blockLabel}>Retour au calme · 5 min</p>
            <ul className={styles.simpleList}>
              {seance.retourCalme.map((ex, i) => (
                <li key={i} className={styles.simpleItem}>{ex}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.block}>
          <p className={styles.blockLabel}>Ta séance</p>
          <div className={styles.heartsRow}>
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                className={`${styles.heartBtn} ${rating >= n ? styles.heartFilled : ''}`}
                onClick={() => saveRating(n)}
              >
                {rating >= n ? '♥' : '♡'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.seanceActions}>
          {done ? (
            <div className={styles.doneMessage}>Séance validée 🤍</div>
          ) : (
            <button className={styles.btnValider} onClick={saveDone}>
              Séance validée
            </button>
          )}
          <a href="mailto:hello@flowtoforce.com" className={styles.btnContact}>
            Écrire à Lys 🤍
          </a>
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
