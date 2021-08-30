
import { useDebouncedCallback } from '@react-hookz/web';
import { Input } from '@rebass/forms/styled-components';
import { useState } from 'react';
import { FiSlash } from 'react-icons/fi';

import { Flex, Button } from '../Primitives';
import { useQueryParam } from '../router-utils';
import FilterBox from './Filter';

function TextInput(props) {
  const { obj } = props;

  const param = useQueryParam(obj.name);
  const [inputValue, setInputValue] = useState(param.value || '');

  const handleChange = useDebouncedCallback(
    (val) => param.setValue(val),
    [param],
    500
  );

  return (
    <FilterBox title={obj.name} isActive={param.isActive}>
      <Flex>
        <Input
          px={2}
          value={inputValue}
          onChange={(evt) => {
            const { value } = evt.target;
            setInputValue(value);
            handleChange(value);
          }}
        />
        <Button
          variant="action"
          disabled={!inputValue}
          aria-label="Clear"
          onClick={() => {
            setInputValue('');
            param.remove();
          }}
        >
          <FiSlash />
        </Button>
      </Flex>
    </FilterBox>
  );
}

export default TextInput;
