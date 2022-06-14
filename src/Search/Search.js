import { Card, Flex } from '../Primitives'
import template from '../filters.json'
import Autocomplete from './Autocomplete'
import List from './List'
import Numeric from './Numeric'
import Basic from './Text'

function Search() {
  const selected = ['techniques', 'parameters', 'documents']
  const filters = template
    .filter((obj) => selected.includes(obj.group))
    .filter((obj) => obj.id !== 'q')

  function Filter({ filter }) {
    switch (filter.type) {
      case 'numeric':
        return <Numeric obj={filter} />
      case 'remote-list':
        return <Autocomplete obj={filter} />
      case 'list':
        return <List obj={filter} />
      default:
        return <Basic obj={filter} />
    }
  }

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      <Card>
        <Flex column gap={[3, 2, 3, 4]}>
          {filters.map((filter) => (
            <Filter filter={filter} key={filter.id} />
          ))}
        </Flex>
      </Card>
    </Flex>
  )
}

export default Search
