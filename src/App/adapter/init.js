const CHAR_TO_STACK_ON_LABEL = '_'

const addChar = (str) => [...str, CHAR_TO_STACK_ON_LABEL].join('')

const uniqueLabelReducer = (acc, scope) => {
  return acc.some(({ label }) => label === scope.label)
    ? [{ ...scope, label: addChar(scope.label) }].reduce(
        uniqueLabelReducer,
        acc,
      )
    : [...acc, scope]
}

const makeLabelCandidates = (obj) => {
  const { name, label: suggestedLabel } = obj
  const label = encodeURIComponent(suggestedLabel || name)
  return { ...obj, label }
}

function init(groupedFilterables) {
  const filterablesArr = Object.entries(groupedFilterables)
    .flatMap(([group, arr]) => arr.map((f) => ({ ...f, group }))) // flatten filterables, while keeping a reference to their groups
    .map(makeLabelCandidates) // generate missing labels
    .reduce(uniqueLabelReducer, []) // make sure labels are unique
    // add specific operators
    .map((obj) =>
      obj.range
        ? { ...obj, operator: 'between' }
        : ['title', 'sample_chemical_formula'].includes(obj.name)
        ? { ...obj, operator: 'like' }
        : obj,
    )

  // Store filterables by label so as to find them easily in `translate`
  return Object.fromEntries(filterablesArr.map((f) => [f.label, f]))
}

export default init
