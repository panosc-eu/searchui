import { useState } from 'react'

import { parseDate } from '../App/helpers'
import { Card, Box, Flex, Heading, Link, Text } from '../Primitives'

function DocumentItem({ document }) {
  const { pid, title, score, doi, summary, releaseDate } = document
  const [showFullDescription, setShowFullDescription] = useState(false)

  const doiLink = `http://doi.org/${doi}`

  return (
    <Box
      as="article"
      sx={{
        display: ['block', 'flex'],
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Card width={1} key={pid}>
        <Flex sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Text
            as={Link}
            href={doiLink}
            target="_blank"
            sx={{ textDecoration: 'none', color: 'text', fontSize: 1 }}
          >
            {doi}
          </Text>
          <Box>Relevancy = {score.toFixed(3)}</Box>
        </Flex>
        <Heading
          as={Link}
          href={doiLink}
          target="_blank"
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textDecoration: 'none',
          }}
        >
          {title}
        </Heading>
        <Box
          sx={{
            my: 3,
            cursor: 'pointer',
          }}
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? (
            <Box>{summary}</Box>
          ) : (
            <Box
              as="p"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
              }}
            >
              {summary}
            </Box>
          )}
        </Box>
        <Box>
          <Text sx={{ fontStyle: 'italic' }}>
            Released: {parseDate(releaseDate)}
          </Text>
        </Box>
      </Card>
    </Box>
  )
}

export default DocumentItem
