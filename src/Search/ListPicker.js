import { capitalizeAndSpace } from '../App/helpers';
import { Text, Flex } from '../Primitives';
import { useListQueryParam } from '../router-utils';
import FilterBox from './Filter';

function ListPicker(props) {
  const { obj } = props;
  const param = useListQueryParam(obj.name);

  return (
    <FilterBox title={obj.name} isActive={param.isActive}>
      <Flex column gap={1}>
        {obj.list.map((word) => {
          const isSelected = param.values.includes(word);

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
                onChange={() => param.toggleValue(word)}
                style={{ cursor: 'inherit' }}
              />
              <Text flex="1 1 0%" ml={2}>
                {capitalizeAndSpace(word)}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </FilterBox>
  );
}

export default ListPicker;
