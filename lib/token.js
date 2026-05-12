export function generateToken(programId) {
  const crypto = require('crypto')
  const secret = process.env.PROGRAMME_SECRET || 'dev-secret-change-in-prod'
  return crypto.createHmac('sha256', secret).update(programId).digest('hex').slice(0, 20)
}

export function canAccessVersion(token, version) {
  if (!token) return false
  const v1Token = generateToken('v1')
  const v2Token = generateToken('v2')
  const bundleToken = generateToken('bundle')
  if (token === bundleToken) return true
  if (version === 'v1') return token === v1Token
  if (version === 'v2') return token === v2Token
  return false
}
