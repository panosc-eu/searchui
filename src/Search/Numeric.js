import { useDebouncedCallback } from '@react-hookz/web'
import { Input, Select } from '@rebass/forms/styled-components'
import { FiSlash } from 'react-icons/fi'

import { Flex, Box, Button } from '../Primitives'
import { SEPARATE_CHAR, useFilters } from '../filters'
import { JOIN_CHAR, useQueryParam } from '../router-utils'
import FilterBox from './Filter'

const onlyMax = (max, unit) =>
  `${max + SEPARATE_CHAR}lte${unit ? SEPARATE_CHAR + unit : ''}`
const onlyMin = (min, unit) =>
  `${min + SEPARATE_CHAR}gte${unit ? SEPARATE_CHAR + unit : ''}`
const both = (min, max, unit) =>
  `${min + JOIN_CHAR + max + SEPARATE_CHAR}between${
    unit ? SEPARATE_CHAR + unit : ''
  }`

function Numeric({ obj }) {
  const { id, display, units = [] } = obj
  const [defaultUnit, ...otherUnits] = units

  const {
    value,
    operator,
    unit = defaultUnit,
  } = [...useFilters()].find((filter) => filter.id === id) || {}

  const [min = '', max = ''] = Array.isArray(value)
    ? value
    : operator === 'gte'
    ? [value]
    : [undefined, value]

  const param = useQueryParam(id)
  const { setValue, remove, isActive } = param
  const reset = () => {
    remove()
    return document.querySelector(`#form-${id}`).reset()
  }

  const update = useDebouncedCallback(
    (min, max, unit) => {
      if (min === '' && max === '') {
        return reset()
      }
      if (min && max) {
        return setValue(both(min, max, unit))
      }
      if (max && min === '') {
        return setValue(onlyMax(max, unit))
      }
      return setValue(onlyMin(min, unit))
    },
    [setValue, reset],
    500,
  )

  return (
    <FilterBox title={display || id} isActive={isActive}>
      <Box id={`form-${id}`} as="form" onSubmit={(e) => e.preventDefault()}>
        <Flex>
          <Box>
            <Input
              type="number"
              id="min"
              name="min"
              placeholder="min"
              defaultValue={min}
              onChange={(e) => update(e.target.value, max, unit)}
            />
          </Box>
          <Box>
            <Input
              type="number"
              id="max"
              name="max"
              placeholder="max"
              defaultValue={max}
              onChange={(e) => update(min, e.target.value, unit)}
            />
          </Box>
          {units.length > 0 && (
            <Box width={1 / 2}>
              <Select
                onChange={(e) => {
                  update(min, max, e.target.value)
                }}
                id="unit"
                name="unit"
                defaultValue={unit}
              >
                <option key="none" value="">
                  -
                </option>
                <option key={defaultUnit}>{defaultUnit}</option>
                {otherUnits.map((str) => (
                  <option key={str}>{str}</option>
                ))}
              </Select>
            </Box>
          )}
          <Button
            variant="action"
            disabled={!(min || max)}
            aria-label="Clear"
            onClick={() => reset()}
          >
            <FiSlash />
          </Button>
        </Flex>
      </Box>
    </FilterBox>
  )
}

export default Numeric
