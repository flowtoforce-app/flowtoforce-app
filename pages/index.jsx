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
      description: '12 semaines. 8 chapitres. Une progression structurée à la maison avec ton poids du corps et des accessoires (élastiques, chaise, haltères). Tu te muscles, tu construis ta confiance. Après, tu seras prête pour la salle.',
      price: 29.99,
    },
    {
      id: 'bundle',
      name: 'FlowToForce Bundle',
      subtitle: 'V1 + V2',
      description: 'Les deux programmes : la salle et la maison. Flexibilité totale selon ton emploi du temps et tes objectifs.',
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
            <svg viewBox="0 0 390 390" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="380" height="380" fill="#FFFFFF" />
              <text x="100" y="180" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="32" fontWeight="700" fill="#000000" letterSpacing="1">flow</text>
              <line x1="160" y1="205" x2="220" y2="205" stroke="#000000" strokeWidth="1.5" />
              <text x="280" y="235" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="32" fontWeight="700" fill="#000000" letterSpacing="1">force</text>
            </svg>
          </div>

          <div className={styles.heroContent}>
            <h1>FlowToForce</h1>
            <p className={styles.mainDescription}>
              FlowToForce est une méthode de musculation pensée pour celles qui viennent du yoga ou du pilates mais pas que, aussi pour les personnes qui ont envie de suivre une méthode. 12 semaines. Pas de complexité inutile, pas de programme pensé pour quelqu'un d'autre. Une méthode à toi.
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
          <p>FlowToForce © 2026</p>
        </footer>
      </div>
    </>
  )
}
