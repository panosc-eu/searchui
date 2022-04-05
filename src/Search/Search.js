import { Card, Flex } from '../Primitives'
import { template } from '../filters'
import FilterGroup from './FilterGroup'

function Search() {
  const rootFilters = template.filter(
    (obj) => obj.group === 'documents' && obj.id !== 'q',
  )
  const techniqueFilters = template.filter((obj) => obj.group === 'techniques')
  const parameterFilters = template.filter((obj) => obj.group === 'parameters')

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card>
        <Flex column gap={[3, 2, 3, 4]}>
          <FilterGroup name="Search" filters={rootFilters} />
          <FilterGroup name="Dataset" filters={techniqueFilters} />
          <FilterGroup name="Parameter" filters={parameterFilters} />
        </Flex>
      </Card>
    </Flex>
  )
}

export default Search
