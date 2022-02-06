import {
  mergeState,
  parseState,
  buildIncludeKey,
  buildWhereKey,
  stripEmptyKeys,
  init,
} from './BuildingBlocks';

import test from './simple-input.json'

console.log(init(test))

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
