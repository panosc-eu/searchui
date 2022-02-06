import MAP from './nesting-map.json';
import OPERATORS from './operators.json';
import {customAlphabet as nanoid} from 'nanoid'

export const init = (filterables) =>
  Object.entries(filterables).flatMap(([k, v]) =>
    v.flatMap((i) => ({ ...i, label: nanoid(i.name, i.name.length)(), group: k }))
  );

const resolveOperator = (label) => OPERATORS[label] || 'and';

const resolvePath = (label, endpoint = '') => {
  const exists = MAP[label];
  return exists?.endpoint
    ? [...exists.endpoint, label]
    : exists?.def
    ? [...exists.def, label]
    : exists
    ? [label]
    : undefined;
};

const addOperator = (operator, list) =>
  list.length > 1 ? { [operator]: list } : list.length > 0 ? list[0] : {};

export const parseState = (state, endpoint = 'documents') => {
  const createGroup = (obj) => {
    const {
      label,
      value,
      operator = value || resolveOperator(label),
      target = resolvePath(label, endpoint),
    } = obj;
    return { label, target, operator };
  };

  const currentTargets = state
    .filter((obj) => obj.group)
    .map((obj) => obj.group);

  const targets = currentTargets.reduce(
    (acc, scope) => (acc.includes(scope) ? acc : [...acc, scope]),
    ['root']
  );

  const reserved = ['config', ...targets];

  const groups = targets.map((label) =>
    createGroup(state.find((obj) => obj.label === label) || { label })
  );

  const filters = state
    .filter((obj) => !reserved.includes(obj.label) && !obj.target)
    .map((filter) => (filter.group ? filter : { ...filter, group: 'root' }));

  const grouped = groups
    .map((group) => ({
      ...group,
      filters: filters.filter((item) => item.group === group.label),
    }))
    .filter((g) => g.filters.length > 0);

  const config = state.find(({ label }) => label === 'config');
  const {
    label: _,
    name: __,
    value: ___,
    include: mandatoryIncludes,
    ...base
  } = enhancePagination(config);

  const includes = grouped
    .reduce(
      (acc, scope) =>
        acc.filter(
          (i) =>
            ![JSON.stringify(scope.target), scope.label].includes(
              JSON.stringify(i)
            )
        ),
      mandatoryIncludes?.map((incl) =>
        Array.isArray(incl) ? incl : resolvePath(incl, endpoint)
      ) || []
    )
    .map((target) => ({ target }));

  const all = [...grouped, ...includes];

  const include = all.filter((group) => group.target);
  const where = all.find((group) => group.label === 'root');

  return [include, where, base];
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

export const mergeState = (inits, diffs) => {
  const filteredInits = inits.filter(
    (obj) =>
      obj.label === 'config' || diffs.map((o) => o.label).includes(obj.label)
  );
  const byLabel = groupByLabel([...filteredInits, ...diffs]);
  return Object.entries(byLabel).flatMap(([, a]) => squash(a));
};

const buildParameter = (item) => {
  const { name, operator, value, unit } = item;
  const arr = [{ name }, { value: operator ? { [operator]: value } : value }];
  return { and: unit ? [...arr, { unit }] : arr };
};

const buildSimple = (item) => {
  const { name, value, operator } = item;
  return { [name || 'name']: operator ? { [operator]: value } : value };
};

const byTargetLength = (arr) => {
  const groups = arr.filter((i) => i.target);

  const [deepestTarget = []] = groups
    .map((g) => g.target)
    .sort((a, b) => a.length - b.length)
    .reverse();

  return deepestTarget.reduce((acc, _, idx, list) => {
    const len = list.length - idx;
    const layer = groups.filter(({ target }) => target.length === len);

    return [...acc, layer];
  }, []);
};

const isEmpty = (obj) => JSON.stringify(obj) === '{}';

export const stripEmptyKeys = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v && !isEmpty(v)));

const buildGroup = (group, acc) => {
  const { filters, operator, target } = group;

  const relation = target.at(-1);

  const nestedIn = JSON.stringify([...target].slice(0, -1));

  const isParameters = relation === 'parameters';
  const isParameterException =
    isParameters && operator !== 'or' && filters?.length > 0;

  const content =
    filters?.map(isParameters ? buildParameter : buildSimple) || [];

  const where = !isParameterException && addOperator(operator, content);

  const include = acc[JSON.stringify(target)];
  const scope = stripEmptyKeys({ include, where });

  const buildRegular = (obj) => [stripEmptyKeys(obj)];
  const buildException = (list) =>
    list.map((obj) => ({ relation, scope: { where: obj } }));

  const parsed = isParameterException
    ? buildException(content)
    : buildRegular({ relation, scope });

  return [nestedIn, parsed];
};

const layerReducer = (acc, layer) => {
  const current = layer.map((g) => JSON.stringify(g.target));

  const missing = Object.keys(acc)
    .filter((k) => !current.includes(k))
    .map((str) => ({ target: JSON.parse(str) }));

  const groups = [...missing, ...layer].map((group) => buildGroup(group, acc));

  return groups.reduce(
    (acc, scope) => ({
      ...acc,
      [scope[0]]: [...(acc[scope[0]] || []), ...scope[1]],
    }),
    {}
  );
};

export const buildIncludeKey = (groups) =>
  byTargetLength(groups).reduce(layerReducer, {})['[]'];

export const buildWhereKey = (group = {}) => {
  const { operator, filters = [] } = group;
  const res = filters.map(buildSimple);
  return addOperator(operator, res);
};
