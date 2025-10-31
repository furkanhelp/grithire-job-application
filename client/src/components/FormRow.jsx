import React from "react";

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = "",
  placeholder,
  icon,
  required = false,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-4">
      {labelText && (
        <label className="block text-sm font-semibold  text-gray-800 dark:text-gray-300 uppercase tracking-wide">
          {labelText} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`w-full ${className} ${
            icon ? "pl-10" : ""
          } dark:bg-transparent bg-white`}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormRow;
