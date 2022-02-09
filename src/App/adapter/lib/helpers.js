const isEmpty = (obj) => JSON.stringify(obj) === '{}';
export const stripEmptyKeys = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v && !isEmpty(v)));

export const addOperator = (operator, list) =>
  list.length > 1 ? { [operator]: list } : list.length > 0 ? list[0] : {};
