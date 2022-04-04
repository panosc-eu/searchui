import { Input } from '@rebass/forms/styled-components'
import { FiSearch } from 'react-icons/fi'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { useSearchStore } from '../App/stores'
import { Box, Button, Text, Flex, Image, NavLink } from '../Primitives'
import { useQueryParam } from '../router-utils'

function Navigation() {
  const location = useLocation()
  const { value: query, setValue: setQuery } = useQueryParam('q')

  function handleSubmit(evt) {
    evt.preventDefault()
    const param = new URLSearchParams(new FormData(evt.target))
    const newQuery = param.get('q').trim()
    if (newQuery !== '') {
      setQuery(newQuery)
    }
  }

  const count = useSearchStore((state) => state.count)

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
            src="/PaNOSC_logo_white.svg"
          />
        </Box>
      </NavLink>

      <Route path="/search">
        {!query?.trim() && <Redirect to="/" />}
        <Flex as="form" onSubmit={handleSubmit}>
          <Flex
            sx={{
              alignSelf: 'center',
              flex: '1 1 0%',
              maxWidth: '30rem',
              px: 3,
            }}
          >
            <Input key={location.search} name="q" defaultValue={query} mr={2} />
            <Button>
              <FiSearch />
            </Button>
          </Flex>
          <Flex sx={{ alignSelf: 'center' }}>
            {count === 50 ? '50+' : count} results
          </Flex>
        </Flex>
      </Route>
    </Flex>
  )
}

export default Navigation
