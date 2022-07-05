import useSWRImmutable from 'swr/immutable'

import { useSearchStore } from '../App/stores'
import translate from './translate'

const useApi = (path, filters = [], config = {}) => {
  const endpoint = path.startsWith('/documents') ? 'documents' : 'datasets'

  const queryObject = translate([...filters, config], endpoint)

  const query = encodeURIComponent(JSON.stringify(queryObject))
  const queryUrl = `${path}?filter=${query}`

  const setCount = useSearchStore((state) => state.setCount)
  setCount()

  return useSWRImmutable(queryUrl)
}

export default useApi

export const useQuery = (path, filters = [], config = {}) => {
  const endpoint = path.startsWith('/documents') ? 'documents' : 'datasets'

  return translate([...filters, config], endpoint)
}
