import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/User";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const user = useSelector((state) => state.user.value);
  const color = useSelector((state) => state.color.value);
  const [active, setActive] = useState("");
  const location = useLocation();
  const dispatcher = useDispatch();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link text-${color} ${active === "/" && "active"}`}
              to="/"
              onClick={() => setActive(location.pathname)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link text-${color} ${
                active === "/addUser" && "active"
              }`}
              onClick={() => setActive(location.pathname)}
              to="/addUser"
            >
              Add Users
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link text-${color} ${
                active === "/showUsers" && "active"
              }`}
              onClick={() => setActive(location.pathname)}
              to="/showUsers"
            >
              Show Users
            </Link>
          </li>
        </ul>
        <div>
          <span className={`badge rounded-pill bg-${color}`}>
            👋 {user.userName}
          </span>
          <button
            onClick={() => dispatcher(logout())}
            className="badge rounded-pill bg-transparent border border-transparent"
          >
            🚫
          </button>
        </div>
      </div>
    </>
  );
};
