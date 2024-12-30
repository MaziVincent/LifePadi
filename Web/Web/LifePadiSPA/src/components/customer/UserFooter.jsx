const UserFooter = () => {
    return (
      <footer className=" fixed bottom-0 w-full z-50 bg-white rounded-lg sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 bg-primary dark:bg-darkMenu antialiased shadow-md ">
        <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://listacc.com/"
            className="hover:underline"
            target="_blank"
          >
            LifePadi
          </a>
          . All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-1">
          <div
            id="tooltip-dribbble"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Follow us on Facebook
            <div
              className="tooltip-arrow"
              data-popper-arrow
            ></div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default UserFooter;
  