import Header from "./home/Header";
import Footer from "./home/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
