import React from 'react';

import { Flex, Text } from '../Primitives';

function MetaItem(props) {
  const { label, children } = props;

  return (
    <Flex
      as="li"
      sx={{
        borderTop: '1px solid background',
        ':last-child > div': { pb: [2, 2, 3, 4] },
      }}
    >
      <Text
        sx={{
          width: '25%',
          px: [1, 2, 3, 4],
          py: [2],
          borderRight: '1px solid background',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Text>
      <Text
        sx={{
          flex: '1 1 0%',
          px: [1, 2, 3, 4],
          py: [2],
        }}
      >
        {children}
      </Text>
    </Flex>
  );
}

export default MetaItem;
