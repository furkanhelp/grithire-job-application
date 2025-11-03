import React, { useState } from "react";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaRegStar,
  FaHome,
} from "react-icons/fa";
import {
  FcMediumPriority,
  FcLowPriority,
  FcHighPriority,
} from "react-icons/fc";
import { FaDollarSign } from "react-icons/fa";
import { Link, Form, useNavigate } from "react-router-dom";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useToast } from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";

day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
  priority,
  isRemote,
  salary,
  interviewDate,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // Status color mapping
  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    interview: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    declined: "bg-red-500/20 text-red-300 border-red-500/30",
    offer: "bg-green-500/20 text-green-300 border-green-500/30",
    accepted: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    rejected: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  // Priority color mapping
  const priorityColors = {
    high: "bg-red-500/20 text-red-300 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    low: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  const statusColor =
    statusColors[jobStatus] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";
  const priorityColor =
    priorityColors[priority] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${position}" at ${company}?`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await customFetch.delete(`/jobs/${_id}`);
      await queryClient.invalidateQueries(["jobs"]);

      toast.success(
        "Job Deleted Successfully",
        `"${position}" at ${company} has been removed`
      );
    } catch (error) {
      toast.error(
        "Delete Failed",
        error?.response?.data?.msg || "Failed to delete job"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <FcHighPriority className="w-5 h-5 text-red-400" />;
      case "medium":
        return <FcMediumPriority className="w-5 h-5 text-yellow-400" />;
      case "low":
        return <FcLowPriority className="w-5 h-5 text-green-400"/>;
      default:
        return <FaRegStar className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div
      className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700
        hover:shadow-md transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-12 h-12 bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
          >
            {company.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 ">
            <h3
              className="!font-sans !font-bold !tracking-[-0.055em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !text-sm md:!text-2xl"
            >
              {position}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:!text-xm ">
              {company}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColor}`}
          >
            {jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1)}
          </span>
          <div className="flex items-center gap-1 mt-1 mx-1">
            {getPriorityIcon(priority)}
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full font-semibold border dark:text-gray-400 capitalize">
              {priority}
            </span>
          </div>
        </div>
      </div>

      {/* Job Info */}
      <div className="space-y-5 mb-5">
        <JobInfo
          icon={<FaLocationArrow className="w-4 h-4" />}
          text={jobLocation}
        />
        <JobInfo icon={<FaCalendarAlt className="w-4 h-4" />} text={date} />
        <JobInfo
          icon={<FaBriefcase className="w-4 h-4" />}
          text={jobType.charAt(0).toUpperCase() + jobType.slice(1)}
        />
        {isRemote && (
          <JobInfo icon={<FaHome className="w-4 h-4" />} text="Remote" />
        )}
        {salary && (
          <JobInfo icon={<FaDollarSign className="w-4 h-4" />} text={salary} />
        )}
      </div>

      {/* Upcoming Interview Badge */}
      {interviewDate && day(interviewDate).isAfter(day()) && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
            <FaCalendarAlt className="w-3 h-3" />
            Interview: {day(interviewDate).format("MMM D")}
          </span>
        </div>
      )}

      {/* Actions */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 space-y-1 md:space-x-2 pt-5 border-t 
      border-gray-200 dark:border-gray-700"
      >
        <Link
          to={`../job-details/${_id}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 text-white 
          rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          <FaEye className="w-3 h-3" />
          Details
        </Link>

        <Link
          to={`../edit-job/${_id}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border 
          border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
          rounded-lg text-sm font-semibold hover:border-gray-400 dark:hover:border-gray-500 
          transition-colors duration-200"
        >
          <FaEdit className="w-3 h-3" />
          Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-600 text-white 
          rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed 
          transition-colors duration-200"
        >
          <FaTrash className="w-3 h-3" />
          {isDeleting ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default Job;
