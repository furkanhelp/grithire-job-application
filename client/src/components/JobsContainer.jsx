import Job from "./Job";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <div
        className="bg-gradient-to-r from-[#1a0f2e] to-[#26143f] rounded-2xl !p-8 shadow-xl border
       border-purple-500/20
       text-center"
      >
        <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center !mx-auto !mb-4">
          <svg
            className="w-10 h-10 from-purple-800
         to-purple-950"
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
          className="text-2xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] !tracking-[-0.025em] from-white
         !leading-[1.5] bg-clip-text text-transparent !mb-2"
        >
          No Jobs Found
        </h3>
        <p className="text-gray-400">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="!space-y-6 w-full">
      {/* Header Stats - Centered with Icon */}
      <div className="text-center !mb-8">
        {/* Icon above title */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-800 to-purple-950 
        rounded-2xl !mb-4 shadow-lg mx-auto !my-5"
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

        {/* Title and stats */}
        <h2
          className="text-2xl !font-sans !font-bold bg-gradient-to-r to-[#a5b4fc] !tracking-[-0.025em] from-white
         !leading-[1.5] bg-clip-text text-transparent !mb-3"
        >
          Job Listings
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-gray-400 text-lg">
            {totalJobs} job{jobs.length > 1 && "s"} found
          </p>
          <div className="bg-purple-500/20 !px-4 !py-2 rounded-xl border border-purple-500/30">
            <span className="text-purple-300 font-semibold">
              {jobs.length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>

      {/* Pagination */}
      {numOfPages > 1 && (
        <div className="!mt-10">
          <PageBtnContainer />
        </div>
      )}
    </div>
  );
};
export default JobsContainer;
