import OPERATORS from '../operators.json'
import MAP from '../targets.json'

const FALLBACK_GROUP_OPERATOR = 'and'
export const LABEL_FOR_CONFIG = 'c'

const resolveOperator = (label) => OPERATORS[label] || FALLBACK_GROUP_OPERATOR

const resolvePath = (label, endpoint) => {
  const known = MAP[label]
  const nested = known?.[endpoint]
  const fallback = known?.fallback

  return label === endpoint
    ? null
    : nested
    ? [...nested, label]
    : fallback
    ? [...fallback, label]
    : known
    ? [label]
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
  const config = state.find(({ label }) => label === LABEL_FOR_CONFIG) || {}
  const { include: included = [] } = config

  const createGroup = (label) => {
    const {
      value,
      operator = resolveOperator(label),
      target = resolvePath(label, endpoint),
    } = state.find((obj) => obj.label === label) || {}

    return {
      label,
      target,
      operator: value || operator,
      filters: state.filter(({ group }) => group === label),
    }
  }

  const uniqueTargets = state.reduce((acc, scope) => {
    const { group } = scope
    return acc.includes(group) || !group ? acc : [...acc, group]
  }, included)

  const groups = uniqueTargets.map(createGroup)

  const include = groups.filter((obj) => obj.target)
  const where = groups.find((obj) => obj.label === endpoint)

  return [include, where, config]
}

const squash = (list) => list.reduce((acc, scope) => ({ ...acc, ...scope }), {})

const groupByLabel = (list) =>
  list.reduce(
    (acc, scope) => ({
      ...acc,
      [scope.label]: [...(acc[scope.label] || []), scope],
    }),
    {},
  )

export function merge(template, state) {
  const labelsOfInterest = state.reduce(
    (acc, scope) => [...acc, scope.label, scope.group],
    [LABEL_FOR_CONFIG],
  )

  const usefulTemplates = template.filter(({ label }) =>
    labelsOfInterest.includes(label),
  )

  const byLabel = groupByLabel([...usefulTemplates, ...state])

  return Object.values(byLabel).map(squash)
}
