import { useSearchStore } from '../App/stores';
import { Card, Flex } from '../Primitives';
import Grouped from './grouped';

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
          <Grouped group="Document" filters={sortedRoot} />
          <Grouped group="Technique" filters={techniques} />
          <Grouped group="Parameter" filters={parameters} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Search;
