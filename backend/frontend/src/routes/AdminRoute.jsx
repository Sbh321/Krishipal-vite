import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
