import { FaUserCircle, FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="relative">
      {/* Modern Logout Button */}
      <button
        type="button"
        onClick={() => setShowLogout(!showLogout)}
        className="group relative flex items-center !space-x-3 
         hover:from-pink-50 hover:to-purple-50 dark:hover:from-purple-900/20
          dark:hover:to-purple-900/20 border border-gray-200 dark:border-gray-600
           hover:border-indigo-200 dark:hover:border-purple-500/50 rounded-2xl !px-2 !py-2 
           transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-lg"
      >
        {/* User Avatar with Modern Design */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-600 shadow-inner"
            />
          ) : (
            <div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center
             justify-center text-white shadow-lg"
            >
              <FaUserCircle className="w-6 h-6" />
            </div>
          )}
          {/* Online Indicator */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 
          rounded-full"
          ></div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start min-w-0">
          <span
            className="capitalize text-sm font-semibold text-gray-900 dark:text-white group-hover:text-red-600
           dark:group-hover:text-red-400 transition-colors duration-200 truncate max-w-[120px]"
          >
            {user?.name}
          </span>
          <span
            className="capitalize text-xs text-gray-500 dark:text-gray-400 group-hover:text-red-500
           dark:group-hover:text-red-300 transition-colors duration-200"
          >
            {user?.role || "User"}
          </span>
        </div>

        {/* Animated Caret */}
        <FaCaretDown
          className={`text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-all duration-300 transform ${
            showLogout ? "rotate-180" : ""
          }`}
        />

        {/* Hover Gradient Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100
         rounded-2xl transition-opacity duration-300"
        ></div>
      </button>

      {/* Modern Dropdown */}
      {showLogout && (
        <div className="absolute top-full right-0 !mt-2 w-64 z-50">
          {/* Dropdown Arrow */}
          <div
            className="absolute -top-2 right-6 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-gray-200
           dark:border-gray-600 rotate-45 transform"
          ></div>

          {/* Dropdown Content */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 
          overflow-hidden backdrop-blur-lg"
          >
            {/* User Summary */}
            <div
              className="!p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50
             dark:from-gray-700/50 dark:to-blue-900/20"
            >
              <div className="flex items-center !space-x-3">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center 
                justify-center text-white shadow-lg"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-xl"
                    />
                  ) : (
                    <FaUserCircle className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="capitalize text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="!p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-3 !gap-2 text-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    12
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Jobs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    3
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Active
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    1
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Offers
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="!p-4">
              <button
                type="button"
                onClick={logout}
                className="group relative w-full bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-900
                 hover:to-pink-800 text-white !py-2 !px-2 rounded-xl font-semibold transition-all duration-300
                  transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
              >
                {/* Animated Background */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-500 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300"
                ></div>

                {/* Content */}
                <div className="relative flex items-center justify-center !space-x-2">
                  <FaSignOutAlt className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Sign Out</span>
                </div>

                {/* Shine Effect */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform 
                -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                ></div>
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="w-full !mt-2 !py-2 !px-2 text-gray-600 dark:text-gray-400 hover:text-gray-800
                 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showLogout && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShowLogout(false)}
        />
      )}
    </div>
  );
};

export default LogoutContainer;
