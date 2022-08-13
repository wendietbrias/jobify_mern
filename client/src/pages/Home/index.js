import "./main.css";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logo, Sidebar } from "../../components";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import AllSystem from "../../action/jobs";

const resizeWindow = () => {
  return window.addEventListener("resize", function () {
    return this.innerWidth;
  });
};

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [size, setSize] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  useEffect(() => {
    if (!auth) {
      navigate("/landing");
    }

    dispatch(AllSystem("GET", auth?.token));
  }, [auth]);

  return (
    <section className="container-home-page">
      <div className={`sidebar ${openSidebar ? "show" : ""}`}>
        <Sidebar setOpenSidebar={setOpenSidebar} />
      </div>
      <div className={`main-content ${openSidebar ? "" : "fullied"}`}>
        <nav className="navbar">
          <HiOutlineMenuAlt1
            onClick={() => setOpenSidebar(!openSidebar)}
            fontSize="1.6em"
            id="menu"
          />
          <h5>Dashboard</h5>
          <div className="auth-action">
            <button onClick={() => setOpen(!open)} id="btn-profile">
              <FaUserCircle fontSize="1.2em" style={{ marginRight: "8px" }} />
              <span>{auth?.user?.name.split(" ")[0]}</span>
            </button>
            <button
              onClick={() => dispatch({ type: "LOGOUT" })}
              id="logout"
              className={`${open ? "show" : ""}`}
            >
              Logout
            </button>
          </div>
        </nav>
        <Outlet />
      </div>
    </section>
  );
};

export default HomePage;
