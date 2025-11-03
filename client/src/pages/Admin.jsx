import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaUsers,
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaRegClock,
  FaMoneyBillWave,
  FaUserCheck,
  FaBuilding,
} from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  // Admin statistics data
  const adminStats = {
    platform: {
      totalUsers: users,
      totalJobs: jobs,
      activeUsers: Math.floor(users * 0.85), // total users
      newRegistrations: Math.floor(users * 0.12), //growth
    },
    performance: {
      approvalRate: 92,
      responseTime: "2.3",
      satisfactionScore: 89,
      retentionRate: 78,
    },
    business: {
      monthlyRevenue: 12500,
      conversionRate: 4.2,
      avgJobValue: 245,
      premiumUsers: Math.floor(users * 0.15), // premium users
    },
    activity: {
      dailyApplications: 156,
      interviewsScheduled: 24,
      jobsFilled: 42,
      pendingReviews: 18,
    },
  };

  return (
    <div className="min-h-screen !p-4 md:p-6">
      {/* Header */}
      <div className="!mb-8 text-center">
        <h1
          className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70"
        >
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your job application platform performance
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 !mb-10">
        <StatItem
          title="current users"
          count={adminStats.platform.totalUsers}
          color="from-purple-700 to-indigo-900"
          bcg="#f8fafc"
          icon={<FaUsers className="text-2xl" />}
          trend="+12%"
          description="Active platform users"
          delay={0.1}
        />
        <StatItem
          title="total jobs"
          count={adminStats.platform.totalJobs}
          color="from-blue-700 to-cyan-900"
          bcg="#f0f9ff"
          icon={<FaBriefcase className="text-2xl" />}
          trend="+8%"
          description="Jobs posted this month"
          delay={0.2}
        />
      </div>

      {/* Platform Performance Metrics */}
      <div className="!p-6 !mb-8">
        <h2
          className="text-xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] 
            !tracking-[-0.025em] from-purple-950 dark:from-white 
            !leading-[1.5] bg-clip-text text-transparent !mb-6"
        >
          Platform Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaCheckCircle className="text-green-600 dark:text-green-500 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white !mb-2">
              {adminStats.performance.approvalRate}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Approval Rate
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaClock className="text-blue-600 dark:text-blue-500 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.performance.responseTime}h
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Avg Response Time
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaStar className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.performance.satisfactionScore}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              User Satisfaction
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaChartLine className="text-orange-600 dark:text-orange-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.performance.retentionRate}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Retention Rate
            </p>
          </div>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="!p-6 !mb-8">
        <h2
          className="text-xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] 
            !tracking-[-0.025em] from-purple-950 dark:from-white 
            !leading-[1.5] bg-clip-text text-transparent !mb-6"
        >
          Business Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaMoneyBillWave className="text-green-600 dark:text-green-500 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white !mb-2">
              ${(adminStats.business.monthlyRevenue / 1000).toFixed(1)}K
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Monthly Revenue
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaUserCheck className="text-blue-600 dark:text-blue-500 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.business.conversionRate}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Conversion Rate
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaBriefcase className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              ${adminStats.business.avgJobValue}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Avg Job Value
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaBuilding className="text-indigo-600 dark:text-indigo-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.business.premiumUsers}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Premium Users
            </p>
          </div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="!p-6 !mb-8">
        <h2
          className="text-xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] 
            !tracking-[-0.025em] from-purple-950 dark:from-white 
            !leading-[1.5] bg-clip-text text-transparent !mb-6"
        >
          Daily Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaSuitcaseRolling className="text-orange-600 dark:text-orange-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white !mb-2">
              {adminStats.activity.dailyApplications}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Daily Applications
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaCalendarCheck className="text-green-600 dark:text-green-500 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.activity.interviewsScheduled}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Interviews Today
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCheckCircle className="text-blue-600 dark:text-blue-500 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.activity.jobsFilled}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Jobs Filled
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div
              className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full
             flex items-center justify-center mx-auto mb-3"
            >
              <FaRegClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              {adminStats.activity.pendingReviews}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pending Reviews
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl shadow-lg !p-6">
        <h2
          className="text-xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] 
            !tracking-[-0.025em] from-purple-950 dark:from-white 
            !leading-[1.5] bg-clip-text text-transparent !mb-6"
        >
          Recent Activity
        </h2>
        <div className="!space-y-5">
          {[
            {
              action: "New user registration",
              time: "2 min ago",
              type: "user",
              user: "John Doe",
            },
            {
              action: "Job posting approved",
              time: "15 min ago",
              type: "job",
              job: "Senior Developer",
            },
            {
              action: "Profile verification completed",
              time: "1 hour ago",
              type: "user",
              user: "Sarah Wilson",
            },
            {
              action: "New company registered",
              time: "2 hours ago",
              type: "company",
              company: "Tech Innovations Inc.",
            },
            {
              action: "Premium subscription activated",
              time: "3 hours ago",
              type: "revenue",
              amount: "$99.99",
            },
            {
              action: "Job application completed",
              time: "4 hours ago",
              type: "application",
              position: "Frontend Engineer",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between !p-5 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    activity.type === "user"
                      ? "bg-green-500"
                      : activity.type === "job"
                      ? "bg-blue-500"
                      : activity.type === "company"
                      ? "bg-purple-500"
                      : activity.type === "revenue"
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                ></div>
                <div>
                  <span className="text-gray-900 dark:text-white block">
                    {activity.action}
                  </span>
                  {activity.user && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.user}
                    </span>
                  )}
                  {activity.job && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.job}
                    </span>
                  )}
                  {activity.company && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.company}
                    </span>
                  )}
                  {activity.amount && (
                    <span className="text-sm text-green-600 font-semibold">
                      {activity.amount}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
