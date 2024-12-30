import ContentLoader from "react-content-loader";

const VendorSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-xl p-4 border border-gray rounded shadow animate-pulse md:p-6 dark:border-darkHover"
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray rounded dark:bg-darkHover">
        <svg
          className="w-10 h-10 text-graybg dark:text-gray"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="h-2.5 bg-graybg rounded-full dark:bg-darkHover w-48 mb-4"></div>
      <div className="h-2.5 bg-graybg rounded-full dark:bg-darkHover w-36 mb-4"></div>
      <div className="h-2.5 bg-graybg rounded-full dark:bg-darkHover w-36 mb-4"></div>

      <span className="sr-only">Loading...</span>
    </div>
    // <div>
    //   <ContentLoader
    //     width={450}
    //     height={400}
    //     speed={2}
    //     viewBox="0 0 450 400"
    //     backgroundColor="#f0f0f0"
    //     foregroundColor="#dedede"
    //     //{...props}
    //   >
    //     <rect
    //       x="43"
    //       y="304"
    //       rx="4"
    //       ry="4"
    //       width="271"
    //       height="9"
    //     />
    //     <rect
    //       x="44"
    //       y="323"
    //       rx="3"
    //       ry="3"
    //       width="119"
    //       height="6"
    //     />
    //     <rect
    //       x="42"
    //       y="77"
    //       rx="10"
    //       ry="10"
    //       width="388"
    //       height="217"
    //     />
    //   </ContentLoader>
    // </div>
  );
};

export default VendorSkeleton;
