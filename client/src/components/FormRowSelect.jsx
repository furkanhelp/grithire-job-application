import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  value,
  className = "",
  icon,
  required = false,
  displayFormat = (value) => value,
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const dropdownRef = useRef(null);
  const hiddenSelectRef = useRef(null);

  // Update selectedValue when value or defaultValue changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    } else {
      setSelectedValue(defaultValue);
    }
  }, [value, defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);

    // Update the hidden select element
    if (hiddenSelectRef.current) {
      hiddenSelectRef.current.value = value;

      // Trigger change event for React Router form handling
      const changeEvent = new Event("change", { bubbles: true });
      hiddenSelectRef.current.dispatchEvent(changeEvent);
    }

    // Call custom onChange if provided
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: name,
          value: value,
          type: "select-one",
        },
      };
      onChange(syntheticEvent);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const displayValue = selectedValue
    ? displayFormat(selectedValue)
    : "Select an option";

  // Determine if we should use value or defaultValue
  const selectProps = {};
  if (value !== undefined) {
    selectProps.value = selectedValue;
    // If using value prop, we MUST provide onChange to avoid React warning
    if (!onChange) {
      selectProps.onChange = () => {};
    }
  } else {
    selectProps.defaultValue = defaultValue;
  }

  return (
    <div className="space-y-2">
      {labelText && (
        <label
          htmlFor={name}
          className="text-sm font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide"
        >
          {labelText} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className={`w-full relative ${className}`} ref={dropdownRef}>
        {/* Hidden native select for form submission */}
        <select
          ref={hiddenSelectRef}
          name={name}
          id={name}
          required={required}
          className="sr-only"
          onChange={onChange}
          {...selectProps}
          {...props}
        >
          <option value="">Select an option</option>
          {list.map((itemValue) => (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className={`w-full !px-4 !py-4 border-2 border-gray-700 
                     rounded-2xl dark:bg-transparent bg-white text-left 
                     focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                     transition-all duration-300 flex items-center justify-between
                     ${
                       isOpen
                         ? "border-purple-500 ring-2 ring-purple-500/20"
                         : ""
                     }`}
        >
          <span className="text-current capitalize">{displayValue}</span>
          <FaChevronDown
            className={`text-current transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 !mt-1 bg-gradient-to-tr 
             dark:from-[#481f81] dark:to-[#000000] from-[#7614ff] to-[#ffffff] border-2 border-gray-700 rounded-2xl shadow-2xl 
                        z-50 max-h-60 overflow-y-auto custom-scrollbar
                        animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <div className="py-2">
              {list.map((itemValue, index) => (
                <div
                  key={itemValue}
                  onClick={() => handleSelect(itemValue)}
                  className={`!px-4 !py-3 cursor-pointer transition-all duration-200 
                            group flex items-center justify-between 
                            ${
                              selectedValue === itemValue
                                ? "bg-purple-600 text-white"
                                : "hover:bg-purple-500/20 text-white dark:hover:bg-purple-900"
                            }
                            ${index === 0 ? "rounded-t-2xl" : ""}
                            ${index === list.length - 1 ? "rounded-b-2xl" : ""}
                            border-b border-gray-700 last:border-b-0`}
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform capitalize">
                    {displayFormat(itemValue)}
                  </span>
                  {selectedValue === itemValue && (
                    <FaCheck className="text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormRowSelect;
