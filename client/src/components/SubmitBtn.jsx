import { useNavigation } from "react-router-dom";
import { FaSpinner, FaCheck } from "react-icons/fa";

const SubmitBtn = ({ text, submittingText, className = "", ...props }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`group relative !px-8 !py-4 bg-gradient-to-r from-purple-900 to-pink-800 
                hover:from-purple-900 hover:to-pink-800 text-white font-bold rounded-2xl 
                shadow-2xl transition-all duration-300 transform hover:scale-105 
                hover:shadow-2xl min-w-[150px] overflow-hidden
                flex items-center justify-center gap-3
                ${isSubmitting ? "opacity-50 cursor-not-allowed transform-none" : ""} 
                ${className}`}
      {...props}
      >
      
      {/* Content */}
      {isSubmitting ? (
        <>
          <FaSpinner className="w-4 h-4 animate-spin" />
          <span>{submittingText}</span>
        </>
      ) : (
        <>
          <FaCheck className="w-4 h-4" />
            {text}
        </>
      )}
      
      
    </button>
  );
};

export default SubmitBtn;