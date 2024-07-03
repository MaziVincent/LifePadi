import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const AdminServiceDetails = () => {
  const { id } = useParams();
  const url = `${baseUrl}service/get`;
  const { auth } = useAuth();
  const fetch = useFetch();

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

  console.log(data);

  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-gray-900 dark:text-gray-50 flex flex-col gap-10 p-5">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="shadow-lg rounded-lg p-3 bg-white">
          <div className="flex flex-col gap-2 items-center ">
            <h3 className="text-lg font-bold"> Name :</h3>
            <p className="text-gray-800">{data?.Name}</p>
          </div>
        </div>
        <div className="shadow-lg rounded-lg p-3 bg-white">
          {" "}
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-lg font-bold"> Description :</h3>
            <p className="text-gray-800">{data?.Description}</p>
          </div>
        </div>
        <div className="col-span-2 text-gray-900 dark:text-gray-50">
          <h2 className="text-2xl font-bold text-center p-5"> Vendors</h2>
          {/* <DataGrid
            rows={rows}
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
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceDetails;
