import React, { Suspense, useEffect } from 'react'
import useSWR from 'swr'

import Boundary from '../App/Boundary'
import Spinner from '../App/Spinner'
import { useSearchStore, useAppStore } from '../App/stores'
import { Flex, Card, Text, Heading } from '../Primitives'
import { useFilters, translate } from '../filters'
import DocumentItem from './DocumentItem'

const PAGE_SIZE = 50
const QUERY_CONFIG = {
  queryParam: 'c',
  pageSize: PAGE_SIZE,
}

function DocumentList() {
  const query = useAppStore((state) => state.query)
  const setQuery = useAppStore((state) => state.setQuery)
  const setCount = useSearchStore((state) => state.setCount)

  const filters = useFilters()

  const { data: documents } = useSWR(() => {
    const filter = translate([...filters, QUERY_CONFIG], 'documents')

    const newQuery = encodeURIComponent(JSON.stringify(filter))
    if (newQuery !== query) {
      setQuery(newQuery)
    }

    return `/documents?filter=${newQuery}`
  })

  useEffect(() => {
    setCount(documents.length)
  }, [documents, setCount])

  return (
    <Boundary>
      <Suspense fallback={<Spinner />}>
        <Flex column gap={[3, 3, 3, 4]}>
          {documents.length === 0 ? (
            <Card p={[3, 4]}>
              <Heading>No results</Heading>
              <Text as="p">Please adjust the search filters.</Text>
            </Card>
          ) : (
            <>
              {documents.map((doc) => (
                <DocumentItem document={doc} key={doc.pid} />
              ))}
            </>
          )}
        </Flex>
      </Suspense>
    </Boundary>
  )
}
export default DocumentList
