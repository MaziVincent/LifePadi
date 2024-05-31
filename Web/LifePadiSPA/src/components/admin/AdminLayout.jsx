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
<<<<<<< HEAD
      <div className=" bg-primary dark:bg-darkBg dark:text-primary border-3 border-red h-full ">
=======
      <div className=" bg-gray-100 dark:bg-gray-900 h-[100svh] ">
>>>>>>> 55ba6ae (Admin service)
        <AdminHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <Aside
          aside={aside}
          setAside={setAside}
        />

        <div className={`p-2 pl-5 ml-1 md:ml-20 lg:ml-44 py-20 border-3 h-full border-red min-h-screen`}>
          <Outlet />
        </div>
        <AdminFooter />
      </div>{" "}
    </main>
  );
};

export default AdminLayout;
