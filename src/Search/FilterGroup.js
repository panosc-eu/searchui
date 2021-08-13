import { Heading, Flex, Box } from '../Primitives';
import Generic from './Filter';

const FilterGroup = ({ name, filters }) => {
  const isAnyActive = filters
    .reduce((acc, item) => [...acc, item.isActive], [])
    .includes(true);

  return (
    <Box>
      <Heading
        variant="small"
        sx={{
          color: isAnyActive ? 'heading' : 'text',
          fontWeight: isAnyActive ? 600 : 400,
          textTransform: 'capitalize',
        }}
      >
        {name}
      </Heading>
      <Flex column mx={2}>
        {filters.map((obj) => (
          <Box key={obj.name ?? obj.value}>
            <Generic obj={obj} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default FilterGroup;
