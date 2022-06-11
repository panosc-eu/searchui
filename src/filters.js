import init from './App/adapter/init'
import { stripEmptyKeys } from './App/adapter/lib/helpers'
import applyTemplate from './App/adapter/translate'
import filterables from './filterables.json'
import { useQuery, JOIN_CHAR } from './router-utils'

export const SEPARATE_CHAR = "'"

export const template = init(filterables)

export const translate = applyTemplate(template)

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

export function useFilters() {
  // Update state of every filter based on query params
  const query = useQuery()

  return parseQuery(query)
}
