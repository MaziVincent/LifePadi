const Categories = () => {
    return (   <aside
        className={`fixed top-0 left-0  z-40 w-18 overflow-auto lg:w-58 h-screen pt-8 pb-10 dark:bg-darkMenu transition-transform  bg-gray-50 shadow-lg md:translate-x-0  dark:border-gray-700 ${
          aside ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidenav"
        id="drawer-navigation"
      > 
      </aside> );
}
 
export default Categories;