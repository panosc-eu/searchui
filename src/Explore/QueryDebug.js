import { useState } from 'react'
import JSONView from 'react-json-view'

import { Box, Button, Card, Flex } from '../Primitives'

const decode = (query) => JSON.parse(decodeURIComponent(query))

function Debug({ query }) {
  const json = decode(query)
  const [show, setShow] = useState(false)

  return (
    <Flex
      sx={{
        position: 'fixed',
        bottom: 4,
        right: 4,
        maxHeight: '90vh',
        gap: 4,
      }}
    >
      {show && (
        <Box
          sx={{
            overflowY: 'scroll',
          }}
        >
          <JSONView
            src={json}
            theme={{
              base00: 'white',
              base01: '#ddd',
              base02: '#ddd',
              base03: '#444',
              base04: 'purple',
              base05: '#444',
              base06: '#444',
              base07: '#444',
              base08: '#444',
              base09: 'rgba(70, 70, 230, 1)',
              base0A: 'rgba(70, 70, 230, 1)',
              base0B: 'rgba(70, 70, 230, 1)',
              base0C: 'rgba(70, 70, 230, 1)',
              base0D: 'rgba(70, 70, 230, 1)',
              base0E: 'rgba(70, 70, 230, 1)',
              base0F: 'rgba(70, 70, 230, 1)',
            }}
          />
        </Box>
      )}
      <Flex sx={{ alignItems: 'flex-end' }}>
        <Box>
          <Button onClick={() => setShow(!show)}>
            {show ? ' { x }' : '{ ? }'}
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Debug
