import Header from "./home/Header";
import Footer from "./home/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className="w-full ">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
