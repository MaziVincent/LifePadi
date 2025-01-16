
import useFetch from "../../../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import DeActivateDialogue from "../subcomponents/DeActivateDialogue";
import ActivateDialogue from "../subcomponents/ActivateDialogue";
const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: !state.open };
    case "delete":
      return { ...state, delete: !state.delete };
    case "edit":
      return { ...state, edit: !state.edit };
    case "activate":
      return { ...state, activate: !state.activate };
    case "deActivate":
      return { ...state, deActivate: !state.deActivate };
    case "rider":
      return { ...state, rider: action.payload };
    case "id":
      return { ...state, id: action.payload };

    default:
      throw new Error();
  }
};
const AdminCustomer = () => {
    const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}customer`;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const activate = useActivate();
  const queryClient = useQueryClient();

   const [state, dispatch] = useReducer(reducer, {
      open: false,
      delete: false,
      edit: false,
      activate: false,
      deActivate: false,
      rider: {},
      id: 0,
    });

  const getCustomers = async (url) => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["customers", page, search],
    queryFn: () =>
      getCustomers(`${url}/all?PageNumber=${page}&SearchString=${search}&PageSize=10`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

  console.log(data);

  const handlePageChange = (event, value) => {
    setPage(value);
    //console.log("page " + value);
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <section className="bg-white dark:bg-gray-900 mb-5">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                {data?.dataList.TotalCount || 0}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Customers
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
          Customers{" "}
        </h2>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-2 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label
                    htmlFor="simple-search"
                    className="sr-only"
                  >
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray dark:text-gray"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      className="bg-lightGray border border-gray text-grayTxt text-sm rounded-lg focus:ring-secondary focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </form>
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
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-md text-gray-700 uppercase bg-gray-200 dark:bg-darkMenu dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-center"
                      >
                        Customer Full Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3 text-center"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-center"
                      >
                        Contact Address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-center"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.result.map((customer) => (
                      <tr
                        className="hover:bg-gray dark:hover:bg-darkHover cursor-pointer"
                        key={customer.Id}
                        onClick={() =>
                          navigate(`/admin/customer/${customer.Id}`)
                        }
                      >
                        <th className="flex gap-3 px-6 py-4 font-normal justify-start text-gray-900">
                          <div className="relative h-10 w-10">
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium capitalize  text-gray-700">
                              {`${customer.FirstName} ${customer.LastName}`}
                            </div>
                            <div className="text-gray-400">
                              {customer.Email}
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4 text-center">
                          {customer.PhoneNumber}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {customer.ContactAddress}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-end gap-5 ">
                            {customer.IsActive ? (
                              <button
                                x-data="{ tooltip: 'Delete' }"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  dispatch({ type: "id", payload: customer.Id });
                                  dispatch({ type: "deActivate" });
                                }}
                              >
                                <svg
                                  className="w-6 h-6 text-red "
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                x-data="{ tooltip: 'Delete' }"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  dispatch({ type: "id", payload: customer.Id });
                                  dispatch({ type: "activate" });
                                }}
                              >
                                <svg
                                  className="w-8 h-8 text-lightgreen "
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 11.917 9.724 16.5 19 7.5"
                                  />
                                </svg>
                              </button>
                            )}

                            <button
                              x-data="{ tooltip: 'Delete' }"
                              onClick={(event) => {
                                event.stopPropagation();
                                // dispatch({ type: "id", payload: rider.Id });
                                // dispatch({ type: "delete" });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-red"
                                x-tooltip="tooltip"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <Pagination
                count={data?.dataList.TotalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="dark:text-gray-50 dark:bg-primary "
              />
            </nav>
          </div>
        </div>
      </section>

      <DeActivateDialogue
        open={state.deActivate}
        handleClose={dispatch}
        Id={state.id}
        url={url}
        entity={"customer"}
      />

      <ActivateDialogue
        open={state.activate}
        handleClose={dispatch}
        Id={state.id}
        url={url}
        entity={"customer"}
      />
    </div>
  );
};
 
export default AdminCustomer;