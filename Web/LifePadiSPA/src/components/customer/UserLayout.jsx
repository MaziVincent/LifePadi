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
      <div className=" bg-lightGray dark:bg-darkBg dark:text-primary h-full ">
        <UserHeader setAside={setAside} />

        {/* <!-- Sidebar --> */}

        <Aside
          aside={aside}
          setAside={setAside}
        />

        <div className={` ml-1 md:ml-20 lg:ml-56 py-20 h-full  min-h-screen`}>
          <Outlet />
        </div>
        <UserFooter />
      </div>{" "}
    </main>
  );
};

export default UserLayout;
