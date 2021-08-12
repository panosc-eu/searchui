import React from 'react';

import { SWRConfig } from 'swr';

const SWRProvider = ({ children }) => {
  const getUrl = (url) =>
    (process.env.REACT_APP_SEARCH ?? 'http://localhost:5000/api') + url;
  const fetcher = (url) => {
    const method = url.endsWith('token') ? 'post' : 'get';
    return (
      url &&
      fetch(getUrl(url), {
        method,
      }).then((r) => r.json())
    );
  };
  return (
    <SWRConfig
      value={{
        suspense: true,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
