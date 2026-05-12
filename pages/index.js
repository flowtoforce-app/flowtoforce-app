// 🚀 FORCE_REBUILD_V5_GRADIENT_CACHE_BUST_2026_05_06 🚀
import { useState, useRef, useCallback, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/landing.module.css'

// Force instant updates - no server-side caching
export const revalidate = 0

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [emailValue, setEmailValue] = useState('')
  const [firstNameValue, setFirstNameValue] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const carouselRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (router.query.success === 'true') {
      setPaymentStatus('success')
      router.replace('/', undefined, { shallow: true })
    } else if (router.query.canceled === 'true') {
      setPaymentStatus('canceled')
      router.replace('/', undefined, { shallow: true })
    }
  }, [router.query])

  useEffect(() => {
    const handlePageShow = (e) => {
      if (e.persisted) setIsLoading(false)
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  const scrollToPrograms = useCallback(() => {
    document.getElementById('programmes')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const toggleFaq = useCallback((i) => {
    setOpenFaq(prev => prev === i ? null : i)
  }, [])

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setEmailLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, firstName: firstNameValue }),
      })
      setEmailSubmitted(true)
    } catch {
      setEmailSubmitted(true)
    }
    setEmailLoading(false)
  }

  const faq = [
    {
      q: "C'est vraiment pour débutantes ?",
      a: "Oui. Même si tu n'as jamais soulevé une barre. Chaque séance part de zéro, t'explique le pourquoi, et t'emmène là où tu veux aller.",
    },
    {
      q: "Qu'est-ce que je reçois exactement ?",
      a: "Un PDF complet : 12 semaines, 8 chapitres, chaque séance détaillée exercice par exercice. Accès immédiat après paiement.",
    },
    {
      q: "Je peux faire V2 sans matériel ?",
      a: "Oui. V2 fonctionne au poids du corps. Élastiques et haltères sont un bonus, pas une obligation.",
    },
    {
      q: "Le paiement est sécurisé ?",
      a: "Oui. Paiement par carte via Stripe. Achat unique, accès définitif. Zéro abonnement.",
    },
  ]

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const cardWidth = carouselRef.current.offsetWidth * 0.82
      setActiveCard(Math.round(scrollLeft / cardWidth))
    }
  }

  const programs = [
    {
      id: 'v1',
      name: 'FlowToForce V1',
      subtitle: 'Programme en salle',
      description: '12 semaines. 8 chapitres. Une progression structurée à la salle pour apprendre comment fonctionnent les séances, comment évoluer, comment utiliser les machines. Accompagnement poussé pour construire ta force et ta confiance.',
      price: 29.99,
      preorder: 'PDF disponible immédiatement · Bientôt dans l\'application',
    },
    {
      id: 'v2',
      name: 'FlowToForce V2',
      subtitle: 'Home Programme',
      description: '12 semaines. 8 chapitres. Une progression structurée à la maison au poids du corps et accessoires (élastiques, chaise, haltères). Tu te muscles, tu construis ta confiance. Après, tu seras prête pour la salle.',
      price: 29.99,
      preorder: 'PDF disponible immédiatement · Bientôt dans l\'application',
    },
    {
      id: 'bundle',
      name: 'FlowToForce Bundle',
      subtitle: 'V1 + V2',
      description: 'Les deux programmes : Salle et Home. Flexibilité totale selon ton emploi du temps et tes objectifs.',
      price: 39.99,
      featured: true,
      preorder: 'PDF disponible immédiatement · Bientôt dans l\'application',
    },
  ]

  const handleCheckout = async (programId) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Erreur paiement : ' + (data.error || 'Réessaie dans quelques instants.'))
        setIsLoading(false)
      }
    } catch (error) {
      alert('Erreur de connexion. Réessaie dans quelques instants.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>FlowToForce · Méthode</title>
        <meta name="description" content="FlowToForce, la méthode de musculation pensée pour toi. 12 semaines, 2 programmes : salle et maison." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flowtoforce.com" />
        <meta property="og:title" content="FlowToForce · Méthode" />
        <meta property="og:description" content="La méthode de musculation pensée pour toi. 12 semaines, 2 programmes : salle et maison." />
        <meta property="og:image" content="https://flowtoforce.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FlowToForce · Méthode" />
        <meta name="twitter:description" content="La méthode de musculation pensée pour toi. 12 semaines, 2 programmes : salle et maison." />
        <meta name="twitter:image" content="https://flowtoforce.com/og-image.png" />
      </Head>

      <div className={styles.container}>
        {/* Payment canceled banner */}
        {paymentStatus === 'canceled' && (
          <div style={{ background: 'rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '15px', backdropFilter: 'blur(10px)' }}>
            Paiement annulé — tu peux reprendre quand tu veux.
          </div>
        )}

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.logoText}>
              <span className={styles.logoFlow}>flow</span>
              <span className={styles.logoLine}></span>
              <span className={styles.logoForce}>force</span>
            </div>
            <p className={styles.mainDescription}>
              Le programme idéal pour passer du yoga / pilates à la musculation en toute confiance. 12 semaines. Pas de complexité inutile, pas de programme pensé pour quelqu'un d'autre. Une méthode à toi.
            </p>
            <button className={styles.heroCtaButton} onClick={scrollToPrograms}>
              Voir les programmes
            </button>
          </div>
        </section>

        {/* Programs Section */}
        <section className={styles.programs} id="programmes">
          <h2>Choisis ton programme</h2>

          <div className={styles.programsGrid} ref={carouselRef} onScroll={handleScroll}>
            {programs.map((program) => (
              <div key={program.id} className={program.featured ? styles.programCardFeatured : styles.programCard}>
                {program.featured && (
                  <span className={styles.badge}>Meilleure offre</span>
                )}
                <h3>{program.name}</h3>
                <p className={styles.subtitle}>{program.subtitle}</p>
                <p className={styles.programDescription}>{program.description}</p>

                {program.preorder && (
                  <p className={styles.preorderTag}>{program.preorder}</p>
                )}

                <div className={styles.priceSection}>
                  <span className={styles.price}>{program.price.toFixed(2)}€</span>
                </div>

                <button
                  className={program.featured ? styles.buttonFeatured : styles.button}
                  onClick={() => handleCheckout(program.id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Redirection...' : 'S\'inscrire'}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.dots}>
            {programs.map((_, i) => (
              <span key={i} className={i === activeCard ? styles.dotActive : styles.dot} />
            ))}
          </div>
        </section>

        {/* Email Capture Section */}
        <section className={styles.emailSection}>
          <p className={styles.emailEyebrow}>Bientôt disponible</p>
          <h2 className={styles.emailTitle}>L'application FlowToForce.</h2>
          <p className={styles.emailSubtitle}>
            Pensée pour toutes. Construite avec soin.<br />
            Les premières inscrites seront les premières à y entrer.
          </p>
          {emailSubmitted ? (
            <p className={styles.emailSuccess}>Tu es sur la waiting list 🤍 On te prévient dès que l'application est disponible.</p>
          ) : (
            <form className={styles.emailForm} onSubmit={handleEmailSubmit}>
              <input
                type="text"
                className={styles.emailInput}
                placeholder="PRÉNOM"
                value={firstNameValue}
                onChange={e => setFirstNameValue(e.target.value)}
                required
              />
              <input
                type="email"
                className={styles.emailInput}
                placeholder="EMAIL"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                required
              />
              <button type="submit" className={styles.emailSubmitBtn} disabled={emailLoading}>
                {emailLoading ? '...' : "REJOINDRE"}
              </button>
            </form>
          )}
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Questions fréquentes</h2>
          <div className={styles.faqList}>
            {faq.map((item, i) => (
              <div key={i} className={styles.faqItem} onClick={() => toggleFaq(i)}>
                <div className={styles.faqQuestion}>
                  <span>{item.q}</span>
                  <span className={styles.faqChevron}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <p className={styles.faqAnswer}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className={styles.ctaFinal}>
          <p className={styles.ctaFinalTitle}>Prête à démarrer tes 12 semaines ?</p>
          <button className={styles.ctaFinalButton} onClick={scrollToPrograms}>
            Choisir mon programme
          </button>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/flowtoforce/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="mailto:hello@flowtoforce.com" className={styles.socialLink}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
          <p>FlowToForce © 2026</p>
        </footer>
      </div>
    </>
  )
}

// Force server-side rendering on every request (no static generation)
export async function getServerSideProps() {
  return {
    props: {},
  }
}

// Landing page: FINAL - logo gradient, new copy, V2/Bundle descriptions, social links [DEPLOYED ✓]
