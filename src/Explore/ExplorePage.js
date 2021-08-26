import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Boundary from '../App/Boundary';
import { useSearchStore } from '../App/stores';
import { Flex, Box } from '../Primitives';
import Search from '../Search/Search';
import DocumentList from './DocumentList';

function ExplorePage(props) {
  const { isDesktop } = props;
  const { search } = useLocation();
  const setSearch = useSearchStore((state) => state.setSearch);

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  return (
    <Flex flexDirection={['column', 'column', 'row']} gap={[3, 3, 3, 4]}>
      {isDesktop ? (
        <Box
          as="aside"
          display={['none', 'none', 'block']}
          width={[1, 1, 1 / 4]}
        >
          {isDesktop && <Search />}
        </Box>
      ) : (
        <Box
          as="details"
          display={['block', 'block', 'none']}
          width={[1, 1, 1 / 4]}
        >
          <Box as="summary" sx={{ fontSize: 3, cursor: 'pointer' }}>
            Filters
          </Box>
          <Box mt={2}>
            <Search />
          </Box>
        </Box>
      )}
      <Box width={[1, 1, 3 / 4]}>
        <Boundary>
          <DocumentList name="Data" />
        </Boundary>
      </Box>
    </Flex>
  );
}

export default ExplorePage;
