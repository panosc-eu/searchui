import React from 'react';

import { Link as RebassLink } from 'rebass/styled-components';

const Link = ({ sx, ...props }) => (
  <RebassLink
    sx={{
      ...sx,
      ':hover': props.noUnderline && { textDecoration: 'none' },
    }}
    target={props.blank && '_blank'}
    {...props}
  />
);

export default Link;
