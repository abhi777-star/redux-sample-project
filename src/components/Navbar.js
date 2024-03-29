import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/User";
import { useState, useEffect } from "react";
import { Modal } from "antd";

export const Navbar = () => {
  const user = useSelector((state) => state.user.value);
  const [active, setActive] = useState("");
  const location = useLocation();
  const dispatcher = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
      dispatcher(logout());
      setIsModalOpen(false)
  };

  const handleLogout = () =>{
    if(user.userName === "Username"){
      setIsModalOpen(false)
    }else{
      setIsModalOpen(true)
    }
  }
  
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link ${active === "/" && "active"}`}
              to="/"
              onClick={() => setActive(location.pathname)}
            >
              Homepage
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
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
              className={`nav-link ${
                active === "/showUser" && "active"
              }`}
              onClick={() => setActive(location.pathname)}
              to="/showUser"
            >
              Show Users
            </Link>
          </li>
        </ul>
        <div>
          <span className={`badge rounded-pill bg-color`}>
            👋 {user.userName}
          </span>
          <button
            onClick={() => handleLogout()}
            className="badge rounded-pill bg-transparent border border-transparent"
          >
            🚫
          </button>
          <Modal
                centered 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}>
            <h3>Are you sure you want to Logout </h3>
          </Modal>
        </div>
      </div>
    </>
  );
};
