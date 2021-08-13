import React from 'react';

import { Link as RouterLink, useHistory } from 'react-router-dom';

import { parseDate } from '../App/helpers';
import { documentSize } from '../App/helpers';
import Spinner from '../App/spinner';
import { Card, Box, Flex, Image, Heading, Link, Text } from '../Primitives';

const Keywords = ({ keywords }) => (
  <Flex>
    {keywords.map((keyword) => (
      <Text key={keyword} variant="badge" mr={[1, 2]}>
        {keyword.toLowerCase()}
      </Text>
    ))}
  </Flex>
);

const ClippedSummary = ({ sx, ...props }) => (
  <Box
    as="p"
    sx={{
      ...sx,
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': ['5', '5', '3', '4', '4'],
      '-webkit-box-orient': 'vertical',
    }}
    {...props}
  />
);

const MetaItem = ({ title, data }) => (
  <Text mr={2} fontStyle="italic" fontSize="small">
    {title}: {data}
  </Text>
);

// const Member = ({ data }) => (
//   <Box sx={{ p: 1, m: 1, ml: 0, bg: 'foreground' }}>
//     {data.person.fullName.substring(data.person.fullName.lastIndexOf(' ') + 1) +
//       ' / ' +
//       data.affiliation.name}
//   </Box>
// );

// const Members = ({ members }) => (
//   <Flex>
//     {members.map((member) => (
//       <Member key={member.id} data={member} />
//     ))}
//   </Flex>
// );

const DocumentResult = ({ document }) => {
  const history = useHistory();
  const url = '/documents/' + encodeURIComponent(document.pid);

  return !document ? (
    <Spinner />
  ) : (
    <Box
      as="article"
      sx={{
        display: ['block', 'flex'],
        cursor: 'pointer',
        '@media (pointer: fine)': {
          ':hover h2': { textDecoration: ['none', 'underline'] },
        },
      }}
      onClick={() => {
        history.push(url);
      }}
    >
      <Box
        display={['block', 'none']}
        bg="middleground"
        height="10rem"
        overflow="hidden"
      >
        <Image src={document.img} width="100%" height="100%" />
      </Box>
      <Card p={[3, 3, 3]} width={[1, 2 / 3, 3 / 4]}>
        <Link as={RouterLink} to={url} noUnderline>
          <Heading>{document.title}</Heading>
        </Link>
        <Keywords keywords={document.keywords} />

        <ClippedSummary mt={3} lineHeight="1.5" children={document.summary} />

        <Flex mt={2}>
          <MetaItem title="Created" data={parseDate(document.releseDate)} />
          <MetaItem title="Size" data={documentSize(document.datasets)} />
        </Flex>
      </Card>
      <Box
        display={['none', 'block']}
        width={[1, 1 / 3, 1 / 4]}
        bg="middleground"
      >
        <Image width="100%" src={document.img} minHeight="0" />
      </Box>
    </Box>
  );
};

export default DocumentResult;
