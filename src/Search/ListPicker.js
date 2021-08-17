import { capitalizeAndSpace } from '../App/helpers';
import { Heading, Flex } from '../Primitives';

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
    <Flex column>
      {obj.list.map((word) => (
        <Flex>
          <Heading
            key={word}
            as="a"
            variant="small"
            onClick={() => toggleKeyword(word)}
            sx={{
              color:
                obj.isActive && obj.value.includes(word) ? 'heading' : 'text',
              fontSize: 0,
              fontWeight: obj.isActive && obj.value.includes(word) ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {capitalizeAndSpace(word)}
          </Heading>
        </Flex>
      ))}
    </Flex>
  );
}

export default ListPicker;
