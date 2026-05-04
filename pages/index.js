import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/landing.module.css'

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const programs = [
    {
      id: 'v1',
      name: 'FlowToForce V1',
      subtitle: 'Programme en salle',
      description: '12 semaines. 8 chapitres. Une progression structurée à la salle pour apprendre comment fonctionnent les séances, comment évoluer, comment utiliser les machines. Accompagnement poussé pour construire ta force et ta confiance.',
      price: 29.99,
    },
    {
      id: 'v2',
      name: 'FlowToForce V2',
      subtitle: 'Home Programme',
      description: '12 semaines. 8 chapitres. Une progression structurée à la maison au poids du corps et accessoires (élastiques, chaise, haltères). Tu te muscles, tu construis ta confiance. Après, tu seras prête pour la salle.',
      price: 29.99,
    },
    {
      id: 'bundle',
      name: 'FlowToForce Bundle',
      subtitle: 'V1 + V2',
      description: 'Les deux programmes : Salle et Home. Flexibilité totale selon ton emploi du temps et tes objectifs.',
      price: 39.99,
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
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>FlowToForce - Musculation pour Toi</title>
        <meta name="description" content="FlowToForce : une méthode de musculation pensée pour toi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.logo}>
            <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7EAED6"/>
                  <stop offset="50%" stopColor="#AFCBE3"/>
                  <stop offset="100%" stopColor="#E8D8D3"/>
                </linearGradient>
              </defs>
              <rect width="220" height="220" rx="50" fill="url(#grad)"/>
              <style>{`
                .text {
                  fill: white;
                  font-family: 'Cormorant Garamond', serif;
                  font-size: 20px;
                  letter-spacing: 1px;
                }
              `}</style>
              <text x="70" y="95" className="text">flow</text>
              <line x1="95" y1="110" x2="125" y2="110"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeOpacity="0.6"
                    strokeLinecap="round"/>
              <text x="110" y="140" className="text">force</text>
            </svg>
          </div>

          <div className={styles.heroContent}>
            <h1>FlowToForce</h1>
            <p className={styles.mainDescription}>
              Le programme idéal pour passer du yoga / pilates à la musculation en toute confiance. 12 semaines. Pas de complexité inutile, pas de programme pensé pour quelqu'un d'autre. Une méthode à toi.
            </p>
          </div>
        </section>

        {/* Programs Section */}
        <section className={styles.programs}>
          <h2>Choisis ton programme</h2>

          <div className={styles.programsGrid}>
            {programs.map((program) => (
              <div key={program.id} className={styles.programCard}>
                <h3>{program.name}</h3>
                <p className={styles.subtitle}>{program.subtitle}</p>
                <p className={styles.programDescription}>{program.description}</p>

                <div className={styles.priceSection}>
                  <span className={styles.price}>{program.price.toFixed(2)}€</span>
                </div>

                <button
                  className={styles.button}
                  onClick={() => handleCheckout(program.id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Redirection...' : 'S\'inscrire'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/flowtoforce/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm3.7-10c0 2.05-1.65 3.7-3.7 3.7s-3.7-1.65-3.7-3.7 1.65-3.7 3.7-3.7 3.7 1.65 3.7 3.7zM17.9 6.1c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1.5-1.1 1.1-1.1 1.1.5 1.1 1.1z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@flowtoforce" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07 6.85 6.85 0 1 0 6.89 6.86V9.24a8.65 8.65 0 0 0 5.1 1.93V7.24a4.84 4.84 0 0 1-.89-.08z"/>
              </svg>
            </a>
            <a href="mailto:flowtoforce@protonmail.com" className={styles.socialLink}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
// Landing page: new logo SVG, updated program descriptions, social links footer
