import { capitalizeAndSpace } from '../App/helpers';
import { Heading } from '../Primitives';

function KeywordsPicker(props) {
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

  return obj.list.map((word) => (
    <Heading
      key={word}
      as="a"
      variant="small"
      onClick={() => toggleKeyword(word)}
      sx={{
        color: obj.isActive && obj.value.includes(word) ? 'heading' : 'text',
        fontSize: 0,
        fontWeight: obj.isActive && obj.value.includes(word) ? 600 : 400,
        cursor: 'pointer',
      }}
    >
      {capitalizeAndSpace(word)}
    </Heading>
  ));
}

export default KeywordsPicker;
