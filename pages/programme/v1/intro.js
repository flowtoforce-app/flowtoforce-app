import SpecialPage from '../../../components/SpecialPage'
import { canAccessVersion } from '../../../lib/token'

export default function IntroV1({ content, token }) {
  return (
    <SpecialPage
      title="Présentation"
      content={content}
      token={token}
      version="v1"
      nextHref={`/programme/v1/1a?token=${token}`}
      nextLabel="Commencer — Séance 1A"
    />
  )
}

export async function getServerSideProps({ query }) {
  const { token } = query
  if (!canAccessVersion(token, 'v1')) {
    return { redirect: { destination: '/', permanent: false } }
  }
  const fs = require('fs')
  const path = require('path')
  const content = fs.readFileSync(path.join(process.cwd(), 'content/v1/intro.md'), 'utf8')
  return { props: { content, token: token || '' } }
}
