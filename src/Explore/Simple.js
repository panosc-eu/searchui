import { parseDate } from '../App/helpers'
import { Box, Text } from '../Primitives'

function Simple({ summary, releaseDate }) {
  return (
    <>
      <Box
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
        }}
      >
        {summary}
      </Box>
      <br />
      <Text sx={{ fontStyle: 'italic' }}>
        Released: {parseDate(releaseDate)}
      </Text>
    </>
  )
}

export default Simple
