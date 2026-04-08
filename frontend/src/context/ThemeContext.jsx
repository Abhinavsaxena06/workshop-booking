import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const setLightMode = () => setIsDark(false);
  const setDarkMode = () => setIsDark(true);

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, setLightMode, setDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);