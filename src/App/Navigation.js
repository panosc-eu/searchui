import { Input } from '@rebass/forms/styled-components'
import { FiSearch } from 'react-icons/fi'
import { Route, useHistory } from 'react-router-dom'

import { useAppStore } from '../App/stores'
import { Box, Button, Flex, Image, NavLink } from '../Primitives'
import { useQueryParam } from '../router-utils'

function Navigation() {
  const history = useHistory()
  const isDark = useAppStore((state) => state.isDark)
  const { value: query } = useQueryParam('q')

  function handleSubmit(evt) {
    evt.preventDefault()
    const param = new URLSearchParams(new FormData(evt.target))
    if (param.get('q') === '') {
      return
    }

    history.push(`?${param}`)
  }

  return (
    <Flex
      as="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        height: 'navHeight',
        mb: [3, 4],
        bg: 'bgNav',
      }}
    >
      <NavLink to="/" exact>
        <Box height="logoHeight" p={[1, 0]}>
          <Image
            height="100%"
            width="unset"
            alt="PaNOSC logo"
            src={isDark ? '/PaNOSC_logo_white.svg' : '/PaNOSC_logo_black.svg'}
          />
        </Box>
      </NavLink>

      <Route path="/search">
        {!query?.trim() && <Redirect to="/" />}
        <Box as="form" sx={{ display: 'flex' }} onSubmit={handleSubmit}>
          <Flex
            sx={{
              alignSelf: 'center',
              flex: '1 1 0%',
              maxWidth: '30rem',
              px: 3,
            }}
          >
            <Input name="q" defaultValue={query} mr={2} />
            <Button>
              <FiSearch />
            </Button>
          </Flex>
        </Box>
      </Route>
    </Flex>
  )
}

export default Navigation
