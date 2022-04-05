import { addOperator, stripEmptyKeys } from './helpers'

const buildParameter = (item) => {
  const { field, operator, value, unit } = item
  const arr = [
    { name: field },
    { value: operator ? { [operator]: value } : value },
  ]
  return { and: unit ? [...arr, { unit }] : arr }
}

const buildSimple = (item) => {
  const { field, value: val, override, operator } = item
  const value = override || val
  return { [field]: operator ? { [operator]: value } : value }
}

const byTargetLength = (list) => {
  const groups = list.filter((i) => i.target)

  const [deepestTarget = []] = groups
    .map(({ target }) => target)
    .sort((a, b) => a.length - b.length)
    .reverse()

  return deepestTarget.reduce((acc, _, idx, list) => {
    const len = list.length - idx
    const layer = groups.filter(({ target }) => target.length === len)

    return [...acc, layer]
  }, [])
}

const buildGroup = (group, acc) => {
  const { filters, operator, target } = group

  const relation = target[target.length - 1]

  const nestedIn = JSON.stringify([...target].slice(0, -1))

  const isParameters = relation === 'parameters'
  const isParameterException =
    isParameters && operator !== 'or' && filters?.length > 0

  const content =
    filters?.map(isParameters ? buildParameter : buildSimple) || []

  const where = !isParameterException && addOperator(operator, content)

  const include = acc[JSON.stringify(target)]
  const scope = stripEmptyKeys({ include, where })

  const buildRegular = (obj) => [stripEmptyKeys(obj)]
  const buildException = (list) =>
    list.map((obj) => ({ relation, scope: { where: obj } }))

  const parsed = isParameterException
    ? buildException(content)
    : buildRegular({ relation, scope })

  return [nestedIn, parsed]
}

const layerReducer = (acc, layer) => {
  const current = layer.map((g) => JSON.stringify(g.target))

  const missing = Object.keys(acc)
    .filter((k) => !current.includes(k))
    .map((str) => ({ target: JSON.parse(str) }))

  const groups = [...missing, ...layer].map((group) => buildGroup(group, acc))

  return groups.reduce(
    (acc, scope) => ({
      ...acc,
      [scope[0]]: [...(acc[scope[0]] || []), ...scope[1]],
    }),
    {},
  )
}

export const createInclude = (groups) =>
  byTargetLength(groups).reduce(layerReducer, {})['[]']

export const createWhere = (group = {}) => {
  const { operator, filters } = group
  const res = filters?.map(buildSimple)
  return addOperator(operator, res)
}
