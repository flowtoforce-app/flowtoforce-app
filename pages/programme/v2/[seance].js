import SeancePage from '../../../components/SeancePage'
import { readSeanceFile, parseSeance } from '../../../lib/parseSeance'
import { chapitresV2 } from '../../../lib/chapters'
import { canAccessVersion } from '../../../lib/token'

export default function SeanceV2(props) {
  return <SeancePage {...props} version="v2" />
}

export async function getServerSideProps({ params, query }) {
  const { token } = query
  if (!canAccessVersion(token, 'v2')) {
    return { redirect: { destination: '/', permanent: false } }
  }
  const { seance: seanceId } = params
  const raw = readSeanceFile('v2', seanceId)
  if (!raw) return { notFound: true }
  const seance = parseSeance(raw)
  const chapitre = chapitresV2.find(ch => Array.isArray(ch.seances) && ch.seances.includes(seanceId)) || null
  return { props: { seance, seanceId, chapitre, token: token || '' } }
}
