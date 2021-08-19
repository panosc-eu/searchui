import React from 'react';

import { SWRConfig } from 'swr';

function SWRProvider(props) {
  const { children } = props;

  function fetcher(endpoint) {
    const method = endpoint.endsWith('token') ? 'post' : 'get';
    const url = `${process.env.REACT_APP_SEARCH}${endpoint}`;
    return fetch(url, { method }).then((r) => r.json());
  }

  return (
    <SWRConfig value={{ suspense: true, revalidateOnFocus: false, fetcher }}>
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
