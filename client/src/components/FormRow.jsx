const FormRow = ({ type, name, labelText, defaultValue = "" }) => {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 !gap-4 items-start 
    !py-4 border-b border-gray-100 dark:border-gray-700 "
    >
      {/* Label Column */}
      <div className="lg:col-span-1 ">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 !mb-1 
          lg:mb-0 lg:pt-2"
        >
          {labelText || name}
        </label>
      </div>

      {/* Input Column */}
      <div className="lg:col-span-2  ">
        {type === "select" ? (
          <select
            id={name}
            name={name}
            defaultValue={defaultValue}
            className="w-full !px-4 !py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700
             text-gray-900 dark:text-white focus:ring-2 focus:ring--800 focus:border-transparent transition-all
              duration-200"
          >
            {/* Options */}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            defaultValue={defaultValue}
            rows={4}
            className="w-full !px-4 !py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white
             dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
             focus:border-transparent transition-all duration-200 resize-vertical"
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            defaultValue={defaultValue}
            className="w-full px-4 py-3 border border-gray-300
             dark:border-gray-600 rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2
              focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        )}
      </div>
    </div>
  );
};
export default FormRow;