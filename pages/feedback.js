import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/feedback.module.css'

const questions = [
  { key: 'clarte', label: 'Les séances sont claires et faciles à suivre', options: ['Très claires', 'Claires', 'Parfois confuses', 'Difficiles à suivre'] },
  { key: 'progression', label: 'Je sens une logique dans la progression des semaines', options: ['Oui, très clairement', 'Oui globalement', 'Pas vraiment', 'Non'] },
  { key: 'conseil', label: 'Le message de Lys en début de séance m\'apporte quelque chose', options: ['Oui, ça motive', 'Oui, ça informe', 'Neutre', 'Non'] },
  { key: 'note', label: 'Note globale', options: ['1', '2', '3', '4', '5'] },
]

export default function Feedback() {
  const [form, setForm] = useState({ prenom: '', impression: '', clarte: '', progression: '', conseil: '', manque: '', prefere: '', note: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(key, value) { setForm(f => ({ ...f, [key]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setSent(true)
    } catch {}
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Retour Beta — FlowToForce V1</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.page}>
        <div className={styles.header}>
          <span className={styles.logoFlow}>flow</span>
          <span className={styles.logoLine} />
          <span className={styles.logoForce}>force</span>
        </div>

        {sent ? (
          <div className={styles.thanks}>
            <p className={styles.thanksTitle}>Merci 🤍</p>
            <p className={styles.thanksSub}>Ton retour est précieux. Il aide à améliorer le programme pour tout le monde.</p>
            <p className={styles.thanksSign}>Lys</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.hero}>
              <p className={styles.heroLabel}>Beta V1</p>
              <h1 className={styles.heroTitle}>Ton retour compte</h1>
              <p className={styles.heroSub}>7 questions · 3 minutes</p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Ton prénom <span className={styles.optional}>(optionnel)</span></label>
              <input className={styles.input} type="text" placeholder="Prénom" value={form.prenom} onChange={e => set('prenom', e.target.value)} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Première impression — navigation, design, clarté</label>
              <textarea className={styles.textarea} placeholder="Raconte en quelques mots..." value={form.impression} onChange={e => set('impression', e.target.value)} rows={3} />
            </div>

            {questions.map(q => (
              <div key={q.key} className={styles.field}>
                <label className={styles.label}>{q.label}</label>
                <div className={styles.options}>
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`${styles.option} ${form[q.key] === opt ? styles.optionSelected : ''}`}
                      onClick={() => set(q.key, opt)}
                    >
                      {q.key === 'note' ? opt + ' ★' : opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className={styles.field}>
              <label className={styles.label}>Ce qui t'aurait aidée et qui n'est pas là</label>
              <textarea className={styles.textarea} placeholder="Vidéos, photos, explications, autre chose..." value={form.manque} onChange={e => set('manque', e.target.value)} rows={3} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Ce que tu as préféré</label>
              <textarea className={styles.textarea} placeholder="Ce que tu gardes..." value={form.prefere} onChange={e => set('prefere', e.target.value)} rows={3} />
            </div>

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer mon retour'}
            </button>
          </form>
        )}

        <footer className={styles.footer}>FlowToForce © 2026</footer>
      </div>
    </>
  )
}
