import Job from "./Job";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";
import SearchContainer from "./SearchContainer";
import { useNavigate } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
const JobsContainer = () => {
  const navigate = useNavigate()
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <div
        className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
      >
        <div
          className="w-20 h-20 bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3
          className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 mb-2"
        >
          No Jobs Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try adjusting your search filters or create a new job application.
        </p>
        {/* Add Your First Job */}
        <button
          onClick={()=>navigate("/dashboard")}
          className="group my-5 relative !px-6 !py-3 bg-gradient-to-r from-purple-900 to-pink-800 
            hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 
            transform hover:scale-105 hover:shadow-2xl min-w-[150px] overflow-hidden
            "
        >
          <span className="relative z-10 flex items-center justify-center !space-x-2">
            <IoMdAdd className="w-4 h-4" />

            <span>Add Your First Job</span>
          </span>
          {/* Animated background effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-6 w-full">
      {/* Header Stats */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] rounded-2xl shadow-lg mx-auto mb-4"
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>

        <h2
          className="text-3xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 mb-3"
        >
          Job Applications
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {totalJobs} job{jobs.length > 1 && "s"} found
          </p>
          <div className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-800">
            <span className="font-semibold text-purple-800 dark:text-purple-200">
              {jobs.length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>

      {/* Pagination */}
      {numOfPages > 1 && (
        <div className="mt-10">
          <PageBtnContainer />
        </div>
      )}
    </div>
  );
};

export default JobsContainer;
