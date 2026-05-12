import SpecialPage from '../../../components/SpecialPage'
import { canAccessVersion } from '../../../lib/token'

export default function IntroV2({ content, token }) {
  return (
    <SpecialPage
      title="Présentation"
      content={content}
      token={token}
      version="v2"
      nextHref={`/programme/v2/1a?token=${token}`}
      nextLabel="Commencer — Séance 1A"
    />
  )
}

export async function getServerSideProps({ query }) {
  const { token } = query
  if (!canAccessVersion(token, 'v2')) {
    return { redirect: { destination: '/', permanent: false } }
  }
  const fs = require('fs')
  const path = require('path')
  const content = fs.readFileSync(path.join(process.cwd(), 'content/v2/intro.md'), 'utf8')
  return { props: { content, token: token || '' } }
}
