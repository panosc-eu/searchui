import { useState } from 'react'
import { Button, Flex } from '../Primitives'
import JSONView from 'react-json-view'

const decode = (query) => JSON.parse(decodeURIComponent(query))

const Debug = ({ query }) => {
  const json = decode(query)
  const [show, setShow] = useState(false)

  return (
    <Flex column>
      <Button onClick={() => setShow(!show)}>
        {show ? 'Hide query' : 'Show query'}
      </Button>
      {show && (
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
      )}
    </Flex>
  )
}

export default Debug
