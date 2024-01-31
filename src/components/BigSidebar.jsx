import { useSelector } from "react-redux";
import { Logo, NavLinks } from ".";
import BigSidebarWrapper from "../assets/wrappers/BigSidebar";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <BigSidebarWrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </BigSidebarWrapper>
  );
};

export default BigSidebar;
