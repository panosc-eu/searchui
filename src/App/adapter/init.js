const CHAR_TO_STACK_ON_LABEL = '_'

const addChar = (str) => [...str, CHAR_TO_STACK_ON_LABEL].join('')

const uniqueLabelReducer = (acc, scope) => {
  return acc.some(({ id }) => id === scope.id)
    ? [{ ...scope, id: addChar(scope.id) }].reduce(uniqueLabelReducer, acc)
    : [...acc, scope]
}

const makeLabelCandidates = (obj) => {
  const { field, id: suggestedLabel } = obj
  const id = encodeURIComponent(suggestedLabel || field)
  return { ...obj, id }
}

function init(filterables) {
  const list = Object.entries(filterables).flatMap(([k, v]) =>
    v.flatMap((i) => ({ ...i, group: k })),
  )
  return list.map(makeLabelCandidates).reduce(uniqueLabelReducer, [])
}

export default init
