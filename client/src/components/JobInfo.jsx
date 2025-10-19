const JobInfo = ({ icon, text }) => {
  return (
    <div className="flex items-center !space-x-3 text-gray-300">
      <div className="w-8 h-8 bg-black/30 rounded-lg flex items-center justify-center border
       border-gray-700">
        {icon}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
};
export default JobInfo;
