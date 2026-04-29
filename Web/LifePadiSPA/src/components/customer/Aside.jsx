import { Link } from "react-router-dom";
import { useState } from "react";

const Aside = ({ aside, setAside }) => {
  const [activeLink, setActiveLink] = useState("My Orders");

  const handleClick = (link) => {
    setActiveLink(link);
  };
  const links = [
    {
      to: "/user",
      icon: "line-icon-Truck text-2xl hover:text-green-800",
      text: "My Orders",
    },
    {
      to: "/user/address",
      icon: "line-icon-Home-5 text-2xl hover:text-green-800",
      text: "Delivery Addresses",
    },
    {
      to:"/user/gift",
      icon:"line-icon-Gift-Box text-2xl hover:text-green-800",
      text:"Gifts"
    },
    {
      to:"/user/favourite",
      icon:"line-icon-Heart-2 text-2xl hover:text-green-800",
      text:"Favourites"
    },
    

  ];
  return (
    <aside
      className={`fixed top-0 left-0  z-40 w-18 overflow-auto lg:w-58 h-screen pt-8 pb-10 dark:bg-card transition-transform  bg-primary shadow-lg md:translate-x-0  dark:border-gray-700 ${
        aside ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-10 px-2  flex flex-col   items-start justify-center  h-full bg-gray-50 dark:bg-gray-800">
        <ul className="flex flex-col gap-8 pr-4  items-start  ">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center p-2 text-base font-medium ${activeLink === link.text ? 'text-secondary' : ''} rounded-lg dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-muted group`}
              onClick={() => handleClick(link.text)}
              >
                <i className={`${link.icon}`}></i>
                <span className="hidden lg:flex ml-3">{link.text}</span>
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </aside>
  );
};

export default Aside;
