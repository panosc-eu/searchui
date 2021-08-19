import { useRef } from 'react';

import { Input } from '@rebass/forms/styled-components';
import { FiSlash } from 'react-icons/fi';

import { Flex, Button } from '../Primitives';

function TextInput(props) {
  const { obj } = props;
  const inputRef = useRef(null);

  return (
    <Flex>
      <Input
        ref={inputRef}
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
        variant="action"
        disabled={!obj.isActive}
        aria-label="Clear"
        onClick={() => {
          inputRef.current.value = '';
          obj.toggleIsActive(0);
          obj.assocValue('');
        }}
      >
        <FiSlash />
      </Button>
    </Flex>
  );
}

export default TextInput;
