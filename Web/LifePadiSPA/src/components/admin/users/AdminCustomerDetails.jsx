import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

const AdminCustomerDetails = () => {
  const { id } = useParams();
  const url = `${baseUrl}customer/get`;
  const { auth } = useAuth();
  const fetch = useFetch();

  const columns = [
    { field: "Id", headerName: "ID", width: 50 },
    {
      field: "CreatedAt",
      headerName: "Order Date",
      width: 150,
      //editable: true,
    },
   
    {
      field: "Type",
      headerName: "Order Type",
      //type: "number",
      width: 100,
      //editable: true,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
    },
    {
        field: "IsDelivered",
        headerName: "Delivered",
        width: 70,
      },
  ];

  const getCustomer = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomer(`${url}/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  console.log(data);

  return (
    <div className="text-gray-900 dark:text-gray-50 flex flex-col gap-10 p-3">
      <Breadcrumbs aria-label="breadcrumb" >
        <Link
          to="/admin/customer"
          className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
        >
          Customers
        </Link>

        <Link
          to="#"
          aria-current="page"
          className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
        >
          {data?.FirstName}
        </Link>
      </Breadcrumbs>
      <h1 className="text-3xl font-bold text-center p-4">Customer Details</h1>
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
              <h3 className="text-lg font-bold"> Date of Birth :</h3>
              <p className="text-gray-800 capitalize">{`${data?.Dob}`} </p>
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

          <div className="overflow-x-auto col-span-2 bg-white shadow-lg shadow-green-200 rounded-lg">
          <h2 className="text-xl font-bold text-center p-2"> Addresses</h2>
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
                       Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Town
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      State
                    </th>
                  
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Postal Code
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Longitude
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Latitude
                    </th>

                   
                  </tr>
                </thead>
                <tbody>
                  {data?.Addresses.map((address) => (
                    <tr key={address.Id} className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {address.Name}
                      </th>
                      <td className="px-4 py-3">{address.Town}</td>
                      <td className="px-4 py-3">{address.City}</td>
                      <td className="px-4 py-3"> {address.State}</td>
                      <td className="px-4 py-3"> {address.PostalCode}</td>
                      <td className="px-4 py-3"> {address.Longitude}</td>
                      <td className="px-4 py-3"> {address.Latitude}</td>

                    </tr>
                  ))}

                </tbody>
              </table> )}
            </div>
            <h2 className="text-xl font-bold text-center"> Orders</h2>
           <div className="overflow-x-auto col-span-2 bg-white shadow-lg rounded-lg">
            {isSuccess && (
              <DataGrid
                rows={data?.Orders}
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
                className="cursor-pointer dark:bg-primary"
              />
            )}
          </div> 
        </div>
      )}
    </div>
  );
};

export default AdminCustomerDetails;
