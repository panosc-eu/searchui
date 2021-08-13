import React, {
  useRef,
  useState,
  Suspense,
  useCallback,
  useEffect,
} from 'react';

import { useInView } from 'react-intersection-observer';
import { translate } from 'search-api-adapter';
import { useSWRInfinite } from 'swr';
import shallow from 'zustand/shallow';

import ErrorBoundary from '../App/errorBoundary';
import Spinner from '../App/spinner';
import { useDocumentsStore, useSearchStore } from '../App/stores';
import { Box, Flex } from '../Primitives';
import DocumentResult from './documentResult';

const DocumentsList = () => {
  const [initialSize, setInitialSize] = useDocumentsStore(
    (state) => [state.page, state.setPage],
    shallow
  );

  const queryConfig = {
    include: [['datasets'], ['members', 'affiliation'], ['members', 'person']],
    pageSize: 5,
  };

  const filters = useSearchStore();

  const getQuery = (idx, previous) =>
    previous && !previous.length
      ? null
      : `/Documents?filter=${translate(filters, {
          ...queryConfig,
          page: idx + 1,
        })}`;

  const { data, error, size, setSize, mutate } = useSWRInfinite(getQuery, {
    persistSize: true,
    initialSize,
  });

  //copypasta from swr docs
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.length < (queryConfig?.pageSize ?? 25));

  //fetch one more page when scrolled to bottom
  const { ref, inView } = useInView();
  useEffect(() => {
    inView && setSize((int) => int + 1);
  }, [inView, setSize]);

  //save pagination for scroll restoration
  const updateInitalSize = useCallback(() => {
    setInitialSize(size);
  }, [setInitialSize, size]);
  useEffect(() => {
    return () => {
      updateInitalSize();
    };
  }, [updateInitalSize]);

  //reset data on filters changed
  const [plainQuery, setPlainQuery] = useState(false);
  const documentsRef = useRef(null);
  useEffect(() => {
    const nonPaginatedQuery = translate(filters, {});
    if (nonPaginatedQuery !== plainQuery) {
      if (plainQuery) {
        setSize(1);
        mutate();
        documentsRef.current.scroll({ top: 0 });
      }
      setPlainQuery(nonPaginatedQuery);
    }
  }, [setSize, mutate, filters, plainQuery]);

  const documents = data ? [].concat(...data) : [];

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Flex ref={documentsRef} column gap={[3, 3, 3, 4]}>
          {documents?.map((document) => (
            <DocumentResult document={document} key={document.pid} />
          ))}
          {!isReachingEnd && !isLoadingMore && <Box ref={ref}>Loading...</Box>}
        </Flex>
      </Suspense>
    </ErrorBoundary>
  );
};
export default DocumentsList;
