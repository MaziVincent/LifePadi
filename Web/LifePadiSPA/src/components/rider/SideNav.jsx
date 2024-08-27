import { Link } from "react-router-dom"
import { useState } from "react"

const SideNav = ({aside}) => {
  const [pagePath, setPagePath] = useState("/rider")
  const pathname = window.location.pathname
  let links = []
  if(pathname === "/rider" || pathname.includes("/rider")){
    links = [
      {
        to: '/rider',
        icon: 'line-icon-Pie-Chart3 text-2xl hover:text-green-800',
        text: 'Overview',
      },
    ]
  }
  else if(pathname === "/vendor"){
    links = [
        {
        to: "/vendor",
        icon: "line-icon-Settings-Window text-2xl hover:text-green-800",
        text: "Overview",
        },
        // {
        // to:"/vendor/addProduct",
        // icon:"line-icon-Align-JustifyAll text-2xl hover:text-green-800",
        // text:"Profile"
        // }
    ]
  }
  return (
    <div
      className={`fixed top-0 left-0 z-40 lg:w-58 h-screen pt-8 pb-10 dark:bg-darkMenu text-primary transition-transform border-r border-darkMenu md:translate-x-0 ${
        aside ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label='Sidenav'
      id='drawer-navigation'
    >
      <nav className='pt-24 pl-5 bg-gray-700 bg-opacity-25 h-screen'>
        <ul className='flex flex-col gap-8 pr-4  items-start  '>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className='flex items-center p-2 text-base font-medium text-primary rounded-lg dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group'
              >
                <i className={`${link.icon}`}></i>
                <span className='hidden lg:flex ml-3'>{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SideNav