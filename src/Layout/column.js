import React from 'react';

import { Flex } from '../Primitives';

const Column = (props) => (
  <Flex
    sx={{
      flexDirection: 'column',
      gap: [3, 3, 3, 4],
    }}
    ref={props?.forwardRef}
    className={props.className}
  >
    {props.children}
  </Flex>
);

export default Column;
