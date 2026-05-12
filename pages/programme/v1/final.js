import SpecialPage from '../../../components/SpecialPage'
import { canAccessVersion } from '../../../lib/token'

export default function FinalV1({ content, token }) {
  return (
    <SpecialPage
      title="Message de Lys"
      content={content}
      token={token}
      version="v1"
      type="final"
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
  const content = fs.readFileSync(path.join(process.cwd(), 'content/v1/final.md'), 'utf8')
  return { props: { content, token: token || '' } }
}
