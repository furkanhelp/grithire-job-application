import React from "react";
import {
  FormRow,
  FormRowSelect,
  SubmitBtn,
  FormRowTextarea,
} from "../components";
import {
  useLoaderData,
  useParams,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaStickyNote,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { MdDescription, MdWork, MdPayment } from "react-icons/md";
import { JOB_STATUS, JOB_TYPE, JOB_PRIORITY } from "../../../utils/constants";
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

    // Convert empty strings to null for optional fields
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    // Convert date strings to ISO format
    if (data.interviewDate) {
      data.interviewDate = new Date(data.interviewDate).toISOString();
    }
    if (data.applicationDeadline) {
      data.applicationDeadline = new Date(
        data.applicationDeadline
      ).toISOString();
    }

    // Convert boolean fields
    if (data.isRemote) {
      data.isRemote = data.isRemote === "true";
    }

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      await queryClient.invalidateQueries(["jobs"]);
      await queryClient.invalidateQueries(["job", params.id]);

      return {
        success: true,
        message: "Job updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.msg || "Failed to update job",
      };
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const actionData = useActionData();
  const navigation = useNavigation();
  const hasShownToastRef = React.useRef(false);

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
        toast.error("Error", actionData.error);
      }
    }
  }, [actionData, toast, navigate, id]);

  // Reset ref on form submission
  React.useEffect(() => {
    if (navigation.state === "submitting") {
      hasShownToastRef.current = false;
    }
  }, [navigation.state]);

  const {
    data: { job },
    isLoading,
  } = useQuery(singleJobQuery(id));

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

  // Format dates for input fields
  const interviewDate = job.interviewDate
    ? day(job.interviewDate).format("YYYY-MM-DDTHH:mm")
    : "";
  const applicationDeadline = job.applicationDeadline
    ? day(job.applicationDeadline).format("YYYY-MM-DD")
    : "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(`/dashboard/job-details/${job._id}`)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors duration-200 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Job Details</span>
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg mb-4">
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
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Edit Job Position
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Update the job details below. All changes will be reflected
            immediately.
          </p>
        </div>

        {/* Current Job Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {job.jobStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <FaBriefcase className="w-6 h-6" />
              Update Job Information
            </h2>
          </div>

          <Form method="post" className="p-6 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaBuilding className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                />

                <FormRow
                  type="text"
                  name="company"
                  labelText="Company Name *"
                  defaultValue={job.company}
                  placeholder="e.g., Tech Corp Inc."
                  icon={<FaBuilding className="w-4 h-4" />}
                />

                <FormRow
                  type="text"
                  name="jobLocation"
                  labelText="Job Location *"
                  defaultValue={job.jobLocation}
                  placeholder="e.g., San Francisco, CA"
                  icon={<FaMapMarkerAlt className="w-4 h-4" />}
                />

                <FormRow
                  type="text"
                  name="salary"
                  labelText="Salary Range"
                  defaultValue={job.salary}
                  placeholder="e.g., $80,000 - $100,000"
                  icon={<FaDollarSign className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Job Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <MdWork className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Job Details
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormRowSelect
                  name="jobStatus"
                  labelText="Application Status *"
                  list={Object.values(JOB_STATUS)}
                  defaultValue={job.jobStatus}
                  icon={<FaCheckCircle className="w-4 h-4" />}
                />

                <FormRowSelect
                  name="jobType"
                  labelText="Job Type *"
                  list={Object.values(JOB_TYPE)}
                  defaultValue={job.jobType}
                  icon={<MdWork className="w-4 h-4" />}
                />

                <FormRowSelect
                  name="priority"
                  labelText="Priority Level"
                  list={Object.values(JOB_PRIORITY)}
                  defaultValue={job.priority}
                  icon={<FaExclamationTriangle className="w-4 h-4" />}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Remote Work
                  </label>
                  <select
                    name="isRemote"
                    defaultValue={job.isRemote?.toString() || "false"}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="false">On-site</option>
                    <option value="true">Remote</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Description & Requirements */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <MdDescription className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Position Details
                </h3>
              </div>

              <FormRowTextarea
                name="jobDescription"
                labelText="Job Description"
                defaultValue={job.jobDescription}
                placeholder="Describe the role, responsibilities, and what you'll be working on..."
                rows={6}
              />

              <FormRowTextarea
                name="requirements"
                labelText="Requirements & Qualifications"
                defaultValue={job.requirements}
                placeholder="List the required skills, experience, and qualifications..."
                rows={4}
              />

              <FormRowTextarea
                name="benefits"
                labelText="Benefits & Perks"
                defaultValue={job.benefits}
                placeholder="Describe the benefits, perks, and company culture..."
                rows={4}
              />
            </div>

            {/* Contact & Application Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaEnvelope className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Contact & Application
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormRow
                  type="email"
                  name="contactEmail"
                  labelText="Contact Email"
                  defaultValue={job.contactEmail}
                  placeholder="e.g., hiring@company.com"
                  icon={<FaEnvelope className="w-4 h-4" />}
                />

                <FormRow
                  type="tel"
                  name="contactPhone"
                  labelText="Contact Phone"
                  defaultValue={job.contactPhone}
                  placeholder="e.g., +1 (555) 123-4567"
                  icon={<FaPhone className="w-4 h-4" />}
                />

                <FormRow
                  type="url"
                  name="applicationUrl"
                  labelText="Application URL"
                  defaultValue={job.applicationUrl}
                  placeholder="e.g., https://company.com/careers/position"
                  icon={<FaGlobe className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Important Dates */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaCalendarAlt className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Important Dates
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormRow
                  type="datetime-local"
                  name="interviewDate"
                  labelText="Interview Date & Time"
                  defaultValue={interviewDate}
                  icon={<FaCalendarAlt className="w-4 h-4" />}
                />

                <FormRow
                  type="date"
                  name="applicationDeadline"
                  labelText="Application Deadline"
                  defaultValue={applicationDeadline}
                  icon={<FaCalendarAlt className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <FaStickyNote className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Additional Notes
                </h3>
              </div>

              <FormRowTextarea
                name="notes"
                labelText="Personal Notes"
                defaultValue={job.notes}
                placeholder="Add any additional notes, reminders, or thoughts about this application..."
                rows={4}
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
                isSubmitting={navigation.state === "submitting"}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              />
            </div>
          </Form>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All fields marked with * are required. Changes are saved
            automatically when you submit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
