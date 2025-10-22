import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("darkTheme") === "true";
  });

  const applyThemeClasses = (darkTheme) => {
    const html = document.documentElement;

    if (darkTheme) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
    applyThemeClasses(newDarkTheme);
  };

  useEffect(() => {
    applyThemeClasses(isDarkTheme);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkTheme
            ? "bg-gradient-to-br from-[#26143f] to-black border-t border-gray-800/50 text-white"
            : "bg-gradient-to-br from-[#ffffff] to-purple-700/70 "
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
