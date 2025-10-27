import { motion } from "framer-motion";
import CountUp from "./CountUp";

const StatItem = ({
  count = 0,
  title = "",
  icon,
  color = "from-blue-500 to-blue-700",
  trend = "+0%",
  description = "",
  delay = 0,
}) => {
  const getTrendValue = () => {
    try {
      if (!trend) return 0;
      const trendString = trend.toString();
      const trendValue = Math.abs(
        parseInt(trendString.replace("+", "").replace("-", "").replace("%", ""))
      );
      return isNaN(trendValue) ? 0 : trendValue;
    } catch (error) {
      return 0;
    }
  };

  const trendValue = getTrendValue();

  const getTrendDirection = () => {
    if (!trend) return "neutral";
    const trendString = trend.toString();
    if (trendString.startsWith("+")) return "positive";
    if (trendString.startsWith("-")) return "negative";
    return "neutral";
  };

  const trendDirection = getTrendDirection();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className=" rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
      !p-6 border border-gray-200 dark:border-gray-700 w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3  rounded-xl bg-gradient-to-r ${color} text-white shadow-md`}
        >
          {icon}
        </div>
        <span
          className={`flex items-center gap-1 text-sm font-semibold ${
            trendDirection === "positive"
              ? "text-green-600"
              : trendDirection === "negative"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {trendDirection === "positive"
            ? "↑"
            : trendDirection === "negative"
            ? "↓"
            : "•"}
          <CountUp
            to={trendValue}
            from={0}
            direction="up"
            duration={1.5}
            delay={0.3 + delay}
            className="text-inherit"
          />
          %
        </span>
      </div>

      <div className="!space-y-3 !mb-4">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white min-h-[2.5rem] font-sans">
          <CountUp
            to={count}
            from={0}
            direction="up"
            duration={2}
            delay={delay}
            className="text-inherit !font-bold !font-sans"
          />
        </h3>
        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-300 capitalize">
          {title}
        </h5>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
            style={{ width: `${Math.min((count / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatItem;
