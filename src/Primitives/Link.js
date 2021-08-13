import React from 'react';

import { Link } from 'rebass/styled-components';

const RLink = ({ sx, ...props }) => (
  <Link
    sx={{
      ...sx,
      ':hover': props.noUnderline && { textDecoration: 'none' },
    }}
    target={props.blank && '_blank'}
    {...props}
  />
);

export default RLink;
