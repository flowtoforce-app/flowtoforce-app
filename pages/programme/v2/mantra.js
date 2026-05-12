import SpecialPage from '../../../components/SpecialPage'
import { canAccessVersion } from '../../../lib/token'

export default function MantraV2({ content, token }) {
  return (
    <SpecialPage
      title="Mantra"
      content={content}
      token={token}
      version="v2"
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
  const content = fs.readFileSync(path.join(process.cwd(), 'content/v2/mantra.md'), 'utf8')
  return { props: { content, token: token || '' } }
}
