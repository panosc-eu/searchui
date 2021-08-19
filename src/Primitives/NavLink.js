import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Flex } from '.';

function NavLink({ to, exact, sx, ...props }) {
  const match = useRouteMatch({ path: to, exact });

  return (
    <Flex
      as={Link}
      to={to}
      sx={{
        alignItems: 'center',
        px: [2, 3],
        bg: !!match && 'background',
        color: !!match ? 'text' : 'inherit',
        fontSize: [0, 1],
        fontWeight: 'semibold',
        textDecoration: 'none',
        textTransform: 'uppercase',
        ':hover': { color: 'text', bg: 'background' },
        ...sx,
      }}
      {...props}
    />
  );
}

export default NavLink;
