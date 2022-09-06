import { useEventListener } from '@react-hookz/web'
import React, { useRef, useEffect, Suspense } from 'react'
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
  const detailsRef = useRef()

  const preventWhenModal = (e) => {
    const open = detailsRef.current.hasAttribute('open')
    open && e.preventDefault()
  }
  useEventListener(window, 'wheel', preventWhenModal, { passive: false })
  useEventListener(window, 'touchmove', preventWhenModal, { passive: false })

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
            {isDesktop && <Search isDesktop />}
          </Box>
        ) : (
          <>
            <Flex alignItems="center">
              <Box
                ref={detailsRef}
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
                <Box
                  mt={2}
                  sx={{
                    zIndex: 10,
                    bg: 'background',
                    position: 'absolute',
                    top: 'navHeight',
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflowY: 'hidden',
                  }}
                >
                  <Search detailsRef={detailsRef} />
                </Box>
              </Box>
            </Flex>
            <Box sx={{ fontSize: 2 }}>
              <ResultsCount />
            </Box>
          </>
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
