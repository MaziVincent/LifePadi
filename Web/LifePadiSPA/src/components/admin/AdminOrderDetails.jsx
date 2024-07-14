

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

      const getVendorAndProducts = (url) => {
        return Promise.all([
          fetch(`${url}/get/${id}`, auth.accessToken),
          fetch(`${url}/products/${id}`, auth.accessToken),
        ])
          .then(([result, response]) => {
            return {
              vendor: result.data,
              products: response.data,
            };
          })
          .catch((error) => {
            console.error("Error fetching vendor and products:", error);
            throw error;
          });
      };
    
    
      const { data, isError, isSuccess, isLoading } = useQuery({
        queryKey: ["order"],
        queryFn: () => getOrder(`${url}/get/${id}`),
        keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount: "always",
      });

      console.log(data);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 p-2 text-gray-900 dark:text-gray-50">
      <h1 className="text-center text-2xl font-bold py-4"> Order Details </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="col-span-2 border-2 shadow-lg bg-white rounded-lg">
          {" "}
          <h1 className="text-center font-bold"> Order Details</h1>{" "}

        </div>
        <div className="border-2 col-span-1">
          {" "}
          <h1>Rider Details </h1>{" "}
        </div>
        <div className="border-2 col-span-1 ">
          {" "}
          <h1>Transaction Details</h1>{" "}
        </div>
        <div className="border-2 col-span-1">
          {" "}
          <h1>Delivery Details</h1>{" "}
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetails;
