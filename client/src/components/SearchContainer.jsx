// components/SearchContainer.jsx
import { Form, useNavigation, useSubmit, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
import { FormRow, FormRowSelect } from "../components";
import {
  JOB_STATUS,
  JOB_TYPE,
  JOB_PRIORITY,
  JOB_SORT_BY,
} from "../../../utils/constants.js";
import { FaSearch, FaSync } from "react-icons/fa";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort, priority, isRemote } = searchValues;
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

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
    const form = document.querySelector("form");
    if (form) {
      form.reset();
      submit(form);
    }
  };

  return (
    <div
      className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] rounded-2xl p-10 shadow-sm border border-gray-200 dark:border-gray-700 mb-10"
    >
      <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        {/* Search Input */}
        <div className="md:col-span-2 lg:col-span-1 !py-3">
          <FormRow
            type="text"
            name="search"
            labelText="Search Jobs"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
            placeholder="Position, company, location..."
            icon={<FaSearch className="w-4 h-4" />}
            className="!px-8 !py-3 border-2 border-gray-700 rounded-2xl bg-white dark:bg-transparent 
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Status Filter */}
        <div>
          <FormRowSelect
            name="jobStatus"
            labelText="Status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
            displayFormat={(value) =>
              value === "all"
                ? "All Status"
                : value.charAt(0).toUpperCase() + value.slice(1)
            }
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 
            focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Type Filter */}
        <div>
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
            displayFormat={(value) =>
              value === "all"
                ? "All Types"
                : value.charAt(0).toUpperCase() + value.slice(1)
            }
            className="!px-4 !py-3  rounded-2xl
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Priority Filter */}
        <div>
          <FormRowSelect
            name="priority"
            labelText="Priority"
            list={["all", ...Object.values(JOB_PRIORITY)]}
            defaultValue={priority}
            onChange={(e) => submit(e.currentTarget.form)}
            displayFormat={(value) =>
              value === "all"
                ? "All Priorities"
                : value.charAt(0).toUpperCase() + value.slice(1)
            }
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 
            focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Remote Filter */}
        <div>
          <FormRowSelect
            name="isRemote"
            labelText="Work Type"
            list={["all", "false", "true"]}
            defaultValue={isRemote}
            onChange={(e) => submit(e.currentTarget.form)}
            displayFormat={(value) => {
              if (value === "all") return "All Types";
              if (value === "true") return "Remote";
              return "On-site";
            }}
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
            transition-all duration-300"
          />
        </div>

        {/* Sort Filter */}
        <div>
          <FormRowSelect
            name="sort"
            labelText="Sort By"
            list={Object.keys(JOB_SORT_BY)}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
            displayFormat={(value) => {
              const sortLabels = {
                newest: "Newest First",
                oldest: "Oldest First",
                "a-z": "A-Z",
                "z-a": "Z-A",
                priority: "Priority",
              };
              return sortLabels[value] || value;
            }}
            className="!px-4 !py-3 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
             transition-all duration-300"
          />
        </div>

        {/* Reset Button */}
        <div className="md:col-span-2 lg:col-span-1 flex justify-center !lg:justify-end py-">
          <button
            type="button"
            onClick={handleReset}
            className="group relative !px-8 !py-4 bg-gradient-to-r from-purple-900 to-pink-800 
            hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 
            transform hover:scale-105 hover:shadow-2xl min-w-[150px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center !space-x-3">
              <FaSync className="w-4 h-4" />
              <span>Reset Filters</span>
            </span>

            {/* Animated background effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </div>

        {/* Loading Indicator */}
        {navigation.state === "loading" && (
          <div className="flex items-center justify-center md:col-span-2 lg:col-span-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SearchContainer;
