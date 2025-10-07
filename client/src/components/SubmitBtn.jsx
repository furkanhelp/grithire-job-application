import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn = false, ...props }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`btn btn-block ${
        formBtn ? "form-btn" : ""
      } bg-blue-500 hover:bg-blue-600 text-white 
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600
      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      {...props}
    >
      {isSubmitting ? "submitting..." : props.children || "submit"}
    </button>
  );
};

export default SubmitBtn;
