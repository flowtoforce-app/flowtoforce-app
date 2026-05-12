import SpecialPage from '../../../components/SpecialPage'
import { canAccessVersion } from '../../../lib/token'

export default function MantraV1({ content, token }) {
  return (
    <SpecialPage
      title="Mantra"
      content={content}
      token={token}
      version="v1"
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
  const content = fs.readFileSync(path.join(process.cwd(), 'content/v1/mantra.md'), 'utf8')
  return { props: { content, token: token || '' } }
}
