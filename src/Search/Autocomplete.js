import { Select } from '@rebass/forms/styled-components'
import { Suspense } from 'react'
import { FiSlash } from 'react-icons/fi'

import { Flex, Button } from '../Primitives'
import { useQueryParam } from '../router-utils'
import AsynAutocomplete from './AsyncAutocomplete'
import FilterBox from './Filter'

function Autocomplete(props) {
  const { obj } = props
  const param = useQueryParam(obj.queryParam)

  return (
    <FilterBox title={obj.display || obj.queryParam} isActive={param.isActive}>
      <Flex sx={{ '& > div:first-child': { flex: '1 1 0%' } }}>
        <Suspense
          fallback={
            <Select>
              <option>Loading...</option>
            </Select>
          }
        >
          <AsynAutocomplete
            queryParam={obj.queryParam}
            url={obj.optionsUrl}
            emptyOption={`Select a ${obj.queryParam}...`}
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
