import { useToggle } from '@react-hookz/web'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import useApi from '../Api/useApi'
import Spinner from '../App/Spinner'
import { formatDate } from '../App/helpers'
import { Text, Flex, Box, Button } from '../Primitives'

const getMembers = (data) =>
  data.members.map((member) => ({
    ...member?.affiliation,
    ...member?.person,
  }))

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
    <Button
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        fontWeight: 'bold',
        ':hover': { textDecoration: 'underline' },
        mb: 1,
      }}
      variant="base"
    >
      <Text as="span" mr={1}>
        {text}
      </Text>{' '}
      {expand ? <FiChevronUp /> : <FiChevronDown />}
    </Button>
  )
}

function Detailed(props) {
  const { pid, summary, releaseDate } = props
  const [expanded, toggle] = useToggle(false)

  return (
    <>
      <Box as="article">{summary}</Box>
      <br />
      <Text sx={{ fontWeight: 'bold' }}>
        Released: {formatDate(releaseDate)}
      </Text>
      <Box>
        <Title expand={expanded} text="Members" onClick={() => toggle()} />
        {expanded && (
          <ErrorBoundary
            fallback={
              <Text sx={{ color: 'darksalmon' }}>Unable to load members</Text>
            }
            resetKeys={[pid]}
          >
            <Suspense fallback={<Spinner />}>
              <Table
                table={{
                  url: `/documents/${encodeURIComponent(pid)}`,
                  config: { include: ['person', 'affiliation'] },
                  mergeFn: getMembers,
                  rowId: 'id',
                  columns: [
                    ['Person', 'fullName'],
                    ['Affiliation', 'name'],
                  ],
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </Box>
    </>
  )
}

export default Detailed
