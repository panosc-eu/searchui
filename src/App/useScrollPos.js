import { useEffect, useCallback } from 'react';

import debounce from 'lodash.debounce';
import shallow from 'zustand/shallow';

import { useDocumentsStore } from '../App/stores';

const useScrollPosition = (loading) => {
  const [scrollPosition, setScrollPosition] = useDocumentsStore(
    (state) => [state.scrollPosition, state.setScrollPosition],
    shallow
  );

  const handleScroll = useCallback(() => {
    if (!loading) {
      setScrollPosition(window.scrollY);
    }
  }, [setScrollPosition, loading]);
  const handler = debounce(handleScroll, 500);

  useEffect(() => {
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [handleScroll, handler]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition, loading]);
};

export default useScrollPosition;
