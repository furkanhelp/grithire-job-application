import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
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
    <button
      onClick={toggleDarkTheme}
      className={`
        w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl border-2 flex items-center justify-center 
        transition-all duration-300 hover:scale-110 hover:shadow-lg
        backdrop-blur-sm !font-bold
        ${
          isDarkTheme
            ? "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/60 hover:border-purple-300 hover:shadow-purple-500/30"
            : "bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-400/60 hover:border-amber-300 hover:shadow-amber-500/30"
        }
      `}
      aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkTheme ? (
        <BsFillMoonFill className="w-4 h-4 md:w-5 md:h-5 text-purple-200" />
      ) : (
        <BsFillSunFill className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
