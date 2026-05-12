import fs from 'fs'
import path from 'path'
import { canAccessVersion } from '../../../lib/token'

const versionToFile = {
  v1: 'flowtoforce-v1.pdf',
  v2: 'flowtoforce-v2.pdf',
}

export default function handler(req, res) {
  const { version, token } = req.query

  if (!versionToFile[version]) {
    return res.status(404).end()
  }

  if (!canAccessVersion(token, version)) {
    return res.status(403).json({ error: 'Accès non autorisé.' })
  }

  const filePath = path.join(process.cwd(), 'private', versionToFile[version])

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Fichier non disponible.' })
  }

  const stat = fs.statSync(filePath)
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${versionToFile[version]}"`)
  res.setHeader('Content-Length', stat.size)

  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
}
