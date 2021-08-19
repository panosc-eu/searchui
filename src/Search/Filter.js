import { FiSlash } from 'react-icons/fi';

import { capitalizeAndSpace } from '../App/helpers';
import { Heading, Box, Button } from '../Primitives';
import FilterControl from './FilterControl';

function Filter(props) {
  const { obj } = props;
  const withClearBtn = !!obj.options;

  return (
    <Box sx={{ position: 'relative', pr: withClearBtn && 5 }}>
      <Heading as="h3" variant="filter" data-active={obj.isActive || undefined}>
        {capitalizeAndSpace(obj.name ?? obj.value)}
      </Heading>

      <FilterControl obj={obj} />

      {withClearBtn && (
        <Button
          variant="action"
          sx={{ position: 'absolute', top: -2, right: 0 }}
          disabled={!obj.isActive}
          aria-label="Clear"
          onClick={() => {
            obj.assocValue(undefined);
            obj.toggleIsActive(0);
          }}
        >
          <FiSlash />
        </Button>
      )}
    </Box>
  );
}

export default Filter;
