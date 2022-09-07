import { useState } from 'react'

import { Card, Flex, Button } from '../Primitives'
import template from '../filters.json'
import { useQuery, useSetQueryParams } from '../router-utils'
import Autocomplete from './Autocomplete'
import List from './List'
import Numeric from './Numeric'
import Basic from './Text'

function Search(props) {
  const { isDesktop, exitModal } = props

  const currentParams = Object.fromEntries(useQuery())
  const setParams = useSetQueryParams()

  const [state, setState] = useState(currentParams)

  const selected = ['techniques', 'parameters', 'documents']
  const filters = template
    .filter((obj) => selected.includes(obj.group))
    .filter((obj) => obj.id !== 'q')

  function Filter({ filter }) {
    const { id } = filter
    const setValue = (value) => setState((state) => ({ ...state, [id]: value }))

    const statefulParam = {
      setValue,
      remove: () => setValue(''),
      isActive: !!state[id],
      value: state[id],
    }

    switch (filter.type) {
      case 'numeric':
        return (
          <Numeric
            obj={filter}
            isStateful={!isDesktop}
            statefulParam={statefulParam}
          />
        )
      case 'remote-list':
        return (
          <Autocomplete
            obj={filter}
            isStateful={!isDesktop}
            statefulParam={statefulParam}
          />
        )
      case 'list':
        return (
          <List
            obj={filter}
            isStateful={!isDesktop}
            statefulParam={statefulParam}
          />
        )
      default:
        return (
          <Basic
            obj={filter}
            isStateful={!isDesktop}
            statefulParam={statefulParam}
          />
        )
    }
  }

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card>
        <Flex column gap={[3, 2, 3, 4]}>
          <>
            {filters.map((filter) => (
              <Filter filter={filter} key={filter.id} />
            ))}
            <br />
            {isDesktop || (
              <Button
                onClick={() => {
                  setParams(state)
                  exitModal()
                }}
              >
                Search
              </Button>
            )}
          </>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Search
