import { formatDateVerbose } from '../App/helpers'
import { Box, Link } from '../Primitives'
import providers from '../providers.json'

function Simple({ summary, releaseDate, provider: providerURL }) {
  const provider = providers.find((provider) => providerURL === provider.url)
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
      {(releaseDate || provider) && (
        <Box pt={3}>
          {releaseDate && provider ? (
            <>
              {`Released on ${formatDateVerbose(releaseDate)} by `}
              <Link href={provider.homepage} blank>
                {provider.abbr}
              </Link>
            </>
          ) : releaseDate ? (
            `Released on ${formatDateVerbose(releaseDate)}`
          ) : (
            <>
              {'Released by '}
              <Link href={provider.homepage} blank>
                {provider.abbr}
              </Link>
            </>
          )}
        </Box>
      )}
    </>
  )
}

export default Simple
