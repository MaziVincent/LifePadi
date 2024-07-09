import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
//import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminRiderDetails = () => {
  const { id } = useParams();
  const url = `${baseUrl}rider/get`;
  const { auth } = useAuth();
  const fetch = useFetch();
  const [idImage, setIdImage] = useState(false)

  const columns = [
    { field: "Id", headerName: "ID", width: 50 },
    {
      field: "CreatedAt",
      headerName: "Delivery Date",
      width: 150,
      //editable: true,
    },
    {
      field: "DeliveryFee",
      headerName: "Delivery Fee",
      width: 150,
      //editable: true,
    },
    {
      field: "PickupAddress",
      headerName: "Pick-up Address",
      //type: "number",
      width: 200,
      //editable: true,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 70,
    },
  ];

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

  const toggleImageView = () => {
    setIdImage(!idImage)
  }

  console.log(data);

  return (
    <div className="text-gray-900 dark:text-gray-50 flex flex-col gap-10 p-3">
      <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/admin/rider"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              Riders
            </Link>

            <Link
              to="#"
              aria-current="page"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              {data?.FirstName}
            </Link>
          </Breadcrumbs>
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
              <h3 className="text-lg font-bold"> Email :</h3>
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
            <div><button className="rounded-lg shadow-lg bg-green-500 p-4 font-bold" onClick={toggleImageView}> View ID Image </button></div>
           {
            idImage && <p className="text-gray-800 capitalize w-full">
            <img
              src={`${data?.IdentityImgUrl}`}
              alt="ID Image"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </p>
           } 
          </div>
          <div className="overflow-x-auto col-span-2">
             
              {isSuccess && (
                <DataGrid
                  rows={data?.Deliveries}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  //checkboxSelection
                  disableRowSelectionOnClick
                  getRowId={(row) => row.Id}
                  
                  className="cursor-pointer"
                />
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminRiderDetails;
