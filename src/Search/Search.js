import { Switch } from '@rebass/forms/styled-components';
import shallow from 'zustand/shallow';

import { useAppStore } from '../App/stores';
import { initialFilters } from '../filters';
import { Card, Flex, Text, Button } from '../Primitives';
import FilterGroup from './FilterGroup';

const ORDER = ['title', 'type', 'keywords'];

const Search = () => {
  const [loadOnScroll, toggleLoadOnScroll] = useAppStore(
    (state) => [state.loadOnScroll, state.toggleLoadOnScroll],
    shallow
  );

  const rootFilters = [...initialFilters.root?.filters].sort(
    (a, b) => ORDER.indexOf(a?.name) - ORDER.indexOf(b?.name)
  );
  const parameters = initialFilters.parameters?.filters;

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Search" filters={rootFilters} />
          <FilterGroup name="Parameter" filters={parameters} />
        </Flex>
      </Card>
      <Card mb={3}>
        <Flex alignItems="center">
          <Button
            variant="base"
            sx={{
              py: [0, 0, 1],
              width: '100%',
              ':hover': { textDecoration: 'underline' },
            }}
            onClick={() => toggleLoadOnScroll()}
          >
            <Switch as="div" checked={loadOnScroll} tabIndex={-1} flex="none" />
            <Text ml={3}>Load more results on&nbsp;scroll</Text>
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Search;
