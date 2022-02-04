import {
  mergeState,
  parseState,
  buildIncludeKey,
  buildWhereKey,
  stripEmptyKeys,
} from './BuildingBlocks';

const main = (initialState = [], diffState = []) => {
  const state = mergeState(initialState, diffState);
  const [toInclude, toWhere, base] = parseState(state);
  const include = buildIncludeKey(toInclude);
  const where = buildWhereKey(toWhere);
  const query = stripEmptyKeys({
    include,
    where,
    ...base,
  });
  return encodeURIComponent(JSON.stringify(query));
};

export default main;
