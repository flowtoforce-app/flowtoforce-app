export function readSeanceFile(version, seanceId) {
  const fs = require('fs')
  const path = require('path')
  const filePath = path.join(process.cwd(), 'content', version, `${seanceId}.md`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf8')
}

export function parseSeance(markdown) {
  const lines = markdown.split('\n')
  const result = {
    titre: '',
    sousTitre: '',
    conseilLys: '',
    muscles: '',
    materiel: '',
    echauffement: [],
    formatSeance: '',
    exercices: [],
    retourCalme: [],
  }

  let section = null
  let currentExo = null
  let currentField = null
  let buffer = []

  function flushBuffer() {
    return buffer.join('\n').trim()
  }

  function saveField() {
    if (!currentExo || !currentField) return
    currentExo[currentField] = flushBuffer()
    buffer = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!result.titre && trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      result.titre = trimmed.replace(/^# /, '')
      continue
    }

    if (!result.sousTitre && trimmed.match(/^\*.*\*$/) && !trimmed.startsWith('**')) {
      result.sousTitre = trimmed.replace(/^\*|\*$/g, '')
      continue
    }

    if (trimmed.startsWith('## ')) {
      if (currentExo && currentField) { saveField(); currentField = null }
      if (currentExo) {
        if (currentExo.execution_text) {
          currentExo.execution = currentExo.execution_text.split('\n').filter(Boolean)
          delete currentExo.execution_text
        }
        if (currentExo.tips_text) {
          currentExo.tips = currentExo.tips_text.split('\n').filter(Boolean)
          delete currentExo.tips_text
        }
        result.exercices.push(currentExo)
        currentExo = null
      }

      const heading = trimmed.replace(/^## /, '').toLowerCase()

      if (heading.includes('conseil de lys')) {
        section = 'conseil'; buffer = []; continue
      }
      if (heading.includes('muscles sollicit')) {
        if (section === 'conseil') result.conseilLys = flushBuffer()
        section = 'muscles'; buffer = []; continue
      }
      if (heading.startsWith('mat')) {
        if (section === 'muscles') result.muscles = flushBuffer()
        section = 'materiel'; buffer = []; continue
      }
      if (heading.includes('chauffement')) {
        if (section === 'materiel') result.materiel = flushBuffer()
        section = 'echauffement'; buffer = []; continue
      }
      if (heading.includes('corps de s') || heading.includes('corps principal')) {
        if (section === 'echauffement') {}
        section = 'corps'; buffer = []; continue
      }
      if (heading.includes('retour au calme')) {
        section = 'retour'; buffer = []; continue
      }
      if (heading.match(/^(exo|exercice)\s*\d/)) {
        const nameMatch = trimmed.match(/·\s*(.+)$/)
        currentExo = {
          nom: nameMatch ? nameMatch[1].trim() : trimmed.replace(/^## (exo|exercice)\s*\d+\s*·?\s*/i, ''),
          objectif: '',
          muscles: '',
          materiel: '',
          execution: [],
          tips: [],
          series: '',
          execution_text: '',
          tips_text: '',
        }
        currentField = null
        section = 'exo'
        continue
      }
      continue
    }

    if (section === 'exo' && currentExo) {
      // Transition vers un nouvel exercice ### (format V2)
      if (trimmed.startsWith('### ') && trimmed.replace(/^### /, '').toLowerCase().match(/^(exo|exercice)\s*\d/)) {
        saveField(); currentField = null
        if (currentExo.execution_text) {
          currentExo.execution = currentExo.execution_text.split('\n').filter(Boolean)
          delete currentExo.execution_text
        }
        if (currentExo.tips_text) {
          currentExo.tips = currentExo.tips_text.split('\n').filter(Boolean)
          delete currentExo.tips_text
        }
        result.exercices.push(currentExo)
        const nameMatch = trimmed.match(/·\s*(.+)$/)
        currentExo = {
          nom: nameMatch ? nameMatch[1].trim() : trimmed.replace(/^### (exo|exercice)\s*\d+\s*·?\s*/i, ''),
          objectif: '', muscles: '', materiel: '',
          execution: [], tips: [], series: '',
          execution_text: '', tips_text: '',
        }
        currentField = null
        section = 'exo'
        continue
      }

      if (trimmed === '**Objectif**') { saveField(); currentField = 'objectif'; buffer = []; continue }
      if (trimmed === '**Muscles engagés**') { saveField(); currentField = 'muscles'; buffer = []; continue }
      if (trimmed === '**Matériel**') { saveField(); currentField = 'materiel'; buffer = []; continue }
      if (trimmed === '**Exécution**') { saveField(); currentField = 'execution_text'; buffer = []; continue }
      if (trimmed === '**Tips placement**' || trimmed === '**Tips**') { saveField(); currentField = 'tips_text'; buffer = []; continue }
      if (trimmed.startsWith('**Séries') || trimmed.startsWith('**Paramètres')) { saveField(); currentField = 'series'; buffer = []; continue }

      if (currentField === 'execution_text' && trimmed.match(/^\d+\./)) {
        buffer.push(trimmed.replace(/^\d+\.\s*/, '')); continue
      }
      if (currentField === 'tips_text' && trimmed.startsWith('- ')) {
        buffer.push(trimmed.replace(/^- /, '')); continue
      }
      if (currentField && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
        buffer.push(trimmed)
      }
      continue
    }

    if (trimmed.startsWith('### ')) {
      const subHeading = trimmed.replace(/^### /, '').toLowerCase()
      if (subHeading.match(/^(exo|exercice)\s*\d/)) {
        if (currentExo && currentField) { saveField(); currentField = null }
        if (currentExo) {
          if (currentExo.execution_text) {
            currentExo.execution = currentExo.execution_text.split('\n').filter(Boolean)
            delete currentExo.execution_text
          }
          if (currentExo.tips_text) {
            currentExo.tips = currentExo.tips_text.split('\n').filter(Boolean)
            delete currentExo.tips_text
          }
          result.exercices.push(currentExo)
          currentExo = null
        }
        const nameMatch = trimmed.match(/·\s*(.+)$/)
        currentExo = {
          nom: nameMatch ? nameMatch[1].trim() : trimmed.replace(/^### (exo|exercice)\s*\d+\s*·?\s*/i, ''),
          objectif: '', muscles: '', materiel: '',
          execution: [], tips: [], series: '',
          execution_text: '', tips_text: '',
        }
        currentField = null
        section = 'exo'
        continue
      }
      if (section === 'corps') { section = 'format'; buffer = []; continue }
      continue
    }

    if (section === 'conseil' && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
      buffer.push(trimmed); continue
    }
    if (section === 'muscles' && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
      buffer.push(trimmed); continue
    }
    if (section === 'materiel' && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
      buffer.push(trimmed); continue
    }
    if (section === 'echauffement' && trimmed.startsWith('- ')) {
      result.echauffement.push(trimmed.replace(/^- /, '')); continue
    }
    if (section === 'format' && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
      buffer.push(trimmed); continue
    }
    if (section === 'retour' && trimmed.startsWith('- ')) {
      result.retourCalme.push(trimmed.replace(/^- /, '')); continue
    }
  }

  if (currentExo) {
    if (currentField) saveField()
    if (currentExo.execution_text) {
      currentExo.execution = currentExo.execution_text.split('\n').filter(Boolean)
      delete currentExo.execution_text
    }
    if (currentExo.tips_text) {
      currentExo.tips = currentExo.tips_text.split('\n').filter(Boolean)
      delete currentExo.tips_text
    }
    result.exercices.push(currentExo)
  }

  if (section === 'conseil') result.conseilLys = flushBuffer()
  if (section === 'muscles') result.muscles = flushBuffer()
  if (section === 'materiel') result.materiel = flushBuffer()
  if (section === 'format') result.formatSeance = flushBuffer()

  result.muscles = result.muscles.replace(/\*\*/g, '').replace(/^→\s*/gm, '').trim()
  result.exercices = result.exercices.map(exo => ({
    ...exo,
    series: exo.series ? exo.series.replace(/→/g, 'puis') : exo.series
  }))

  return result
}
