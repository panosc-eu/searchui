import OPERATORS from '../operators.json';
import MAP from '../targets.json';

export const FALLBACK_GROUP_OPERATOR = 'and';
export const LABEL_FOR_CONFIG = 'c';

const resolveOperator = (label) => OPERATORS[label] || FALLBACK_GROUP_OPERATOR;

const resolvePath = (label, endpoint) => {
  const known = MAP[label];
  const nested = known?.[endpoint];
  const fallback = known?.fallback;

  return label === endpoint
    ? null
    : nested
    ? [...nested, label]
    : fallback
    ? [...fallback, label]
    : known
    ? [label]
    : null;
};

const createGroupFor = (endpoint) => (obj) => {
  const {
    label,
    value,
    operator = value || resolveOperator(label),
    target = resolvePath(label, endpoint),
  } = obj;
  return { label, target, operator };
};

const enhancePagination = (config) => {
  const { page, pageSize } = config;
  const obj =
    pageSize && page
      ? {
          ...config,
          limit: pageSize,
          skip: pageSize * (page - 1),
        }
      : config;
  const { page: _, pageSize: __, ...res } = obj;
  return res;
};

export function parseState(state, endpoint) {
  const createGroup = createGroupFor(endpoint);
  const config = state.find(({ label }) => label === LABEL_FOR_CONFIG);
  const {
    label: _,
    name: __,
    value: ___,
    include: included,
    ...base
  } = enhancePagination(config);

  const targets = state.reduce((acc, scope) => {
    const { group } = scope;
    if (acc.includes(group) || !group) {
      return acc;
    }
    return [...acc, group];
  }, included);

  const groups = targets
    .map((label) =>
      createGroup(state.find((obj) => obj.label === label) || { label })
    )
    .map((obj) => ({
      ...obj,
      filters: state.filter(({ group }) => group === obj.label),
    }));

  const include = groups.filter((group) => group.target);
  const where = groups.find((group) => group.label === endpoint);

  return [include, where, base];
}

const squash = (list) => {
  const pairs = list.flatMap((obj) => Object.entries(obj));
  return pairs.reduce((acc, scope) => ({ ...acc, [scope[0]]: scope[1] }), {});
};

const groupByLabel = (list) =>
  list.reduce(
    (acc, scope) => ({
      ...acc,
      [scope.label]: [...(acc[scope.label] || []), scope],
    }),
    {}
  );

export function mergeState(inits, diffs) {
  const filteredInits = inits.filter(
    (obj) =>
      obj.label === LABEL_FOR_CONFIG ||
      diffs.map((o) => o.label).includes(obj.label) ||
      diffs.map((o) => o.group).includes(obj.label)
  );
  const byLabel = groupByLabel([...filteredInits, ...diffs]);
  return Object.entries(byLabel).flatMap(([, a]) => squash(a));
}
