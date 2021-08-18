import { Switch } from '@rebass/forms/styled-components';
import shallow from 'zustand/shallow';

import { useSearchStore, useAppStore } from '../App/stores';
import { Card, Flex, Text, Button } from '../Primitives';
import FilterGroup from './FilterGroup';
const ORDER = ['title', 'type', 'keywords'];

const Search = () => {
  const [loadOnScroll, toggleLoadOnScroll] = useAppStore(
    (state) => [state.loadOnScroll, state.toggleLoadOnScroll],
    shallow
  );

  const filters = useSearchStore();

  const rootFilters = [...filters?.root?.filters].sort(
    (a, b) => ORDER.indexOf(a?.name) - ORDER.indexOf(b?.name)
  );
  const techniques = filters?.techniques?.filters;
  const parameters = filters?.parameters?.filters;

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card p={[3, 3]}>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Search" filters={rootFilters} />
          <FilterGroup name="Technique" filters={techniques} />
          <FilterGroup name="Parameter" filters={parameters} />
        </Flex>
      </Card>
      <Card p={[3, 3]}>
        <Flex alignItems="center">
          <Button
            variant="base"
            sx={{
              py: [0, 0, 1],
              width: '100%',
              justifyContent: 'left',
              ':hover': { textDecoration: 'underline' },
            }}
            onClick={() => toggleLoadOnScroll()}
          >
            <Switch as="div" checked={loadOnScroll} tabIndex={-1} flex="none" />{' '}
            <Text ml={3}>Load more results on&nbsp;scroll</Text>
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Search;
