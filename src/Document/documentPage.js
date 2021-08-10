import React, {Suspense} from 'react'

import {translate} from 'search-api-adapter'
import useSWR from 'swr'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import useSections from '../App/useSections'
import Datasets from '../Datasets/datasets'
import Layout from '../Layout/row'
import {Image} from '../Primitives'
import Document from './document'

const DocumentPage = (props) => {
  const documentId = props.match.params.documentId
  const config = {
    include: [
      ['datasets', 'instrument'],
      ['members', 'person'],
      ['members', 'affiliation'],
    ],
    limit: false,
  }
  const query = translate([], config)
  const {data} = useSWR('/Documents/' + documentId + '?filter=' + query)

  const sections = [
    {
      name: data.title,
      component: <Document data={data} />,
      width: [1, 1, 1 / 2],
    },
    {
      name: 'Datasets',
      component: <Datasets datasets={data.datasets} />,
      width: [1, 1, 1 / 4],
    },
    {
      name: 'Preview',
      component: <Image src={data.img} />,
      width: [1, 1, 1 / 4],
    },
  ]
  const {Arrange} = useSections(sections)
  return (
    <ErrorBoundary>
      <Suspense fallback={Spinner}>
        <Layout>
          <Arrange />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  )
}

export default DocumentPage
