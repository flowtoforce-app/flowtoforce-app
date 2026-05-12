import SeancePage from '../../../components/SeancePage'
import { readSeanceFile, parseSeance } from '../../../lib/parseSeance'
import { chapitresV1 } from '../../../lib/chapters'
import { canAccessVersion } from '../../../lib/token'

export default function SeanceV1(props) {
  return <SeancePage {...props} version="v1" />
}

export async function getServerSideProps({ params, query }) {
  const { token } = query
  if (!canAccessVersion(token, 'v1')) {
    return { redirect: { destination: '/', permanent: false } }
  }
  const { seance: seanceId } = params
  const raw = readSeanceFile('v1', seanceId)
  if (!raw) return { notFound: true }
  const seance = parseSeance(raw)
  const chapitre = chapitresV1.find(ch => Array.isArray(ch.seances) && ch.seances.includes(seanceId)) || null
  return { props: { seance, seanceId, chapitre, token: token || '' } }
}
