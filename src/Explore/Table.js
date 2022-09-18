import { Link, Flex, Box } from '../Primitives'
import { dark } from '../colors'

const isLink = (x) => Array.isArray(x)

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
                return isLink(field) ? (
                  <Link key={row + field} href={field[1]} blank>
                    {field[0]}
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
