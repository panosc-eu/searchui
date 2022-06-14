import { Select } from '@rebass/forms/styled-components'
import { useEffect, useState } from 'react'

import { Flex, Box, Text } from '../Primitives'
import { useQueryParam } from '../router-utils'
import { useSearchStore } from './stores'

const COUNT_OPTIONS = [10, 25, 50, 100]

function ResultsCount() {
  const count = useSearchStore((state) => state.count)
  const { value, setValue } = useQueryParam('limit')

  const [options, setOptions] = useState(COUNT_OPTIONS)
  useEffect(() => {
    if (!!value && !COUNT_OPTIONS.includes(Number(value))) {
      const modifiedOptions = [...COUNT_OPTIONS, value]
      setOptions(modifiedOptions.sort((a, b) => a - b))
    } else {
      setOptions([...COUNT_OPTIONS])
    }
  }, [value])

  const defaultValue = process.env.REACT_APP_LIMIT || COUNT_OPTIONS[0]

  return (
    <Flex alignItems="center">
      <Text as="span">Showing</Text>
      <Box px={2} minWidth="fit-content">
        <Select
          id="limit"
          name="limit"
          value={value || defaultValue}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            overflow: 'visible',
            paddingRight: 4,
          }}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
      </Box>
      <Text as="span">{`result${count === 1 ? '' : 's'}`}</Text>
    </Flex>
  )
}

export default ResultsCount
