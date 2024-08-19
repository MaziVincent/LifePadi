import {
  ChevronLeft,
  ChevronRight,
  Clear,
  CreditCard,
  Done,
  ExpandCircleDownOutlined,
  FileDownloadOutlined,
  LocalShipping,
  Receipt,
  Sync,
 
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <section className="flex flex-col items-center  dark:bg-darkBg text-darkBg dark:text-primary bg-primary h-auto">
      <div className="">
       
        <h1 className=" mb-5 text-2xl text-center font-bold">My Orders</h1>
        <main className=" flex gap-8">
          
          <section className="right-section right-0 top-0 max-lg:w-full">
            
            <div className=" bg-lightGray dark:bg-darkMenu dark:text-primary border border-gray border-opacity-15 rounded-md mt-5 p-4 shadow-lg">
              <div className="">
                <div className=" flex justify-between flex-wrap max-sm:gap-2 items-center pb-4">
                  <div className=" flex gap-2 items-center">
                    <span className=" text-xl font-medium  text-opacity-60">
                      Order ID:
                      <span className="text-base font-normal">
                        {" "}
                        #BCUBYBCS
                      </span>
                    </span>
                    <span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-light px-2">
                      Pending
                    </span>
                  </div>
                  <div className="">
                    <button className=" flex items-center gap-1 text-background text-lg font-normal">
                      <span>
                        <FileDownloadOutlined />
                      </span>
                      Download invoice
                    </button>
                  </div>
                </div>
                <div className=" flex items-center max-sm:flex-col gap-4 mb-5">
                  <button className="bg-redborder p-1 cursor-pointer rounded-md max-sm:w-full">
                
                      <span>Cancel Order</span>
                   
                  </button>
                  <button className="border border-gray cursor-pointer font-normal text-opacity-60 hover:text-gray border-opacity-50 p-1 rounded-md max-sm:w-full">
                   
                      <span className=" flex items-center max-sm:justify-center gap-1">
                        <span className="">
                          <Receipt fontSize="" />
                        </span>
                        Track Order
                      </span>
                    
                  </button>
                  <button className="border border-gray bg-lightindigo border-opacity-50 bg-opacity-30 p-1 cursor-pointer rounded-md max-sm:w-full">
                    <Link className=" font-normal  text-opacity-60 hover:text-gray block">
                      <span>Order Details</span>
                    </Link>
                  </button>
                </div>
              </div>
              <hr className=" border-gray border-opacity-30" />
              <div className=" mt-5">
                <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
                  <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Order Date:
                    <span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
                      16 july 2024
                    </span>
                  </span>
                  <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Email:
                    <span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
                      {" "}
                      yourmail@gmsil.com
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Payment Method:
                    <span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal inline-flex gap-1 items-center">
                      <CreditCard />
                      Credit Card
                    </span>
                  </span>
                </div>
                <p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-lightorange">
                  <span>
                    <LocalShipping />
                  </span>
                  Expected Delivery - 30 mins
                </p>
              </div>
            </div>
            <div className=" bg-gray bg-opacity-20 text-primary border border-gray border-opacity-15 rounded-md mt-5 p-4">
              <div className="">
                <div className=" flex justify-between flex-wrap max-sm:gap-2 items-center pb-4">
                  <div className=" flex gap-2 items-center">
                    <span className=" text-xl font-light text-gray text-opacity-60">
                      Order ID:
                      <span className=" text-primary text-lg font-normal">
                        {" "}
                        #BCUBYBCS
                      </span>
                    </span>
                    <span className=" bg-gold rounded-md text-lightorange text-opacity- text-sm font-normal inline-flex gap-1 items-center px-2">
                      <LocalShipping fontSize="" />
                      in transit
                    </span>
                  </div>
                  <div className="">
                    <button className=" flex items-center gap-1 text-lightteal text-lg font-normal">
                      <span>
                        <FileDownloadOutlined />
                      </span>
                      Download invoice
                    </button>
                  </div>
                </div>
                <div className=" flex items-center max-sm:flex-col gap-4 mb-5">
                  <button className="bg-red p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal block">
                      <span>Cancel order</span>
                    </Link>
                  </button>
                  <button className="border border-gray border-opacity-15 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal text-gray text-opacity-60 hover:text-primary block">
                      <span className=" flex items-center justify-center gap-1">
                        <span className="">
                          <Receipt fontSize="" />
                        </span>
                        Track order
                      </span>
                    </Link>
                  </button>
                  <button className="border border-gray border-opacity-15 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal text-gray text-opacity-60 hover:text-primary block">
                      <span>Order details</span>
                    </Link>
                  </button>
                </div>
              </div>
              <hr className=" border-gray border-opacity-30" />
              <div className=" mt-5">
                <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
                  <span className=" inline-flex gap-2 items-center font-normal text-primary text-lg max-md:text-sm max-sm:text-xl">
                    Order date:
                    <span className=" text-gray text-opacity-60 font-normal">
                      16 july 2024
                    </span>
                  </span>
                  <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Email:
                    <span className=" text-gray text-opacity-60 font-normal">
                      {" "}
                      yourmail@gmsil.com
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Payment Method:
                    <span className=" text-gray text-opacity-60 font-normal inline-flex gap-1 items-center">
                      <CreditCard />
                      Credit card
                    </span>
                  </span>
                </div>
                <p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-lightorange">
                  <span>
                    <LocalShipping fontSize="" />
                  </span>
                  Expected delivery Today
                </p>
              </div>
            </div>
            <div className=" bg-gray bg-opacity-20 text-primary border border-gray border-opacity-15 rounded-md mt-5 p-4">
              <div className="">
                <div className=" flex justify-between items-center flex-wrap max-sm:gap-2 pb-4">
                  <div className=" flex gap-2 items-center">
                    <span className=" text-xl font-light text-gray text-opacity-60">
                      Order ID:
                      <span className=" text-primary text-lg font-normal">
                        {" "}
                        #BCUBYBCS
                      </span>
                    </span>
                    <span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
                      <Done fontSize="" />
                      Completed
                    </span>
                  </div>
                  <div className="">
                    <button className=" flex items-center gap-1 text-lightteal text-lg font-normal">
                      <span>
                        <FileDownloadOutlined />
                      </span>
                      Download invoice
                    </button>
                  </div>
                </div>
                <div className=" flex items-center max-sm:flex-col gap-4 mb-5">
                  <button className="bg-lightteal bg-opacity-40 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal block">
                      <span className=" flex items-center gap-2 max-sm:justify-center">
                        <Sync />
                        Order again
                      </span>
                    </Link>
                  </button>
                  <button className="border border-gray border-opacity-15 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal text-gray text-opacity-60 hover:text-primary block">
                      <span>Order details</span>
                    </Link>
                  </button>
                </div>
              </div>
              <hr className=" border-gray border-opacity-30" />
              <div className=" mt-5">
                <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
                  <span className=" inline-flex gap-2 items-center font-normal text-primary text-lg max-md:text-sm max-sm:text-xl">
                    Order date:
                    <span className=" text-gray text-opacity-60 font-normal">
                      16 july 2024
                    </span>
                  </span>
                  <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Email:
                    <span className=" text-gray text-opacity-60 font-normal">
                      {" "}
                      yourmail@gmsil.com
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Payment Method:
                    <span className=" text-gray text-opacity-60 font-normal inline-flex gap-1 items-center">
                      <CreditCard />
                      Credit card
                    </span>
                  </span>
                </div>
                <p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-gray">
                  <span>
                    <ExpandCircleDownOutlined />
                  </span>
                  Expected delivery on Monday 23 july 2024
                </p>
              </div>
            </div>
            <div className=" bg-gray bg-opacity-20 text-primary border border-gray border-opacity-15 rounded-md mt-5 p-4">
              <div className="">
                <div className=" flex justify-between items-center flex-wrap max-sm:gap-2 pb-4">
                  <div className=" flex gap-2 items-center">
                    <span className=" text-xl font-light text-gray text-opacity-60">
                      Order ID:
                      <span className=" text-primary text-lg font-normal">
                        {" "}
                        #BCUBYBCS
                      </span>
                    </span>
                    <span className=" bg-red bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
                      <Clear fontSize="" />
                      Cancelled
                    </span>
                  </div>
                  <div className="">
                    <button className=" flex items-center gap-1 text-lightteal text-lg font-normal">
                      <span>
                        <FileDownloadOutlined />
                      </span>
                      Download invoice
                    </button>
                  </div>
                </div>
                <div className=" flex items-center max-sm:flex-col gap-4 mb-5">
                  <button className="bg-lightteal bg-opacity-40 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal block">
                      <span className=" flex items-center max-sm:justify-center gap-2">
                        <Sync />
                        Order again
                      </span>
                    </Link>
                  </button>
                  <button className="border border-gray border-opacity-15 p-1 rounded-md max-sm:w-full">
                    <Link className=" block font-normal text-gray text-opacity-60 hover:text-primary">
                      <span>Order details</span>
                    </Link>
                  </button>
                </div>
              </div>
              <hr className=" border-gray border-opacity-30" />
              <div className=" mt-5">
                <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
                  <span className=" inline-flex gap-2 items-center font-normal text-primary text-lg max-md:text-sm max-sm:text-xl">
                    Order date:
                    <span className=" text-gray text-opacity-60 font-normal">
                      16 july 2024
                    </span>
                  </span>
                  <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Email:
                    <span className=" text-gray text-opacity-60 font-normal">
                      {" "}
                      yourmail@gmsil.com
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Payment Method:
                    <span className=" text-gray text-opacity-60 font-normal inline-flex gap-1 items-center">
                      <CreditCard />
                      Credit card
                    </span>
                  </span>
                </div>
                <p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-gray">
                  <span>
                    <ExpandCircleDownOutlined />
                  </span>
                  Expected delivery on Monday 23 july 2024
                </p>
              </div>
            </div>
            <div className=" bg-gray bg-opacity-20 text-primary border border-gray border-opacity-15 rounded-md mt-5 p-4">
              <div className="">
                <div className=" flex justify-between items-center flex-wrap max-sm:gap-2 pb-4">
                  <div className=" flex gap-2 items-center">
                    <span className=" text-xl font-light text-gray text-opacity-60">
                      Order ID:
                      <span className=" text-primary text-lg font-normal">
                        {" "}
                        #BCUBYBCS
                      </span>
                    </span>
                    <span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
                      <Done fontSize="" />
                      Completed
                    </span>
                  </div>
                  <div className="">
                    <button className=" flex items-center gap-1 text-lightteal text-lg font-normal">
                      <span>
                        <FileDownloadOutlined />
                      </span>
                      Download invoice
                    </button>
                  </div>
                </div>
                <div className=" flex items-center max-sm:flex-col gap-4 mb-5">
                  <button className="bg-lightteal bg-opacity-40 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal block">
                      <span className="flex items-center max-sm:justify-center gap-2">
                        <Sync />
                        Order again
                      </span>
                    </Link>
                  </button>
                  <button className="border border-gray border-opacity-15 p-1 rounded-md max-sm:w-full">
                    <Link className=" font-normal text-gray text-opacity-60 hover:text-primary block">
                      <span>Order details</span>
                    </Link>
                  </button>
                </div>
              </div>
              <hr className=" border-gray border-opacity-30" />
              <div className=" mt-5">
                <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
                  <span className=" inline-flex gap-2 items-center font-normal text-primary text-lg max-md:text-sm max-sm:text-xl">
                    Order date:
                    <span className=" text-gray text-opacity-60 font-normal">
                      16 july 2024
                    </span>
                  </span>
                  <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Email:
                    <span className=" text-gray text-opacity-60 font-normal">
                      {" "}
                      yourmail@gmsil.com
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-normal text-lg max-md:text-sm max-sm:text-xl">
                    Payment Method:
                    <span className=" text-gray text-opacity-60 font-normal inline-flex gap-1 items-center">
                      <CreditCard />
                      Credit card
                    </span>
                  </span>
                </div>
                <p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-gray">
                  <span>
                    <ExpandCircleDownOutlined />
                  </span>
                  Expected delivery on Monday 23 july 2024
                </p>
              </div>
            </div>
            <nav className=" mt-5 mb-10 flex justify-center">
              <ul className=" flex items-center max-w-1/3 border border-gray border-opacity-15 rounded-md p-0 text-primary bg-gray bg-opacity-20">
                <li className="">
                  <Link className=" border-r border-gray border-opacity-15 hover:bg-gray hover:bg-opacity-15 block px-3 rounded-l-md">
                    <span>
                      <ChevronLeft />
                    </span>
                  </Link>
                </li>
                <li className="">
                  <Link className="border-r border-gray border-opacity-15 hover:bg-gray hover:bg-opacity-15 block px-3">
                    1
                  </Link>
                </li>
                <li>
                  <Link className=" border-r border-gray border-opacity-15 hover:bg-gray hover:bg-opacity-15 block px-3">
                    2
                  </Link>
                </li>
                <li>
                  <Link className=" border-r border-gray border-opacity-15 hover:bg-gray hover:bg-opacity-15 block px-3">
                    3
                  </Link>
                </li>
                <li>
                  <Link className=" border-r border-gray border-opacity-15 hover:bg-gray hover:bg-opacity-15 block px-3">
                    ...
                  </Link>
                </li>
                <li>
                  <Link className=" border-r border-gray border-opacity-15 hover:bg-gray hover:bg-opacity-15 block px-3">
                    100
                  </Link>
                </li>
                <li>
                  <Link className=" px-3 hover:bg-gray hover:bg-opacity-15 block rounded-r-md">
                    <span>
                      <ChevronRight />
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </main>
      </div>
    </section>
  );
};

export default UserDashboard;
