import React, {Suspense} from 'react'

import About from '../About/about'
import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import useSections from '../App/useSections'
import DocumentsList from '../Documents/documentsList'
import Layout from '../Layout/row'
import Search from '../Search/search'

const DocumentsPage = () => {
  const sections = [
    {
      name: 'Search',
      component: <Search />,
      width: [1, 1, 5 / 16, 1 / 5],
    },
    {
      name: 'Data',
      component: <DocumentsList name="Data" />,
      width: [1, 1, 6 / 16, 3 / 5],
    },
    {
      name: 'ESRF Bio Thingy',
      component: <About />,
      width: [1, 1, 5 / 16, 1 / 5],
    },
  ]

  const {Arrange} = useSections(sections, 1)
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Arrange />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  )
}
export default DocumentsPage
