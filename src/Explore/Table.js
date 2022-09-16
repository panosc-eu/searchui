import { CHAR } from '../App/helpers'
import { Link, Flex, Box } from '../Primitives'
import { dark } from '../colors'

function Table({ data, title, open }) {
  return (
    <Box as="details" open={open} sx={{ pb: 3 }}>
      <Box as="summary" sx={{ cursor: 'pointer' }}>
        <strong>{title}</strong>
      </Box>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {data.map(([label, content]) => {
          const link =
            typeof content === 'string' &&
            content.includes(CHAR.split) &&
            content.split(CHAR.split)
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
              key={label + JSON.stringify(content)}
            >
              <Box>{label}</Box>
              {link ? (
                <Link href={link[1]} blank>
                  {link[0]}
                </Link>
              ) : (
                <Box>{content}</Box>
              )}
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}

export default Table
