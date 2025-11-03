import {
  Form,
  useNavigation,
  useSubmit,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
import { FormRow, FormRowSelect } from "../components";
import {
  JOB_STATUS,
  JOB_TYPE,
  JOB_PRIORITY,
  JOB_SORT_BY,
} from "../../../utils/constants.js";
import { FaSearch, FaSync } from "react-icons/fa";
import { useEffect, useRef } from "react";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort, priority, isRemote } =
    searchValues || {};
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 500);
    };
  };

 
  const handleReset = () => {
    // Create a new form data object with empty values
    const formData = new FormData();
    formData.append("search", "");
    formData.append("jobStatus", "all");
    formData.append("jobType", "all");
    formData.append("sort", "newest");
    formData.append("priority", "all");
    formData.append("isRemote", "all");

    submit(formData, { method: "get", action: location.pathname });
  };

 
  const handleFilterChange = (e) => {
    // Gets the current form data
    const formData = new FormData(formRef.current);

    // Updates the changed field
    formData.set(e.target.name, e.target.value);

    // Submits the form
    submit(formData, { method: "get" });
  };

  // Shows loading state if context isn't ready
  if (!searchValues) {
    return (
      <div className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl p-10 mb-10">
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-2 text-white">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl p-10 shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
      <Form
        ref={formRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end"
      >
        {/* Search Input */}
        <div className="md:col-span-2 lg:col-span-1 !py-3">
          <FormRow
            type="text"
            name="search"
            labelText="Search Jobs"
            defaultValue={search || ""}
            onChange={debounce((form) => {
              submit(form);
            })}
            placeholder="Position, company, location..."
            icon={<FaSearch className="w-4 h-4" />}
            className="!px-8 !py-3 border-2 border-gray-700 rounded-2xl bg-white dark:bg-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Status Filter */}
        <div>
          <FormRowSelect
            name="jobStatus"
            labelText="Status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus || "all"}
            onChange={handleFilterChange}
            displayFormat={(value) =>
              value === "all"
                ? "All Status"
                : value.charAt(0).toUpperCase() + value.slice(1)
            }
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Type Filter */}
        <div>
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType || "all"}
            onChange={handleFilterChange}
            displayFormat={(value) =>
              value === "all"
                ? "All Types"
                : value
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
            }
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Priority Filter */}
        <div>
          <FormRowSelect
            name="priority"
            labelText="Priority"
            list={["all", ...Object.values(JOB_PRIORITY)]}
            defaultValue={priority || "all"}
            onChange={handleFilterChange}
            displayFormat={(value) =>
              value === "all"
                ? "All Priorities"
                : value.charAt(0).toUpperCase() + value.slice(1)
            }
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Remote Filter */}
        <div>
          <FormRowSelect
            name="isRemote"
            labelText="Work Type"
            list={["all", "false", "true"]}
            defaultValue={isRemote || "all"}
            onChange={handleFilterChange}
            displayFormat={(value) => {
              if (value === "all") return "All Types";
              if (value === "true") return "Remote";
              return "On-site";
            }}
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Sort Filter */}
        <div>
          <FormRowSelect
            name="sort"
            labelText="Sort By"
            list={Object.values(JOB_SORT_BY)}
            defaultValue={sort || "newest"}
            onChange={handleFilterChange}
            displayFormat={(value) => {
              const sortLabels = {
                newest: "Newest",
                oldest: "Oldest",
                "a-z": "A-Z",
                "z-a": "Z-A",
                priority: "Priority",
                status: "Status",
              };
              return sortLabels[value] || value;
            }}
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Reset Button */}
        <div className="md:col-span-2 lg:col-span-1 flex justify-center lg:justify-end py-3">
          <button
            type="button"
            onClick={handleReset}
            className="group relative !px-8 !py-4 bg-gradient-to-r from-purple-900 to-pink-800 hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-w-[150px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-3">
              <FaSync className="w-4 h-4" />
              <span>Reset Filters</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Loading Indicator */}
        {navigation.state === "loading" && (
          <div className="flex items-center justify-center md:col-span-2 lg:col-span-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="ml-2 text-white">Loading...</span>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SearchContainer;
