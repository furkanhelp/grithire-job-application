import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { data, useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

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
  const { user } = useOutletContext();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-full p-6 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-8">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Job
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in the details below to create a new job posting
        </p>
      </div>

      <Form method="post" className="space-y-1">
        {/* Form Grid - Better organized */}
        <div className="space-y-6">
          {/* First Row - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormRow
              type="text"
              name="company"
              labelText="Company Name"
              defaultValue="Tech Corp"
            />

            <FormRow
              type="text"
              name="jobLocation"
              labelText="Job Location"
              defaultValue="Codeville"
            />
          </div>

          {/* Second Row - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormRowSelect
              labelText="Job Status"
              name="jobStatus"
              defaultValue={JOB_STATUS.INTERVIEW}
              list={Object.values(JOB_STATUS)}
              className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />

            <FormRowSelect
              labelText="Job Type"
              name="jobType"
              defaultValue={JOB_TYPE.FULL_TIME}
              list={Object.values(JOB_TYPE)}
              className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Remove duplicate FormRow components that were causing issues */}
        </div>

        {/* Submit Button - Fixed positioning */}
        <div className="flex justify-end pt-8 mt-8 border-t border-gray-100 dark:border-gray-700">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 min-w-[140px]"
          >
            Add Job
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddJob;
