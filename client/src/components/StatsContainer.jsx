import { FaSuitcaseRolling, 
  FaCalendarCheck, 
  FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
    const stats = [
      {
        title: "pending applications",
        count: defaultStats?.pending || 0,
        icon: <FaSuitcaseRolling />,
        color: "#811ed8",
        bcg: "#f1f1ee",
      },
      {
        title: "interviews scheduled",
        count: defaultStats?.interview || 0,
        icon: <FaCalendarCheck />,
        color: "#811ed8",
        bcg: "#eeede9",
      },
      {
        title: "jobs declined",
        count: defaultStats?.declined || 0,
        icon: <FaBug />,
        color: "#811ed8",
        bcg: "#e4e2dd",
      },
    ];
  return (
    <Wrapper>
        {stats.map((item) => {
            return <StatItem key={item.title} {...item} />
        })}
    </Wrapper>
  )
};
export default StatsContainer;
