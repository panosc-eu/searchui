import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import { translate } from '../App/adapter/translate'
import { Box, Heading, Flex } from '../Primitives'
import Dataset from './Dataset'
import DocumentMeta from './DocumentMeta'

function DocumentPage() {
  const queryObj = translate([
    {
      label: 'c',
      include: ['instrument', 'person', 'datasets'],
      limit: false,
    },
  ])

  const query = encodeURIComponent(JSON.stringify(queryObj))

  const { documentId } = useParams()
  const { data } = useSWR(`/documents/${documentId}?filter=${query}`)

  return (
    <Flex flexDirection={['column', 'column', 'row']} gap={[3, 3, 3, 4]}>
      <Box width={[1, 1, 2 / 3]}>
        <Heading as="h1" variant="display">
          {data.title}
        </Heading>
        <DocumentMeta data={data} />
      </Box>
      <Box width={[1, 1, 1 / 3]}>
        <Heading variant="display">Datasets</Heading>
        <Flex column gap={[1, 1, 2, 3]}>
          {data.datasets?.map((dataset) => (
            <Dataset key={dataset.pid} {...dataset} />
          ))}
        </Flex>
      </Box>
    </Flex>
  )
}

export default DocumentPage
