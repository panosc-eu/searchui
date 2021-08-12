import React from 'react';

import { translate } from 'search-api-adapter';
import useSWR from 'swr';

import Datasets from '../Datasets/datasets';
import { Image, Box, Heading, Flex } from '../Primitives';
import Document from './document';

const DocumentPage = (props) => {
  const documentId = props.match.params.documentId;
  const config = {
    include: [
      ['datasets', 'instrument'],
      ['members', 'person'],
      ['members', 'affiliation'],
    ],
    limit: false,
  };
  const query = translate([], config);
  const { data } = useSWR('/Documents/' + documentId + '?filter=' + query);

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'column', 'row'],
        gap: [3, 3, 3, 4],
      }}
    >
      <Box width={[1, 1, 1 / 2]}>
        <Heading variant="display">{data.title}</Heading>
        <Document data={data} />
      </Box>
      <Box width={[1, 1, 1 / 4]}>
        <Heading variant="display">Datasets</Heading>
        <Datasets datasets={data.datasets} />
      </Box>
      <Box width={[1, 1, 1 / 4]}>
        <Heading variant="display">Preview</Heading>
        <Image src={data.img} />
      </Box>
    </Flex>
  );
};

export default DocumentPage;
