import { Flex, Box, Link } from '../Primitives'

function Footer() {
  return (
    <Flex
      sx={{
        width: '100%',
        bg: 'middleground',
        p: [1, 2, 2, 3],
        justifyContent: 'space-between',
      }}
    >
      <Box>Placeholder</Box>
      <Box>
        Something's not right?{' '}
        <Link href="mailto:feedback@panosc.eu" blank>
          Please, let us know!
        </Link>
      </Box>
    </Flex>
  )
}
export default Footer
