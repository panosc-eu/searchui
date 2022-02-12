import React from 'react'
import { SWRConfig } from 'swr'

async function fetcher(endpoint) {
  const url = `${
    process.env.REACT_APP_SEARCH || 'http://localhost:5000/api'
  }${endpoint}`
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
