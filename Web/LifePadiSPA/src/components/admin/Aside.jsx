import { Link } from "react-router-dom";

const Aside = ({ aside, setAside }) => {
  const links = [
    {
      to: "/admin",
      icon: "line-icon-Pie-Chart3 text-2xl hover:text-green-800",
      text: "Overview",
    },
    {
      to: "/admin/service",
      icon: "line-icon-Settings-Window text-2xl hover:text-green-800",
      text: "Services",
    },
    {
      to:"/admin/category",
      icon:"line-icon-Align-JustifyAll text-2xl hover:text-green-800",
      text:"Categories"
    },
    {
      to:"/admin/vendorcategory",
      icon:"line-icon-Shopping-Bag text-2xl hover:text-green-800",
      text:"Vendors"
    },

    {
      to:"/admin/rider",
      icon:"line-icon-Motorcycle  text-2xl hover:text-green-800",
      text:"Riders"
    },

    {
      to:"/admin/customer",
      icon:"line-icon-Business-ManWoman text-2xl hover:text-green-800",
      text:"Customers"
    },

    {
      to:"/admin/admin",
      icon:"line-icon-Administrator text-2xl hover:text-green-800",
      text:"Admins"
    },

    {
      to:"/admin/voucher",
      icon:"line-icon-Ticket text-2xl hover:text-green-800",
      text:"Vouchers"
    }
  ];
  return (
    <aside
      className={`fixed top-0 left-0  z-40 w-18 overflow-auto lg:w-58 h-screen pt-8 pb-10 dark:bg-gray-800 transition-transform  bg-gray-50 border-r border-gray-200 md:translate-x-0  dark:border-gray-700 ${
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
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group"
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
