import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Logo } from ".";
import { logoutUser, toggleSidebar } from "../utils/userSlice";
import { clearAllJobsState } from "../utils/allJobsSlice";
import { clearValues } from "../utils/jobSlice";
import NavBarWrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(clearValues());
    dispatch(clearAllJobsState());
    toast.success("User successfuly logout");
  };

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <NavBarWrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => handleToggle()}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </NavBarWrapper>
  );
};

export default Navbar;
