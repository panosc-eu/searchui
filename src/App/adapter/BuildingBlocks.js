export const parseState = (state) => {
  const filters = state.filter((item) => item.type === 'filter');
  const groups = state.filter((item) => item.type === 'filterGroup');
  const config = state.find((item) => item.type === 'config');
  const { type: _, label: __, name: ___, value: ____, include, ...queryBase } = enhancePagination(config);
  const groupedFilters = groups
    .map((group) => ({
      ...group,
      filters: filters.filter((item) => item.group === group.label),
    }))
    .filter((g) => g.filters.length > 0);
  const mandatory = groupedFilters
    .reduce(
      (acc, scope) => acc.filter((i) => i !== JSON.stringify(scope.target)),
      include?.map(JSON.stringify) || []
    )
    .map((trgt) => ({ target: JSON.parse(trgt) }));
  return [[...groupedFilters, ...mandatory], queryBase];
};

const enhancePagination = (config) => {
  const { skip, limit, page, pageSize } = config;
  const enhanced =
    pageSize && page
      ? {
          ...config,
          limit: pageSize,
          skip: skip || pageSize * (page - 1),
        }
      : config;
  const { page: _, pageSize: __, ...rest } = enhanced;
  return rest;
};
const squash = list => {
  const pairs = list.flatMap(obj => Object.entries(obj))
  return pairs.reduce((acc, scope) => ({...acc, [scope[0]]: scope[1]}), {})
}

const groupByLabel = list => list.reduce((acc, scope) => ({
  ...acc,
  [scope.label]: [...(acc[scope.label] || []), scope]
}), {})


export const mergeState = (inits, diffs) => {
  const filteredInits = inits.filter((obj) =>
    obj.type === 'config'
    || obj.type === 'filterGroup'
    || diffs.map(o => o.label).includes(obj.label)
  )
  const byLabel = groupByLabel([...filteredInits, ...diffs])
  return Object.entries(byLabel).flatMap(([, a]) => squash(a))
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
export const stripEmptyKeys = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v && !isEmpty(v)));

const isEmpty = (obj) => JSON.stringify(obj) === '{}';

const buildGroup = (group, acc) => {
  const { filters, operator, target } = group;
  const relation = target.at(-1);

  const nestedPath = JSON.stringify([...target].slice(0, -1));
  const nestedIn = nestedPath === '[]' ? 'include' : nestedPath;

  const isParameters = relation === 'parameters';
  const isParameterException =
    isParameters && operator !== 'or' && filters?.length > 0;

  const content =
    filters?.map(isParameters ? buildParameter : buildSimple) || [];

  const where = (content.length > 0 || isParameterException) && {
    [operator || 'and']: content,
  };
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
  const current = new Set(layer.map((g) => JSON.stringify(g.target)))
  const missing = Object.keys(acc)
    .filter((k) => !current.has(k))
    .map((str) => ({ target: JSON.parse(str) }));
  const groups = [...missing, ...layer].map((group) =>
    buildGroup(group, acc)
  );
  return groups.reduce(
    (acc, scope) => ({
      ...acc,
      [scope[0]]: [...(acc[scope[0]] || []), ...scope[1]],
    }),
    {}
  );
};

export const buildIncludeKey = (groups) =>
  byTargetLength(groups).reduce(layerReducer, {}).include;

export const buildWhereKey = (groups) => {
  const { operator, filters } = groups.find((g) => !g.target) || {};
  if (filters?.length > 0) {
    return {
      [operator || 'and']: filters.map(buildSimple),
    };
  }
  return {};
};
