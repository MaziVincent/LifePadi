import CreateVendorModal from "./vendor/CreateVendorModal";
import EditVendorModal from "./vendor/EditVendorModal";
import { useReducer, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import UploadImageModal from "../subcomponents/UploadImageModal";

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: !state.open };
    case "edit":
      return { ...state, edit: !state.edit };
    case "activate":
      return { ...state, activate: !state.activate };
    case "delete":
      return { ...state, delete: !state.delete };
    case "vendorId":
      return { ...state, vendorId: action.payload };
    case "deleteId":
      return { ...state, deleteId: action.payload };
    case "upload":
      return { ...state, upload: !state.upload };

    default:
      throw new Error();
  }
};

const AdminVendorCategoryDetails = () => {
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}vendorcategory`;
  const navigate = useNavigate();
  const { id } = useParams();
  // const activate = useActivate();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(reducer, {
    open: false,
    edit: false,
    activate: false,
    delete: false,
    upload: false,
    vendorId: null,
    deleteId: 0,
  });

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
      //description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 180,
    },

    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 190,
      renderCell: (params) => {
        return (
          <div className="flex justify-start items-center h-full gap-5">
            <button
              x-data="{ tooltip: 'Delete' }"
              onClick={(event) => {
                event.stopPropagation();
                dispatch({ type: "delete" });
                dispatch({ type: "deleteId", payload: params.row.Id });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-red-500"
                x-tooltip="tooltip"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              x-data="{ tooltip: 'Edite' }"
              onClick={(event) => {
                event.stopPropagation();
                dispatch({ type: "edit" });
                dispatch({ type: "vendorId", payload: params.row.Id });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              className="flex justify-center items-center rounded-lg px-2 shadow-lg bg-blue-200 h-10 hover:bg-blue-400 "
              onClick={(event) => {
                event.stopPropagation();
                dispatch({ type: "upload" });
                dispatch({ type: "vendorId", payload: params.row.Id });
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Upload
            </button>
          </div>
        );
      },
    },
  ];

  const getCategories = async (url) => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["vendorcategory"],
    queryFn: () => getCategories(`${url}/get/${id}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

  //console.log(data);

  //   const handlePageChange = (event, value) => {
  //     setPage(value);
  //     //console.log("page " + value);
  //   };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <section className="bg-white dark:bg-gray-900 mb-5 flex flex-col gap-3">
        <div className="flex justify-start p-3 w-full">
          {" "}
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/admin/vendorcategory"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              Category
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
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                {data?.Name}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                {data?.Description}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
          Vendors - {data?.Vendors.length ? data?.Vendors.length : 0}
        </h2>
      </section>

      <CreateVendorModal
        open={state.open}
        handleClose={dispatch}
        vendorCategory={id}
      />

      <EditVendorModal
        open={state.edit}
        handleClose={dispatch}
        vendorId={state.vendorId}
      />

      <UploadImageModal
        open={state.upload}
        handleClose={dispatch}
        id={state.vendorId}
        url={`${baseUrl}vendor`}
      />

      <DeleteDialogue
        open={state.delete}
        handleClose={dispatch}
        deleteId={state.deleteId}
        url={`${baseUrl}vendor`}
        name="vendorcategory"
      />

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-2 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "open" })}
                  className="flex items-center gap-1 justify-center text-green-600 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <i className="line-icon-Add font-bold text-lg"></i>
                  Create Vendor
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
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
                  onRowClick={(row) => {
                    navigate(`/admin/vendor/${row.id}`);
                  }}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminVendorCategoryDetails;
