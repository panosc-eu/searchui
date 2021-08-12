import { useAppStore } from '../App/stores';
import { Image, Flex, Box, NavLink } from '../Primitives';

const Navigation = () => {
  const isDark = useAppStore((state) => state.isDark);

  const Logo = () => (
    <Box height={'navIcon'} p={[1, 0]}>
      <Image
        height="100%"
        width="unset"
        alt="PaNOSC logo"
        src={!isDark ? '/PaNOSC_logo_black.svg' : '/PaNOSC_logo_white.svg'}
      />
    </Box>
  );

  return (
    <Flex sx={{ bg: 'nav', height: 'nav' }}>
      <NavLink to="/" exact>
        <Logo />
      </NavLink>
      <NavLink to="/documents" exact>
        Explore
      </NavLink>

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
};

export default Navigation;
