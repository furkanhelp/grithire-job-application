import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-tr bg-gray-100 dark:bg-[#1a0f2e] to-[#26143f]
       rounded-2xl shadow-lg border border-gray-400 dark:border-gray-900 !p-6 !mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !mb-8">
        <div>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
            Monthly Applications
          </h4>
          <p className="text-gray-600 !mt-2">
            Track your application trends over time
          </p>
        </div>

        <div className="flex !space-x-2 !mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setBarChart(true)}
            className={`!px-4 !py-2 rounded-lg font-medium transition-all duration-200 ${
              barChart
                ? "group bg-gradient-to-r from-purple-900 to-pink-800 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Bar Chart
          </button>

          <button
            type="button"
            onClick={() => setBarChart(false)}
            className={`!px-4 !py-2 rounded-lg font-medium transition-all duration-200 ${
              !barChart
                ? "group bg-gradient-to-r from-pink-800 to-purple-900 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Area Chart
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={barChart ? "bar" : "area"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
export default ChartsContainer;
