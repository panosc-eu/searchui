import React, { useEffect, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation } from 'react-router-dom'

import { useQuery } from '../Api/useApi'
import useFilters from '../Api/useFilters'
import ErrorFallback from '../App/ErrorFallback'
import ResultsCount from '../App/ResultsCount'
import Spinner from '../App/Spinner'
import { useSearchStore } from '../App/stores'
import { Flex, Box } from '../Primitives'
import Search from '../Search/Search'
import DocumentList from './DocumentList'
import QueryDebug from './QueryDebug'

function ExplorePage(props) {
  const { isDesktop } = props

  const { search } = useLocation()
  const setSearch = useSearchStore((state) => state.setSearch)

  const filters = useFilters()
  const query = useQuery('/documents', filters)
  useEffect(() => {
    setSearch(search)
  }, [search, setSearch])

  return (
    <>
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
          <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[search]}>
            <Suspense fallback={<Spinner />}>
              <DocumentList />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Flex>
      <QueryDebug query={JSON.stringify(query)} />
    </>
  )
}

export default ExplorePage
