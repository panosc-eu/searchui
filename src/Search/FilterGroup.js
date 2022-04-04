import { Heading, Flex, Box } from '../Primitives'
import Autocomplete from './Autocomplete'
import ListPicker from './ListPicker'
import OptionsPicker from './OptionsPicker'
import Range from './Range'
import TextInput from './TextInput'

const TEXT_OPERATORS = new Set([
  'ilike',
  'nilike',
  'like',
  'nlike',
  'regexp',
  'eq',
  'neq',
])

function getFilterComponent(obj) {
  if (obj.operator === 'between') {
    return Range
  }

  if (obj.options) {
    return OptionsPicker
  }

  if (obj.optionsUrl) {
    return Autocomplete
  }

  if (obj.list) {
    return ListPicker
  }

  if (obj.name === 'text' || TEXT_OPERATORS.has(obj.operator)) {
    return TextInput
  }

  return null
}

function FilterGroup(props) {
  const { name, filters } = props

  return (
    <Box as="section">
      <Heading variant="filterGroup">{name}</Heading>
      <Flex column gap={3}>
        {filters.map((obj) => {
          const Filter = getFilterComponent(obj)
          return Filter && <Filter key={obj.label} obj={obj} />
        })}
      </Flex>
    </Box>
  )
}
export default FilterGroup
