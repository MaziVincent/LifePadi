import {
<<<<<<< HEAD
  Clear,
  CreditCard,
  Done,
  LocalShipping,

} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import baseUrl from "../../api/baseUrl";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";
import { Alert } from "@mui/material";
<<<<<<< HEAD
import { useState, useReducer } from "react";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import DangerousIcon from "@mui/icons-material/Dangerous";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import CancelOrder from "./subcomponents/CancelOrder";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: true };
    case "close":
      return { ...state, open: false };
    case "cancel":
      return { ...state, cancel: !state.cancel };
    case "orderId":
      return { ...state, orderId: action.payload };
    default:
      return state;
  }
};
=======
import { useState } from "react";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

>>>>>>> 5f61f19 (updated payment)

const UserDashboard = () => {
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}order/customer/`;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    open: false,
    close: false,
    cancel: false,
    orderId: null,
  });

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
    queryKey: ["orders", page, search],
    queryFn: () =>
      getOrder(`${url}${auth.Id}?PageNumber=${page}&SearchString=${search}`),
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
    <section className="  dark:bg-darkBg text-darkBg dark:text-primary bg-lightGray h-auto min-h-screen">
<<<<<<< HEAD
      <div className=" px-3 md:px-10 py-3">
        <Link
          to="/shop"
          className="text-lg"
        >
          <ArrowBackIosNewRounded />
          Back to shop
        </Link>
      </div>
      <div className="pt-5 flex flex-col items-center">
=======
      <div className="px-10 py-3">
          <Link to="/shop" className="text-lg" >
          <ArrowBackIosNewRounded />
          Back to shop
          </Link>
        </div>
      <div className="pt-5 flex flex-col items-center">
        
>>>>>>> 5f61f19 (updated payment)
        <h1 className=" mb-5 text-4xl text-center font-bold">My Orders</h1>
        <main className=" flex gap-8">
          <section className="right-section right-0 top-0 max-lg:w-full">
            {ordersLoading && <CircularProgress />}

            {ordersError && (
              <Alert severity="error">
                {" "}
                Cannot Fetch your orders right now... kindly try again later{" "}
              </Alert>
            )}

<<<<<<< HEAD
            {orders?.orders?.length < 1 ? (
=======
            {orders?.result.length < 1 ? (
>>>>>>> 5f61f19 (updated payment)
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-2xl">
                  {" "}
                  You currently have no orders{" "}
                  <span className="text-background ">
                    {" "}
                    <SentimentDissatisfiedOutlinedIcon
                      className="animate-bounce "
                      fontSize="large"
                    />{" "}
                  </span>{" "}
                </h1>
                <div>
                  <Link
                    to="/shop"
                    className="bg-secondary p-4 rounded-xl shadow-xl text-xl font-semibold hover:bg-background cursor-pointer"
                  >
                    {" "}
                    Explore our stores{" "}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {ordersSuccess &&
<<<<<<< HEAD
                  orders.orders?.map((order) => (
=======
                  orders.result?.map((order) => (
>>>>>>> 5f61f19 (updated payment)
                    <div
                      key={order.Id}
                      className=" bg-primary hover:bg-graybg dark:hover:bg-darkHover dark:bg-darkMenu dark:text-primary border border-gray border-opacity-15 rounded-lg mt-5 p-4 shadow-lg"
                    >
                      <div className="">
                        <div className=" flex justify-between flex-wrap max-sm:gap-2 items-center pb-4">
                          <div className=" flex gap-2 items-center">
                            <span className=" text-base font-medium  text-opacity-60">
                              Order ID:
                              <span className="text-base px-2 font-normal">
                                {order.Order_Id}
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
                            disabled={
                              order.Status == "Ongoing" ||
<<<<<<< HEAD
                              order.Status == "Completed"||
                              order.Status == "Cancelled"
=======
                              order.Status == "Completed"
>>>>>>> 5f61f19 (updated payment)
                                ? true
                                : false
                            }
                            className={`${
                              order.Status == "Ongoing" ||
<<<<<<< HEAD
                              order.Status == "Completed" ||
                              order.Status == "Cancelled"
                                ? "bg-gray"
                                : "bg-redborder"
                            }  p-1 cursor-pointer rounded-md max-sm:w-full`}

                            onClick={() => {
                              dispatch({type:"orderId", payload:`${order.Id}`})
                              dispatch({ type: "cancel" });
                            }}
                          >
                            <span className="flex items-center justify-center">
                              {" "}
                              <DangerousIcon />
                              Cancel Order
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/user/track/${order.Status}`)
                            }
                            className="border border-gray cursor-pointer font-normal text-opacity-60 hover:text-gray border-opacity-50 p-1 rounded-md max-sm:w-full"
                          >
                            <span className=" flex items-center max-sm:justify-center gap-1">
                              <span className="">
                                <TrackChangesIcon />
