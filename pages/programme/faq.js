import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { canAccessVersion } from '../../lib/token'
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

const questions = [
  {
    q: 'Comment naviguer dans le programme ?',
    a: 'Le programme est organisé en chapitres, chacun couvrant deux semaines. Depuis la page principale, clique sur une séance pour l\'ouvrir. Le rythme conseillé est de deux séances par semaine, mais tu avances à ton rythme.',
  },
  {
    q: 'Dans quel ordre faire les séances ?',
    a: 'Le programme suit une structure d\'évolution progressive à respecter. Chaque chapitre et chaque séance sont conçus pour construire sur ce qui précède. Il est conseillé de suivre l\'ordre des chapitres et des séances pour bénéficier pleinement de la progression.',
  },
  {
    q: 'Et une fois le programme terminé ?',
    a: 'Une fois l\'ensemble des séances complétées, tu es libre de piocher dans le désordre les séances que tu as le plus aimées. Le système de notation par coeurs — de 1 à 4 — te permet de retrouver facilement tes préférées et de les rejouer à volonté.',
  },
  {
    q: 'Comment voir les détails d\'un exercice ?',
    a: 'Sur chaque page de séance, clique sur un exercice pour l\'ouvrir en plein écran. Tu y trouves la photo, les séries, les répétitions et les conseils d\'exécution. Tu peux naviguer entre les exercices sans fermer la fenêtre.',
  },
  {
    q: 'Comment noter une séance ?',
    a: 'En bas de chaque séance, quatre coeurs te permettent de noter ton ressenti. Un coeur pour une séance facile, quatre pour une séance intense. Ta note est sauvegardée sur cet appareil.',
  },
  {
    q: 'Comment valider une séance terminée ?',
    a: 'Clique sur le bouton de validation en bas de la page de séance. Elle apparaît ensuite avec un indicateur visuel sur la page principale, et ta barre de progression se met à jour.',
  },
  {
    q: 'Comment suivre ma progression ?',
    a: 'La barre de progression en haut de l\'index affiche ton avancement global. Elle se met à jour automatiquement à chaque séance validée. Tu vois aussi quelle est ta prochaine séance.',
  },
  {
    q: 'Comment configurer mon planning de séances ?',
    a: 'En bas de la page principale, choisis les jours de la semaine où tu t\'entraînes et ton heure habituelle. Entre ton prénom et ton adresse email pour recevoir un rappel la veille de chaque séance.',
  },
  {
    q: 'Qu\'est-ce que le programme V1 ?',
    a: 'V1 est le programme en salle. 12 semaines, 8 chapitres, 24 séances. Tu as besoin d\'accès à une salle de sport équipée en machines, haltères et barres.',
  },
  {
    q: 'Qu\'est-ce que le programme V2 ?',
    a: 'V2 est le home programme. 12 semaines, 8 chapitres, 20 séances. Tout se fait à la maison avec poids du corps, haltères légers et un tapis.',
  },
  {
    q: 'Puis-je sauter une séance ?',
    a: 'Tu peux reporter une séance si nécessaire. La progression reste sauvegardée. Cependant, la structure du programme est conçue pour évoluer progressivement — il vaut mieux y revenir que de la passer définitivement.',
  },
  {
    q: 'Et si je suis fatiguée ce jour-là ?',
    a: 'Écoute ton corps. Certaines séances sont intentionnellement plus intenses que d\'autres. Si tu as besoin de repos, prends-le. Mieux vaut une séance de moins qu\'un manque de récupération.',
  },
  {
    q: 'Et si je me blesse ?',
    a: 'Arrête immédiatement et consulte un professionnel de santé avant de reprendre. En cas de doute sur un exercice ou une douleur, écris-moi à hello@flowtoforce.com.',
  },
  {
    q: 'Comment ajouter mes photos de progression ?',
    a: 'Cette fonctionnalité sera disponible dans l\'application FlowToForce, actuellement en développement. Tu pourras enregistrer tes photos à chaque étape et suivre ton évolution dans le temps. Tes photos resteront strictement privées et confidentielles.',
  },
  {
    q: 'Quand sort l\'application FlowToForce ?',
    a: 'L\'application est en cours de développement. Elle regroupera tes programmes, ton planning, tes photos de progression et un espace communauté. Inscris-toi à la newsletter pour être informée en priorité.',
  },
  {
    q: 'Mes données personnelles sont-elles sécurisées ?',
    a: 'Oui. Toutes tes données personnelles — email, prénom, planning — sont strictement confidentielles et ne sont jamais partagées, revendues ou transmises à des tiers. Elles sont uniquement utilisées pour le bon fonctionnement du programme et l\'envoi de tes rappels.',
  },
  {
    q: 'Mon lien d\'accès est-il personnel ?',
    a: 'Oui. Ton lien d\'accès est unique, personnel et traçable. Il est strictement interdit de le partager, de le transmettre ou de le revendre. Tout usage non autorisé constitue une violation des conditions d\'utilisation et pourra entraîner la désactivation de l\'accès.',
  },
  {
    q: 'Comment contacter Lys ?',
    a: 'Pour toute question, écris à hello@flowtoforce.com ou envoie un message sur Instagram. Je réponds personnellement.',
  },
]

