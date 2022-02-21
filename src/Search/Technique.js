import { useState } from 'react'
import { FiSlash } from 'react-icons/fi'

import { Flex, Heading, Button } from '../Primitives'
import { useQueryParam } from '../router-utils'
import FilterBox from './Filter'

function TextInput(props) {
  const { obj } = props

  const param = useQueryParam(obj.label)
  const [isActive, setIsActive] = useState(!!param.value)

  return (
    <FilterBox title={false} isActive={param.isActive}>
      <Flex>
        <Heading
          onClick={() => {
            if (isActive) {
              param.remove()
              setIsActive(false)
            } else {
              param.setValue('On')
              setIsActive(true)
            }
          }}
          as="h3"
          variant="filter"
          data-active={isActive || undefined}
        >
          {obj.display || obj.label}
        </Heading>
        <Button
          variant="action"
          disabled={!isActive}
          aria-label="Clear"
          onClick={() => {
            param.remove()
            setIsActive(false)
          }}
        >
          <FiSlash />
        </Button>
      </Flex>
    </FilterBox>
  )
}

export default TextInput
