import CreateProductModal from "../product/CreateProductModal";
import EditProductModal from "../product/EditProductModal";
import { useReducer, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialogue from "../../subcomponents/DeleteDialogue";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

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
    case "product":
        return { ...state, product: action.payload };

    default:
      throw new Error();
  }
};

const AdminVendorDetails = () => {
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}vendor`;
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
    product:null
  });

  const columns = [
    { field: "Id", headerName: "ID", width: 50 },
    {
      field: "Name",
      headerName: "Product Name",
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
      field: "Description",
      headerName: "Description",
      //type: "number",
      width: 150,
      //editable: true,
    },
    {
      field: "Price",
      headerName: "Price",
      //description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 80,
    },
    {
      field: "Status",
      headerName: "Status",
      //description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 80,
    },

    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 120,
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
                dispatch({ type: "product", payload: params.row });
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
          </div>
        );
      },
    },
  ];

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

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => getVendorAndProducts(`${url}`),
    staleTime: 20000,
    refetchOnMount: "always",
  });

  //console.log(data.products);

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
              to={`/admin/vendorcategory/${data?.vendor?.VendorCategoryId}`}
              aria-current="page"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              Vendor Category
            </Link>

            <Link
              to="#"
              aria-current="page"
              className="hover:border-b-2 hover:border-b-green-700"
            >
              {data?.vendor?.Name}
            </Link>
          </Breadcrumbs>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full flex items-center justify-center border-4 w-28">
                <img
                  src={data?.vendor?.VendorImgUrl}
                  className="w-full rounded-full"
                />
              </div>
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                {data?.vendor?.Name}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                {data?.vendor?.ContactAddress}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
          Products - {data?.products.length ? data?.products.length : 0}
        </h2>
      </section>

      <CreateProductModal
        open={state.open}
        handleClose={dispatch}
        vendorId={id}
      />

      <EditProductModal
        open={state.edit}
        handleClose={dispatch}
        product={state.product}
        vendorId={state.vendorId}
      />
      {/*
  
//         <DeleteDialogue
//           open={state.delete}
//           handleClose={dispatch}
//           deleteId={state.deleteId}
//           url={`${baseUrl}vendor`}
//           name="vendorcategory"
//         /> */}

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
                  Create Product
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
                  rows={data?.products}
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
                    navigate(`/admin/product/${row.id}`);
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

export default AdminVendorDetails;
