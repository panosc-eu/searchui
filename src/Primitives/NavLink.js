import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Flex } from '.';

const NavLink = (props) => {
  const match = useRouteMatch({ path: props.to, exact: props.exact });

  return (
    <Flex
      as={Link}
      sx={{
        alignItems: 'center',
        px: [2, 3],
        bg: !!match && 'background',
        color: !!match ? 'text' : 'inherit',
        fontSize: [0, 1],
        fontWeight: 600,
        textDecoration: 'none',
        textTransform: 'uppercase',
        ':hover': { color: 'text', bg: 'background' },
      }}
      {...props}
    />
  );
};

export default NavLink;
