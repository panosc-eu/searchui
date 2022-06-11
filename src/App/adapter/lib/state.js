import OPERATORS from '../operators.json'
import MAP from '../targets.json'

const FALLBACK_GROUP_OPERATOR = 'and'
export const LABEL_FOR_CONFIG = 'c'

const resolveOperator = (id) => OPERATORS[id] || FALLBACK_GROUP_OPERATOR

const RESERVED_IDS = ['include', 'skip', 'limit', 'order', 'fields']

const resolvePath = (id, endpoint) => {
  const known = MAP[id]
  const nested = known?.[endpoint]
  const fallback = known?.fallback

  return id === endpoint
    ? null
    : nested
    ? [...nested, id]
    : fallback
    ? [...fallback, id]
    : known
    ? [id]
    : null
}

export function parse(state, endpoint) {
  const preConfig = state.find(({ id }) => id === LABEL_FOR_CONFIG) || {}
  const { include: included = [], fields: preFields = [] } = preConfig
  const fields = Object.fromEntries(preFields.map((s) => [s, true]))
  const config = { ...preConfig, fields }

  const createGroup = (id) => {
    const {
      value,
      operator = resolveOperator(id),
      target = resolvePath(id, endpoint),
    } = state.find((obj) => obj.id === id) || {}

    return {
      id,
      target,
      operator: value || operator,
      filters: state.filter(({ group }) => group === id),
    }
  }

  const uniqueTargets = state.reduce((acc, scope) => {
    const { group } = scope
    return acc.includes(group) || !group ? acc : [...acc, group]
  }, included)

  const groups = uniqueTargets.map(createGroup)

  const include = groups.filter((obj) => obj.target)
  const where = groups.find((obj) => obj.id === endpoint)

  return [include, where, config]
}

const squash = (list) => list.reduce((acc, scope) => ({ ...acc, ...scope }), {})

const groupByLabel = (list) =>
  list.reduce(
    (acc, scope) => ({
      ...acc,
      [scope.id]: [...(acc[scope.id] || []), scope],
    }),
    {},
  )

const parseShortConfig = (filter) =>
  RESERVED_IDS.includes(filter.id)
    ? { id: LABEL_FOR_CONFIG, [filter.id]: filter.value }
    : filter

export function merge(template, state) {
  const idsOfInterest = state.reduce(
    (acc, scope) => [...acc, scope.id, scope.group],
    [],
  )

  const usefulTemplates = template.filter(({ id }) =>
    idsOfInterest.includes(id),
  )

  const byLabel = groupByLabel(
    [...usefulTemplates, ...state].map(parseShortConfig),
  )

  return Object.values(byLabel).map(squash)
}
