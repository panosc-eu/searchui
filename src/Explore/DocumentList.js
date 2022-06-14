import React, { useEffect } from 'react'

import useApi, { useQuery } from '../Api/useApi'
import useFilters from '../Api/useFilters'
import { useSearchStore } from '../App/stores'
import { Flex, Card, Text, Heading } from '../Primitives'
import DocumentItem from './DocumentItem'
import QueryDebug from './QueryDebug'

function DocumentList() {
  const setCount = useSearchStore((state) => state.setCount)
  const filters = useFilters()
  const { data } = useApi('/documents', filters)
  const query = useQuery('/documents', filters)

  useEffect(() => {
    setCount(data.length)
  }, [data, setCount])

  return (
    <>
      <Flex column gap={[3, 3, 3, 4]}>
        {data.length === 0 ? (
          <Card p={[3, 4]}>
            <Heading>No results</Heading>
            <Text as="p">Please adjust the search filters.</Text>
          </Card>
        ) : (
          data.map((document) => (
            <DocumentItem document={document} key={document.pid} />
          ))
        )}
      </Flex>
      <QueryDebug query={JSON.stringify(query)} />
    </>
  )
}
export default DocumentList
