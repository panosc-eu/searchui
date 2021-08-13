import React from 'react';

import { Box, Card, Heading, Link, Text } from '../Primitives';
import MetaItem from './MetaItem';

function DocumentMeta({ data }) {
  return (
    <Box>
      <Card p={2}>
        <Heading>Description</Heading>
        <Text as="p">{data.summary}</Text>
      </Card>
      <Box as="ul" bg="middleground" color="inherit" pl={0}>
        <MetaItem label="Citation">
          <Link display="block" href={'http://doi.org/' + data.doi} blank>
            {data.citation}
          </Link>
        </MetaItem>
        <MetaItem label="Keywords">{data.keywords.join(', ')}</MetaItem>
        <MetaItem label="Type">{data.type}</MetaItem>
        <MetaItem label="Author">{data.members[0]?.person.fullName}</MetaItem>
        <MetaItem label="Other">Stuff</MetaItem>
      </Box>
    </Box>
  );
}

export default DocumentMeta;
