import { forwardRef } from 'react';

import { Flex as RebassFlex } from 'rebass/styled-components';

const Flex = forwardRef(({ column, gap, sx, ...props }, ref) => (
  <RebassFlex
    ref={ref}
    flexDirection={column && 'column'}
    sx={{ gap, ...sx }}
    {...props}
  />
));

export default Flex;
