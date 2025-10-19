import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  // Status color mapping
  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    interview: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    declined: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  const statusColor =
    statusColors[jobStatus] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <div
      className="bg-gradient-to-br from-[#1a0f2e] to-[#26143f] rounded-2xl !p-4 sm:p-6 shadow-xl border 
    border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
    >
      {/* Header - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 !mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center !space-x-3">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center 
          justify-center text-white font-bold text-base sm:text-lg shadow-lg"
            >
              {company.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors
              break-words whitespace-normal">
                {position}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm truncate">
                {company}
              </p>
        </div>
            </div>
          </div>
        <div
          className={`!px-3 !py-1 rounded-full text-xs font-semibold border ${statusColor} self-start sm:self-auto`}
        >
          {jobStatus}
        </div>
      </div>

      {/* Job Info */}
      <div className="!space-y-2 sm:space-y-3 !mb-4 sm:mb-6">
        <JobInfo
          icon={<FaLocationArrow className="w-4 h-4" />}
          text={jobLocation}
        />
        <JobInfo icon={<FaCalendarAlt className="w-4 h-4" />} text={date} />
        <JobInfo icon={<FaBriefcase className="w-4 h-4" />} text={jobType} />
      </div>

      {/* Actions - Full width on mobile */}
      <div className="flex !space-x-2 sm:space-x-3 !pt-4 border-t border-gray-700">
        <Link
          to={`../edit-job/${_id}`}
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 border 
          border-blue-500/30 hover:border-blue-500/50 !py-2 !px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold text-center 
          transition-all duration-200 transform hover:scale-105"
        >
          Edit
        </Link>
        <Form method="post" action={`../delete-job/${_id}`} className="flex-1">
          <button
            type="submit"
            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-500/30
             hover:border-red-500/50 !py-2 !px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200
              transform hover:scale-105"
          >
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
};
export default Job;
