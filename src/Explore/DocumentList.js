import React, { Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSWRInfinite } from 'swr';

import Boundary from '../App/Boundary';
import Spinner from '../App/Spinner';
import translate from '../App/adapter';
import { useAppStore } from '../App/stores';
import { Flex, Card, Text, Heading, Button, Box } from '../Primitives';
import { initialFilters, useFilters } from '../filters';
import DocumentItem from './DocumentItem';


const decode = (query) => JSON.parse(decodeURIComponent(query));
function DocumentList() {
  const loadOnScroll = useAppStore((state) => state.loadOnScroll);
const QUERY_CONFIG = {
  include: [['datasets'], ['parameters'], ['members', 'person'], ['members', 'affiliation']],
  type: 'config',
  limit: 25,
};
  const state = useFilters();
  const query = translate(initialFilters, [...state, QUERY_CONFIG]);
  console.log('query')
  console.log(decode(query))
  const { data, size, setSize, error } = useSWRInfinite((page, previous) => {
    return `/documents?filter=${query}`;
  });

  // Infinite scroll
  const { ref: infiniteScrollRef, inView } = useInView();

  const documents = data?.flat() || [];
  console.log('documents retrieved')
  console.log(documents)

  const isEmpty = documents.length === 0;
  const isLoadingMore = !data[size - 1];
  const hasReachedEnd = data[data.length - 1].length < 25;

  return (
    <Boundary>
      <Suspense fallback={<Spinner />}>
        <Flex column gap={[3, 3, 3, 4]}>
          {isEmpty || error ? (
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
                <>
                </>
              )}
            </>
          )}
        </Flex>
      </Suspense>
    </Boundary>
  );
}
export default DocumentList;