export default function Faq({ token, from }) {
  const [open, setOpen] = useState(null)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')

  function toggle(i) {
    setOpen(open === i ? null : i)
  }

  async function handleNewsletter(e) {
    e.preventDefault()
    setNewsletterError('')
    if (!email.includes('@')) {
      setNewsletterError('Adresse email invalide.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setNewsletterError(data.error || 'Une erreur est survenue.')
      }
    } catch {
      setNewsletterError('Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  const backHref = from && token
    ? `/programme/${from}?token=${token}`
    : token ? `/programme/v1?token=${token}` : '/'

  return (
    <>
      <Head>
        <title>Mode d'emploi — FlowToForce</title>
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
          <p className={styles.heroLabel}>Mode d'emploi</p>
          <h1 className={styles.heroTitle} style={{ fontSize: '34px' }}>FAQ</h1>
        </div>

        <div className={styles.faqList}>
          {questions.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={styles.faqIndicator}>{open === i ? '–' : '+'}</span>
              </button>
              {open === i && (
                <p className={styles.faqAnswer}>{item.a}</p>
              )}
            </div>
          ))}
        </div>

        <div className={styles.faqFooterSection}>
          <div className={styles.faqDivider} />

          <div>
            <p className={styles.blockLabel} style={{ marginBottom: '14px' }}>Reste connectée</p>
            <div className={styles.socialFinal}>
              <a href="https://www.instagram.com/flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <IconInstagram /> Instagram
              </a>
              <a href="https://www.tiktok.com/@flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <IconTikTok /> TikTok
              </a>
            </div>
          </div>

          <div className={styles.faqNewsletter}>
            <p className={styles.faqNewsletterTitle}>Newsletter</p>
            <p className={styles.faqNewsletterSub}>Actualités, conseils et nouveautés FlowToForce en avant-première.</p>
            {submitted ? (
              <p className={styles.faqNewsletterSuccess}>Tu es inscrite. À très vite.</p>
            ) : (
              <form className={styles.faqNewsletterForm} onSubmit={handleNewsletter}>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className={styles.faqInput}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.faqInput}
                  required
                />
                {newsletterError && <p className={styles.planningError}>{newsletterError}</p>}
                <button
                  type="submit"
                  className={styles.faqNewsletterBtn}
                  disabled={loading}
                >
                  {loading ? 'Envoi...' : "S'inscrire"}
                </button>
              </form>
            )}
          </div>

          <div className={styles.faqContact}>
            <p className={styles.faqContactLabel}>Une question ?</p>
            <a href="mailto:hello@flowtoforce.com" className={styles.faqContactLink}>
              hello@flowtoforce.com
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href={backHref} className={styles.faqPill}>
              Retour au programme
            </Link>
          </div>

          <p className={styles.faqCopyright}>FlowToForce © 2026</p>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { token, from } = query
  const hasAccess = canAccessVersion(token, 'v1') || canAccessVersion(token, 'v2')
  if (!hasAccess) {
    return { redirect: { destination: '/', permanent: false } }
  }
  return { props: { token: token || '', from: from || null } }
}
