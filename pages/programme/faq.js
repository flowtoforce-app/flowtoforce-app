import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { canAccessVersion } from '../../lib/token'
import styles from '../../styles/programme.module.css'

const questions = [
  {
    q: 'Comment naviguer dans le programme ?',
    a: 'Le programme est organisé en chapitres, chacun couvrant deux semaines. Depuis la page principale, clique sur une séance pour l\'ouvrir. Tu avances à ton rythme, dans l\'ordre qui te convient.',
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
    a: 'Oui. Le programme ne t\'impose pas d\'ordre strict. Si tu sautes une séance, reprends simplement là où tu t\'es arrêtée. Ta progression reste sauvegardée.',
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
    a: 'Cette fonctionnalité sera disponible dans l\'application FlowToForce, actuellement en développement. Tu pourras enregistrer tes photos à chaque étape et suivre ton évolution dans le temps.',
  },
  {
    q: 'Quand sort l\'application FlowToForce ?',
    a: 'L\'application est en cours de développement. Elle regroupera tes programmes, ton planning, tes photos de progression et un espace communauté. Inscris-toi à la newsletter pour être informée en priorité.',
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

          <div className={styles.faqSocial}>
            <a
              href="https://www.instagram.com/flowtoforce"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@flowtoforce"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              TikTok
            </a>
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
