import init from './App/adapter/init'
import { stripEmptyKeys } from './App/adapter/lib/helpers'
import applyTemplate from './App/adapter/translate'
import filterables from './filterables.json'
import { useQuery, JOIN_CHAR } from './router-utils'

const SEPARATE_CHAR = '~'

const base = init(filterables)

const assertReasonableDefaults = (list) =>
  list.map((obj) => {
    const { range, options, group } = obj

    if (range) {
      return { ...obj, operator: 'between' }
    }

    if (options || group === 'techniques') {
      return obj
    }

    return { ...obj, operator: 'ilike' }
  })

export const template = assertReasonableDefaults(base)

export const translate = applyTemplate(template)

const parseValue = (raw) => {
  const arr = raw.split(JOIN_CHAR)
  return arr.length === 2 ? arr.map((s) => Number.parseInt(s)) : arr[0]
}

const parsePair = ([k, v]) => {
  const label = k
  const [rawValue, operator, unit] = v.split(SEPARATE_CHAR)
  const value = parseValue(rawValue)
  return stripEmptyKeys({ label, value, operator, unit })
}

const parseQuery = (query) => {
  return [...query.entries()].map(parsePair)
}

export function useFilters() {
  // Update state of every filter based on query params
  const query = useQuery()

  return parseQuery(query)
}
