import React, { useEffect, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation } from 'react-router-dom'
import { useSWRConfig } from 'swr'

import ErrorFallback from '../App/ErrorFallback'
import ResultsCount from '../App/ResultsCount'
import Spinner from '../App/Spinner'
import { useSearchStore } from '../App/stores'
import { Flex, Box } from '../Primitives'
import Search from '../Search/Search'
import { translate, useFilters } from '../filters'
import DocumentList from './DocumentList'
import Debug from './QueryDebug'

const QUERY_CONFIG = {
  id: 'c',
  pageSize: process.env.REACT_APP_LIMIT,
}

function ExplorePage(props) {
  const { isDesktop } = props

  const filters = useFilters()
  const translatedFilters = translate([...filters, QUERY_CONFIG], 'documents')

  const query = encodeURIComponent(JSON.stringify(translatedFilters))
  const queryUrl = `/documents?filter=${query}`

  const { cache } = useSWRConfig()
  const { search } = useLocation()
  const setSearch = useSearchStore((state) => state.setSearch)

  useEffect(() => {
    setSearch(search)
  }, [search, setSearch])

  return (
    <Flex flexDirection={['column', 'column', 'row']} gap={[3, 3, 3, 4]}>
      {isDesktop ? (
        <Box
          as="aside"
          display={['none', 'none', 'block']}
          width={[1, 1, 1 / 4]}
        >
          {isDesktop && <Search />}
        </Box>
      ) : (
        <Flex alignItems="center">
          <Box
            as="details"
            sx={{
              flex: '1 1 0%',
              display: ['block', 'block', 'none'],
              width: [1, 1, 1 / 4],
            }}
          >
            <Box as="summary" sx={{ fontSize: 3, cursor: 'pointer' }}>
              Filters
            </Box>
            <Box mt={2}>
              <Search />
            </Box>
          </Box>
          <Box sx={{ fontSize: 2 }}>
            <ResultsCount />
          </Box>
        </Flex>
      )}
      <Box width={[1, 1, 3 / 4]}>
        <Debug query={query} />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[search]}
          onError={() => cache.delete(`$swr$${queryUrl}`)}
        >
          <Suspense fallback={<Spinner />}>
            <DocumentList queryUrl={queryUrl} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Flex>
  )
}

export default ExplorePage
