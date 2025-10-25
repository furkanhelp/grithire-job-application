import { FormRow, FormRowSelect } from "../components";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants.js";
import { useAllJobsContext } from "../pages/AllJobs.jsx";
import { useNavigate } from "react-router-dom";
const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();
  const navigate = useNavigate();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1200);
    };
  };

  return (
    <div
      className="bg-gradient-to-r from-[#1a0f2e] to-[#26143f] rounded-2xl !p-3 
    sm:p-4 md:!p-6 shadow-xl border border-purple-500/20 "
    >
      {/* Header Section */}
      <div className="text-center !mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-800
         to-purple-950 rounded-2xl !mb-4 shadow-lg mx-auto"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Title and subtitle */}
        <h3 className="text-2xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] !tracking-[-0.025em] from-white
         !leading-[1.5] bg-clip-text text-transparent !mb-3">
          Search Jobs
        </h3>
        <p className="text-gray-400 text-lg">Find your perfect job match</p>
      </div>

      <Form>
        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 !mb-6 w-full">
          {/* Search Input*/}
          <div className="w-full lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-300 !mb-2.5">
              Search Jobs
            </label>
            <div className="relative">
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="Position, company, or location..."
                onChange={debounce((form) => {
                  submit(form);
                })}
                className="w-full !px-4 !py-4 bg-black/40 border-2 border-gray-600 
                rounded-xl text-white placeholder-gray-500
                focus:border-purple-900 focus:ring-2 focus:ring-purple-500/20 
                transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 !mb-4">
              Job Status
            </label>
            <FormRowSelect
              key={`jobStatus-${jobStatus || "all"}`}
              name="jobStatus"
              list={["all", ...Object.values(JOB_STATUS)]}
              defaultValue={jobStatus || "all"}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
              className="w-full px-3 py-3"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 !mb-4">
              Job Type
            </label>
            <FormRowSelect
              key={`jobType-${jobType || "all"}`}
              name="jobType"
              list={["all", ...Object.values(JOB_TYPE)]}
              defaultValue={jobType || "all"}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
              className="w-full px-3 py-3"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block  text-sm font-semibold text-gray-300 !mb-4">
              Sort By
            </label>
            <FormRowSelect
              key={`sort-${sort || "newest"}`}
              name="sort"
              list={[...Object.values(JOB_SORT_BY)]}
              defaultValue={sort || "newest"}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
              className="w-full px-3 py-3"
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center !pt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard/all-jobs")}
            className="group relative !px-8 sm:!px-1 !py-3 sm:!py-4 bg-gradient-to-r from-purple-900 to-pink-800 
            hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 
            transform hover:scale-105 hover:shadow-2xl min-w-[160px] sm:min-w-[200px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center !space-x-2 sm:!space-x-3">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-sm sm:text-base">Reset All Filters</span>
            </span>

            {/* Animated background effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 
      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </div>
      </Form>
    </div>
  );
};
export default SearchContainer;
