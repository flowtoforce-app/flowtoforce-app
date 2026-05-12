import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { readSeanceFile, parseSeance } from '../../../lib/parseSeance'
import { chapitresV1 } from '../../../lib/chapters'
import { canAccessVersion } from '../../../lib/token'
import styles from '../../../styles/programme.module.css'

export default function SeanceV1({ seance, seanceId, chapitre, token }) {
  const [activeExo, setActiveExo] = useState(null)
  const [done, setDone] = useState(false)

  if (!seance) return <div className={styles.page}><p style={{padding:32,color:'white'}}>Séance introuvable.</p></div>

  return (
    <>
      <Head>
        <title>{`${seance.titre} — FlowToForce V1`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href={`/programme/v1?token=${token}`} className={styles.back}>←</Link>
          <div className={styles.headerLogo}>
            <span className={styles.logoFlow}>flow</span>
            <span className={styles.logoLine} />
            <span className={styles.logoForce}>force</span>
          </div>
          <div className={styles.version}>V1</div>
        </header>

        <div className={styles.seanceHero}>
          <div className={styles.photoPlaceholder}>
            <span className={styles.photoText}>(photo)</span>
          </div>
          <div className={styles.seanceHeroContent}>
            <p className={styles.chapitreTag}>{chapitre?.titre}</p>
            <h1 className={styles.seanceTitre}>{seance.titre}</h1>
            {seance.sousTitre && <p className={styles.seanceSousTitre}>{seance.sousTitre}</p>}
            {seance.materiel && (
              <div className={styles.seanceMeta}>
                <span className={styles.metaTag}>{seance.materiel}</span>
              </div>
            )}
          </div>
        </div>

        {seance.conseilLys && (
          <div className={styles.conseilBlock}>
            <p className={styles.conseilLabel}>Le conseil de Lys</p>
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
                <div key={i} className={styles.exoCard}>
                  <button
                    className={styles.exoHeader}
                    onClick={() => setActiveExo(activeExo === i ? null : i)}
                  >
                    <div className={styles.exoHeaderLeft}>
                      <span className={styles.exoNum}>{i + 1}</span>
                      <span className={styles.exoNom}>{exo.nom}</span>
                    </div>
                    <span className={styles.exoChevron}>{activeExo === i ? '−' : '+'}</span>
                  </button>

                  {activeExo === i && (
                    <div className={styles.exoDetail}>
                      <div className={styles.photoPlaceholderSmall}>
                        <span className={styles.photoText}>(photo)</span>
                      </div>
                      {exo.objectif && (
                        <div className={styles.exoField}>
                          <p className={styles.exoFieldLabel}>Objectif</p>
                          <p className={styles.exoFieldValue}>{exo.objectif}</p>
                        </div>
                      )}
                      {exo.muscles && (
                        <div className={styles.exoField}>
                          <p className={styles.exoFieldLabel}>Muscles</p>
                          <p className={styles.exoFieldValue}>{exo.muscles}</p>
                        </div>
                      )}
                      {exo.materiel && (
                        <div className={styles.exoField}>
                          <p className={styles.exoFieldLabel}>Matériel</p>
                          <p className={styles.exoFieldValue}>{exo.materiel}</p>
                        </div>
                      )}
                      {exo.execution && exo.execution.length > 0 && (
                        <div className={styles.exoField}>
                          <p className={styles.exoFieldLabel}>Exécution</p>
                          <ol className={styles.execList}>
                            {exo.execution.map((step, j) => (
                              <li key={j}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                      {exo.tips && exo.tips.length > 0 && (
                        <div className={styles.exoField}>
                          <p className={styles.exoFieldLabel}>Tips</p>
                          <ul className={styles.tipsList}>
                            {exo.tips.map((tip, j) => (
                              <li key={j}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {exo.series && (
                        <div className={styles.seriesTag}>{exo.series}</div>
                      )}
                    </div>
                  )}
                </div>
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

        <div className={styles.seanceActions}>
          {done ? (
            <div className={styles.doneMessage}>Séance validée 🤍</div>
          ) : (
            <button className={styles.btnValider} onClick={() => setDone(true)}>
              Séance validée
            </button>
          )}
          <Link href={`/programme/v1?token=${token}`} className={styles.btnRetour}>
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

export async function getServerSideProps({ params, query }) {
  const { token } = query
  if (!canAccessVersion(token, 'v1')) {
    return { redirect: { destination: '/', permanent: false } }
  }

  const { seance: seanceId } = params
  const raw = readSeanceFile('v1', seanceId)
  if (!raw) return { notFound: true }

  const seance = parseSeance(raw)
  const chapitre = chapitresV1.find(ch => ch.seances.includes(seanceId)) || null

  return { props: { seance, seanceId, chapitre, token: token || '' } }
}
