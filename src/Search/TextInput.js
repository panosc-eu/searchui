import { useRef } from 'react';

import { Input } from '@rebass/forms/styled-components';
import { FiDelete } from 'react-icons/fi';

import { Flex, Button } from '../Primitives';

function TextInput(props) {
  const { obj } = props;
  const inputRef = useRef(null);

  return (
    <Flex mb={2}>
      <Input
        ref={inputRef}
        variant="input"
        onChange={(e) => {
          if (!obj.isActive) {
            obj.toggleIsActive(1);
          }
          if (e.target.value === '') {
            obj.toggleIsActive(0);
          }

          obj.assocValue(e.target.value);
        }}
      />
      <Button
        disabled={!obj.value}
        variant="ghost"
        ml={2}
        fontSize={2}
        onClick={() => {
          inputRef.current.value = '';
          obj.toggleIsActive(0);
          obj.assocValue('');
        }}
      >
        <FiDelete />
      </Button>
    </Flex>
  );
}

export default TextInput;
