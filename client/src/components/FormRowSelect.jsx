const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  className = "",
  ...props
}) => {
  return (
    <div className="form-row bg-gradient-to-r from-[#26143f] to-black">
      <label
        htmlFor={name}
        className={`form-label bg-gradient-to-r from-[#26143f]
           to-black text-gray-700 dark:text-gray-300 ${className}`}
      >
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        className={`form-select dark:bg-gray-700 dark:text-white dark:border-gray-600 ${className}`}
        defaultValue={defaultValue}
        {...props}
      >
        {list.map((itemValue) => {
          return (
            <option
              key={itemValue}
              value={itemValue}
              className="bg-gradient-to-r from-[#26143f] to-black dark:bg-gray-200 dark:text-white"
            >
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
