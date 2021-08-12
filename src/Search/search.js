import { useSearchStore } from '../App/stores';
import Column from '../Layout/column';
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
    <Column>
      <Card p={2}>
        <Flex
          sx={{
            gap: [3, 2, 3, 4],
            flexDirection: 'column',
          }}
        >
          <Grouped group="Document" filters={sortedRoot} />
          <Grouped group="Technique" filters={techniques} />
          <Grouped group="Parameter" filters={parameters} />
        </Flex>
      </Card>
    </Column>
  );
};

export default Search;
