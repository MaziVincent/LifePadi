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
      <div className=" bg-gray-100 dark:bg-gray-900 h-[100svh] ">
        <AdminHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <Aside
          aside={aside}
          setAside={setAside}
        />

        <div className={`p-2 ml-1 md:ml-20 lg:ml-44 pt-20 pb-20`}>
          <Outlet />
        </div>
        <AdminFooter />
      </div>{" "}
    </main>
  );
};

export default AdminLayout;
