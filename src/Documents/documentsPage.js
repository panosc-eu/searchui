import React, { Suspense } from 'react';

import ErrorBoundary from '../App/errorBoundary';
import Spinner from '../App/spinner';
import useSections from '../App/useSections';
import DocumentsList from '../Documents/documentsList';
import Layout from '../Layout/row';
import Search from '../Search/search';

const DocumentsPage = () => {
  const sections = [
    {
      name: 'Search',
      component: <Search />,
      width: [1, 1, 1 / 4],
    },
    {
      name: 'Data',
      component: <DocumentsList name="Data" />,
      width: [1, 1, 3 / 4],
    },
  ];

  const { Arrange } = useSections(sections, 1);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Arrange />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
};
export default DocumentsPage;
