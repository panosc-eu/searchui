import { capitalizeAndSpace } from '../App/helpers';
import { Text, Flex } from '../Primitives';

function ListPicker(props) {
  const { obj } = props;

  function toggleKeyword(word) {
    const isWordSelected = obj.value.includes(word);
    obj.toggleValueInList(word);

    if (isWordSelected && obj.value.length === 1) {
      obj.toggleIsActive(0);
    } else if (!isWordSelected && !obj.isActive) {
      obj.toggleIsActive(1);
    }
  }

  return (
    <Flex column gap={1}>
      {obj.list.map((word) => {
        const isSelected = obj.value.includes(word);

        return (
          <Flex
            key={word}
            as="label"
            sx={{
              alignItems: 'center',
              color: isSelected && 'textVivid',
              fontSize: 0,
              fontWeight: isSelected && 'bold',
              cursor: 'pointer',
              ':hover': { textDecoration: 'underline' },
            }}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleKeyword(word)}
              style={{ cursor: 'inherit' }}
            />
            <Text flex="1 1 0%" ml={2}>
              {capitalizeAndSpace(word)}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default ListPicker;
