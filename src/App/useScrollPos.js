import { useEffect, useCallback } from 'react';

import debounce from 'lodash.debounce';
import shallow from 'zustand/shallow';
import create from 'zustand/vanilla';

export const useDocumentsStore = create((set) => ({
  scrollPosition: 0,
  setScrollPosition: (scrollPosition) => set(() => ({ scrollPosition })),
}));

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
