import SpecialPage from '../../../components/SpecialPage'
import { canAccessVersion } from '../../../lib/token'

export default function FinalV2({ content, token }) {
  return (
    <SpecialPage
      title="Message de Lys"
      content={content}
      token={token}
      version="v2"
      type="final"
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
  const content = fs.readFileSync(path.join(process.cwd(), 'content/v2/final.md'), 'utf8')
  return { props: { content, token: token || '' } }
}
