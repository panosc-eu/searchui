import { Select } from '@rebass/forms/styled-components'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FiSlash } from 'react-icons/fi'

import { Flex, Button } from '../Primitives'
import { useQueryParam } from '../router-utils'
import AsynAutocomplete from './AsyncAutocomplete'
import FilterBox from './Filter'

function Autocomplete(props) {
  const { obj } = props
  const param = useQueryParam(obj.id)

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <ErrorBoundary fallback={<></>}>
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
              emptyOption={`Select a ${obj.display.toLowerCase()}...`}
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
    </ErrorBoundary>
  )
}

export default Autocomplete
