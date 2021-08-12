import shallow from 'zustand/shallow';

import { useNavigationStore, useAppStore } from '../App/stores';
import { Image, Flex, Box, NavLink } from '../Primitives';

const Navigation = () => {
  const [isDark, isDesktop] = useAppStore(
    (state) => [state.isDark, state.isDesktop],
    shallow
  );

  const sections = useNavigationStore((state) => state.sections);

  //Component refactor needed!
  const SectionLink = (props) => (
    <Flex
      sx={{
        alignItems: 'center',
        fontSize: [0, 1],
        cursor: 'pointer',
        bg: props.active ? 'background' : 'nav',
        color: props.active ? 'text' : 'primary',
        borderRight: '2px solid',
        borderColor: 'background',
        fontWeight: 600,
        textTransform: 'uppercase',
        px: [1, 2, 3],
        ':hover': { color: 'text', bg: 'background' },
        '&.active': { bg: isDesktop && 'background' },
      }}
      {...props}
    />
  );

  const mainComponent = sections.find((s) => s.main);

  const Logo = () => (
    <Box height={'navIcon'} p={[1, 0]} onClick={() => mainComponent?.onClick()}>
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
        Browse
      </NavLink>

      {sections.map((section) => {
        return (
          isDesktop || (
            <SectionLink {...section}>
              {section.name.length > 15
                ? `${section.name.substring(0, 14)}...`
                : section.name}
            </SectionLink>
          )
        );
      })}

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
