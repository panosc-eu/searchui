import React, { useEffect, useLayoutEffect, useRef } from 'react'

import { useToggle } from '../../node_modules/@react-hookz/web/cjs'
import useApi from '../Api/useApi'
import useFilters from '../Api/useFilters'
import { useSearchStore } from '../App/stores'
import { Flex, Card, Text, Heading } from '../Primitives'
import DocumentItem from './DocumentItem'

function DocumentList() {
  const setCount = useSearchStore((state) => state.setCount)
  const filters = useFilters()
  const { data } = useApi('/documents', filters)

  const [detailedMode, toggleMode] = useToggle(false)
  const toggledItem = useRef(null)

  function handleToggleMode(item) {
    toggledItem.current = { item, offset: item.getBoundingClientRect().y }
    toggleMode()
  }

  useLayoutEffect(() => {
    if (toggledItem.current) {
      // Restore scroll position when toggling mode
      const { item, offset } = toggledItem.current
      item.scrollIntoView()
      window.scrollBy(0, -offset)
      toggledItem.current = null
    }
  }, [detailedMode])

  useEffect(() => {
    setCount(data.length)
  }, [data, setCount])

  return (
    <Flex column gap={[3, 3, 3, 4]}>
      {data.length === 0 ? (
        <Card p={[3, 4]}>
          <Heading>No results</Heading>
          <Text as="p">Please adjust the search filters.</Text>
        </Card>
      ) : (
        data.map((document) => (
          <DocumentItem
            key={document.pid}
            document={document}
            detailedMode={detailedMode}
            toggleMode={handleToggleMode}
          />
        ))
      )}
    </Flex>
  )
}
export default DocumentList
