import React from 'react';

import { Flex } from '../Primitives';

const Row = (props) => (
  <Flex
    sx={{
      flexDirection: 'row',
      flexWrap: ['wrap', 'wrap', 'nowrap'],
      gap: [1, 2, 3, 4],
      height: 'inherit',
    }}
    className={props.className}
  >
    {props.children}
  </Flex>
);

export default Row;
