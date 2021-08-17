import { Text, Flex } from '../Primitives';

function OptionsPicker(props) {
  const { obj } = props;

  function toggleOption(option) {
    obj.assocValue(option);
    if (!obj.isActive) {
      obj.toggleIsActive(1);
    }
  }

  return (
    <Flex column gap={1}>
      {obj.options.map((option) => {
        const isSelected = obj.isActive && obj.value === option;

        return (
          <Flex
            key={option}
            as="label"
            sx={{
              alignItems: 'center',
              color: isSelected && 'heading',
              fontSize: 0,
              fontWeight: isSelected && 'bold',
              cursor: 'pointer',
              ':hover': { textDecoration: 'underline' },
            }}
          >
            <input
              name={obj.name}
              value={option}
              type="radio"
              checked={isSelected}
              onChange={(evt) => toggleOption(evt.target.value)}
              style={{ cursor: 'inherit' }}
            />

            <Text flex="1 1 0%" ml={2}>
              {option}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default OptionsPicker;