=======
                              order.Status == "Completed"
                                ? "bg-gray"
                                : "bg-redborder"
                            }  p-1 cursor-pointer rounded-md max-sm:w-full`}
                          >
                            <span>Cancel Order</span>
                          </button>
                          <button className="border border-gray cursor-pointer font-normal text-opacity-60 hover:text-gray border-opacity-50 p-1 rounded-md max-sm:w-full">
                            <span className=" flex items-center max-sm:justify-center gap-1">
                              <span className="">
                                <Receipt fontSize="" />
>>>>>>> 5f61f19 (updated payment)
                              </span>
                              Track Order
                            </span>
                          </button>
<<<<<<< HEAD
                          <button className="border border-gray bg-background border-opacity-50 bg-opacity-80 p-1 cursor-pointer rounded-md max-sm:w-full">
                            <Link
                              to={`/user/details/${order.Id}`}
                              className=" font-normal  text-opacity-80 hover:text-gray block"
                            >
                              <span>
                                {" "}
                                <RemoveRedEyeIcon /> Order Details
                              </span>
=======
                          <button className="border border-gray bg-lightindigo border-opacity-50 bg-opacity-30 p-1 cursor-pointer rounded-md max-sm:w-full">
                            <Link
                              to={`/user/details/${order.Id}`}
                              className=" font-normal  text-opacity-60 hover:text-gray block"
                            >
                              <span>Order Details</span>
>>>>>>> 5f61f19 (updated payment)
                            </Link>
                          </button>
                        </div>
                      </div>
                      <hr className=" border-gray border-opacity-30" />
                      <div className=" mt-5">
                        <div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
                          <span className=" inline-flex gap-2 items-center font-normal text-base max-md:text-sm max-sm:text-xl">
                            Order Date:
                            <span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
                              {new Date(order.CreatedAt).toDateString()}
                            </span>
                          </span>
                          <span className=" inline-flex gap-2 items-center font-normal text-base max-md:text-sm max-sm:text-xl">
                            Type:
                            <span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
                              {" "}
                              {order.Type}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-2 font-normal text-base max-md:text-sm ">
                            Delivery Status:
                            <span className=" text-grayTxt dark:text-gray  text-opacity-70 font-normal inline-flex gap-1 items-center">
                              {order.IsDelivered ? (
                                <span>
                                  {" "}
                                  <i className="line-icon-Box-Open text-background"></i>{" "}
                                  Delivered{" "}
                                </span>
                              ) : (
                                <span>
                                  {" "}
                                  <i className="line-icon-Box-Close text-lightorange"></i>{" "}
                                  Not Delivered{" "}
                                </span>
                              )}
                            </span>
                          </span>
                        </div>
                        <p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-lightorange">
<<<<<<< HEAD
                          
                          {order.Status == "Pending"
                            ? <span> <ManageHistoryIcon /> Processing Order  </span>
                            : order.Status == "Ongoing"
                            ? <span> <LocalShipping /> Expected Delivery - less than 20 min </span>
                            : order.Status == "Cancelled"
                            ? <span> <Clear /> Order Cancelled </span>
                            : order.Status == "Completed"
                            ? <span> <Done /> Order Completed </span>
                            : ""}
=======
                          <span>
                            <LocalShipping />
                          </span>
                          {order.IsDelivered
                            ? "Order Delivered "
                            : "Expected Delivery - 30 mins"}
>>>>>>> 5f61f19 (updated payment)
                        </p>
                      </div>
                    </div>
                  ))}
<<<<<<< HEAD

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
              </>
            )}
          </section>
          <CancelOrder open={state.cancel} handleClose={dispatch} Id={state.orderId} />
        </main>
      </div>
    </section>
  );
};

=======
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
    queryFn: () => getOrder(`${url}${auth.user?.Id}?PageNumber=${page}&SearchString=${search}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    //console.log("page " + value);
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
=======

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
              </>
            )}
>>>>>>> 5f61f19 (updated payment)
          </section>
        </main>
      </div>
    </section>
  );
};

>>>>>>> eda1965 (User Dashboard and Landing Page)
export default UserDashboard;
