import useSWRImmutable from 'swr/immutable'

import { Link } from '../Primitives'
import providers from '../providers.json'

function SourceList() {
  const [infoUrl] = process.env.REACT_APP_API.split('/api')
  const { data } = useSWRImmutable(infoUrl)

  return (
    <ul>
      {providers
        .filter((source) => data.data_providers.includes(source.source))
        .map((source) => (
          <li key={source.name}>
            <Link href={source.link} blank>
              {source.name}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default SourceList
