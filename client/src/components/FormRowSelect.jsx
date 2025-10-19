const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
    
      <label
        htmlFor={name}
        className={`block text-sm font-semibold text-gray-300 mb-2 ${className}`}
      >
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        className={`w-full !px-4 !py-3 bg-black/50 border-2 border-gray-700 rounded-xl
           text-white appearance-none focus:border-purple-500 focus:ring-2
            focus:ring-purple-500/20 transition-all duration-300 ${className}`}
        defaultValue={defaultValue}
        {...props}
      >
        {list.map((itemValue) => {
          return (
            <option
              key={itemValue}
              value={itemValue}
              className="bg-gray-900 text-white"
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
