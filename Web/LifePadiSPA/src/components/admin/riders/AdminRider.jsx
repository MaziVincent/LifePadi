import CreateRiderModal from "./CreateRiderModal";
import EditRiderModal from "./EditRiderModal";
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

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: !state.open };
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

const AdminRider = () => {
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}rider`;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const activate = useActivate();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(reducer, {
    open: false,
    edit: false,
    activate: false,
    deActivate: false,
    rider: {},
    id: 0,
  });

  const getRiders = async (url) => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["riders", page, search],
    queryFn: () =>
      getRiders(`${url}/all?PageNumber=${page}&SearchString=${search}`),
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
                Riders
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
          Riders{" "}
        </h2>
      </section>

      <CreateRiderModal
        open={state.open}
        handleClose={dispatch}
      />
      <EditRiderModal
        open={state.edit}
        handleClose={dispatch}
        rider={state.rider}
      />
      <DeActivateDialogue
        open={state.deActivate}
        handleClose={dispatch}
        Id={state.id}
        url={url}
        entity={'rider'}
      />

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
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "open" })}
                  className="flex items-center gap-1 justify-center text-green-600 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <i className="line-icon-Add font-bold text-lg"></i>
                  Create Rider
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
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-md text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-center"
                      >
                        Rider Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3 text-center"
                      >
                        Status
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
                        Verification
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.result.map((rider) => (
                      <tr className="hover:bg-gray-100 cursor-pointer" key={rider.Id} onClick={()=>navigate(`/admin/rider/${rider.Id}`)}>
                        <th className="flex gap-3 px-6 py-4 font-normal justify-center text-gray-900">
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
                              {`${rider.FirstName} ${rider.LastName}`}
                            </div>
                            <div className="text-gray-400">{rider.Email}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4 text-center">
                          {rider.IsActive ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                              In-Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">{rider.PhoneNumber}</td>
                        <td className="px-6 py-4 text-center flex justify-center">
                          <div className="flex gap-2">
                            {rider.IsVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                                Not Verified
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4 ">
                        <div className="flex justify-end gap-4 ">
                        {rider.IsActive ? (
                          <a
                            x-data="{ tooltip: 'Delete' }"
                            onClick={(event) => {
                              event.stopPropagation();
                              dispatch({type:"id", payload:rider.Id})
                              dispatch({type:"deActivate"});
                            }}
                          >
                            <svg
                              className="w-6 h-6 text-red-400 "
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
                          </a>
                        ) : (
                          <a
                            x-data="{ tooltip: 'Delete' }"
                            onClick={(event) => {
                              event.stopPropagation();
                              dispatch({type:"id", payload:rider.Id})
                              dispatch({type:"activate"});
                            }}
                          >
                            <svg
                              className="w-6 h-6 text-green-600 "
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
                          </a>
                        )}

                        <a
                          x-data="{ tooltip: 'Edite' }"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch({type:"rider", payload:rider})
                            dispatch({type:"edit"});
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
                        </a>
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
                count={
                  data?.dataList.TotalPages
                }
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="dark:text-gray-50 dark:bg-gray-200"
              />
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminRider;
