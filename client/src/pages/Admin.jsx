import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaUsers,
  FaBriefcase,
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 !mb-10 ">
        <StatItem
          title="current users"
          count={users}
          color="from-purple-700 to-indigo-900"
          bcg="#f8fafc"
          icon={<FaUsers className="text-2xl" />}
          trend="+12%"
          description="Active platform users"
          delay={0.1}
        />
        <StatItem
          title="total jobs"
          count={jobs}
          color="from-blue-700 to-cyan-900"
          bcg="#f0f9ff"
          icon={<FaBriefcase className="text-2xl" />}
          trend="+8%"
          description="Jobs posted this month"
          delay={0.2}
        />
      </div>

      {/* Additional Metrics Section */}
      <div className="!p-6 !mb-8">
        <h2
          className="text-xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] 
            !tracking-[-0.025em] from-purple-950 dark:from-white 
            !leading-[1.5] bg-clip-text text-transparent !mb-6"
        >
          Platform Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
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
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white !mb-2">
              24
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Interviews Today
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
              <FaSuitcaseRolling className="text-orange-600 dark:text-orange-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              156
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pending Applications
            </p>
          </div>

          <div
            className="text-center !p-4 border border-gray-200 dark:border-gray-700
           rounded-2xl shadow-lg hover:shadow-xl"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaUsers className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <h3 className="text-2xl !font-bold !font-sans text-gray-900 dark:text-white mb-1">
              89%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              User Satisfaction
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
            },
            { action: "Job posting approved", time: "15 min ago", type: "job" },
            {
              action: "Profile verification completed",
              time: "1 hour ago",
              type: "user",
            },
            {
              action: "New company registered",
              time: "2 hours ago",
              type: "company",
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
                      : "bg-purple-500"
                  }`}
                ></div>
                <span className="text-gray-900 dark:text-white">
                  {activity.action}
                </span>
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
