import { useQuery, JOIN_CHAR } from './router-utils';
import newFilterables from './App/adapter/filterables.json';

const base = newFilterables.map((obj) =>
  obj.range
    ? { ...obj, operator: 'between', value: obj.range }
    : obj.type === 'filter'
    ? { ...obj, value: '' }
    : obj
);

export const initialFilters = base;

const zip = (pair) => {
  const [k, v] = pair;
  const base = { label: k[0], isActive: true };
  const processedValue = v.length === 1 ? v[0] : v;

  return k.length === 2
    ? { ...base, [k[1]]: processedValue }
    : { ...base, value: processedValue };
};

const splitPair = (pair) => pair.map((str) => str.split(JOIN_CHAR));
const parseEntryPair = (pair) => zip(splitPair(pair));
const parseQuery = (query) => {
  return [...query.entries()].map(parseEntryPair);
};

export function useFilters() {
  // Update state of every filter based on query params
  const query = useQuery();

  return parseQuery(query);
}
