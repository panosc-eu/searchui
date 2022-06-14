import { useState } from 'react'

import { parseDate } from '../App/helpers'
import { Card, Box, Flex, Heading, Link, Text } from '../Primitives'
import Details from './Detail'

const getMembers = (data) =>
  data.members.map((member) => ({
    ...member?.affiliation,
    ...member?.person,
  }))

function DocumentItem({ document }) {
  const { pid, title, score, doi, summary, releaseDate } = document
  const [showDetail, setShowDetail] = useState(false)

  const doiLink = `http://doi.org/${doi}`
  function Detailed() {
    return (
      <>
        <Box as="article">{summary}</Box>
        <br />
        <Text sx={{ fontWeight: 'bold' }}>
          Released: {parseDate(releaseDate)}
        </Text>
        <Details
          columns={[
            ['Person', 'fullName'],
            ['Affiliation', 'name'],
          ]}
          url={`/documents/${encodeURIComponent(pid)}`}
          mergeFn={getMembers}
          rowId="id"
          title="Members"
          config={{ include: ['person', 'affiliation'] }}
        />
      </>
    )
  }
  function Simple() {
    return (
      <>
        <Box
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
          }}
        >
          {summary}
        </Box>
        <br />
        <Text sx={{ fontStyle: 'italic' }}>
          Released: {parseDate(releaseDate)}
        </Text>
      </>
    )
  }

  return (
    <Box
      as="article"
      sx={{
        display: ['block', 'flex'],
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Card width={1} key={pid}>
        <Flex sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Text
            as={Link}
            href={doiLink}
            target="_blank"
            sx={{ textDecoration: 'none', color: 'text', fontSize: 1 }}
          >
            {doi}
          </Text>
          <Box>Relevancy = {score.toFixed(3)}</Box>
        </Flex>
        <Heading
          as={Link}
          href={doiLink}
          target="_blank"
          sx={{
            display: 'block',
            whiteSpace: showDetail ? 'wrap' : 'nowrap',
            overflow: showDetail ? 'visible' : 'hidden',
            textOverflow: showDetail ? 'none' : 'ellipsis',
            textDecoration: 'none',
          }}
        >
          {title}
        </Heading>
        <Box>{showDetail ? <Detailed /> : <Simple />}</Box>
        <br />
        <Box
          onClick={() => setShowDetail(!showDetail)}
          sx={{
            cursor: 'pointer',
            borderTop: '1px solid',
            borderColor: 'foreground',
            textAlign: 'center',
            fontSize: 0,
            mx: -3,
            mb: -3,
            ':hover': {
              bg: 'foreground',
            },
          }}
        >
          <strong>{showDetail ? '\u2227' : '\u2228'}</strong>
        </Box>
      </Card>
    </Box>
  )
}

export default DocumentItem
