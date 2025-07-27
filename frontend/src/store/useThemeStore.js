import {create} from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'light', // Default theme
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem('theme', newTheme);
  },
}));

