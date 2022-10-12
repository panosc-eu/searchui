import useSWRImmutable from 'swr/immutable'

import providers from '../providers.json'
import translate from './translate'

const getProvider = (filters) => {
  const { value } = filters.find(({ id }) => id === 'facility') || {}
  const { url } = providers.find((obj) => obj.abbr === value) || {}
  return url || process.env.REACT_APP_API
}

const useApi = (path, filters = [], config = {}) => {
  const provider = getProvider(filters)
  const endpoint = path.split('/')[1].toLowerCase()

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
