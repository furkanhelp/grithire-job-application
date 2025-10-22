// StatItem.jsx
import { motion } from "framer-motion";
import CountUp from "./CountUp";

const StatItem = ({
  count,
  title,
  icon,
  color,
  trend,
  description,
  delay = 0,
}) => {
  // Extract trend value - always use absolute value for counting
  const trendValue = Math.abs(
    parseInt(trend.replace("+", "").replace("-", "").replace("%", ""))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-tr bg-gray-100 dark:bg-[#1a0f2e] to-[#26143f]
       rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
      !p-6 border border-gray-400 dark:border-gray-900 w-full"
    >
      <div className="flex items-center justify-between !mb-4">
        <div
          className={`!p-3 rounded-xl bg-gradient-to-r ${color} text-white shadow-md`}
        >
          {icon}
        </div>
        <span
          className={`flex items-center gap-1 text-sm font-semibold ${
            trend.startsWith("+")
              ? "text-green-600"
              : trend.startsWith("-")
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {trend.startsWith("+") ? "+" : "-"}
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

      <div className="!space-y-2">
        <h3
          className="text-3xl !font-bold text-gray-900 dark:text-white to-[#a5b4fc] min-h-[2.5rem]
        !font-sans "
        >
          <CountUp
            to={count}
            from={0}
            direction="up"
            duration={2}
            delay={delay}
            className="text-inherit"
          />
        </h3>
        <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-400 capitalize">
          {title}
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-600">
          {description}
        </p>
      </div>

      <div className="!mt-4 !pt-4 border-t border-gray-600">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all 
            duration-1000`}
            style={{ width: `${Math.min((count / 50) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};
export default StatItem;
