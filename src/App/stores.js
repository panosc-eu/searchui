import { init } from 'search-api-adapter';
import create from 'zustand';

import filterables from '../Search/filterables.json';

// const preset =
//   localStorage.getItem('isDark') === 'true' ||
//   window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? true
//     : false;

export const useDocumentsStore = create((set) => ({
  page: 1,
  setPage: (int) => set(() => ({ page: int })),
  scrollPosition: 0,
  setScrollPosition: (scrollPosition) => set(() => ({ scrollPosition })),
}));

export const useAppStore = create((set, get) => ({
  isDark: true, // preset,
  toggleTheme: () => {
    const newTheme = !get().isDark;
    // localStorage.setItem('isDark', newTheme);
    set(() => ({ isDark: newTheme }));
  },

  windowWidth: false,
  setWindowWidth: (n) => set(() => ({ windowWidth: n })),

  //should be determined from above once i learn how to middleware
  isDesktop: true,
  setIsDesktop: (bool) => set(() => ({ isDesktop: bool })),
}));

export const useSearchStore = create((set) =>
  init(filterables, { setter: set, debounce: 50 })
);
