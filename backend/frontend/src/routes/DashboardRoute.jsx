import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react"; // Import useState hook
import Sidebar from "../dashboard/components/Sidebar";
import { Toaster } from "react-hot-toast";

const DashboardRoute = () => {
  useEffect(() => {
    document.title = "Krishipal | Dashboard";
  }, []);

  const { userInfo } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <Toaster />
      <div id="body" className="flex">
        {/* Responsive Sidebar */}
        <div
          className={`bg-gray-800 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block md:w-64`}
        >
          <Sidebar />
        </div>

        {/* Content Area */}
        <div id="console" className="flex-1">
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-white p-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isSidebarOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default DashboardRoute;
