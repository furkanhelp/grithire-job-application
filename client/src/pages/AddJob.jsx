import { useEffect, useRef } from "react";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import { useToast } from "../hooks/useToast";
import customFetch from "../utils/customFetch";
import { useAuth } from "../contexts/AuthContext";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
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
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br
         from-purple-800 to-purple-950 rounded-2xl !mb-4 shadow-lg"
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

      <Form method="post" className="!space-y-5">
        {/* Main Form Container */}
        <div
          className=" rounded-3xl 
        !p-10 shadow-2xl border border-gray-500/20"
        >
          {/* Company & Location Row */}
          <div className="grid !grid-cols-1 lg:!grid-cols-3 !gap-6 !mb-10">
            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold  uppercase 
              tracking-wide"
              >
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  defaultValue=""
                  className="w-full !px-4 !py-4 bg-black/0 border-2 border-gray-700 
                  rounded-2xl  placeholder-gray-500 focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Enter company name"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Position */}
            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold  uppercase 
              tracking-wide"
              >
                Position
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="position"
                  defaultValue=""
                  className="w-full !px-4 !py-4 bg-black/0 border-2 border-gray-700 
                  rounded-2xl  placeholder-gray-500 focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Enter position name"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold uppercase 
              tracking-wide"
              >
                Job Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="jobLocation"
                  defaultValue=""
                  className="w-full !px-4 !py-4 bg-black/0 border-2 border-gray-700 
                  rounded-2xl  placeholder-gray-500 focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Enter job location"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Type Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 !gap-6">
            {/* Job Status Select */}
            <div className="!space-y-2">
              <label className="block text-sm font-semibold uppercase  tracking-wide">
                Job Status
              </label>
              <FormRowSelect
                name="jobStatus"
                list={Object.values(JOB_STATUS)}
                defaultValue={JOB_STATUS.INTERVIEW}
                className="!px-4 !py-4 border-2 border-gray-700 
                rounded-2xl appearance-none focus:border-purple-500 
                focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Job Type Select */}
            <div className="!space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wide">
                Job Type
              </label>
              <FormRowSelect
                name="jobType"
                list={Object.values(JOB_TYPE)}
                defaultValue={JOB_TYPE.FULL_TIME}
                className="!px-4 !py-4 border-2 border-gray-700 
                rounded-2xl appearance-none focus:border-purple-500 
                focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Submit Button */}
        <div className="flex justify-center !pt-6">
          <button
            type="submit"
            className="group relative !px-12 !py-4 bg-gradient-to-r from-purple-900 to-pink-800
             hover:from-purple-900 hover:to-pink-800 text-white 
             font-bold rounded-2xl shadow-2xl transition-all duration-300 transform 
             hover:scale-105 hover:shadow-2xl min-w-[200px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center !space-x-3">
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Job</span>
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
