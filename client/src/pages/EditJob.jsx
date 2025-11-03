import React from "react";
import {
  FormRow,
  FormRowSelect,
  SubmitBtn,
  FormRowTextarea,
} from "../components";
import FormRowDate from "../components/FormRowDate";
import {
  useLoaderData,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";

// React Icons
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaStickyNote,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowLeft,
  FaHome,
} from "react-icons/fa";
import { MdDescription, MdWork } from "react-icons/md";
import {
  JOB_STATUS,
  JOB_TYPE,
  JOB_PRIORITY,
  JOB_REMOTE,
  JOB_REMOTE_LABELS,
} from "../../../utils/constants";
import { Form } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import day from "dayjs";

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
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      return {
        error: true,
        message: error?.response?.data?.msg || "Failed to load job",
        redirect: "/dashboard/all-jobs",
      };
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log("🚀 EditJob Form data received:", data);

    // Converts empty strings to null
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    // Converts boolean fields
    if (data.isRemote) {
      data.isRemote = data.isRemote === "true";
    }

    // Converts date strings to ISO format
    if (data.interviewDate) {
      const interviewDate = new Date(data.interviewDate);
      data.interviewDate = interviewDate.toISOString();
    }

    if (data.applicationDeadline) {
      const applicationDeadline = new Date(data.applicationDeadline);
      data.applicationDeadline = applicationDeadline.toISOString();
    }

    console.log("✅ EditJob Data after processing:", data);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      await queryClient.invalidateQueries(["jobs"]);
      await queryClient.invalidateQueries(["job", params.id]);

      return {
        success: true,
        message: "Job updated successfully",
      };
    } catch (error) {
      console.error("❌ Update job error:", error.response?.data);

      const serverError = error?.response?.data;

      if (serverError?.errors && Array.isArray(serverError.errors)) {
        const errorMessages = serverError.errors.join(", ");
        return {
          success: false,
          error: errorMessages,
        };
      } else if (serverError?.error) {
        return {
          success: false,
          error: serverError.error,
        };
      } else if (serverError?.msg) {
        return {
          success: false,
          error: serverError.msg,
        };
      } else {
        return {
          success: false,
          error: error?.response?.data?.msg || "Failed to update job",
        };
      }
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const actionData = useActionData();
  const navigation = useNavigation();
  const hasShownToastRef = React.useRef(false);

  // Resets toast ref when form submission starts
  React.useEffect(() => {
    if (navigation.state === "submitting") {
      hasShownToastRef.current = false;
    }
  }, [navigation.state]);

  // Handle loader errors
  React.useEffect(() => {
    if (id?.error) {
      toast.error("Error", id.message);
      setTimeout(() => {
        navigate(id.redirect);
      }, 2000);
    }
  }, [id, toast, navigate]);

  // Handle action data
  React.useEffect(() => {
    if (actionData && !hasShownToastRef.current) {
      hasShownToastRef.current = true;

      if (actionData.success) {
        toast.success("Success!", actionData.message);
        setTimeout(() => {
          navigate(`/dashboard/job-details/${id}`, {
            state: { timestamp: Date.now() },
          });
        }, 1500);
      } else if (actionData.error) {
        let errorMessage = actionData.error;
        if (actionData.error.includes(",")) {
          const errors = actionData.error.split(", ");
          errorMessage = `Please fix the following issues:\n• ${errors.join(
            "\n• "
          )}`;
        }
        toast.error("Validation Error", errorMessage);
      }
    }
  }, [actionData, toast, navigate, id]);

  const { data, isLoading, error } = useQuery(singleJobQuery(id));

  // Debug the data
  React.useEffect(() => {
    if (data) {
      console.log("📊 EditJob - Job data loaded:", {
        job: data.job,
        priority: data.job?.priority,
        jobStatus: data.job?.jobStatus,
        jobType: data.job?.jobType,
        isRemote: data.job?.isRemote,
      });
    }
    if (error) {
      console.error("❌ EditJob - Query error:", error);
    }
  }, [data, error]);

  if (id?.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!data?.job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Job not found</p>
        </div>
      </div>
    );
  }

  const { job } = data;

  // Format dates for input fields
  const interviewDate = job.interviewDate
    ? day(job.interviewDate).format("YYYY-MM-DDTHH:mm")
    : "";

  const applicationDeadline = job.applicationDeadline
    ? day(job.applicationDeadline).format("YYYY-MM-DD")
    : "";

  return (
    <div className="min-h-screen py-10 px-5 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto ">
        {/* Header Section */}
        <div className="text-center mb-10 ">
          <button
            onClick={() => navigate(`/dashboard/job-details/${job._id}`)}
            className="flex gap-2 text-gray-600 dark:text-gray-400 
            hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors duration-200 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Job Details</span>
          </button>

          <div
            className="inline-flex items-center justify-center w-16 h-16 
          bg-gradient-to-tr dark:from-[#481f81]
           dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl shadow-lg mb-4"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1
            className="text-3xl lg:text-4xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 mb-3"
          >
            Edit Job Position
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl !mx-auto">
            Update the job details below. All changes will be reflected
            immediately.
          </p>
        </div>

        {/* Job Info Card */}
        <div className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70"
            >
              Current Job Details
            </h3>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
              Editing Mode
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Position</span>
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {job.position}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Company</span>
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {job.company}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Priority</span>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {job.priority || "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] px-6 py-5">
            <h2
              className="text-xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 flex items-center gap-3"
            >
              <FaBriefcase className="w-6 h-6 text-white" />
              Update Job Information
            </h2>
          </div>

          <Form method="post" className="p-6 space-y-10">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaBuilding className="w-5 h-5 text-purple-600" />
                <h3
                  className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70"
                >
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormRow
                  type="text"
                  name="position"
                  labelText="Job Position *"
                  defaultValue={job.position}
                  placeholder="e.g., Senior Frontend Developer"
                  icon={<FaBriefcase className="w-4 h-4" />}
                  className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />

                <FormRow
                  type="text"
                  name="company"
                  labelText="Company Name *"
                  defaultValue={job.company}
                  placeholder="e.g., Tech Corp Inc."
                  icon={<FaBuilding className="w-4 h-4" />}
                  className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />

                <FormRow
                  type="text"
                  name="jobLocation"
                  labelText="Job Location *"
                  defaultValue={job.jobLocation}
                  placeholder="e.g., San Francisco, CA"
                  icon={<FaMapMarkerAlt className="w-4 h-4" />}
                  className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />

                <FormRow
                  type="text"
                  name="salary"
                  labelText="Salary Range"
                  defaultValue={job.salary}
                  placeholder="e.g., $80,000 - $100,000"
                  icon={<FaDollarSign className="w-4 h-4" />}
                  className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Job Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-5 border-b border-gray-200 dark:border-gray-700">
                <MdWork className="w-5 h-5 text-purple-600" />
                <h3
                  className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70"
                >
                  Job Details
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Status */}
                <FormRowSelect
                  name="jobStatus"
                  labelText="Application Status *"
                  list={Object.values(JOB_STATUS)}
                  defaultValue={job.jobStatus}
                  displayFormat={(value) =>
                    value.charAt(0).toUpperCase() + value.slice(1)
                  }
                  icon={<FaCheckCircle className="w-4 h-4" />}
                />

                {/* Job Type */}
                <FormRowSelect
                  name="jobType"
                  labelText="Job Type *"
                  list={Object.values(JOB_TYPE)}
                  defaultValue={job.jobType}
                  displayFormat={(value) =>
                    value
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  }
                  icon={<MdWork className="w-4 h-4" />}
                />

                {/* Priority Level */}
                <FormRowSelect
                  name="priority"
                  labelText="Priority Level"
                  list={Object.values(JOB_PRIORITY)}
                  defaultValue={job.priority || ""}
                  displayFormat={(value) =>
                    value
                      ? value.charAt(0).toUpperCase() + value.slice(1)
                      : "Select Priority"
                  }
                  icon={<FaExclamationTriangle className="w-4 h-4" />}
                />

                {/* Work Type */}
                <FormRowSelect
                  name="isRemote"
                  labelText="Work Type"
                  list={Object.values(JOB_REMOTE)}
                  defaultValue={job.isRemote?.toString() || JOB_REMOTE.ONSITE}
                  displayFormat={(value) => JOB_REMOTE_LABELS[value]}
                  icon={<FaHome className="w-4 h-4" />}
                />

                {/* Interview Date */}
                <FormRowDate
                  type="datetime-local"
                  name="interviewDate"
                  labelText="Interview Date & Time"
                  defaultValue={interviewDate}
                  required={false}
                  className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />

                {/* Application Deadline */}
                <FormRowDate
                  type="date"
                  name="applicationDeadline"
                  labelText="Application Deadline"
                  defaultValue={applicationDeadline}
                  required={false}
                  className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Job Description & Requirements */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <MdDescription className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70">
                  Position Details
                </h3>
              </div>

              <FormRowTextarea
                name="jobDescription"
                labelText="Job Description"
                defaultValue={job.jobDescription}
                maxLength={2000}
                placeholder="Describe the role, responsibilities, and what you'll be working on..."
                rows={6}
                resize="vertical"
                className="!px-2 !py-2 rounded-2xl focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />

              <FormRowTextarea
                name="requirements"
                labelText="Requirements & Qualifications"
                defaultValue={job.requirements}
                maxLength={1500}
                placeholder="List the required skills, experience, and qualifications..."
                rows={4}
                resize="vertical"
                className="!px-2 !py-2 rounded-2xl focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />

              <FormRowTextarea
                name="benefits"
                labelText="Benefits & Perks"
                defaultValue={job.benefits}
                maxLength={1000}
                placeholder="Describe the benefits, perks, and company culture..."
                rows={4}
                resize="vertical"
                className="!px-2 !py-2 rounded-2xl focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Contact & Application Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaEnvelope className="w-5 h-5 text-purple-600" />
                <h3
                  className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70"
                >
                  Contact & Application
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FormRow
                  type="email"
                  name="contactEmail"
                  labelText="Contact Email"
                  defaultValue={job.contactEmail}
                  placeholder="e.g., hiring@company.com"
                  icon={<FaEnvelope className="w-4 h-4" />}
                  className="!px-10 !py-1 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />

                <FormRow
                  type="tel"
                  name="contactPhone"
                  labelText="Contact Phone"
                  defaultValue={job.contactPhone}
                  placeholder="e.g., +1 (555) 123-4567"
                  icon={<FaPhone className="w-4 h-4" />}
                  className="!px-10 !py-1 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />

                <FormRow
                  type="url"
                  name="applicationUrl"
                  labelText="Application URL"
                  defaultValue={job.applicationUrl}
                  placeholder="e.g., https://company.com/careers/position"
                  icon={<FaGlobe className="w-4 h-4" />}
                  className="!px-10 !py-1 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaStickyNote className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70">
                  Additional Notes
                </h3>
              </div>

              <FormRowTextarea
                name="notes"
                labelText="Personal Notes"
                defaultValue={job.notes}
                placeholder="Add any additional notes, reminders, or thoughts about this application..."
                rows={4}
                resize="vertical"
                className="!px-2 !py-2 border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/job-details/${job._id}`)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
              <SubmitBtn
                text="Update Job"
                submittingText="Updating Job..."
                className="text-white group relative !px-8 !py-4 bg-gradient-to-r from-purple-900 to-pink-800 
            hover:from-purple-900 hover:to-pink-800 font-bold rounded-2xl shadow-2xl transition-all duration-300 
            transform hover:scale-105 hover:shadow-2xl min-w-[150px] overflow-hidden"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
