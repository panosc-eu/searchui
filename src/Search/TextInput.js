import { useRef } from 'react';

import { useDebouncedCallback } from '@react-hookz/web';
import { Input } from '@rebass/forms/styled-components';
import { FiSlash } from 'react-icons/fi';

import { Flex, Button } from '../Primitives';

function TextInput(props) {
  const { obj } = props;
  const inputRef = useRef(null);

  const handleChange = useDebouncedCallback(
    (evt) => {
      if (!obj.isActive) {
        obj.toggleIsActive(1);
      }
      if (evt.target.value === '') {
        obj.toggleIsActive(0);
      }

      obj.assocValue(evt.target.value);
    },
    [obj],
    300
  );

  return (
    <Flex>
      <Input ref={inputRef} onChange={handleChange} />
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
