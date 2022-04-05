import init from './App/adapter/init'
import { stripEmptyKeys } from './App/adapter/lib/helpers'
import { LABEL_FOR_CONFIG } from './App/adapter/lib/state'
import applyTemplate from './App/adapter/translate'
import filterables from './filterables.json'
import { useQuery, JOIN_CHAR } from './router-utils'

const SEPARATE_CHAR = "'"

export const template = init(filterables)

export const translate = applyTemplate(template)

const parseValue = (raw) => {
  const arr = raw.split(JOIN_CHAR)
  return arr.length === 2 ? arr.map((s) => Number.parseInt(s)) : arr[0]
}

const parsePair = ([k, v]) => {
  if (k === 'q') {
    return { queryParam: LABEL_FOR_CONFIG, [k]: v }
  }

  const queryParam = k
  const [rawValue, operator, unit] = v.split(SEPARATE_CHAR)
  const value = parseValue(rawValue)
  return stripEmptyKeys({ queryParam, value, operator, unit })
}

const parseQuery = (query) => {
  return [...query.entries()].map(parsePair)
}

export function useFilters() {
  // Update state of every filter based on query params
  const query = useQuery()

  return parseQuery(query)
}
