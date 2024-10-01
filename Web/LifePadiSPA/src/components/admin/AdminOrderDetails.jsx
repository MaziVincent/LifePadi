import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";
import AssignRider from "./subcomponents/AssignRider";
import { useState } from "react";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}order`;
  const [assignRider, setAssignRider] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
  
=======
>>>>>>> 7fa87ff (user dashboard commit)
=======
  
>>>>>>> 28e0a99 (rider corrections and other)

  const getOrder = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const getDelivery = async (url) => {
    const response = await fetch(url, auth.accessToken);

<<<<<<< HEAD
    //console.log(response);
    return response.data;
  };

  const getTransaction = async (url) => {
    const response = await fetch(url, auth.accessToken);
    return response.data;
  };
<<<<<<< HEAD
=======

  const getLogistics = async (url) => {
    const response = await fetch(url, auth.accessToken);
    return response.data;
  };
>>>>>>> 0ab5359 (incremental changes)

  const getLogistics = async (url) => {
    const response = await fetch(url, auth.accessToken);
    return response.data;
  };

=======
    console.log(response);
    return response.data;
  };

>>>>>>> 7fa87ff (user dashboard commit)
  const {
    data: order,
    isError: orderError,
    isSuccess: orderSuccess,
    isLoading: orderLoading,
  } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrder(`${url}/get/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const {
    data: delivery,
    isError: deliveryError,
    isSuccess: deliverySuccess,
    isLoading: deliveryLoading,
  } = useQuery({
    queryKey: ["delivery"],
    queryFn: () => getDelivery(`${baseUrl}delivery/order/get/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0ab5359 (incremental changes)
  const {
    data: transaction,
    isError: transactionError,
    isSuccess: transactionSuccess,
    isLoading: transactionLoading,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: () =>
      getTransaction(`${baseUrl}transaction/transactionByOrderId/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const {
    data: logistics,
    isError: logisticsError,
    isSuccess: logisticsSuccess,
    isLoading: logisticsLoading,
  } = useQuery({
    queryKey: ["logistics"],
    queryFn: () => getLogistics(`${baseUrl}logistics/getByOrder/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
    enabled: order?.Type === "Logistics",
  });

<<<<<<< HEAD
  console.log(order);

  const handleAssignRider = () => {
    setAssignRider(true);
  };
=======
const handleAssignRider = () => {
setAssignRider(true)
}

>>>>>>> 7fa87ff (user dashboard commit)
=======
  console.log(logistics);

  const handleAssignRider = () => {
    setAssignRider(true);
  };
>>>>>>> 0ab5359 (incremental changes)

  return (
    <section className=" p-2 text-gray-900 dark:text-primary pb-10">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/admin"
          className="hover:border-b-2 dark:text-primary hover:border-b-secondary"
        >
          Dashboard
        </Link>

        <Link
          to="#"
          aria-current="page"
          className="hover:border-b-2 dark:text-primary hover:border-b-secondary"
        >
          Order Details
        </Link>
      </Breadcrumbs>
      <div className="flex justify-end">
        {" "}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0ab5359 (incremental changes)
        {delivery && (
          <button
            type="button"
            onClick={handleAssignRider}
            className={`inline-flex items-center  dark:text-primary bg-background hover:bg-secondary hover:text-accent focus:ring-4 focus:outline-none focus:ring-darkSecondaryText font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
<<<<<<< HEAD
          >
            <svg
              className="mr-1 -ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Assign Rider
          </button>
        )}
=======
        {
          delivery &&  <button
          type="button"
          onClick={handleAssignRider}
          className={`inline-flex items-center  dark:text-primary bg-background hover:bg-secondary hover:text-accent focus:ring-4 focus:outline-none focus:ring-darkSecondaryText font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
        >
          <svg
            className="mr-1 -ml-1 w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Assign Rider
        </button>
        }
       
>>>>>>> 7fa87ff (user dashboard commit)
=======
          >
            <svg
              className="mr-1 -ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Assign Rider
          </button>
        )}
>>>>>>> 0ab5359 (incremental changes)
      </div>
      <h1 className="text-center text-2xl font-bold py-4"> Order Details </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5  ">
        {orderLoading && (
          <p className="flex items-center justify-center">
            {" "}
            <CircularProgress />
          </p>
        )}
        {orderError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">Error Fetching Data..</Alert>
          </p>
        )}
        {orderSuccess && (
          <div className="col-span-2 border-2 dark:bg-darkMenu bg-graybg shadow-sm flex flex-col md:flex-row justify-between p-5 bg-white rounded-lg shadow-lightgreen">
            {" "}
            <div>
              <h2 className="font-bold border-b-2 mb-2"> Order Info. </h2>
              <p> Order Date : {new Date(order.CreatedAt).toDateString()} </p>
              <p> Order Status : {order.Status} </p>
              <p> Order Type : {order.Type}</p>
              <p>
                {" "}
                Delivery Status :{" "}
                {order.IsDelivered ? "Delivered" : "Not Delivered"}{" "}
              </p>
            </div>
            <div>
              {" "}
              <h2 className="font-bold border-b-2 mb-2">Customer Info.</h2>
              <p>
                {" "}
<<<<<<< HEAD
<<<<<<< HEAD
                Customer Full-Name : {order.Customer?.FirstName}{" "}
                {order.Customer?.LastName}{" "}
              </p>
              <p> Customer Address : {order.Customer?.ContactAddress} </p>
              <p> Customer Phone Number : {order.Customer?.PhoneNumber} </p>
=======
                Customer Full-Name : {order.Customer.FirstName}{" "}
                {order.Customer.LastName}{" "}
              </p>
              <p> Customer Address : {order.Customer.ContactAddress} </p>
              <p> Customer Phone Number : {order.Customer.PhoneNumber} </p>
>>>>>>> 7fa87ff (user dashboard commit)
=======
                Customer Full-Name : {order.Customer?.FirstName}{" "}
                {order.Customer?.LastName}{" "}
              </p>
              <p> Customer Address : {order.Customer?.ContactAddress} </p>
              <p> Customer Phone Number : {order.Customer?.PhoneNumber} </p>
>>>>>>> 0ab5359 (incremental changes)
            </div>
          </div>
        )}
        {orderLoading && (
          <p className="flex items-center justify-center">
            {" "}
            <CircularProgress />
          </p>
        )}
        {orderError && (
          <p className="flex items-center justify-center">
            {" "}
<<<<<<< HEAD
            <Alert severity="error">Error Fetching Order Data ...</Alert>
=======
            <Alert severity="error">Error Fetching Data..</Alert>
>>>>>>> 7fa87ff (user dashboard commit)
          </p>
        )}
        {orderSuccess && (
          <div className="overflow-x-auto col-span-2 dark:bg-darkMenu bg-graybg shadow-sm shadow-lightyellow rounded-lg">
            <h2 className="text-xl font-bold text-center p-2"> Order Items</h2>

            {orderError && (
              <p className="flex items-center justify-center">
                {" "}
<<<<<<< HEAD
                <Alert severity="error">Error Fetching Order Items ...</Alert>
=======
                <Alert severity="error">Error Fetching Data..</Alert>
>>>>>>> 7fa87ff (user dashboard commit)
              </p>
            )}
            {orderSuccess && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-darkHover dark:text-gray-400">
                  <tr>
<<<<<<< HEAD
                  <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Vendor Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
=======
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
>>>>>>> 7fa87ff (user dashboard commit)
                      Item Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Total Amount
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Fragile
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Weight
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.OrderItems.map((item) => (
                    <tr
                      key={item.Id}
                      className="border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
<<<<<<< HEAD
                        {item.Product?.Vendor?.Name}
                      </th>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
=======
>>>>>>> 7fa87ff (user dashboard commit)
                        {item.Name}
                      </th>
                      <td className="px-4 py-3">{item.Quantity}</td>
                      <td className="px-4 py-3">{item.Amount}</td>
                      <td className="px-4 py-3"> {item.TotalAmount}</td>
                      <td className="px-4 py-3">
                        {" "}
                        {item.IsFragile ? "Fragile" : "Not Fragile"}
                      </td>
                      <td className="px-4 py-3"> {item.Weight}</td>
                      <td className="px-4 py-3"> {item.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {deliveryLoading && (
          <p className="flex items-center justify-center">
<<<<<<< HEAD
            {" "}
            <CircularProgress />
          </p>
        )}
        {deliveryError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">
              No Delivery Data Availiable for this Order..
              Maybe Order isn't Paid 
            </Alert>
<<<<<<< HEAD
          </p>
        )}
        {deliverySuccess && (
          <div className="border-2 col-span-2 dark:bg-darkMenu bg-graybg p-3 shadow-sm shadow-lightcyan rounded-lg ">
            {" "}
            <h1 className="font-bold text-center text-xl">
              Delivery Details{" "}
            </h1>{" "}
            <p>
              {" "}
              Delivery Date :{" "}
              {delivery.CreatedAt &&
                new Date(delivery.CreatedAt).toDateString()}
            </p>
            <p> Delivery Fee : {delivery.DeliveryFee}</p>
            <p> Pickup Address : {delivery.PickupAddress}</p>
            <p> Pickup Type : {delivery.PickupType}</p>
            <p> Delivery Address : {delivery.DeliveryAddress}</p>
            <p> Status : {delivery.Status}</p>
          </div>
        )}

        {deliveryLoading && (
          <p className="flex items-center justify-center">
            {" "}
            <CircularProgress />
          </p>
        )}
        {deliveryError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">No Rider Data Availiable..</Alert>
          </p>
        )}
        {deliverySuccess && (
          <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-sm shadow-lightemerald rounded-lg ">
            {" "}
            <h1 className="font-bold text-center text-xl">
              Rider Details{" "}
            </h1>{" "}
            <p>
              {" "}
              Rider Full Name : {delivery.Rider?.FirstName}{" "}
              {delivery.Rider?.LastName}
            </p>
            <p> Rider Phone Number : {delivery.Rider?.PhoneNumber}</p>
            <p>
              {" "}
              Rider Status :{" "}
              {delivery.Rider?.IsActive ? "Active" : " In-Active"}
            </p>
          </div>
        )}

        {transactionLoading && (
          <p className="flex items-center justify-center">
            {" "}
            <CircularProgress />
          </p>
        )}
        {transactionError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">Error Getting Transaction Data.. or The Order hasn't been paid For </Alert>
          </p>
        )}
        {transactionSuccess && (
          <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-lg shadow-brown-200 rounded-lg">
            {" "}
            <h1 className="font-bold text-center text-xl">
              Transaction Details{" "}
            </h1>{" "}
            <p>
              {" "}
              Payment ID : {transaction.PaymentId}{" "}
            </p>
            <p> Payment Status : {transaction.Status === "success" ? <span className="text-background">{transaction.Status} </span> :
            <span className="text-redborder">{transaction.Status} </span> }</p>
            <p>
              {" "}
              Total Amount :{" "}
              {transaction.TotalAmount}
            </p>
          </div>
        )}

        {
          logistics &&  <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-lg shadow-brown-200 rounded-lg">
          {" "}
          <h1 className="font-bold text-center text-xl">
            Logistics Details{" "}
          </h1>{" "}
          <p>
            {" "}
            Item : {logistics.Item}{" "}
          </p>

          <p>
            {" "}
            Item Description : {logistics.ItemDescription}{" "}
          </p>
          <p>
            {" "}
            Sender Address : {logistics.SenderAddress}{" "}
          </p>
          
          <p>
            {" "}
            Sender Name : {logistics.SenderName}{" "}
          </p>
          <p>
            {" "}
            Sender Phone Number : {logistics.SenderPhone}{" "}
          </p>
          <p>
            {" "}
            Receiver Address : {logistics.ReceiverAddress}{" "}
<<<<<<< HEAD
          </p>

          <p>
            {" "}
            Receiver Name : {logistics.ReceiverName}{" "}
          </p>

          <p>
            {" "}
            Receiver Phone Number : {logistics.ReceiverPhone}{" "}
          </p>

          
          <p>
            {" "}
            Tracking Number :{" "}
            {logistics.TrackingNumber ? logistics.TrackingNumber : "Not Available"}
          </p>
=======
            {" "}
            <CircularProgress />
          </p>
        )}
        {deliveryError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">Error Fetching Delivery Data..</Alert>
=======
>>>>>>> 0ab5359 (incremental changes)
          </p>
        )}
        {deliverySuccess && (
          <div className="border-2 col-span-2 dark:bg-darkMenu bg-graybg p-3 shadow-sm shadow-lightcyan rounded-lg ">
            {" "}
            <h1 className="font-bold text-center text-xl">
              Delivery Details{" "}
            </h1>{" "}
            <p>
              {" "}
              Delivery Date :{" "}
              {delivery.CreatedAt &&
                new Date(delivery.CreatedAt).toDateString()}
            </p>
            <p> Delivery Fee : {delivery.DeliveryFee}</p>
            <p> Pickup Address : {delivery.PickupAddress}</p>
            <p> Pickup Type : {delivery.PickupType}</p>
            <p> Delivery Address : {delivery.DeliveryAddress}</p>
            <p> Status : {delivery.Status}</p>
          </div>
        )}

        {deliveryLoading && (
          <p className="flex items-center justify-center">
            {" "}
            <CircularProgress />
          </p>
        )}
        {deliveryError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">Error Fetching Rider Data..</Alert>
          </p>
        )}
        {deliverySuccess && (
          <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-sm shadow-lightemerald rounded-lg ">
            {" "}
            <h1 className="font-bold text-center text-xl">
              Rider Details{" "}
            </h1>{" "}
            <p>
              {" "}
              Rider Full Name : {delivery.Rider?.FirstName}{" "}
              {delivery.Rider?.LastName}
            </p>
            <p> Rider Phone Number : {delivery.Rider?.PhoneNumber}</p>
            <p>
              {" "}
              Rider Status :{" "}
              {delivery.Rider?.IsActive ? "Active" : " In-Active"}
            </p>
          </div>
        )}

        {transactionLoading && (
          <p className="flex items-center justify-center">
            {" "}
            <CircularProgress />
          </p>
        )}
        {transactionError && (
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">Error Getting Transaction Data.. or The Order hasn't been paid For </Alert>
          </p>
        )}
        {transactionSuccess && (
          <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-lg shadow-brown-200 rounded-lg">
            {" "}
            <h1 className="font-bold text-center text-xl">
              Transaction Details{" "}
            </h1>{" "}
            <p>
              {" "}
              Payment ID : {transaction.PaymentId}{" "}
            </p>
            <p> Payment Status : {transaction.Status === "success" ? <span className="text-background">{transaction.Status} </span> :
            <span className="text-redborder">{transaction.Status} </span> }</p>
            <p>
              {" "}
              Total Amount :{" "}
              {transaction.TotalAmount}
            </p>
          </div>
        )}

        {
          logistics &&  <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-lg shadow-brown-200 rounded-lg">
          {" "}
          <h1 className="font-bold text-center text-xl">
            Logistics Details{" "}
          </h1>{" "}
<<<<<<< HEAD
>>>>>>> 7fa87ff (user dashboard commit)
        </div>
        }
      </div>
<<<<<<< HEAD

=======
>>>>>>> 7fa87ff (user dashboard commit)
=======
          <p>
            {" "}
            Item : {logistics.Item}{" "}
          </p>

          <p>
            {" "}
            Item Description : {logistics.ItemDescription}{" "}
          </p>
          <p>
            {" "}
            Sender Address : {logistics.SenderAddress}{" "}
          </p>
          
          <p>
            {" "}
            Sender Name : {logistics.SenderName}{" "}
          </p>
          <p>
            {" "}
            Sender Phone Number : {logistics.SenderPhone}{" "}
          </p>
          <p>
            {" "}
            Receiver Address : {logistics.RecieverAddress}{" "}
=======
>>>>>>> 40d3219 (changes)
          </p>

          <p>
            {" "}
            Receiver Name : {logistics.ReceiverName}{" "}
          </p>

          <p>
            {" "}
            Receiver Phone Number : {logistics.ReceiverAddress}{" "}
          </p>

          
          <p>
            {" "}
            Tracking Number :{" "}
            {logistics.TrackingNumber ? logistics.TrackingNumber : "Not Available"}
          </p>
        </div>
        }
      </div>

>>>>>>> 0ab5359 (incremental changes)
      {delivery && (
        <AssignRider
          id={delivery.Id}
          open={assignRider}
          handleClose={setAssignRider}
        />
      )}
    </section>
  );
};

export default AdminOrderDetails;
