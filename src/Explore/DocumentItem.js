import React from 'react'

import { parseDate } from '../App/helpers'
import { Card, Box, Flex, Heading, Link, Text } from '../Primitives'

function DocumentItem(props) {
  const { document } = props
  const { pid, title, score, doi, summary, releaseDate } = document

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
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Link href={doiLink} target="_blank">
            {doi}
          </Link>
          <Box>{score}</Box>
        </Flex>
        <Heading
          as={Link}
          href={doiLink}
          target="_blank"
          sx={{
            textDecoration: 'none',
            curosor: 'pointer',
          }}
        >
          {title}
        </Heading>
        <Box
          as="p"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            my: 3,
          }}
        >
          {summary}
        </Box>
        <Box>
          <Text>Release Date: {parseDate(releaseDate)}</Text>
        </Box>
      </Card>
    </Box>
  )
}

export default DocumentItem
