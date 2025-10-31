import React from "react";

const FormRowTextarea = ({
  name,
  labelText,
  defaultValue,
  placeholder,
  rows = 4,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {labelText && (
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide">
          {labelText} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        name={name}
        id={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={`w-full ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormRowTextarea;
