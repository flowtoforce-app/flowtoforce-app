import { useState, useEffect } from 'react'
import styles from '../styles/programme.module.css'

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const HEURES = Array.from({ length: 17 }, (_, i) => `${String(i + 6).padStart(2, '0')}:00`)

export default function PlanningSection({ version }) {
  const [selectedDays, setSelectedDays] = useState([])
  const [time, setTime] = useState('18:00')
  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`ftf_planning_${version}`)
      if (stored) {
        const data = JSON.parse(stored)
        setSelectedDays(data.days || [])
        setTime(data.time || '18:00')
        setEmail(data.email || '')
        setPrenom(data.prenom || '')
        setSaved(true)
      }
    } catch {}
  }, [version])

  const toggleDay = (i) => {
    setSelectedDays(prev =>
      prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i]
    )
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedDays.length === 0) { setError('Choisis au moins un jour 🤍'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, prenom, days: selectedDays, time, version }),
      })
      if (res.ok) {
        localStorage.setItem(`ftf_planning_${version}`, JSON.stringify({ days: selectedDays, time, email, prenom }))
        setSaved(true)
      } else {
        setError('Une erreur est survenue, réessaie.')
      }
    } catch {
      setError('Une erreur est survenue, réessaie.')
    }
    setLoading(false)
  }

  return (
    <div className={styles.block}>
      <p className={styles.blockLabel}>Planifier mes séances</p>
      {saved ? (
        <div className={styles.planningSaved}>
          <p className={styles.planningSavedText}>Planning enregistré 🤍</p>
          <p className={styles.planningSavedSub}>Tu reçois un rappel par mail la veille de chaque séance.</p>
          <div className={styles.joursRow}>
            {JOURS.map((j, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.jourBtn} ${selectedDays.includes(i) ? styles.jourBtnActive : ''}`}
                onClick={() => toggleDay(i)}
              >
                {j}
              </button>
            ))}
          </div>
          <button className={styles.planningEditBtn} onClick={() => setSaved(false)}>Modifier</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.planningForm}>
          <p className={styles.planningLabel}>Tes jours d'entraînement</p>
          <div className={styles.joursRow}>
            {JOURS.map((j, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.jourBtn} ${selectedDays.includes(i) ? styles.jourBtnActive : ''}`}
                onClick={() => toggleDay(i)}
              >
                {j}
              </button>
            ))}
          </div>
          <p className={styles.planningLabel}>Heure de séance</p>
          <select
            className={styles.planningSelect}
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            {HEURES.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <p className={styles.planningLabel}>Rappels par email</p>
          <input
            type="text"
            className={styles.planningInput}
            placeholder="Prénom"
            value={prenom}
            onChange={e => setPrenom(e.target.value)}
          />
          <input
            type="email"
            className={styles.planningInput}
            placeholder="Ton adresse email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {error && <p className={styles.planningError}>{error}</p>}
          <button type="submit" className={styles.btnValider} disabled={loading}>
            {loading ? '...' : 'Enregistrer 🤍'}
          </button>
        </form>
      )}
    </div>
  )
}
