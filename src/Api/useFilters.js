import { stripEmptyKeys } from '../App/helpers'
import { useQuery, JOIN_CHAR } from '../router-utils'

export const SEPARATE_CHAR = "'"

const numericOperators = ['lt', 'lte', 'gt', 'gte', 'between']

export const processNumeric = (raw) => {
  return raw?.includes(JOIN_CHAR)
    ? raw.split(JOIN_CHAR).map((i) => Number.parseInt(i))
    : raw
}

const parsePair = ([k, v]) => {
  const id = k
  const [rawValue, operator, unit] = v.split(SEPARATE_CHAR)
  const value = numericOperators.includes(operator)
    ? processNumeric(rawValue)
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
