import OPERATORS from '../operators.json'
import MAP from '../targets.json'

const FALLBACK_GROUP_OPERATOR = 'and'
export const LABEL_FOR_CONFIG = 'c'

const resolveOperator = (id) => OPERATORS[id] || FALLBACK_GROUP_OPERATOR

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

export function createPagination(config) {
  const { page, pageSize } = config

  return pageSize === false
    ? {}
    : {
        limit: pageSize,
        skip: pageSize * (page - 1),
      }
}

export function parse(state, endpoint) {
  const config = state.find(({ id }) => id === LABEL_FOR_CONFIG) || {}
  const { include: included = [] } = config

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

export function merge(template, state) {
  const idsOfInterest = state.reduce(
    (acc, scope) => [...acc, scope.id, scope.group],
    [LABEL_FOR_CONFIG],
  )

  const usefulTemplates = template.filter(({ id }) =>
    idsOfInterest.includes(id),
  )

  const byLabel = groupByLabel([...usefulTemplates, ...state])

  return Object.values(byLabel).map(squash)
}
