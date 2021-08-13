import { useSearchStore } from '../App/stores';
import { Card, Flex } from '../Primitives';
import FilterGroup from './FilterGroup';

const Search = () => {
  const filters = useSearchStore();
  const sortRootAs = ['title', 'type', 'keywords'];
  const sortedRoot = [...filters?.root?.filters].sort(
    (a, b) => sortRootAs.indexOf(a?.name) - sortRootAs.indexOf(b?.name)
  );
  const techniques = filters?.techniques?.filters;
  const parameters = filters?.parameters?.filters;

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card p={2}>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Document" filters={sortedRoot} />
          <FilterGroup name="Technique" filters={techniques} />
          <FilterGroup name="Parameter" filters={parameters} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Search;
