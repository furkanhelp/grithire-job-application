import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useDashboardContext();
  
  return (
  <Wrapper>
    <div className={showSidebar ? "sidebar-container show-sidebar": 'sidebar-container'}>
      <div className="content">
        <button className="close-btn" type="button" onClick={toggleSidebar}>
          <FaTimes/>
        </button>
        <header>
          <Logo/>
        </header>
       <NavLinks/>
      </div>
    </div>
    </Wrapper>
  );
};
export default SmallSidebar;
