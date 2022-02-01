import
  {mergeState, parseState, buildIncludeKey, buildWhereKey, stripEmptyKeys}
    from "./BuildingBlocks"
const main = (initialState, diffState = []) => {
  const state = mergeState(initialState, diffState);
  const [groups, config] = parseState(state);
  const include = buildIncludeKey(groups)
  const where = buildWhereKey(groups);
  const query = stripEmptyKeys({
    include,
    where,
    ...config,
  });
  return encodeURIComponent(JSON.stringify(query));
};

export default main;
