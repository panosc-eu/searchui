import { capitalizeAndSpace } from '../App/helpers';
import { Heading, Box } from '../Primitives';
import FilterControl from './FilterControl';

function Filter(props) {
  const { obj } = props;

  return (
    <Box>
      <Heading
        as="h3"
        variant="small"
        sx={{
          color: obj.isActive && 'heading',
          fontSize: 1,
          fontWeight: obj.isActive ? 600 : 'normal',
          textTransform: 'capitalize',
        }}
      >
        {capitalizeAndSpace(obj.name ?? obj.value)}
      </Heading>

      <FilterControl obj={obj} />
    </Box>
  );
}

export default Filter;
