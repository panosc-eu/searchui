const CHAR_TO_STACK_ON_LABEL = '_';

const addChar = (str) => [...str, CHAR_TO_STACK_ON_LABEL].join('');

const uniqueLabelReducer = (acc, scope) => {
  return acc.some(({ label }) => label === scope.label)
    ? [{ ...scope, label: addChar(scope.label) }].reduce(
        uniqueLabelReducer,
        acc
      )
    : [...acc, scope];
};

const makeLabelCandidates = (obj) => {
  const { name, label: suggestedLabel, group } = obj;
  const label = encodeURIComponent(
    [...group.slice(0, 2), '-', ...(suggestedLabel || name)].join('')
  );
  return { ...obj, label };
};

function init(filterables) {
  const list = Object.entries(filterables).flatMap(([k, v]) =>
    v.flatMap((i) => ({ ...i, group: k }))
  );
  return list.map(makeLabelCandidates).reduce(uniqueLabelReducer, []);
}

export default init;
