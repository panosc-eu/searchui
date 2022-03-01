import { useState } from 'react'
import { FiSlash } from 'react-icons/fi'

import { Flex, Box, Heading, Button } from '../Primitives'
import { useQueryParam } from '../router-utils'
import FilterBox from './Filter'

function TextInput(props) {
  const { obj } = props

  const param = useQueryParam(obj.label)

  return (
    <FilterBox title={false} isActive={param.isActive}>
      <Flex>
        <Heading
          onClick={() => {
            if (param.isActive) {
              param.remove()
            } else {
              param.setValue('On')
            }
          }}
          mt={2}
          width="100%"
          as="h3"
          variant="filter"
          data-active={param.isActive || undefined}
        >
          {obj.display || obj.label}
        </Heading>
        <Button
          variant="action"
          disabled={!param.isActive}
          aria-label="Clear"
          onClick={() => {
            param.remove()
          }}
        >
          <FiSlash />
        </Button>
      </Flex>
    </FilterBox>
  )
}

export default TextInput
