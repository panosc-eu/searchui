import { formatDateVerbose } from '../App/helpers'
import { Box, Text, Link } from '../Primitives'
import providers from '../providers.json'

function Simple({ summary, releaseDate, provider: url }) {
  const provider = providers.find(({ source }) => url === source)
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
        Released on{' '}
        {provider
          ? `${formatDateVerbose(releaseDate)} by the
            `
          : formatDateVerbose(releaseDate)}
        {provider && (
          <Link href={provider.link} blank>
            {provider.abbr}
          </Link>
        )}
      </Text>
    </>
  )
}

export default Simple
