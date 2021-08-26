import React from 'react';

import { Link as RouterLink, useHistory } from 'react-router-dom';

import { parseDate } from '../App/helpers';
import { documentSize } from '../App/helpers';
import { Card, Box, Flex, Image, Heading, Link, Text } from '../Primitives';

function DocumentItem(props) {
  const { document } = props;
  const { pid, img, title, keywords, summary, releseDate, datasets } = document;

  const history = useHistory();
  const url = `/documents/${encodeURIComponent(pid)}`;

  return (
    <Box
      as="article"
      sx={{
        display: ['block', 'flex'],
        borderRadius: 4,
        overflow: 'hidden',
        cursor: 'pointer',
        '@media (pointer: fine)': {
          ':hover h2': { textDecoration: ['none', 'underline'] },
        },
      }}
      onClick={() => {
        history.push({
          pathname: url,
          state: { fromExplorePage: true },
        });
      }}
    >
      <Box
        display={['block', 'none']}
        bg="middleground"
        height="10rem"
        overflow="hidden"
      >
        <Image src={img} width="100%" height="100%" />
      </Box>

      <Card width={[1, 2 / 3, 3 / 4]}>
        <Link
          as={RouterLink}
          to={url}
          onClick={(evt) => evt.preventDefault()} // let parent handler perform navigation
          noUnderline
        >
          <Heading>{title}</Heading>
        </Link>

        <Flex>
          {keywords.map((keyword) => (
            <Text key={keyword} variant="keyword" mr={[1, 2]}>
              {keyword.toLowerCase()}
            </Text>
          ))}
        </Flex>

        <Box
          as="p"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': ['5', '5', '3', '4', '4'],
            '-webkit-box-orient': 'vertical',
            mt: 3,
          }}
        >
          {summary}
        </Box>

        <Flex as="footer" gap={2} mt={2} fontStyle="italic" fontSize="small">
          <Text>Created: {parseDate(releseDate)}</Text>
          <Text>Size: {documentSize(datasets)}</Text>
        </Flex>
      </Card>

      <Box
        display={['none', 'block']}
        width={[1, 1 / 3, 1 / 4]}
        bg="middleground"
      >
        <Image width="100%" src={img} minHeight="0" />
      </Box>
    </Box>
  );
}

export default DocumentItem;
