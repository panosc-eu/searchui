import { capitalizeAndSpace } from '../App/helpers';
import { Box, Flex, Heading } from '../Primitives';
import FilterControl from './FilterControl';

function Filter(props) {
  const { obj } = props;
  const control = <FilterControl obj={obj} />;

  return (
    <Box>
      <Heading
        variant="small"
        sx={{
          color: obj.isActive ? 'heading' : 'text',
          fontSize: 1,
          fontWeight: obj.isActive ? 600 : 400,
          textTransform: 'capitalize',
        }}
      >
        {capitalizeAndSpace(obj.name ?? obj.value)}
      </Heading>

      {control && <Flex column>{control}</Flex>}
    </Box>
  );
}

export default Filter;
