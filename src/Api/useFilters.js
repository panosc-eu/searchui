import { stripEmptyKeys } from '../App/helpers'
import { useQuery, JOIN_CHAR } from '../router-utils'

export const SEPARATE_CHAR = "'"

const numericOperators = ['lt', 'lte', 'gt', 'gte', 'between']

const parseNumericValue = (raw) => {
  const arr = raw.split(JOIN_CHAR).map((i) => Number.parseInt(i))
  return arr.length === 2 ? arr : arr[0]
}

const parsePair = ([k, v]) => {
  const id = k
  const [rawValue, operator, unit] = v.split(SEPARATE_CHAR)
  const value = numericOperators.includes(operator)
    ? parseNumericValue(rawValue)
    : rawValue.includes(JOIN_CHAR)
    ? rawValue.split(JOIN_CHAR)
    : rawValue
  return stripEmptyKeys({ id, value, operator, unit })
}

const parseQuery = (query) => {
  return [...query.entries()].map(parsePair)
}

function useFilters() {
  // Update state of every filter based on query params
  const query = useQuery()

  return parseQuery(query)
}

export default useFilters
