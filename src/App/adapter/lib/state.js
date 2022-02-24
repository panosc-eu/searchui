import OPERATORS from '../operators.json'
import MAP from '../targets.json'

const FALLBACK_GROUP_OPERATOR = 'and'

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

export function parseState(state, config) {
  const { endpoint, include: included } = config

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

  return [include, where]
}
