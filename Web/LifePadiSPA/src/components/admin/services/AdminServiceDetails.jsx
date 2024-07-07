import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const AdminServiceDetails = () => {
  const { id } = useParams();
  const url = `${baseUrl}service/get`;
  const { auth } = useAuth();
  const fetch = useFetch();

  const columns = [
    { field: "Id", headerName: "ID", width: 50 },
    {
      field: "Name",
      headerName: "Business Name",
      width: 150,
      //editable: true,
    },
    {
      field: "Tag",
      headerName: "Tag",
      width: 150,
      //editable: true,
    },
    {
      field: "PhoneNumber",
      headerName: "Phonenumber",
      //type: "number",
      width: 150,
      //editable: true,
    },
    {
      field: "ContactAddress",
      headerName: "Contact Address",
      width: 180,
    },
  ];

  const getService = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: () => getService(`${url}/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  //console.log(data);

  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-gray-900 dark:text-gray-50 flex flex-col gap-5 p-5">
      <div
        role="presentation"
        onClick={handleClick}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/admin/service"
            className="hover:border-b-2 hover:border-b-green-700"
          >
            Services
          </Link>

          <Link
            to="#"
            aria-current="page"
            className="hover:border-b-2 hover:border-b-green-700"
          >
            {data?.Name}
          </Link>
        </Breadcrumbs>
      </div>
      <h1 className="text-3xl font-bold text-center p-4">Service Details</h1>
      <div className="rounded-full flex items-center justify-center  w-full">
          <img
            src={data?.ServiceIconUrl}
            className="w-28 border-4 rounded-full"
          />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div className="shadow-lg col-span-1 rounded-lg p-3 bg-white">
          <div className="flex flex-col gap-2 items-center ">
            <h3 className="text-lg font-bold"> Name :</h3>
            <p className="text-gray-800">{data?.Name}</p>
          </div>
        </div>
        <div className="shadow-lg rounded-lg col-span-1 p-3 bg-white">
          {" "}
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg font-bold"> Description :</h3>
            <p className="text-gray-800">{data?.Description}</p>
          </div>
        </div>
       
      </div>
      <section>
        <div className="overflow-x-auto w-full border-2">
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
            <DataGrid
              rows={data?.Vendors}
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
      </section>
    </div>
  );
};

export default AdminServiceDetails;
