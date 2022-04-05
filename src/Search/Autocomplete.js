import { Select } from '@rebass/forms/styled-components'
import { Suspense } from 'react'
import { FiSlash } from 'react-icons/fi'

import { Flex, Button } from '../Primitives'
import { useQueryParam } from '../router-utils'
import AsynAutocomplete from './AsyncAutocomplete'
import FilterBox from './Filter'

function Autocomplete(props) {
  const { obj } = props
  console.log(obj)
  const param = useQueryParam(obj.id)

  return (
    <FilterBox title={obj.display || obj.id} isActive={param.isActive}>
      <Flex sx={{ '& > div:first-child': { flex: '1 1 0%' } }}>
        <Suspense
          fallback={
            <Select>
              <option>Loading...</option>
            </Select>
          }
        >
          <AsynAutocomplete
            id={obj.id}
            url={obj.optionsUrl}
            emptyOption={`Select a ${obj.id}...`}
          />
        </Suspense>
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

export default Autocomplete
