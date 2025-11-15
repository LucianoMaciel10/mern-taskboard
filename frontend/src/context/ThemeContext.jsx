/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme")
  );

  const toggleTheme = () => {
    const newTheme = theme === "lemonade" ? "sunset" : "lemonade";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
