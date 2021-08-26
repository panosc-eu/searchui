import { Heading, Flex, Box } from '../Primitives';
import ListPicker from './ListPicker';
import OptionsPicker from './OptionsPicker';
import Range from './Range';
import TextInput from './TextInput';

const TEXT_OPERATORS = [
  'ilike',
  'nilike',
  'like',
  'nlike',
  'regexp',
  'eq',
  'neq',
];

function getFilterComponent(obj) {
  if (obj.operator === 'between') {
    return Range;
  }

  if (obj.options) {
    return OptionsPicker;
  }

  if (obj.list) {
    return ListPicker;
  }

  if (TEXT_OPERATORS.includes(obj.operator)) {
    return TextInput;
  }

  return null;
}

function FilterGroup(props) {
  const { name, filters } = props;

  return (
    <Box as="section">
      <Heading variant="filterGroup">{name}</Heading>
      <Flex column gap={3}>
        {filters.map((obj) => {
          const Filter = getFilterComponent(obj);
          return Filter && <Filter key={obj.name} obj={obj} />;
        })}
      </Flex>
    </Box>
  );
}
export default FilterGroup;
