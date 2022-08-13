import "./style.css";
import LinkItems from "../../constants/SidebarLink";
import { Logo } from "../../components";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ setOpenSidebar }) => {
  const location = useLocation();
  return (
    <div className="sidebar-content">
      <header>
        <Logo />
      </header>
      <ul className="sidebar-link">
        {LinkItems.map((link, idx) => (
          <li
            key={idx}
            className={`sidebar-link-item ${
              location?.pathname === link?.url ? "active" : ""
            }`}
          >
            <Link to={`${link?.url}`}>
              {link?.icon}
              {link?.title}
            </Link>
          </li>
        ))}
        <button onClick={() => setOpenSidebar(false)} id="close">
          x
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
