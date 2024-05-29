const AdminFooter = () => {
  return (
    <footer className=" fixed bottom-0 w-full z-50 bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://listacc.com/"
          className="hover:underline"
          target="_blank"
        >
          Listacc
        </a>
        . All rights reserved.
      </p>
      <div className="flex justify-center items-center space-x-1">
        <div
          id="tooltip-dribbble"
          role="tooltip"
          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        >
          Follow us on Dribbble
          <div
            className="tooltip-arrow"
            data-popper-arrow
          ></div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
