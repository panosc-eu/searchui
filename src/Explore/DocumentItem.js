import { useState } from 'react'
import { FiChevronUp, FiExternalLink } from 'react-icons/fi'

import { Card, Box, Flex, Heading, Link } from '../Primitives'
import Detailed from './Detailed'
import ScoringIndicator from './ScoreIndicator'
import Simple from './Simple'

function DocumentItem(props) {
  const { document } = props
  const { pid, title, score, doi } = document

  const doiLink = `http://doi.org/${doi}`
  const [isHovered, setIsHovered] = useState(false)
  const [isDetailed, setIsDetailed] = useState(false)

  return (
    <Box
      as="article"
      sx={{
        display: ['block', 'flex'],
        overflow: 'hidden',
      }}
    >
      <Card width={1} key={pid}>
        <Flex
          sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box
            as={Link}
            href={doiLink}
            target="_blank"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              color: isHovered ? 'text' : 'primary',
              fontSize: 1,
              ':hover': {
                textDecoration: 'none',
              },
            }}
          >
            <FiExternalLink />
            {doi}
          </Box>
          <ScoringIndicator score={score} />
        </Flex>
        <Heading
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          as={Link}
          href={doiLink}
          target="_blank"
          sx={{
            display: 'block',
            whiteSpace: isDetailed ? 'wrap' : 'nowrap',
            overflow: isDetailed ? 'visible' : 'hidden',
            textOverflow: isDetailed ? 'none' : 'ellipsis',
            textDecoration: isHovered ? 'underline' : 'none',
          }}
        >
          {title}
        </Heading>
        <Box
          onClick={() => isDetailed || setIsDetailed(true)}
          sx={{
            mx: -3,
            mb: -3,
            pb: 3,
            px: 3,
            pt: 1,
            ':hover': {
              bg: isDetailed || 'foreground',
              cursor: isDetailed || 'pointer',
            },
          }}
        >
          {isDetailed ? <Detailed {...document} /> : <Simple {...document} />}
          <Box
            onClick={() => setIsDetailed(false)}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
              fontSize: 4,
              display: isDetailed ? 'block' : 'none',
              mx: -3,
              mb: -3,
              ':hover': {
                bg: 'foreground',
              },
            }}
          >
            <FiChevronUp />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default DocumentItem
