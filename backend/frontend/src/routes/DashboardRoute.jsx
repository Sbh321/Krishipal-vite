import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../dashboard/components/Sidebar";
import { useState } from "react";

const DashboardRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <div id="body">
        <div className="grid-container">
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <div id="console">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default DashboardRoute;
