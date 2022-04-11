import { Heading, Flex, Box } from '../Primitives'
import Autocomplete from './Autocomplete'
import Numeric from './Numeric'
import OptionsPicker from './OptionsPicker'
import TextInput from './TextInput'

function getFilterComponent(obj) {
  const { type, id } = obj
  if (type === 'numeric') {
    return Numeric
  }

  if (type === 'options') {
    return OptionsPicker
  }

  if (id === 'technique') {
    return Autocomplete
  }

  return TextInput
}

function FilterGroup(props) {
  const { name, filters } = props

  return (
    <Box as="section">
      <Heading variant="filterGroup">{name}</Heading>
      <Flex column gap={3}>
        {filters.map((obj) => {
          const Filter = getFilterComponent(obj)
          return Filter && <Filter key={obj.id} obj={obj} />
        })}
      </Flex>
    </Box>
  )
}
export default FilterGroup
