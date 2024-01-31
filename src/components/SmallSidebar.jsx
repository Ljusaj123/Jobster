import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import SmallSidebarWrapper from "../assets/wrappers/SmallSidebar";
import { Logo, NavLinks } from ".";
import { toggleSidebar } from "../utils/slices/userSlice";

export const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <SmallSidebarWrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </SmallSidebarWrapper>
  );
};

export default SmallSidebar;
