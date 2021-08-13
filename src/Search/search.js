import { useSearchStore } from '../App/stores';
import { Card, Flex } from '../Primitives';
import FilterGroup from './FilterGroup';

const ORDER = ['title', 'type', 'keywords'];

const Search = () => {
  const filters = useSearchStore();

  const rootFilters = [...filters?.root?.filters].sort(
    (a, b) => ORDER.indexOf(a?.name) - ORDER.indexOf(b?.name)
  );
  const techniques = filters?.techniques?.filters;
  const parameters = filters?.parameters?.filters;

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card p={[3, 3]}>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Search" filters={rootFilters} />
          <FilterGroup name="Technique" filters={techniques} />
          <FilterGroup name="Parameter" filters={parameters} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Search;
