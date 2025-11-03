import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaChartLine,
  FaUserTie,
  FaClock,
  FaStar,
  FaHome,
  FaBuilding,
  FaCheckCircle,
  FaRocket,
  FaInfoCircle,
} from "react-icons/fa";

const StatsContainer = ({ defaultStats, additionalStats }) => {
  const stats = [
    {
      title: "Total Applications",
      value: additionalStats?.totalJobs || 0,
      icon: <FaBriefcase className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-400 dark:bg-blue-900/20",
    },
    {
      title: "Success Rate",
      value: `${additionalStats?.successRate || 0}%`,
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-400 dark:bg-green-900/20",
      description: "Interview + Offer + Accepted",
    },
    {
      title: "Recent Activity",
      value: additionalStats?.recentActivity || 0,
      icon: <FaClock className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-400 dark:bg-purple-900/20",
      description: "Last 30 days",
    },
    {
      title: "Avg/Month",
      value: additionalStats?.averageApplicationsPerMonth || 0,
      icon: <FaCalendarCheck className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-400 dark:bg-orange-900/20",
      description: "Monthly average",
    },
  ];

  const statusStats = [
    {
      title: "Pending",
      value: defaultStats?.pending || 0,
      color: "bg-yellow-500",
      icon: <FaClock className="w-4 h-4" />,
    },
    {
      title: "Interview",
      value: defaultStats?.interview || 0,
      color: "bg-blue-500",
      icon: <FaUserTie className="w-4 h-4" />,
    },
    {
      title: "Offer",
      value: defaultStats?.offer || 0,
      color: "bg-green-500",
      icon: <FaCheckCircle className="w-4 h-4" />,
    },
    {
      title: "Accepted",
      value: defaultStats?.accepted || 0,
      color: "bg-purple-500",
      icon: <FaRocket className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-8 mb-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                {stat.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                )}
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3
            className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-2"
          >
            <div>
              <FaInfoCircle className="w-5 h-5 text-black dark:text-white" />
            </div>
            Application Status
          </h3>
          <div className="space-y-3">
            {statusStats.map((stat) => (
              <div
                key={stat.title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <span className="text-white font-medium">{stat.title}</span>
                </div>
                <span className="text-white font-bold text-lg">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3
            className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-2"
          >
            <div>
              <FaBriefcase className="w-5 h-5 text-black dark:text-white" />
            </div>
            Job Types
          </h3>
          <div className="space-y-3">
            {additionalStats?.jobTypeDistribution &&
              Object.entries(additionalStats.jobTypeDistribution).map(
                ([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-white capitalize">
                      {type.replace("-", " ")}
                    </span>
                    <span className="text-white font-bold">{count}</span>
                  </div>
                )
              )}
          </div>
        </motion.div>

        {/* Work Location */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3
            className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-2"
          >
            <FaHome className="w-5 h-5 text-black dark:text-white" />
            Work Location
          </h3>
          <div className="space-y-3">
            {additionalStats?.remoteDistribution &&
              Object.entries(additionalStats.remoteDistribution).map(
                ([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {type === "remote" ? (
                        <FaHome className="w-4 h-4 text-green-400" />
                      ) : (
                        <FaBuilding className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-white capitalize">{type}</span>
                    </div>
                    <span className="text-white font-bold">{count}</span>
                  </div>
                )
              )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsContainer;
