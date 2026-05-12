import { useState, useEffect } from 'react'
import { chapitresV1, chapitresV2 } from '../lib/chapters'
import styles from '../styles/programme.module.css'

const JOURS = [
  { label: 'L', full: 'Lundi' },
  { label: 'M', full: 'Mardi' },
  { label: 'M', full: 'Mercredi' },
  { label: 'J', full: 'Jeudi' },
  { label: 'V', full: 'Vendredi' },
  { label: 'S', full: 'Samedi' },
  { label: 'D', full: 'Dimanche' },
]
const HEURES = Array.from({ length: 17 }, (_, i) => `${String(i + 6).padStart(2, '0')}:00`)

export default function PlanningSection({ version }) {
  const [selectedDays, setSelectedDays] = useState([])
  const [time, setTime] = useState('18:00')
  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [nextSeance, setNextSeance] = useState(null)

  const chapitres = version === 'v1' ? chapitresV1 : chapitresV2
  const allSeances = chapitres
    .filter(ch => !ch.special)
    .flatMap(ch => ch.seances.map(s => ({ seance: s, chapitre: ch })))

  useEffect(() => {
    try {
      // Load planning prefs
      const stored = localStorage.getItem(`ftf_planning_${version}`)
      if (stored) {
        const data = JSON.parse(stored)
        setSelectedDays(data.days || [])
        setTime(data.time || '18:00')
        setEmail(data.email || '')
        setPrenom(data.prenom || '')
        setSaved(true)
      }
      // Find next séance
      const next = allSeances.find(({ seance }) => {
        const d = JSON.parse(localStorage.getItem(`ftf_${version}_${seance}`) || '{}')
        return !d.done
      })
      setNextSeance(next || null)
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
    if (selectedDays.length === 0) { setError('Choisis au moins un jour'); return }
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

  const selectedLabels = selectedDays.sort().map(i => JOURS[i].full).join(', ')

  return (
    <div className={styles.planningCard}>
      <div className={styles.planningCardHeader}>
        <span className={styles.planningIcon}>📅</span>
        <p className={styles.planningCardTitle}>Mon planning</p>
      </div>

      {saved ? (
        <div className={styles.planningSavedState}>
          <div className={styles.planningSavedDays}>
            {JOURS.map((j, i) => (
              <span key={i} className={`${styles.jourPill} ${selectedDays.includes(i) ? styles.jourPillActive : styles.jourPillInactive}`}>
                {j.label}
              </span>
            ))}
          </div>
          <p className={styles.planningSavedInfo}>{selectedLabels} · {time}</p>
          {nextSeance && (
            <div className={styles.planningNextSeance}>
              <span className={styles.planningNextLabel}>Prochaine</span>
              <span className={styles.planningNextValue}>Séance {nextSeance.seance.toUpperCase()}</span>
            </div>
          )}
          <button className={styles.planningEditBtn} onClick={() => setSaved(false)}>Modifier</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.planningForm}>
          <p className={styles.planningSubLabel}>Tes jours d'entraînement</p>
          <div className={styles.joursRow}>
            {JOURS.map((j, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.jourPill} ${selectedDays.includes(i) ? styles.jourPillActive : styles.jourPillInactive}`}
                onClick={() => toggleDay(i)}
              >
                {j.label}
              </button>
            ))}
          </div>

          <p className={styles.planningSubLabel}>Heure de séance</p>
          <select className={styles.planningSelect} value={time} onChange={e => setTime(e.target.value)}>
            {HEURES.map(h => <option key={h} value={h}>{h}</option>)}
          </select>

          <p className={styles.planningSubLabel}>Rappels par email</p>
          <div className={styles.planningInputRow}>
            <input type="text" className={styles.planningInput} placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
            <input type="email" className={styles.planningInput} placeholder="Ton email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          {error && <p className={styles.planningError}>{error}</p>}
          <button type="submit" className={styles.planningSubmitBtn} disabled={loading}>
            {loading ? '...' : 'Enregistrer 🤍'}
          </button>
        </form>
      )}
    </div>
  )
}
