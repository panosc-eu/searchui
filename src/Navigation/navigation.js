import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Switch from 'react-switch-selector';

import { useNavigationStore, useAppStore } from '../App/stores';
import { Image, Flex, Box } from '../Primitives';

const Navigation = () => {
  const [isDark, toggleTheme, isDesktop] = useAppStore((state) => [
    state.isDark,
    state.toggleTheme,
    state.isDesktop,
  ]);
  const sections = useNavigationStore((state) => state.sections);

  //Component refactor needed!
  const SectionLink = (props) => (
    <Flex
      sx={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
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

  const overrideHome = sections.find((s) => s.overrideHome);
  const mainComponent = sections.find((s) => s.main);

  const Home = () => (
    <Box height={'navIcon'} p={[1, 0]} onClick={() => mainComponent?.onClick()}>
      <Image
        height="100%"
        width="unset"
        alt="PaNOSC logo"
        src={!isDark ? '/PaNOSC_logo_black.svg' : '/PaNOSC_logo_white.svg'}
      />
    </Box>
  );
  const isHome = useLocation().pathname === '/';
  const Breadcrumb = () =>
    isHome ||
    (isDesktop && (
      <SectionLink {...mainComponent}>{mainComponent?.name}</SectionLink>
    ));

  return (
    <Flex
      sx={{
        bg: 'nav',
        height: 'nav',
        alignItems: 'center',
      }}
    >
      {overrideHome ? (
        <SectionLink {...overrideHome}>
          <Home />
        </SectionLink>
      ) : (
        <SectionLink as={NavLink} exact={true} to="/">
          <Home />
        </SectionLink>
      )}
      <Breadcrumb />

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

      <Box mx="auto" />
      <Box width="80px" mx={2} height="30px">
        <Switch
          options={[{ label: 'Light' }, { label: 'Dark' }]}
          forcedSelectedIndex={isDark ? 1 : 0}
          onChange={() => toggleTheme()}
        />
      </Box>
    </Flex>
  );
};

export default Navigation;
