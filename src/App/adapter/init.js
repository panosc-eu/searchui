const CHAR_TO_STACK_ON_LABEL = '_'

const addChar = (str) => [...str, CHAR_TO_STACK_ON_LABEL].join('')

const uniqueLabelReducer = (acc, scope) => {
  return acc.some(({ queryParam }) => queryParam === scope.queryParam)
    ? [{ ...scope, queryParam: addChar(scope.queryParam) }].reduce(
        uniqueLabelReducer,
        acc,
      )
    : [...acc, scope]
}

const makeLabelCandidates = (obj) => {
  const { id, queryParam: suggestedLabel } = obj
  const queryParam = encodeURIComponent(suggestedLabel || id)
  return { ...obj, queryParam }
}

function init(filterables) {
  const list = Object.entries(filterables).flatMap(([k, v]) =>
    v.flatMap((i) => ({ ...i, group: k })),
  )
  return list.map(makeLabelCandidates).reduce(uniqueLabelReducer, [])
}

export default init
