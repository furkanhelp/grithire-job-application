import React, { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

const FormRowDate = ({
  type = "date",
  name,
  labelText,
  defaultValue = "",
  required = false,
  className = "",
  onChange,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const inputRef = useRef(null);
  const popupRef = useRef(null);
  const selectRef = useRef(null);
  const manualInputRef = useRef(null);

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Select date";

    if (type === "datetime-local") {
      return dayjs(dateString).format("MMM D, YYYY h:mm A");
    }
    return dayjs(dateString).format("MMM D, YYYY");
  };

  // Handle date selection
  const handleDateSelect = (date, time = null) => {
    let finalDate = date;

    if (time && type === "datetime-local") {
      const [hours, minutes] = time.split(":");
      finalDate = date.hour(parseInt(hours)).minute(parseInt(minutes));
    }

    const formattedDate =
      type === "datetime-local"
        ? finalDate.format("YYYY-MM-DDTHH:mm")
        : finalDate.format("YYYY-MM-DD");

    setSelectedDate(formattedDate);

    // Only close if it's a date-only selection or if time is already selected
    if (type !== "datetime-local" || time) {
      setIsOpen(false);
    }

    // Trigger onChange event
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: formattedDate,
          type: "input",
        },
      };
      onChange(syntheticEvent);
    }
  };

  // Handle time selection separately
  const handleTimeSelect = (date, time) => {
    setSelectedTime(time);
    handleDateSelect(date, time);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        (!selectRef.current || !selectRef.current.contains(event.target)) &&
        (!manualInputRef.current ||
          !manualInputRef.current.contains(event.target))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate days for the calendar
  const generateCalendarDays = () => {
    const today = dayjs();
    const days = [];

    // Generate next 30 days
    for (let i = 0; i < 30; i++) {
      const date = today.add(i, "day");
      days.push(date);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Time options
  const timeOptions = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  // Handle manual input focus - open calendar when user focuses on date inputs
  const handleManualInputFocus = (e) => {
    setIsOpen(true);
  };

  return (
    <div className="space-y-2">
      {labelText && (
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide">
          {labelText} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Hidden native input for form submission */}
        <input
          type="hidden"
          name={name}
          value={selectedDate}
          required={required}
        />

        {/* Custom date picker trigger with calendar icon on the right */}
        <div className="relative" ref={inputRef}>
          <input
            type="text"
            readOnly
            value={formatDisplayDate(selectedDate)}
            placeholder="Select date"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full !px-4 !py-4 border-2 border-gray-700 rounded-2xl bg-white dark:bg-transparent 
               focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 
               cursor-pointer pr-12 ${className}`}
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Custom Date Picker Popup */}
        {isOpen && (
          <div
            ref={popupRef}
            className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] border-2 border-gray-700 
                       rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <div className="mb-5">
              <h4
                className="!font-sans !text-xl !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 mb-2"
              >
                Select {type === "datetime-local" ? "Date & Time" : "Date"}
              </h4>

              {/* Quick selection for today and tomorrow */}
              <div className="flex space-x-5 mb-3">
                <button
                  type="button"
                  onClick={() => handleDateSelect(dayjs())}
                  className="flex-1 px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => handleDateSelect(dayjs().add(1, "day"))}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Tomorrow
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="max-h-58 overflow-y-auto custom-scrollbar mb-4">
              <div className="grid gap-1">
                {calendarDays.map((date) => (
                  <div
                    key={date.format()}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      selectedDate && dayjs(selectedDate).isSame(date, "day")
                        ? " bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] text-gray-900 dark:text-white border-gray-700"
                        : " bg-gradient-to-tr dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] text-gray-900 dark:text-white border-gray-700 "
                    }`}
                  >
                    {/* Date Button - Entire area clickable */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (type === "datetime-local") {
                          const currentTime = selectedTime || "09:00";
                          handleDateSelect(date, currentTime);
                        } else {
                          handleDateSelect(date);
                        }
                      }}
                      className="w-full text-left cursor-pointer p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <div className="font-medium">
                        {date.format("MMM D, YYYY")}
                      </div>
                      <div className="text-sm opacity-75">
                        {date.format("dddd")}
                      </div>
                    </div>
                    {/* Time Selection - Only show for datetime and when date is selected */}
                    {type === "datetime-local" && (
                      <div className="mt-2 relative">
                        <select
                          ref={selectRef}
                          value={selectedTime}
                          onChange={(e) => {
                            const time = e.target.value;
                            setSelectedTime(time);
                            handleTimeSelect(date, time);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="w-full p-2 text-sm bg-gradient-to-tr dark:from-[#481f81] 
                          dark:to-[#000000] from-[#7314f8] to-[#c19ef3] text-white border
                           border-gray-300 dark:border-gray-500 rounded focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent appearance-none cursor-pointer"
                        >
                          <option
                            value=""
                            className="bg-white dark:bg-black text-black dark:text-white"
                          >
                            Select time
                          </option>
                          {timeOptions.map((time) => (
                            <option
                              key={time}
                              value={time}
                              className="bg-white dark:bg-black text-black dark:text-white"
                            >
                              {time}
                            </option>
                          ))}
                        </select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Manual input option */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Or enter manually:
              </label>
              <div ref={manualInputRef}>
                <input
                  type={type}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (onChange) {
                      onChange(e);
                    }
                  }}
                  onFocus={handleManualInputFocus}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Close button */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormRowDate;
