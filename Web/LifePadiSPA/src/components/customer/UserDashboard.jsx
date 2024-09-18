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
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import baseUrl from "../../api/baseUrl";
import { CircularProgress } from "@mui/material";
import {Pagination} from "@mui/material";
import { Alert } from "@mui/material";
import { useState } from "react";

const UserDashboard = () => {
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}order/customer/`;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");


  const getOrder = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const {
    data: orders,
    isError: ordersError,
    isSuccess: ordersSuccess,
    isLoading: ordersLoading,
  } = useQuery({
    queryKey: ["orders", page, search ],
    queryFn: () => getOrder(`${url}${auth.Id}?PageNumber=${page}&SearchString=${search}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log("page " + value);
  };
  console.log(orders);

  return (
    <section className="flex flex-col items-center  dark:bg-darkBg text-darkBg dark:text-primary bg-primary h-auto">
      <div className="">
        <h1 className=" mb-5 text-2xl text-center font-bold">My Orders</h1>
        <main className=" flex gap-8">
          <section className="right-section right-0 top-0 max-lg:w-full">
            {ordersLoading && <CircularProgress />}

            {ordersError && (
              <Alert severity="error">
                {" "}
                Cannot Fetch your orders right now... kindly try again later{" "}
              </Alert>
            )}

            {ordersSuccess &&
              orders.result?.map((order) => (
                <div
                  key={order.Id}
                  className=" bg-lightGray hover:bg-graybg dark:hover:bg-darkHover dark:bg-darkMenu dark:text-primary border border-gray border-opacity-15 rounded-md mt-5 p-4 shadow-lg"
                >
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
                        {order.Status === "Pending" && (
                          <span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-light px-2">
                            Pending
                          </span>
                        )}
                        {order.Status === "Ongoing" && (
                          <span className=" bg-gold rounded-md text-lightorange text-opacity- text-sm font-normal inline-flex gap-1 items-center px-2">
                            <LocalShipping fontSize="medium" />
                            In transit
                          </span>
                        )}
                        {order.Status === "Cancelled" && (
                          <span className=" bg-red bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
                            <Clear fontSize="" />
                            Cancelled
                          </span>
                        )}

                        {order.Status === "Completed" && (
                          <span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
                            <Done fontSize="" />
                            Completed
                          </span>
                        )}
                      </div>
                      {/* <div className="">
                        <button className=" flex items-center gap-1 text-background text-lg font-normal">
                          <span>
                            <FileDownloadOutlined />
                          </span>
                          Download invoice
                        </button>
                      </div> */}
                    </div>
                    <div className=" flex items-center max-sm:flex-col gap-4 mb-5">
                      
                      <button
                        disabled={order.Status == "Ongoing" || order.Status == "Completed" ? true : false}
                      className={`${ order.Status == "Ongoing" || order.Status == "Completed" ? 'bg-gray' : 'bg-redborder'}  p-1 cursor-pointer rounded-md max-sm:w-full`}>
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
                        <Link to={`/user/details/${order.Id}`} className=" font-normal  text-opacity-60 hover:text-gray block">
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
                        {new Date(order.CreatedAt).toDateString()}
                        </span>
                      </span>
                      <span className=" inline-flex gap-2 items-center font-normal text-lg max-md:text-sm max-sm:text-xl">
                        Type:
                        <span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
                          {" "}
                          {order.Type}
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
                     {
                      order.IsDelivered ? 'Order Delivered ' : 'Expected Delivery - 30 mins'
                     } 
                    </p>
                  </div>
                </div>
              ))}

            <nav className=" mt-5 mb-10 flex justify-center">
            <Pagination
              count={orders?.dataList.TotalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              className="dark:text-primary dark:bg-graybg"
            />
            </nav>
          </section>
        </main>
      </div>
    </section>
  );
};

export default UserDashboard;
