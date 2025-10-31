import { useEffect, useRef } from "react";
import {
  FormRow,
  FormRowSelect,
  FormRowTextarea,

  SubmitBtn,
} from "../components";
import { Form, useActionData, useNavigate } from "react-router-dom";
import {
  JOB_STATUS,
  JOB_TYPE,
  JOB_PRIORITY,
} from "../../../utils/constants.js";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../contexts/AuthContext";
import {
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaCalendarAlt,
  FaStickyNote,
  FaUserTie,
  FaCheck,
} from "react-icons/fa";
import FormRowDate from "../components/FormRowDate";

export const action =
  (queryClient) =>
  async ({ request }) => {
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
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      return {
        success: true,
        message: "Job added successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.msg,
      };
    }
  };

const AddJob = () => {
  const { user } = useAuth();
  const actionData = useActionData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (actionData && !hasShownToastRef.current) {
      hasShownToastRef.current = true;
      if (actionData.success) {
        toast.success(actionData.message, "");
        setTimeout(() => {
          navigate("/dashboard/all-jobs");
        }, 2000);
      } else {
        toast.error("Error", actionData.error);
      }
    }
  }, [actionData, toast, navigate]);

  return (
    <div className="w-full">
      <div className="text-center !mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr 
           dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] rounded-2xl !mb-4 shadow-lg"
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h4
          className="!text-3xl md:text-4xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-3"
        >
          Add New Job
        </h4>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
          Fill in the details below to create a new job posting
        </p>
      </div>

      <Form method="post" className="!space-y-8">
        {/* Basic Information Section */}
        <div
          className="rounded-3xl !p-10 shadow-2xl bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] border border-gray-500/50"
        >
          <h3
            className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
          >
            <FaUserTie className="w-6 h-6 text-purple-600" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <FormRow
              type="text"
              name="company"
              labelText="Company Name "
              defaultValue=""
              placeholder="e.g., Tech Corp Inc."
              icon={<FaBuilding className="w-4 h-4" />}
              required={true}
              className="!px-10 !py-4  border-2 border-gray-700 rounded-2xl focus:border-purple-500 
              focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRow
              type="text"
              name="position"
              labelText="Position "
              defaultValue=""
              placeholder="e.g., Senior Frontend Developer"
              icon={<FaBriefcase className="w-4 h-4" />}
              required={true}
              className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRow
              type="text"
              name="jobLocation"
              labelText="Job Location "
              defaultValue=""
              placeholder="e.g., San Francisco, CA"
              icon={<FaMapMarkerAlt className="w-4 h-4" />}
              required={true}
              className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRow
              type="text"
              name="salary"
              labelText="Salary Range"
              defaultValue=""
              placeholder="e.g., $80,000 - $100,000"
              icon={<FaDollarSign className="w-4 h-4" />}
              className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Job Details Section */}
        <div
          className="rounded-3xl !p-10 shadow-2xl border bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] border-gray-500/50"
        >
          <h3
            className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
          >
            <FaBriefcase className="w-6 h-6 text-purple-600" />
            Job Details
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <FormRowSelect
              name="jobStatus"
              labelText="Application Status "
              list={Object.values(JOB_STATUS)}
              defaultValue={JOB_STATUS.PENDING}
              displayFormat={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
              required={true}
              className="!px-4 !py-4 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRowSelect
              name="jobType"
              labelText="Job Type "
              list={Object.values(JOB_TYPE)}
              defaultValue={JOB_TYPE.FULL_TIME}
              displayFormat={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
              required={true}
              className="!px-4 !py-4  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRowSelect
              name="priority"
              labelText="Priority Level"
              list={Object.values(JOB_PRIORITY)}
              defaultValue={JOB_PRIORITY.MEDIUM}
              displayFormat={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
              className="!px-4 !py-4  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRowSelect
              name="isRemote"
              labelText="Work Type"
              list={["false", "true"]}
              defaultValue="false"
              displayFormat={(value) =>
                value === "true" ? "Remote" : "On-site"
              }
              className="!px-4 !py-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <FormRowDate
              type="datetime-local"
              name="interviewDate"
              labelText="Interview Date & Time"
              defaultValue=""
              required={false}
              className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRowDate
              type="date"
              name="applicationDeadline"
              labelText="Application Deadline"
              defaultValue=""
              required={false}
              className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Job Description & Requirements */}
        <div
          className="rounded-3xl !p-10 shadow-2xl border bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] border-gray-500/50"
        >
          <h3
            className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
          >
            <FaStickyNote className="w-6 h-6 text-purple-600" />
            Position Details
          </h3>

          <div className="space-y-6">
            <FormRowTextarea
              name="jobDescription"
              labelText="Job Description"
              defaultValue=""
              placeholder="Describe the role, responsibilities, and what you'll be working on..."
              rows={6}
              className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRowTextarea
              name="requirements"
              labelText="Requirements & Qualifications"
              defaultValue=""
              placeholder="List the required skills, experience, and qualifications..."
              rows={4}
              className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRowTextarea
              name="benefits"
              labelText="Benefits & Perks"
              defaultValue=""
              placeholder="Describe the benefits, perks, and company culture..."
              rows={4}
              className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Contact & Application Information */}
        <div
          className="rounded-3xl !p-10 shadow-2xl border bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] border-gray-500/50"
        >
          <h3
            className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
          >
            <FaEnvelope className="w-6 h-6 text-purple-600" />
            Contact & Application
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FormRow
              type="email"
              name="contactEmail"
              labelText="Contact Email"
              defaultValue=""
              placeholder="e.g., hiring@company.com"
              icon={<FaEnvelope className="w-4 h-4" />}
              className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRow
              type="tel"
              name="contactPhone"
              labelText="Contact Phone"
              defaultValue=""
              placeholder="e.g., +1 (555) 123-4567"
              icon={<FaPhone className="w-4 h-4" />}
              className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />

            <FormRow
              type="url"
              name="applicationUrl"
              labelText="Application URL"
              defaultValue=""
              placeholder="e.g., https://company.com/careers/position"
              icon={<FaGlobe className="w-4 h-4" />}
              className="!px-10 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-black focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div
          className="rounded-3xl !p-10 shadow-2xl border bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8]
       to-[#c19ef3] border-gray-500/50"
        >
          <h3
            className="text-2xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 !mb-10 flex items-center gap-3"
          >
            <FaStickyNote className="w-6 h-6 text-purple-600" />
            Additional Notes
          </h3>

          <FormRowTextarea
            name="notes"
            labelText="Personal Notes"
            defaultValue=""
            placeholder="Add any additional notes, reminders, or thoughts about this application..."
            rows={4}
            className="!px-4 !py-4 border-2 border-gray-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center !pt-6">
          <button
            text="Add Job"
            submittingText="Adding Job..."
            className="group relative !px-8 !py-4 bg-gradient-to-r from-purple-900 to-pink-800 
          hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 
          transform hover:scale-105 hover:shadow-2xl min-w-[150px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center !space-x-3">
            
              <FaCheck className="w-4 h-4" />
              <span>Submit</span>
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

export default AddJob;
