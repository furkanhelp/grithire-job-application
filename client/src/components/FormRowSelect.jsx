import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef(null);

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

    const syntheticEvent = {
      target: {
        name,
        value,
        type: "select",
      },
    };

    if (props.onChange) {
      props.onChange(syntheticEvent);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full relative ${className}`} ref={dropdownRef}>
      {/* Hidden native select*/}
      <select
        name={name}
        id={name}
        value={selectedValue}
        className="hidden"
        {...props}
      >
        {list.map((itemValue) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Button*/}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full !px-4 !py-4 border-2 border-gray-700 
                   rounded-2xl bg-transparent text-left 
                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                   transition-all duration-300 flex items-center justify-between
                   ${
                     isOpen ? "border-purple-500 ring-2 ring-purple-500/20" : ""
                   }`}
      >
        <span className="text-current capitalize">
          {selectedValue || "Select an option"}
        </span>
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
                              : "hover:bg-gray-800 text-white"
                          }
                          ${index === 0 ? "rounded-t-2xl" : ""}
                          ${index === list.length - 1 ? "rounded-b-2xl" : ""}
                          border-b border-gray-700 last:border-b-0`}
              >
                <span className="capitalize font-medium group-hover:translate-x-1 transition-transform">
                  {itemValue}
                </span>
                {selectedValue === itemValue && (
                  <FaCheck className=" text-sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormRowSelect;
