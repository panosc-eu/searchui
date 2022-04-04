import React, { Suspense, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSWRInfinite } from 'swr'

import Boundary from '../App/Boundary'
import Spinner from '../App/Spinner'
import { useAppStore } from '../App/stores'
import { Flex, Card, Text, Heading, Button, Box } from '../Primitives'
import { useFilters, translate } from '../filters'
import DocumentItem from './DocumentItem'

const PAGE_SIZE = 5
const QUERY_CONFIG = {
  include: ['datasets', 'affiliation', 'person'],
  pageSize: PAGE_SIZE,
  label: 'c',
}

function DocumentList() {
  const loadOnScroll = useAppStore((state) => state.loadOnScroll)
  const query = useAppStore((state) => state.query)
  const setQuery = useAppStore((state) => state.setQuery)

  const filters = useFilters()

  const { data, size, setSize, error } = useSWRInfinite((page) => {
    const filter = translate(
      [...filters, { ...QUERY_CONFIG, page: page + 1 }],
      'documents',
    )

    const newQuery = encodeURIComponent(JSON.stringify(filter))
    if (newQuery !== query) {
      console.log(`${process.env.REACT_APP_API  }/documents?filter=${  newQuery}`)
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
              ) : (
                <Box ref={infiniteScrollRef} />
              )}
            </>
          )}
        </Flex>
      </Suspense>
    </Boundary>
  )
}
export default DocumentList
