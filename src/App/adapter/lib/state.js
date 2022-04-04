import OPERATORS from '../operators.json'
import MAP from '../targets.json'

const FALLBACK_GROUP_OPERATOR = 'and'
export const LABEL_FOR_CONFIG = 'c'

const resolveOperator = (queryParam) =>
  OPERATORS[queryParam] || FALLBACK_GROUP_OPERATOR

const resolvePath = (queryParam, endpoint) => {
  const known = MAP[queryParam]
  const nested = known?.[endpoint]
  const fallback = known?.fallback

  return queryParam === endpoint
    ? null
    : nested
    ? [...nested, queryParam]
    : fallback
    ? [...fallback, queryParam]
    : known
    ? [queryParam]
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
  const config =
    state.find(({ queryParam }) => queryParam === LABEL_FOR_CONFIG) || {}
  const { include: included = [] } = config

  const createGroup = (queryParam) => {
    const {
      value,
      operator = resolveOperator(queryParam),
      target = resolvePath(queryParam, endpoint),
    } = state.find((obj) => obj.queryParam === queryParam) || {}

    return {
      queryParam,
      target,
      operator: value || operator,
      filters: state.filter(({ group }) => group === queryParam),
    }
  }

  const uniqueTargets = state.reduce((acc, scope) => {
    const { group } = scope
    return acc.includes(group) || !group ? acc : [...acc, group]
  }, included)

  const groups = uniqueTargets.map(createGroup)

  const include = groups.filter((obj) => obj.target)
  const where = groups.find((obj) => obj.queryParam === endpoint)

  return [include, where, config]
}

const squash = (list) => list.reduce((acc, scope) => ({ ...acc, ...scope }), {})

const groupByLabel = (list) =>
  list.reduce(
    (acc, scope) => ({
      ...acc,
      [scope.queryParam]: [...(acc[scope.queryParam] || []), scope],
    }),
    {},
  )

export function merge(template, state) {
  const queryParamsOfInterest = state.reduce(
    (acc, scope) => [...acc, scope.queryParam, scope.group],
    [LABEL_FOR_CONFIG],
  )

  const usefulTemplates = template.filter(({ queryParam }) =>
    queryParamsOfInterest.includes(queryParam),
  )

  const byLabel = groupByLabel([...usefulTemplates, ...state])

  return Object.values(byLabel).map(squash)
}
