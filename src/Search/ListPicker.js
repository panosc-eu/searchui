import { capitalizeAndSpace } from '../App/helpers';
import { Text, Flex } from '../Primitives';

function ListPicker(props) {
  const { obj } = props;

  function toggleKeyword(word) {
    if (!obj.isActive) {
      obj.toggleIsActive(1);
    }
    if (obj.isActive && obj.value.length === 1 && obj.value.includes(word)) {
      obj.toggleIsActive(0);
    }
    return obj.toggleValueInList(word);
  }

  return (
    <Flex column gap={1}>
      {obj.list.map((word) => (
        <Flex
          key={word}
          as="label"
          sx={{
            alignItems: 'center',
            color: obj.isActive && obj.value.includes(word) && 'heading',
            fontSize: 0,
            fontWeight: obj.isActive && obj.value.includes(word) && 'bold',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            onChange={() => toggleKeyword(word)}
            style={{ cursor: 'inherit' }}
          />
          <Text ml={2}>{capitalizeAndSpace(word)}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default ListPicker;
