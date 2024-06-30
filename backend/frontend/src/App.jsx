import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    //Here the div is flexed to column with min height of screen which takes all the visible screen height and compoents other than main will take onl that much height which is required and main will take the remaining height

    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Toaster />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
