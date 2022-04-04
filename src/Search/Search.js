import { Card, Flex, Text, Button } from '../Primitives'
import { template } from '../filters'
import FilterGroup from './FilterGroup'

function Search() {
  const rootFilters = template.filter(
    (obj) => obj.group === 'documents' && obj.label !== 'q',
  )
  const parameters = template.filter((obj) => obj.group === 'parameters')
  const techniques = template.filter((obj) => obj.group === 'techniques')

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Search" filters={rootFilters} />
          <FilterGroup name="Parameter" filters={parameters} />
          <FilterGroup name="Technique" filters={techniques} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Search
