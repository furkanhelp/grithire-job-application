// StatsContainer.jsx
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling className="text-2xl" />,
      color: "from-purple-500 to-indigo-800",
      trend: "+12", // No % sign here
      description: "Awaiting response",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck className="text-2xl" />,
      color: "from-green-500 to-emerald-800",
      trend: "+8", // No % sign here
      description: "Upcoming meetings",
    },
    {
      title: "jobs declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug className="text-2xl" />,
      color: "from-red-500 to-rose-800",
      trend: "-3", // No % sign here
      description: "Not proceeding",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !mb-12">
      {stats.map((item, index) => (
        <StatItem
          key={item.title}
          count={item.count}
          title={item.title}
          icon={item.icon}
          color={item.color}
          trend={item.trend}
          description={item.description}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
};
export default StatsContainer;
