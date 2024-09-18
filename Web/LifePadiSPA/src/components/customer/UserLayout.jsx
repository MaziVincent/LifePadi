import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import Aside from "./Aside";
import UserFooter from "./UserFooter";


const UserLayout = () => {
    const [aside, setAside] = useState(false);
  return (
    <main className="">
      {" "}
      <div className=" bg-primary dark:bg-darkBg dark:text-primary border-3 border-red h-full ">
        <UserHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <Aside
          aside={aside}
          setAside={setAside}
        />

        <div className={` ml-1 md:ml-20 lg:ml-56 py-20 border-3 h-full border-red min-h-screen`}>
          <Outlet />
        </div>
        <UserFooter />
      </div>{" "}
    </main>
  );
};

export default UserLayout;
