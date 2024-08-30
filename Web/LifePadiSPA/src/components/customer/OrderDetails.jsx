
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";

const OrderDetails = () => {
  const { id } = useParams();
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}order`;

  const getOrder = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

<<<<<<< HEAD
  const getData = async (url) => {
    const response = await fetch(url, auth.accessToken);

    //console.log(response);
=======
  const getDelivery = async (url) => {
    const response = await fetch(url, auth.accessToken);

    console.log(response);
>>>>>>> 7fa87ff (user dashboard commit)
    return response.data;
  };

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
<<<<<<< HEAD
    queryFn: () => getData(`${baseUrl}delivery/order/get/${id}`),
=======
    queryFn: () => getDelivery(`${baseUrl}delivery/order/get/${id}`),
>>>>>>> 7fa87ff (user dashboard commit)
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

<<<<<<< HEAD
  const {
    data: transaction,
    isError: transactionError,
    isSuccess: transactionSuccess,
    isLoading: transactionLoading,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: () =>
      getData(`${baseUrl}transaction/transactionByOrderId/${id}`),
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
    queryFn: () => getData(`${baseUrl}logistics/getByOrder/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
    enabled: order?.Type === "Logistics",
  });

  console.log(logistics);

=======
>>>>>>> 7fa87ff (user dashboard commit)

  return (
    <section className=" p-2 text-gray-900 dark:text-primary pb-10">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/user"
          className="hover:border-b-2 dark:text-primary hover:border-b-secondary"
        >
          Dashboard
        </Link>
<<<<<<< HEAD
          
=======

>>>>>>> 7fa87ff (user dashboard commit)
        <Link
          to="#"
          aria-current="page"
          className="hover:border-b-2 dark:text-primary hover:border-b-secondary"
        >
          Order Details
        </Link>
      </Breadcrumbs>
     
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
            <Alert severity="error">Error Fetching Data..</Alert>
          </p>
        )}
        {orderSuccess && (
          <div className="overflow-x-auto col-span-2 dark:bg-darkMenu bg-graybg shadow-sm shadow-lightyellow rounded-lg">
            <h2 className="text-xl font-bold text-center p-2"> Order Items</h2>

            {orderError && (
              <p className="flex items-center justify-center">
                {" "}
                <Alert severity="error">Error Fetching Data..</Alert>
              </p>
            )}
            {orderSuccess && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-darkHover dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
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
            {" "}
            <CircularProgress />
          </p>
        )}
        {deliveryError && (
          <p className="flex items-center justify-center">
            {" "}
<<<<<<< HEAD
            <Alert severity="error" className="" >You currently have no delivery Information..</Alert>
=======
            <Alert severity="error">Error Fetching Delivery Data..</Alert>
>>>>>>> 7fa87ff (user dashboard commit)
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
<<<<<<< HEAD
          <p className="flex items-center justify-center ">
            {" "}
            <Alert severity="error">Rider is yet to be assigned..</Alert>
=======
          <p className="flex items-center justify-center">
            {" "}
            <Alert severity="error">Error Fetching Rider Data..</Alert>
>>>>>>> 7fa87ff (user dashboard commit)
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
<<<<<<< HEAD
              Rider Full Name : {delivery.Rider?.FirstName}{" "}
              {delivery.Rider?.LastName}
            </p>
            <p> Rider Phone Number : {delivery.Rider?.PhoneNumber}</p>
            <p>
              {" "}
              Rider Status : {delivery.Rider?.IsActive ? "Active" : " In-Active"}
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
            <Alert severity="error"> No Payment Information or Order is yet to be Paid for ..</Alert>
          </p>
        )}
        {transactionSuccess && (
          <div className="col-span-2 border-2 dark:bg-darkMenu bg-graybg shadow-sm flex flex-col md:flex-row justify-between p-5 bg-white rounded-lg shadow-lightgreen">
            {" "}
            <div>
              <h2 className="font-bold border-b-2 mb-2"> Payment Details . </h2>
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
            Receiver Address : {logistics.RecieverAddress}{" "}
          </p>

          <p>
            {" "}
            Receiver Name : {logistics.RecieverName}{" "}
          </p>

          <p>
            {" "}
            Receiver Phone Number : {logistics.RecieverAddress}{" "}
          </p>

          
          <p>
            {" "}
            Tracking Number :{" "}
            {logistics.TrackingNumber ? logistics.TrackingNumber : "Not Available"}
          </p>
        </div>
        }


=======
              Rider Full Name : {delivery.Rider.FirstName}{" "}
              {delivery.Rider.LastName}
            </p>
            <p> Rider Phone Number : {delivery.Rider.PhoneNumber}</p>
            <p>
              {" "}
              Rider Status : {delivery.Rider.IsActive ? "Active" : " In-Active"}
            </p>
          </div>
        )}
        <div className="border-2 col-span-2 p-3 dark:bg-darkMenu bg-graybg shadow-lg shadow-brown-200 rounded-lg">
          {" "}
          <h1 className="font-bold text-center text-xl">
            Transaction Details{" "}
          </h1>{" "}
        </div>
>>>>>>> 7fa87ff (user dashboard commit)
      </div>
    </section>
  );
};

export default OrderDetails;
