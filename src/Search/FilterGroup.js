import { Heading, Flex, Box } from '../Primitives';
import Filter from './Filter';

function FilterGroup(props) {
  const { name, filters } = props;

  return (
    <Box>
      <Heading variant="caps" mb={2}>
        {name}
      </Heading>
      <Flex column gap={2}>
        {filters.map((obj) => (
          <Box key={obj.name ?? obj.value}>
            <Filter obj={obj} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
export default FilterGroup;
