import React from 'react';

import { Link as RebassLink } from 'rebass/styled-components';

const Link = ({ blank, noUnderline, sx, ...props }) => (
  <RebassLink
    target={blank && '_blank'}
    sx={{
      ':hover': noUnderline && { textDecoration: 'none' },
      ...sx,
    }}
    {...props}
  />
);

export default Link;
