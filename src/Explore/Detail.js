import { useToggle } from '@react-hookz/web'
import { Suspense } from 'react'

import useApi from '../Api/useApi'
import Spinner from '../App/Spinner'
import { Text, Flex, Box } from '../Primitives'

function Table({ table }) {
  const { url, columns, mergeFn, rowId: id, config } = table
  const { data: rawData } = useApi(url, [], config)

  const data = mergeFn(rawData)

  function Row({ children }) {
    return (
      <Box px={2} width={1 / columns.length}>
        {children}
      </Box>
    )
  }

  return (
    <Flex column>
      <Flex sx={{ borderBottom: '1px solid' }}>
        {columns.map(([header]) => (
          <Row key={header}>
            <Text fontWeight="bold">{header}</Text>
          </Row>
        ))}
      </Flex>
      {data.map((row, idx) => (
        <Flex bg={idx % 2 ? 'middleground' : 'foreground'} key={`f${row[id]}`}>
          {columns.map(([, field]) => (
            <Row key={field + row[id]}>
              <Text>{row[field] || 'not available'}</Text>
            </Row>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}
function Title({ expand, onClick, text }) {
  return (
    <Text onClick={onClick} fontWeight="bold">
      {`${text} ${expand ? '\u2227' : '\u2228'}`}
    </Text>
  )
}
function Details(props) {
  const { open, title } = props
  const [expanded, toggle] = useToggle(open)
  return (
    <Box
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => toggle()}
    >
      <Title expand={expanded} text={title} />
      <Suspense fallback={<Spinner />}>
        {expanded && <Table table={props} />}
      </Suspense>
    </Box>
  )
}

export default Details
