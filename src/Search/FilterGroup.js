import { Heading, Flex, Box } from '../Primitives';
import Filter from './Filter';

function FilterGroup(props) {
  const { name, filters } = props;

  return (
    <Box as="section">
      <Heading variant="filterGroup">{name}</Heading>
      <Flex column gap={3}>
        {filters.map((obj) => (
          <Filter key={obj.name ?? obj.value} obj={obj} />
        ))}
      </Flex>
    </Box>
  );
}
export default FilterGroup;
