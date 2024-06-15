import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
//import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";

const AdminRiderDetails = () => {
  const { id } = useParams();
  const url = `${baseUrl}rider/get`;
  const { auth } = useAuth();
  const fetch = useFetch();

  const getRider = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getRider(`${url}/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  console.log(data);

  return (
    <div className="text-gray-900 dark:text-gray-50 flex flex-col gap-10 p-3">
      <h1 className="text-3xl font-bold text-center p-4">Rider Details</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="shadow-lg rounded-lg p-3 bg-white h-fit">
            <div className="flex gap-2 items-center ">
              <h3 className="text-lg font-bold">Full Name :</h3>
              <p className="text-gray-800 capitalize">
                {`${data?.FirstName} ${data?.LastName}`}{" "}
              </p>
            </div>
            <div className="flex gap-2 items-center ">
              <h3 className="text-lg font-bold"> Phone Number :</h3>
              <p className="text-gray-800 capitalize">
                {`${data?.PhoneNumber}`}{" "}
              </p>
            </div>

            <div className="flex gap-2 items-center ">
              <h3 className="text-lg font-bold"> Emergency Contact :</h3>
              <p className="text-gray-800 capitalize">
                {`${data?.EmergencyContact}`}{" "}
              </p>
            </div>
            <div className="flex gap-3 items-center ">
              <h3 className="text-lg font-bold"> Email Address :</h3>
              <p className="text-gray-800 capitalize">{`${data?.Email}`} </p>
            </div>
            <div className="flex gap-2 items-center ">
              <h3 className="text-lg font-bold">Contact Address :</h3>
              <p className="text-gray-800 capitalize">
                {`${data?.ContactAddress}`}{" "}
              </p>
            </div>
          </div>
          <div className="shadow-lg rounded-lg p-3 bg-white">
            {" "}
            <div className="flex gap-2 items-center">
              <h3 className="text-lg font-bold"> Identity Type :</h3>
              <p className="text-gray-800 capitalize">{data?.IdentityType}</p>
            </div>
            <div className="flex gap-2 items-center">
              <h3 className="text-lg font-bold"> Identity Number :</h3>
              <p className="text-gray-800 capitalize">{data?.IdentityNumber}</p>
            </div>
            <div className="flex gap-2 items-center">
              <h3 className="text-lg font-bold"> Rider Status :</h3>
              <p className="text-gray-800 capitalize">
                {data?.IsActive ? <span className="text-green-700"> Active  </span> : <span className="text-red-700"> De-Activated  </span>}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center col-span-2 p-5">
            <h3 className="text-2xl font-bold"> Identity Image :</h3>
            <p className="text-gray-800 capitalize w-full">
              <img
                src={`${data?.IdentityImgUrl}`}
                alt="ID Image"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRiderDetails;
