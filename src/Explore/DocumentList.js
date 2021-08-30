import React, { Suspense, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { translate } from 'search-api-adapter';
import { useSWRInfinite } from 'swr';

import Boundary from '../App/Boundary';
import Spinner from '../App/Spinner';
import { useAppStore } from '../App/stores';
import { Flex, Card, Text, Heading, Button, Box } from '../Primitives';
import { useFilters } from '../filters';
import DocumentItem from './DocumentItem';

const PAGE_SIZE = 5;
const QUERY_CONFIG = {
  include: [['datasets']],
  pageSize: PAGE_SIZE,
};

function DocumentList() {
  const loadOnScroll = useAppStore((state) => state.loadOnScroll);
  const filters = useFilters();

  const { data, size, setSize } = useSWRInfinite((page, previous) => {
    const filter = translate(filters, { ...QUERY_CONFIG, page: page + 1 });
    return `/documents?filter=${filter}`;
  });

  // Infinite scroll
  const { ref: infiniteScrollRef, inView } = useInView();
  useEffect(() => {
    loadOnScroll && inView && setSize((val) => val + 1);
  }, [loadOnScroll, inView, setSize]);

  const documents = data.flat();
  const isEmpty = documents.length === 0;
  const isLoadingMore = !data[size - 1];
  const hasReachedEnd = data[data.length - 1].length < PAGE_SIZE;

  return (
    <Boundary>
      <Suspense fallback={<Spinner />}>
        <Flex column gap={[3, 3, 3, 4]}>
          {isEmpty ? (
            <Card p={[3, 4]}>
              <Heading>No results</Heading>
              <Text as="p">Please adjust the search filters.</Text>
            </Card>
          ) : (
            <>
              {documents.map((doc) => (
                <DocumentItem document={doc} key={doc.pid} />
              ))}
              {isLoadingMore ? (
                <Text as="p">Loading more results...</Text>
              ) : hasReachedEnd ? (
                <Text as="p">End of results</Text>
              ) : loadOnScroll ? (
                <Box ref={infiniteScrollRef} />
              ) : (
                <Button
                  variant="primary"
                  alignSelf="flex-start"
                  onClick={() => setSize((val) => val + 1)}
                >
                  Load more results
                </Button>
              )}
            </>
          )}
        </Flex>
      </Suspense>
    </Boundary>
  );
}
export default DocumentList;
