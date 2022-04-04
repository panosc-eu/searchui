import React from 'react'
import { SWRConfig } from 'swr'

async function fetcher(endpoint) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${process.env.REACT_APP_API}${endpoint}`

  const response = await fetch(url)
  if (response.ok) {
    return response.json()
  }
  throw new Error(response.status)
}

function SWRProvider(props) {
  const { children } = props

  return (
    <SWRConfig value={{ suspense: true, revalidateOnFocus: false, fetcher }}>
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
