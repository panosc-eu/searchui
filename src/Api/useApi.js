import useSWRImmutable from 'swr/immutable'

import translate from './translate'

const useApi = (path, filters = [], config = {}) => {
  const endpoint = path.startsWith('/documents') ? 'documents' : 'datasets'

  const queryObject = translate([...filters, config], endpoint)

  const query = encodeURIComponent(JSON.stringify(queryObject))
  const queryUrl = `${path}?filter=${query}`

  return useSWRImmutable(queryUrl)
}

export default useApi
