import { Heading, Flex, Box } from '../Primitives';
import Generic from './filterComponent';

const Grouped = ({ group, filters }) => {
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
        {group}
      </Heading>
      <Flex column mx={2}>
        {filters.map((obj) => (
          <Box mb={2} key={obj.name}>
            <Generic obj={obj} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default Grouped;
