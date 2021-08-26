import { FiArrowLeft } from 'react-icons/fi';
import { Route, useLocation, useHistory } from 'react-router-dom';

import { useAppStore } from '../App/stores';
import { Image, Flex, Box, NavLink, Text } from '../Primitives';

function Navigation() {
  const isDark = useAppStore((state) => state.isDark);

  const history = useHistory();
  const { state } = useLocation();

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
            src={!isDark ? '/PaNOSC_logo_black.svg' : '/PaNOSC_logo_white.svg'}
          />
        </Box>
      </NavLink>
      <NavLink to="/documents" exact>
        Explore
      </NavLink>

      <Route exact path="/documents/:documentId">
        <NavLink
          to="/documents"
          exact
          ml="auto"
          onClick={(evt) => {
            if (state?.fromExplorePage) {
              evt.preventDefault();
              history.goBack();
            }
          }}
        >
          <FiArrowLeft style={{ fontSize: '1.5em', paddingTop: '1px' }} />
          <Text ml={2}>Back to results</Text>
        </NavLink>
      </Route>

      {/* <Box mx="auto" />
      <Box width="80px" mx={2} height="30px" alignSelf="center">
        <Switch
          options={[{ label: 'Light' }, { label: 'Dark' }]}
          forcedSelectedIndex={isDark ? 1 : 0}
          onChange={() => toggleTheme()}
        />
      </Box> */}
    </Flex>
  );
}

export default Navigation;
