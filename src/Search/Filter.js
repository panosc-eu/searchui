import { FiSlash } from 'react-icons/fi';

import { capitalizeAndSpace } from '../App/helpers';
import { Heading, Box, Button } from '../Primitives';

function FilterBox(props) {
  const { title, isActive, onClear, children } = props;

  return (
    <Box sx={{ position: 'relative', pr: onClear && 5 }}>
      <Heading as="h3" variant="filter" data-active={isActive || undefined}>
        {capitalizeAndSpace(title)}
      </Heading>

      {children}

      {onClear && (
        <Button
          variant="action"
          sx={{ position: 'absolute', top: -2, right: 0 }}
          disabled={!isActive}
          aria-label="Clear"
          onClick={() => onClear()}
        >
          <FiSlash />
        </Button>
      )}
    </Box>
  );
}

export default FilterBox;
