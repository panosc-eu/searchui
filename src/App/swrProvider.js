import React from 'react';
import { SWRConfig } from 'swr';

async function fetcher(endpoint) {
  const method = endpoint.endsWith('token') ? 'post' : 'get';
  const url = `${process.env.REACT_APP_SEARCH}${endpoint}`;
  const response = await fetch(url, { method });
  return response.json();
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
