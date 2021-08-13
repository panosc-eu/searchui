import { Input } from '@rebass/forms/styled-components';

import { Box } from '../Primitives';

function TextInput(props) {
  const { obj } = props;

  return (
    <Box mx={-1} mt={-1} mb={2}>
      <Input
        onChange={(e) => {
          if (!obj.isActive) {
            obj.toggleIsActive(1);
          }
          if (e.target.value === '') {
            obj.toggleIsActive(0);
          }
          return obj.assocValue(e.target.value);
        }}
      />
    </Box>
  );
}

export default TextInput;
