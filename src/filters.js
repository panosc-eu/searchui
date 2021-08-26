import { init } from 'search-api-adapter';

import filterables from './filterables.json';
import { useQuery, JOIN_CHAR } from './router-utils';

export const initialFilters = init(filterables);

export function useFilters() {
  // Get fresh filters object
  const filters = init(filterables);

  // Update state of every filter based on query params
  const query = useQuery();

  mutateFilters(filters.root?.filters, query);
  mutateFilters(filters.parameters?.filters, query);

  return filters;
}

function mutateFilters(filters, query) {
  if (!filters) {
    return;
  }

  filters.forEach((obj) => {
    if (obj.list || obj.operator === 'between') {
      const rawValue = query.get(obj.name);
      obj.value = rawValue ? rawValue.split(JOIN_CHAR) : [];
      obj.isActive = obj.value.length > 0;
    } else {
      obj.value = query.get(obj.name) || '';
      obj.isActive = !!obj.value;
    }
  });
}
