import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import { parseDate, documentSize } from '../App/helpers'
import { Card, Box, Flex, Image, Heading, Link, Text } from '../Primitives'

function DocumentItem(props) {
  const { document } = props
  const { pid, title, keywords, summary, releseDate, datasets } = document

  const history = useHistory()
  const url = `/documents/${encodeURIComponent(pid)}`

  return (
    <Box
      as="article"
      sx={{
        display: ['block', 'flex'],
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Card
        width={1}
        key={pid}
        as={RouterLink}
        to={url}
        onClick={(evt) => {
          evt.preventDefault()
          history.push({
            pathname: url,
            state: { canGoBack: true },
          })
        }}
        sx={{
          color: 'inherit',
          borderColor: 'middleground',
          textDecoration: 'none',
          '&:hover > h4': {
            textDecoration: 'underline',
          },
        }}
      >
        <Heading>{title}</Heading>
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
      </Card>
    </Box>
  )
}

export default DocumentItem
