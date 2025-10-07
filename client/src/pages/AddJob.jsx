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

// Update your AddJob.jsx to use Tailwind directly
const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg w-full p-6 md:p-8 transition-colors duration-300">
      <Form method="post" className="space-y-6">
        <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">add job</h4>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormRow
            type="text"
            name="position"
            className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
          <FormRow
            type="text"
            name="company"
            className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
            className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.INTERVIEW}
            list={Object.values(JOB_STATUS)}
            className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
            className="text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />

          <div className="md:col-span-2 lg:col-span-3">
            <SubmitBtn formBtn />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddJob;
