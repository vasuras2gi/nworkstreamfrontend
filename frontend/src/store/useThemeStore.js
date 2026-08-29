import { create } from "zustand";

// App load hote hi turant HTML root par theme set karne ke liye
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("streamify-theme") || "night";
  document.documentElement.setAttribute("data-theme", savedTheme);
  return savedTheme;
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));