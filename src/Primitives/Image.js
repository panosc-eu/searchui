import React from 'react';

import { Image as RebassImage } from 'rebass/styled-components';

const Image = ({ sx, ...props }) => (
  <RebassImage
    sx={{ display: 'block', objectFit: 'cover', ...sx }}
    {...props}
  />
);

export default Image;
