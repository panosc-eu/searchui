import React from 'react';
import { SWRConfig } from 'swr';

async function fetcher(endpoint) {
  const url = `${
    process.env.REACT_APP_SEARCH || 'http://localhost:5000/api'
  }${endpoint}`;
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  const error = { info: response.json, status: response.status };
  throw error;
}

function SWRProvider(props) {
  const { children } = props;

  return (
    <SWRConfig value={{ suspense: true, revalidateOnFocus: false, fetcher }}>
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
