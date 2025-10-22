import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../components/ThemeContext";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkTheme}
      whileTap={{ scale: 0.9 }}
      className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center 
        transition-all duration-500 hover:scale-110 hover:shadow-lg backdrop-blur-sm 
        ${
          isDarkTheme
            ? "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/60"
            : "bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-400/60"
        }
      `}
    >
      <AnimatePresence mode="wait">
        {isDarkTheme ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <BsFillMoonFill className="w-5 h-5 text-purple-200" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
          >
            <BsFillSunFill className="w-5 h-5 text-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
