import { useRef } from 'react'

import { Card, Box, Flex, Heading, Link, Text } from '../Primitives'
import Detailed from './Detailed'
import ScoringIndicator from './ScoreIndicator'
import Simple from './Simple'

function DocumentItem(props) {
  const { document, detailedMode, toggleMode } = props
  const { pid, title, score, doi } = document

  const doiLink = `http://doi.org/${doi}`
  const itemRef = useRef(null)

  return (
    <Box
      ref={itemRef}
      as="article"
      sx={{
        display: ['block', 'flex'],
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Card width={1} key={pid}>
        <Flex
          sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text
            as={Link}
            href={doiLink}
            target="_blank"
            sx={{ textDecoration: 'none', color: 'text', fontSize: 1 }}
          >
            {doi}
          </Text>
          <ScoringIndicator score={score} />
        </Flex>
        <Heading
          as={Link}
          href={doiLink}
          target="_blank"
          sx={{
            display: 'block',
            whiteSpace: detailedMode ? 'wrap' : 'nowrap',
            overflow: detailedMode ? 'visible' : 'hidden',
            textOverflow: detailedMode ? 'none' : 'ellipsis',
            textDecoration: 'none',
          }}
        >
          {title}
        </Heading>
        <Box>
          {detailedMode ? <Detailed {...document} /> : <Simple {...document} />}
        </Box>
        <br />
        <Box
          onClick={() => toggleMode(itemRef.current)}
          sx={{
            cursor: 'pointer',
            borderTop: '1px solid',
            borderColor: 'foreground',
            textAlign: 'center',
            fontSize: 0,
            mx: -3,
            mb: -3,
            ':hover': {
              bg: 'foreground',
            },
          }}
        >
          <strong>{detailedMode ? '\u2227' : '\u2228'}</strong>
        </Box>
      </Card>
    </Box>
  )
}

export default DocumentItem
