import { useAuth } from "../contexts/AuthContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar, toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;

        // DISABLING ADMIN SECTION FOR REGULAR USERS
        const { role } = user;
        if (path === "admin" && role !== "admin") return;

        return (
          <NavLink
            to={`/dashboard/${path}`}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
