import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Spinner from '../App/Spinner'
import { CHAR, formatDate } from '../App/helpers'
import { Box } from '../Primitives'
import providers from '../providers.json'
import { Members, Techniques, Parameters } from './Sections'
import Services from './Services'
import Table from './Table'

function DetailView(props) {
  const {
    pid,
    keywords,
    summary,
    type,
    releaseDate,
    provider: providerURL,
  } = props
  const provider =
    providers.find((provider) => providerURL === provider.url) || {}

  const properties = [
    ['Released', releaseDate && formatDate(releaseDate)],
    [
      'Facility',
      provider && provider.name + CHAR.saferSplit + provider.homepage,
    ],
    ['Type', type],
    [
      'Keywords',
      keywords?.length > 0 &&
        keywords.map((keyword, idx, list) =>
          idx + 1 === list.length ? keyword : `${keyword} | `,
        ),
    ],
  ].filter(([, content]) => content)

  return (
    <Box>
      <Box as="article" pb={3}>
        {summary}
      </Box>
      <Table data={properties} title="Properties" open />
      <ErrorBoundary resetKeys={[pid]} fallback={<Box />}>
        <Suspense fallback={<Spinner />}>
          <Members pid={pid} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary resetKeys={[pid]} fallback={<Box />}>
        <Suspense fallback={<Box />}>
          <Services provider={provider} pid={pid} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary resetKeys={[pid]} fallback={<Box />}>
        <Suspense fallback={<Box />}>
          <Techniques pid={pid} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary resetKeys={[pid]} fallback={<Box />}>
        <Suspense fallback={<Box />}>
          <Parameters pid={pid} />
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}

export default DetailView
