import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}order`;

  const getOrder = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const getOrderAndDelivery = () => {
    return Promise.all([
      fetch(`${url}/get/${id}`, auth.accessToken),
      fetch(`${baseUrl}delivery/order/get/${id}`, auth.accessToken),
    ])
      .then(([result, response]) => {
        return {
          order: result.data,
          delivery: response.data,
        };
      })
      .catch((error) => {
        console.error("Error fetching vendor and products:", error);
        throw error;
      });
  };

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderAndDelivery(),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  console.log(data);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 p-2 text-gray-900 dark:text-gray-50">
      <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/admin"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              Dashboard
            </Link>

            <Link
              to="#"
              aria-current="page"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              Order Details
            </Link>
          </Breadcrumbs>
      <h1 className="text-center text-2xl font-bold py-4"> Order Details </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="col-span-2 border-2 shadow-lg flex flex-col md:flex-row justify-between p-5 bg-white rounded-lg shadow-purple-200">
          {" "}
          <div>
            <h2 className="font-bold border-b-2 mb-2"> Order Info. </h2>
            <p> Order Date : {new Date(data?.order.CreatedAt).toDateString()} </p>
            <p> Order Status : {data?.order.Status} </p>
            <p> Order Type : {data?.order.Type}</p>
            <p> Delivery Status : {data?.order.IsDelivered ? 'Delivered' : 'Not Delivered'} </p>
          </div>
          <div>
            {" "}
            <h2 className="font-bold border-b-2 mb-2">Customer Info.</h2>
            <p> Customer Full-Name : {data?.order.Customer.FirstName} {data?.order.Customer.LastName} </p>
            <p> Customer Address : {data?.order.Customer.ContactAddress} </p>
            <p> Customer Phone Number : {data?.order.Customer.PhoneNumber} </p>

          </div>
        </div>

        <div className="overflow-x-auto col-span-2 bg-white shadow-lg shadow-green-200 rounded-lg">
          <h2 className="text-xl font-bold text-center p-2"> Order Items</h2>
            {isLoading && (
                <p className="flex items-center justify-center">
                  {" "}
                  <CircularProgress />
                </p>
              )}
              {isError && (
                <p className="flex items-center justify-center">
                  {" "}
                  <Alert severity="error">Error Fetching Data..</Alert>
                </p>
              )}
              {isSuccess && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  {data?.order.OrderItems.map((item) => (
                    <tr key={item.Id} className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.Name}
                      </th>
                      <td className="px-4 py-3">{item.Quantity}</td>
                      <td className="px-4 py-3">{item.Amount}</td>
                      <td className="px-4 py-3"> {item.TotalAmount}</td>
                      <td className="px-4 py-3"> {item.IsFragile ? 'Fragile' : 'Not Fragile'}</td>
                      <td className="px-4 py-3"> {item.Weight}</td>
                      <td className="px-4 py-3"> {item.Description}</td>

                    </tr>
                  ))}

                </tbody>
              </table> )}
            </div>
        <div className="border-2 col-span-2 bg-white p-3 shadow-lg shadow-blue-200 rounded-lg ">
          {" "}
          <h1 className="font-bold text-center text-xl">Delivery Details </h1>{" "}
          <p> Delivery Date : {new Date(data?.delivery.CreatedAt).toDateString()} </p>
          <p> Delivery Fee : {data?.delivery.DeliveryFee}</p>
          <p> Pickup Address : {data?.delivery.PickupAddress}</p>
          <p> Pickup Type : {data?.delivery.PickupType}</p>
          <p> Pickup Type : {data?.delivery.Status}</p>
          
        </div>
        <div className="border-2 col-span-2 p-3 bg-white shadow-lg shadow-orange-200 rounded-lg ">
          {" "}
          <h1 className="font-bold text-center text-xl">Rider Details </h1>{" "}
          <p> Rider Full Name : {data?.delivery.Rider.FirstName} {data?.delivery.Rider.LastName}</p>
          <p> Rider Phone Number : {data?.delivery.Rider.PhoneNumber}</p>
          <p> Rider Status : {data?.delivery.Rider.IsActive ? "Active" : " In-Active"}</p>

        </div>
        <div className="border-2 col-span-2 p-3 bg-white shadow-lg shadow-brown-200 rounded-lg">
          {" "}
          <h1 className="font-bold text-center text-xl">Transaction Details </h1>{" "}
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetails;
