import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("darkTheme") === "true";
  });

  
  const applyThemeClasses = (darkTheme) => {
    const html = document.documentElement;
    const body = document.body;

    if (darkTheme) {
      html.classList.add("dark");
      body.style.background =
        "linear-gradient(135deg, #111827 0%, #000000 100%)";
      body.style.color = "white";
    } else {
      html.classList.remove("dark");
      body.style.background = "";
      body.style.color = "";
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
      {children}
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
