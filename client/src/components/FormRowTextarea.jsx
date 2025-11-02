import React, { useState, useEffect } from "react";

const FormRowTextarea = ({
  name,
  labelText,
  defaultValue,
  placeholder,
  rows = 4,
  required = false,
  className = "",
  maxLength,
  showCounter = true,
  resize = "both", // New prop to control resize behavior
  ...props
}) => {
  const [charCount, setCharCount] = useState(defaultValue?.length || 0);
  const [isFocused, setIsFocused] = useState(false);

  // Update character count when defaultValue changes
  useEffect(() => {
    setCharCount(defaultValue?.length || 0);
  }, [defaultValue]);

  // Helper functions for color coding
  const getCounterColor = () => {
    if (!maxLength) return "text-gray-500 dark:text-gray-400";
    if (charCount > maxLength) return "text-red-500";
    if (charCount > maxLength * 0.9) return "text-yellow-500";
    if (charCount > maxLength * 0.75) return "text-orange-500";
    return "text-gray-500 dark:text-gray-400";
  };

  const getBorderColor = () => {
    if (!maxLength) return "border-gray-700 focus:border-purple-500";
    if (charCount > maxLength) return "border-red-500 focus:border-red-500";
    if (charCount > maxLength * 0.9)
      return "border-yellow-500 focus:border-yellow-500";
    if (charCount > maxLength * 0.75)
      return "border-orange-500 focus:border-orange-500";
    return "border-gray-700 focus:border-purple-500";
  };

  // Map resize prop to Tailwind classes
  const getResizeClass = () => {
    switch (resize) {
      case "none":
        return "resize-none";
      case "vertical":
        return "resize-y";
      case "horizontal":
        return "resize-x";
      case "both":
      default:
        return "resize";
    }
  };

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="space-y-2">
      {/* Label and Counter Row */}
      <div className="flex justify-between items-center">
        {labelText && (
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-400 uppercase tracking-wide">
            {labelText} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {showCounter && maxLength && (
          <div
            className={`text-sm ${getCounterColor()} transition-colors duration-200`}
          >
            {charCount} / {maxLength}
          </div>
        )}
      </div>

      {/* Textarea with resize handle */}
      <textarea
        name={name}
        id={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleTextChange}
        className={`w-full px-4 py-3 border-2 rounded-2xl bg-white dark:bg-transparent transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 ${getResizeClass()} ${getBorderColor()} ${className}`}
        {...props}
      />

      {/* Warning Messages */}
      {maxLength && charCount > maxLength && (
        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Exceeds maximum length by {charCount - maxLength} characters
        </div>
      )}

      {maxLength && charCount > maxLength * 0.75 && charCount <= maxLength && (
        <div
          className={`text-sm mt-1 ${
            charCount >= maxLength * 0.9 ? "text-red-600" : "text-green-500"
          }`}
        >
          {charCount >= maxLength * 0.9
            ? "Approaching maximum length"
            : "Good length"}
        </div>
      )}
    </div>
  );
};

export default FormRowTextarea;
