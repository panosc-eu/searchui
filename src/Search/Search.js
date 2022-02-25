import { Switch } from '@rebass/forms/styled-components'
import shallow from 'zustand/shallow'

import { useAppStore } from '../App/stores'
import { Card, Flex, Text, Button } from '../Primitives'
import { template } from '../filters'
import FilterGroup from './FilterGroup'

const ORDER = ['title', 'type', 'keywords']
const sortFilters = (a, b) => ORDER.indexOf(a?.name) - ORDER.indexOf(b?.name)

function Search() {
  const [loadOnScroll, toggleLoadOnScroll] = useAppStore(
    (state) => [state.loadOnScroll, state.toggleLoadOnScroll],
    shallow,
  )

  const rootFilters = template.filter((obj) => obj.group === 'documents')
  const parameterFilters = template.filter((obj) => obj.group === 'parameters')
  const techniques = template.filter((obj) => obj.group === 'techniques')

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Search" filters={rootFilters} />
          <FilterGroup name="Parameter" filters={parameterFilters} />
          <FilterGroup name="Technique" filters={techniques} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Search
