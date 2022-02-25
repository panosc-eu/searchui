import React, { Suspense, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSWRInfinite } from 'swr'

import Boundary from '../App/Boundary'
import Spinner from '../App/Spinner'
import translate from '../App/adapter/translate'
import { useAppStore } from '../App/stores'
import { Flex, Card, Text, Heading, Button, Box } from '../Primitives'
import { useFilters, filterables } from '../filters'
import DocumentItem from './DocumentItem'

const PAGE_SIZE = 5
const QUERY_CONFIG = {
  filterables,
  include: ['datasets', 'affiliation', 'person'],
  pageSize: PAGE_SIZE,
}

function DocumentList() {
  const loadOnScroll = useAppStore((state) => state.loadOnScroll)
  const query = useAppStore((state) => state.query)
  const setQuery = useAppStore((state) => state.setQuery)

  const filters = useFilters()

  const { data, size, setSize, error } = useSWRInfinite((page) => {
    const filter = translate(filters, { ...QUERY_CONFIG, page: page + 1 })

    const newQuery = encodeURIComponent(JSON.stringify(filter))
    if (newQuery !== query) {
      setQuery(newQuery)
    }

    return `/documents?filter=${newQuery}`
  })

  // Infinite scroll
  const { ref: infiniteScrollRef, inView } = useInView()
  useEffect(() => {
    loadOnScroll && inView && setSize((val) => val + 1)
  }, [loadOnScroll, inView, setSize])
  if (error) {
    return <>Opps</>
  }

  const documents = data && data.flat()
  const isEmpty = documents?.length === 0 || !documents
  const isLoadingMore = !data[size - 1]
  const hasReachedEnd = data[data.length - 1].length < PAGE_SIZE

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
  )
}
export default DocumentList
