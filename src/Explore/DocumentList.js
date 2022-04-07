import React, { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

import { useSearchStore } from '../App/stores'
import { Flex, Card, Text, Heading } from '../Primitives'
import DocumentItem from './DocumentItem'

function DocumentList(props) {
  const { queryUrl } = props
  const setCount = useSearchStore((state) => state.setCount)

  const { data: documents } = useSWRImmutable(queryUrl)

  useEffect(() => {
    setCount(documents.length)
  }, [documents, setCount])

  return (
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
  )
}
export default DocumentList
