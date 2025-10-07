// Example FormRow component with dark mode
const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = "",
  className = "",
}) => {
  return (
    <div className="form-row">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
      />
    </div>
  );
};

export default FormRow;
