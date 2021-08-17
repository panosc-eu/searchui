import React, { Suspense, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { translate } from 'search-api-adapter';
import { useSWRInfinite } from 'swr';

import Boundary from '../App/Boundary';
import Spinner from '../App/Spinner';
import { useSearchStore } from '../App/stores';
import { Flex, Card, Text, Heading } from '../Primitives';
import DocumentItem from './DocumentItem';

const PAGE_SIZE = 5;
const QUERY_CONFIG = {
  include: [['datasets'], ['members', 'affiliation'], ['members', 'person']],
  pageSize: PAGE_SIZE,
};

function DocumentList() {
  const filters = useSearchStore();

  const { data, size, setSize } = useSWRInfinite((page, previous) => {
    const filter = translate(filters, { ...QUERY_CONFIG, page: page + 1 });
    return `/Documents?filter=${filter}`;
  });

  // Infinite scroll
  const { ref: infiniteScrollRef, inView } = useInView();
  useEffect(() => {
    inView && setSize((int) => int + 1);
  }, [inView, setSize]);

  const documents = data.flat();
  const isEmpty = documents.length > 0;
  const isLoadingMore = !data[size - 1];
  const hasReachedEnd = data[data.length - 1].length < PAGE_SIZE;

  return (
    <Boundary>
      <Suspense fallback={<Spinner />}>
        <Flex column gap={[3, 3, 3, 4]}>
          {isEmpty ? (
            documents.map((doc) => (
              <DocumentItem document={doc} key={doc.pid} />
            ))
          ) : (
            <Card>
              <Heading>No results</Heading>
              <Text>Please adjust the search filters.</Text>
            </Card>
          )}
          {!hasReachedEnd ? (
            <Text ref={infiniteScrollRef}>
              {isLoadingMore ? 'Loading more results...' : ' '}
            </Text>
          ) : (
            <Text>End of results</Text>
          )}
        </Flex>
      </Suspense>
    </Boundary>
  );
}
export default DocumentList;
