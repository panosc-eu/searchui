/* eslint-disable jsx-a11y/control-has-associated-label */
import { Text, Flex } from '../Primitives'
import { useQueryParam } from '../router-utils'
import FilterBox from './Filter'

function OptionsPicker(props) {
  const { obj } = props
  const param = useQueryParam(obj.id)

  return (
    <FilterBox
      title={obj.display || obj.id}
      isActive={param.isActive}
      onClear={() => param.remove()}
    >
      <Flex column gap={1}>
        {obj.options.map((option) => {
          const isSelected = param.value === option

          return (
            <Flex
              key={option}
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
                name={obj.id}
                value={option}
                type="radio"
                checked={isSelected}
                onChange={(evt) => param.setValue(option)}
                style={{ cursor: 'inherit' }}
              />

              <Text as="span" flex="1 1 0%" ml={2}>
                {option}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </FilterBox>
  )
}

export default OptionsPicker
