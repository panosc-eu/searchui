import {capitalizeAndSpace} from '../App/helpers'
import {Heading} from '../Primitives'

const Keywords = ({obj}) => {
  const toggleKeyword = (word) => {
    if (!obj.isActive) {
      obj.toggleIsActive(1)
    }
    if (obj.isActive && obj.value.length === 1 && obj.value.includes(word)) {
      obj.toggleIsActive(0)
    }
    return obj.toggleValueInList(word)
  }
  return obj.list.map((word) => (
    <Heading
      key={word}
      fontSize={0}
      variant="small"
      as="a"
      onClick={() => toggleKeyword(word)}
      sx={{
        cursor: 'pointer',
        color: obj.isActive && obj.value.includes(word) ? 'heading' : 'text',
        fontWeight: obj.isActive && obj.value.includes(word) ? 600 : 400,
      }}
    >
      {capitalizeAndSpace(word)}
    </Heading>
  ))
}

export default Keywords
