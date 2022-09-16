import useSWRImmutable from 'swr/immutable'

import useFilters from '../Api/useFilters'
import providers from '../providers.json'
import translate from './translate'

const useProvider = () => {
  const filters = useFilters()
  const { value } = filters.find(({ id }) => id === 'facility') || {}
  const { url } = providers.find((obj) => obj.abbr === value) || {}
  return url || process.env.REACT_APP_API
}

const useApi = (path, filters = [], config = {}) => {
  const provider = useProvider()
  const endpoint = path.startsWith('/documents') ? 'documents' : 'datasets'

  const queryObject = translate([...filters, config], endpoint)

  const query = encodeURIComponent(JSON.stringify(queryObject))
  const queryUrl = `${provider}${path}?filter=${query}`

  return useSWRImmutable(queryUrl)
}

export default useApi

export const useQuery = (path, filters = [], config = {}) => {
  const endpoint = path.startsWith('/documents') ? 'documents' : 'datasets'

  return translate([...filters, config], endpoint)
}
