import { CHAR } from '../App/helpers'
import { Link, Flex, Box } from '../Primitives'
import { dark } from '../colors'

const getLink = (x) =>
  typeof x === 'string' &&
  x.includes(CHAR.heavySplit) &&
  x.split(CHAR.heavySplit)

function Table({ data, title, open }) {
  return (
    <Box as="details" open={open} sx={{ pb: 3 }}>
      <Box as="summary" sx={{ cursor: 'pointer' }}>
        <strong>{title}</strong>
      </Box>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {data.map((row) => {
          return (
            <Flex
              sx={{
                p: 1,
                justifyContent: 'space-between',
                borderBottom: `1px solid ${dark.foreground}`,
                flexWrap: 'wrap',
                ':last-child': {
                  borderBottom: 0,
                },
              }}
              key={JSON.stringify(row)}
            >
              {row.map((field) => {
                const link = getLink(field)
                return link ? (
                  <Link key={row + field} href={link[1]} blank>
                    {link[0]}
                  </Link>
                ) : (
                  <Box key={row + field}>{field}</Box>
                )
              })}
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}

export default Table
