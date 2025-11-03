import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { useToast } from "../hooks/useToast";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
//React Icons
import { FaBriefcase } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone} from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import {FaExclamationTriangle,} from "react-icons/fa";
import { RiFocus2Line, RiCalendarScheduleLine } from "react-icons/ri";
import { BiTimeFive, BiNote } from "react-icons/bi";
import { MdInsights, MdWork, MdDescription, MdPayment } from "react-icons/md";

day.extend(advancedFormat);
day.extend(relativeTime);

const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const data = await queryClient.ensureQueryData(singleJobQuery(params.id));

     
      if (!data?.job) {
        throw new Error("Job not found");
      }

      return { jobData: data, jobId: params.id };
    } catch (error) {
      console.error("Loader error:", error);
      return {
        error: true,
        message: error?.response?.data?.msg || "Failed to load job details",
        redirect: "/dashboard/all-jobs",
      };
    }
  };

const JobDetails = () => {
  const id = useLoaderData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  const { jobData, jobId, error: loaderError } = useLoaderData();
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery(singleJobQuery(jobId));

  const job = data?.job || jobData?.job;
  const error = queryError || loaderError;

  // Status color mapping
  const statusColors = {
    pending: "bg-yellow 700/80 text-yellow-700 border-yellow-700/30",
    interview: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    declined: "bg-red-500/20 text-red-300 border-red-500/30",
    offer: "bg-green-500/20 text-green-300 border-green-500/30",
    accepted: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    rejected: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  // Priority color mapping
  const priorityColors = {
    high: "bg-red-500/20 text-red-300 border-red-500/30",
    medium: "bg-yellow-700/80 text-yellow-300 border-yellow-500/30",
    low: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  const statusColor =
    statusColors[job?.jobStatus] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";
  const priorityColor =
    priorityColors[job?.priority] ||
    "bg-gray-500/20 text-gray-300 border-gray-500/30";

  // Format dates
  const createdDate = day(job?.createdAt).format("MMMM D, YYYY");
  const updatedDate = day(job?.updatedAt).format("MMMM D, YYYY");
  const interviewDate = job?.interviewDate
    ? day(job.interviewDate).format("MMMM D, YYYY h:mm A")
    : null;
  const deadlineDate = job?.applicationDeadline
    ? day(job.applicationDeadline).format("MMMM D, YYYY")
    : null;

  const handleDuplicateJob = async () => {
    try {
      const { data } = await customFetch.post("/jobs", {
        ...job,
        position: `${job.position} (Copy)`,
        jobStatus: "pending",
      });
      toast.success("Job Duplicated", "Job has been duplicated successfully");
      navigate(`/dashboard/job-details/${data.job._id}`);
    } catch (error) {
      toast.error(
        "Error",
        error?.response?.data?.msg || "Failed to duplicate job"
      );
    }
  };

  const handleDeleteJob = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${job.position}" at ${job.company}?`
      )
    ) {
      try {
        await customFetch.delete(`/jobs/${job._id}`);
        toast.success("Job Deleted", "Job has been deleted successfully");
        navigate("/dashboard/all-jobs");
      } catch (error) {
        toast.error(
          "Error",
          error?.response?.data?.msg || "Failed to delete job"
        );
      }
    }
  };

  if (id?.error) {
    toast.error("Error", id.message);
    setTimeout(() => {
      navigate(id.redirect);
    }, 2000);
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!job && !isLoading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The job you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <button
            onClick={() => navigate("/dashboard/all-jobs")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex-1">
            <button
              onClick={() => navigate("/dashboard/all-jobs")}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
              hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors duration-200 group"
            >
              <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Jobs</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div
                className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl 
              flex items-center justify-center text-white font-bold text-2xl shadow-lg"
              >
                {job.company.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1
                  className="text-3xl lg:text-4xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 mb-3"
                >
                  {job.position}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl text-gray-600 dark:text-gray-400 font-semibold">
                    {job.company}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColor}`}
                    >
                      {job.jobStatus.charAt(0).toUpperCase() +
                        job.jobStatus.slice(1)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${priorityColor}`}
                    >
                      {job.priority.charAt(0).toUpperCase() +
                        job.priority.slice(1)}{" "}
                      Priority
                    </span>
                    {job.isRemote && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold border bg-green-500/20 
                      text-green-300 border-green-500/30"
                      >
                        Remote
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={handleDuplicateJob}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 
              text-gray-700 dark:text-gray-300 rounded-lg shadow-2xl hover:border-gray-400 dark:hover:border-gray-500 
              transition-all duration-200"
            >
              <FaCopy className="w-4 h-4" />
              Duplicate
            </button>
            <button
              onClick={() => navigate(`/dashboard/edit-job/${job._id}`)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <FaEdit className="w-4 h-4" />
              Edit Job
            </button>
            <button
              onClick={handleDeleteJob}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg 
              hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              <FaTrash className="w-4 h-4 font-medium" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Job Overview Card */}
            <div
              className="bg-gradient-to-tr 
           dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2
                className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
              >
                <MdWork className="w-6 h-6 text-purple-600" />
                Job Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <InfoItem
                    icon={<FaBuilding className="w-5 h-5 text-purple-600" />}
                    label="Company"
                    value={job.company}
                  />
                  <InfoItem
                    icon={<FaBriefcase className="w-5 h-5 text-blue-600" />}
                    label="Job Type"
                    value={
                      job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)
                    }
                  />
                  <InfoItem
                    icon={<FaCalendarAlt className="w-5 h-5 text-green-600" />}
                    label="Created"
                    value={createdDate}
                  />
                  <InfoItem
                    icon={<FaDollarSign className="w-5 h-5 text-yellow-600" />}
                    label="Salary"
                    value={job.salary || "Not specified"}
                  />
                </div>
                <div className="space-y-4">
                  <InfoItem
                    icon={
                      <FaMapMarkerAlt className="w-5 h-5 text-orange-600" />
                    }
                    label="Location"
                    value={job.jobLocation}
                  />
                  <InfoItem
                    icon={<FaClock className="w-5 h-5 text-red-600" />}
                    label="Last Updated"
                    value={updatedDate}
                  />
                  <InfoItem
                    icon={
                      job.isRemote ? (
                        <FaHome className="w-5 h-5 text-green-600" />
                      ) : (
                        <FaBuilding className="w-5 h-5 text-gray-600" />
                      )
                    }
                    label="Work Type"
                    value={job.isRemote ? "Remote" : "On-site"}
                  />
                  <InfoItem
                    icon={<FaStar className="w-5 h-5 text-purple-600" />}
                    label="Priority"
                    value={
                      job.priority.charAt(0).toUpperCase() +
                      job.priority.slice(1)
                    }
                  />
                </div>
              </div>
            </div>
            {/* Job Description & Requirements */}
            {(job.jobDescription || job.requirements) && (
              <div
                className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
                to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 "
              >
                <h2
                  className="text-2xl justify-center !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
                >
                  <MdDescription className="w-6 h-6 text-purple-600" />
                  Position Details
                </h2>

                <div className="space-y-6 ">
                  {job.jobDescription && (
                    <Section
                      title="Job Description"
                      content={job.jobDescription}
                      icon={<RiFocus2Line className="w-5 h-5" />}
                    />
                  )}
                  {job.requirements && (
                    <Section
                      title="Requirements"
                      content={job.requirements}
                      icon={<FaListUl className="w-5 h-5" />}
                    />
                  )}
                  {job.benefits && (
                    <Section
                      title="Benefits"
                      content={job.benefits}
                      icon={<FaCheckCircle className="w-5 h-5" />}
                    />
                  )}
                </div>
              </div>
            )}
            {/* Application Timeline */}

            <div
              className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
                to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2
                className="text-2xl justify-center !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
                  bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
              >
                <RiCalendarScheduleLine className="w-6 h-6 text-purple-600" />
                Application Timeline
              </h2>

              <div className="space-y-5">
                <TimelineItem
                  status="completed"
                  title="Application Submitted"
                  date={createdDate}
                  icon={<FaCheckCircle className="w-5 h-5 text-green-500" />}
                />
                <TimelineItem
                  status={
                    job.jobStatus === "interview" ||
                    job.jobStatus === "offer" ||
                    job.jobStatus === "accepted"
                      ? "completed"
                      : "pending"
                  }
                  title="Interview Stage"
                  date={interviewDate}
                  icon={<FaUserTie className="w-5 h-5 text-blue-500" />}
                />
                <TimelineItem
                  status={
                    ["offer", "accepted"].includes(job.jobStatus)
                      ? "completed"
                      : "pending"
                  }
                  title="Offer Received"
                  date={job.jobStatus === "offer" ? "Offer extended" : null}
                  icon={<FaDollarSign className="w-5 h-5 text-yellow-500" />}
                />
                <TimelineItem
                  status={
                    job.jobStatus === "accepted"
                      ? "completed"
                      : job.jobStatus === "rejected"
                      ? "failed"
                      : "pending"
                  }
                  title="Final Decision"
                  date={job.jobStatus}
                  icon={
                    job.jobStatus === "accepted" ? (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    ) : job.jobStatus === "rejected" ? (
                      <FaTimesCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />
                    )
                  }
                />
              </div>
            </div>

            {/* Notes Section */}
            {job.notes && (
              <div
                className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
                to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2
                  className="text-2xl justify-center !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
                >
                  <BiNote className="w-6 h-6 text-purple-600" />
                  Notes
                </h2>
                <p className="text-gray-800 dark:text-gray-300 whitespace-pre-line !leading-[1.5]">
                  {job.notes}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div
              className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
              to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                className="!text-4xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10"
              >
                Quick Actions
              </h3>
              <div className="space-y-5">
                <ActionButton
                  icon={<FaEdit className="w-4 h-4" />}
                  label="Edit Job Details"
                  onClick={() => navigate(`/dashboard/edit-job/${job._id}`)}
                  variant="primary"
                />
                <ActionButton
                  icon={<FaCopy className="w-4 h-4" />}
                  label="Duplicate Job"
                  onClick={handleDuplicateJob}
                  variant="secondary"
                />
                <ActionButton
                  icon={<FaExternalLinkAlt className="w-4 h-4" />}
                  label="View Application"
                  onClick={() => window.open(job.applicationUrl, "_blank")}
                  disabled={!job.applicationUrl}
                  variant="secondary"
                />
                <ActionButton
                  icon={<FaEnvelope className="w-4 h-4" />}
                  label="Contact"
                  onClick={() =>
                    (window.location.href = `mailto:${job.contactEmail}`)
                  }
                  disabled={!job.contactEmail}
                  variant="secondary"
                />
                <ActionButton
                  icon={<FaTrash className="w-4 h-4" />}
                  label="Delete Job"
                  onClick={handleDeleteJob}
                  variant="danger"
                />
              </div>
            </div>

            {/* Important Dates */}
            <div
              className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
              to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                className="!text-4xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10"
              >
                Important Dates
              </h3>
              <div className="space-y-4">
                <DateItem
                  label="Application Deadline"
                  date={deadlineDate}
                  icon={<FaCalendarAlt className="w-4 h-4" />}
                  isPast={deadlineDate && day(deadlineDate).isBefore(day())}
                />
                <DateItem
                  label="Interview Date"
                  date={interviewDate}
                  icon={<FaUserTie className="w-4 h-4" />}
                  isPast={interviewDate && day(interviewDate).isBefore(day())}
                />
                <DateItem
                  label="Created"
                  date={createdDate}
                  icon={<FaClock className="w-4 h-4" />}
                />
                <DateItem
                  label="Last Updated"
                  date={updatedDate}
                  icon={<FaClock className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Contact Information */}
            {(job.contactEmail || job.contactPhone) && (
              <div
                className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
              to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3
                  className="!text-3xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10"
                >
                  Contact Information
                </h3>
                <div className="space-y-5 ">
                  {job.contactEmail && (
                    <ContactItem
                      icon={<FaEnvelope className="w-4 h-4" />}
                      label="Email"
                      value={job.contactEmail}
                      href={`mailto:${job.contactEmail}`}
                    />
                  )}
                  {job.contactPhone && (
                    <ContactItem
                      icon={<FaPhone className="w-4 h-4" />}
                      label="Phone"
                      value={job.contactPhone}
                      href={`tel:${job.contactPhone}`}
                    />
                  )}
                  {job.applicationUrl && (
                    <ContactItem
                      icon={<FaGlobe className="w-4 h-4" />}
                      label="Application URL"
                      value="Visit Website"
                      href={job.applicationUrl}
                      isExternal
                    />
                  )}
                </div>
              </div>
            )}

            {/* Status Overview */}
            <div
              className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] 
              to-[#c19ef3] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                className="!text-4xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10"
              >
                Status Overview
              </h3>
              <div className="space-y-5">
                <StatusItem
                  label="Current Status"
                  value={job.jobStatus}
                  color={statusColor}
                />
                <StatusItem
                  label="Priority"
                  value={job.priority}
                  color={priorityColor}
                />
                <StatusItem label="Job Type" value={job.jobType} />
                <StatusItem
                  label="Days Active"
                  value={`${day().diff(day(job.createdAt), "day")} days`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-300 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const Section = ({ title, content, icon }) => (
  <div>
    <h4
      className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
      bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-2"
      >
        <div className="text-black dark:text-white">

      {icon} 
        </div>
      {title}
    </h4>
    <h4></h4>
    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line !leading-[1.5]">
      {content}
    </p>
  </div>
);

const TimelineItem = ({ status, title, date, icon }) => (
  <div className="flex items-start gap-4">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        status === "completed"
          ? "bg-green-100 dark:bg-green-900"
          : status === "failed"
          ? "bg-red-100 dark:bg-red-900"
          : "bg-gray-100 dark:bg-gray-700"
      }`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <p
        className={`font-semibold ${
          status === "completed"
            ? "text-green-600 dark:text-green-400"
            : status === "failed"
            ? "text-red-600 dark:text-red-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {title}
      </p>
      {date && (
        <p className="text-sm text-gray-300 dark:text-gray-500">{date}</p>
      )}
    </div>
  </div>
);

const ActionButton = ({
  icon,
  label,
  onClick,
  disabled = false,
  variant = "secondary",
}) => {
  const baseClasses =
    "w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary:
      "border  border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} `}
    >
      {icon}
      {label}
    </button>
  );
};

const DateItem = ({ label, date, icon, isPast = false }) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Icon */}
        <div
          className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center ${
            isPast
              ? "bg-red-100 dark:bg-red-900"
              : "bg-gray-100 dark:bg-gray-700"
          }`}
        >
          {icon}
        </div>

        {/* Text block */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate sm:truncate-none break-words">
            {label}
          </p>
          <p
            className={`text-xs break-words ${
              isPast
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {date || "Not set"}
          </p>
        </div>
      </div>

      {/* Status chip */}
      {isPast && date && (
        <span className="px-2 py-1 text-xs whitespace-nowrap bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded self-start">
          Past Due
        </span>
      )}
    </div>
  );
};

const ContactItem = ({ icon, label, value, href, isExternal }) => {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block"
    >
      <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/5">
        <div className="flex-shrink-0">{icon}</div>

        {/* IMPORTANT: min-w-0 allows this to shrink inside flex */}
        <div className="min-w-0">
          <div className="text-xs text-gray-400">{label}</div>

          {/* use break-words to wrap; use break-all for very long no-break strings like some URLs */}
          <div className="text-sm font-medium max-w-full break-words overflow-hidden">
            {value}
          </div>
        </div>
      </div>
    </Tag>
  );
};

const StatusItem = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-300 dark:text-gray-400">{label}</span>
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold border ${
        color ||
        "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
      }`}
    >
      {typeof value === "string"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value}
    </span>
  </div>
);

export default JobDetails;
