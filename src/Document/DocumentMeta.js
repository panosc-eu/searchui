import React from 'react'

import { Box, Card, Heading, Link, Text } from '../Primitives'
import MetaItem from './MetaItem'

function DocumentMeta({ data }) {
  const doiLink = `http://doi.org/${data.doi}`
  return (
    <Box>
      <Card p={[3, 3, 3, 4]}>
        <Heading>Description</Heading>
        <Text as="p">{data.summary}</Text>
      </Card>
      <Box as="ul" bg="middleground" color="inherit" pl={0}>
        <MetaItem label="DOI">
          <Link display="block" href={doiLink} blank>
            {data.doi}
          </Link>
        </MetaItem>
        <MetaItem label="Type">{data.type}</MetaItem>
        <MetaItem label="Author">{data.members[0]?.person.fullName}</MetaItem>
      </Box>
    </Box>
  )
}

export default DocumentMeta
