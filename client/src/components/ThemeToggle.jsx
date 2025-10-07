// components/ThemeToggle.jsx
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useTheme } from "../components/ThemeContext";

const ThemeToggle = () => {
  let isDarkTheme, toggleDarkTheme;

  try {
    const dashboardContext = useDashboardContext();
    isDarkTheme = dashboardContext.isDarkTheme;
    toggleDarkTheme = dashboardContext.toggleDarkTheme;
  } catch (error) {
    
    const themeContext = useTheme();
    isDarkTheme = themeContext.isDarkTheme;
    toggleDarkTheme = themeContext.toggleDarkTheme;
  }

 
  if (!toggleDarkTheme) {
    // Fallback to localStorage and direct DOM manipulation
    isDarkTheme = localStorage.getItem("darkTheme") === "true";
    toggleDarkTheme = () => {
      const newDarkTheme = !isDarkTheme;
      localStorage.setItem("darkTheme", newDarkTheme);

      const html = document.documentElement;
      const body = document.body;

      if (newDarkTheme) {
        html.classList.add("dark");
        body.style.background =
          "linear-gradient(135deg, #111827 0%, #000000 100%)";
        body.style.color = "white";
      } else {
        html.classList.remove("dark");
        body.style.background = "";
        body.style.color = "";
      }

    
      window.location.reload();
    };
  }

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillMoonFill className="toggle-icon" color="white" />
      ) : (
        <BsFillSunFill className="toggle-icon " />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
