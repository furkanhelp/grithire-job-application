import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { Form, redirect } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import { toast } from "react-toastify";
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
      toast.success("Job added successfully");
      return redirect("all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useAuth(); 

  return (
    <div className="w-full">
      {/* Modern Header with Icon */}
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
          className="!text-3xl md:text-4xl !font-sans !font-bold bg-gradient-to-br
         from-white to-[#a5b4fc] !tracking-[-0.025em] !leading-[1.5]
          bg-clip-text text-transparent !mb-3"
        >
          Add New Job
        </h4>
        <p className="text-gray-400 leading-relaxed text-lg">
          Fill in the details below to create a new job posting
        </p>
      </div>

      <Form method="post" className="!space-y-5">
        {/* Main Form Container */}
        <div
          className="bg-gradient-to-br from-[#1a0f2e] to-[#26143f] rounded-3xl 
        !p-10 shadow-2xl border border-purple-500/20"
        >
          {/* Company & Location Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 !gap-6 !mb-10">
            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold text-gray-300 uppercase 
              tracking-wide"
              >
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  defaultValue="Tech Corp"
                  className="w-full !px-4 !py-4 bg-black/50 border-2 border-gray-700 
                  rounded-2xl text-white placeholder-gray-500 focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Enter company name"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-500"
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

            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold text-gray-300 uppercase 
              tracking-wide"
              >
                Job Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="jobLocation"
                  defaultValue="Canada"
                  className="w-full !px-4 !py-4 bg-black/50 border-2 border-gray-700 
                  rounded-2xl text-white placeholder-gray-500 focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  placeholder="Enter job location"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-500"
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
            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold text-gray-300 uppercase 
              tracking-wide"
              >
                Job Status
              </label>
              <div className="relative">
                <select
                  name="jobStatus"
                  defaultValue={JOB_STATUS.INTERVIEW}
                  className="w-full !px-4 !py-4 bg-black/50 border-2 border-gray-700 
                  rounded-2xl text-white appearance-none focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                >
                  {Object.values(JOB_STATUS).map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-gray-900 text-white"
                    >
                      {status}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                pointer-events-none"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="!space-y-2">
              <label
                className="block text-sm font-semibold text-gray-300 uppercase 
              tracking-wide"
              >
                Job Type
              </label>
              <div className="relative">
                <select
                  name="jobType"
                  defaultValue={JOB_TYPE.FULL_TIME}
                  className="w-full !px-4 !py-4 bg-black/50 border-2 border-gray-700 
                  rounded-2xl text-white appearance-none focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                >
                  {Object.values(JOB_TYPE).map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-gray-900 text-white"
                    >
                      {type}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                pointer-events-none"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
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
