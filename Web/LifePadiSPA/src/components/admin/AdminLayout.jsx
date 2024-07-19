import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Aside from "./Aside";
import AdminFooter from "./AdminFooter";


const AdminLayout = () => {
    const [aside, setAside] = useState(false);
  return (
    <main className="">
      {" "}
      <div className=" bg-primary dark:bg-darkBg dark:text-primary border-3 border-red h-full ">
        <AdminHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <Aside
          aside={aside}
          setAside={setAside}
        />

        <div className={`p-2 pl-5 ml-1 md:ml-20 lg:ml-44 py-20 border-3 h-full border-red`}>
          <Outlet />
        </div>
        <AdminFooter />
      </div>{" "}
    </main>
  );
};

export default AdminLayout;
