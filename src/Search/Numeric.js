import { useDebouncedCallback } from '@react-hookz/web'
import { Input, Select } from '@rebass/forms/styled-components'
import { FiSlash } from 'react-icons/fi'

import useFilters, { processNumeric, SEPARATE_CHAR } from '../Api/useFilters'
import { Flex, Box, Button } from '../Primitives'
import { JOIN_CHAR, useQueryParam } from '../router-utils'
import FilterBox from './Filter'

const onlyMax = (max, unit) =>
  `${max + SEPARATE_CHAR}lte${unit ? SEPARATE_CHAR + unit : ''}`
const onlyMin = (min, unit) =>
  `${min + SEPARATE_CHAR}gte${unit ? SEPARATE_CHAR + unit : ''}`
const between = (min, max, unit) =>
  `${min + JOIN_CHAR + max + SEPARATE_CHAR}between${
    unit ? SEPARATE_CHAR + unit : ''
  }`

const getValues = (str) => {
  const [rawVal, operator, unit] = str?.split("'") || []
  const value = processNumeric(rawVal)
  return { value, operator, unit }
}

function Numeric({ obj, isStateful, statefulParam }) {
  const { id, display, units = [], defaulUnit: defUnit } = obj
  const [firstUnit, ...otherUnits] = units
  const defaultUnit = defUnit || firstUnit
  const uriData = useFilters().find((filter) => filter.id === id) || {}
  const statefulData = getValues(statefulParam.value)

  const {
    value,
    operator,
    unit = value ? '' : defaultUnit,
  } = isStateful ? statefulData : uriData

  const [min = '', max = ''] = Array.isArray(value)
    ? value
    : operator === 'gte'
    ? [value]
    : [undefined, value]

  const queryParam = useQueryParam(id)
  const param = isStateful ? statefulParam : queryParam
  const { setValue, remove, isActive } = isStateful ? statefulParam : param
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
        return setValue(between(min, max, unit))
      }
      if (max && min === '') {
        return setValue(onlyMax(max, unit))
      }
      return setValue(onlyMin(min, unit))
    },
    [setValue, reset],
    500,
  )

  const defaultUnitVL = defaultUnit.includes('|')
    ? defaultUnit.split('|')
    : [defaultUnit, defaultUnit]
  const otherUnitsVL = otherUnits.map((value) =>
    value.includes('|') ? value.split('|') : [value, value],
  )

  return (
    <FilterBox title={display || id} isActive={isActive}>
      <Box id={`form-${id}`} as="form" onSubmit={(e) => e.preventDefault()}>
        <Flex>
          <Box sx={{ flex: '1 1 0%' }}>
            <Input
              type="number"
              id="min"
              name="min"
              placeholder="min"
              defaultValue={min}
              onChange={(e) => update(e.target.value, max, unit)}
              fontSize={0}
            />
          </Box>
          <Box sx={{ marginLeft: 1, flex: '1 1 0%' }}>
            <Input
              type="number"
              id="max"
              name="max"
              placeholder="max"
              defaultValue={max}
              onChange={(e) => update(min, e.target.value, unit)}
              fontSize={0}
            />
          </Box>
          <Box sx={{ marginLeft: 1, flex: '1 1 0%' }}>
            {units.length > 0 && (
              <Select
                onChange={(e) => {
                  update(min, max, e.target.value)
                }}
                id="unit"
                name="unit"
                defaultValue={unit}
                fontSize={0}
              >
                <option value="">-</option>
                <option value={defaultUnitVL[0]} key={defaultUnitVL[0]}>
                  {defaultUnitVL[1]}
                </option>
                {otherUnitsVL.map((item) => (
                  <option value={item[0]} key={item[0]}>
                    {item[1]}
                  </option>
                ))}
              </Select>
            )}
          </Box>
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
