import create from 'zustand';

// const preset =
//   localStorage.getItem('isDark') === 'true' ||
//   window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? true
//     : false;

export const useAppStore = create((set, get) => ({
  isDark: true, // preset,
  // toggleTheme: () => {
  //   const newTheme = !get().isDark;
  //   localStorage.setItem('isDark', newTheme);
  //   set(() => ({ isDark: newTheme }));
  // },

  loadOnScroll: false,
  toggleLoadOnScroll: () => {
    set(() => ({ loadOnScroll: !get().loadOnScroll }));
  },
}));

export const useSearchStore = create((set, get) => ({
  search: '',
  setSearch: (search) => {
    if (search !== get().search) {
      set({ search });
    }
  },
}));
