<<<<<<< HEAD
import CreateService from "./CreateServiceModal";
import EditServiceModal from "./EditServiceModal";
import { useReducer, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
//import serviceIcon from "../../../assets/images/services.png";
=======
import Pagination from "@mui/material/Pagination";
import CreateService from "./CreateServiceModal";
import EditService from "./EditServiceModal"
import { useReducer } from "react";
>>>>>>> 55ba6ae (Admin service)

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: !state.open };
    case "edit":
      return { ...state, edit: !state.edit };
    case "activate":
      return { ...state, activate: !state.activate };
<<<<<<< HEAD
    case "delete":
      return { ...state, delete: !state.delete };
    case "service":
      return { ...state, service: action.payload };
    case "deleteId":
      return { ...state, deleteId: action.payload };
=======
    case "deActivate":
      return { ...state, deActivate: !state.deActivate };
    case "service":
      return {...state, service: action.payload }
>>>>>>> 55ba6ae (Admin service)

    default:
      throw new Error();
  }
};

const AdminService = () => {
<<<<<<< HEAD
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}service`;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const activate = useActivate();
  //const queryClient = useQueryClient();

=======
>>>>>>> 55ba6ae (Admin service)
  const [state, dispatch] = useReducer(reducer, {
    open: false,
    edit: false,
    activate: false,
<<<<<<< HEAD
    delete: false,
    service: {},
    deleteId: 0,
=======
    deActivate: false,
    service:{}
>>>>>>> 55ba6ae (Admin service)
  });

  const getServices = async (url) => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["services", page, search],
    queryFn: () =>
      getServices(`${url}/all?PageNumber=${page}&SearchString=${search}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

  //console.log(data);

  const handlePageChange = (event, value) => {
    setPage(value);
    //console.log("page " + value);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
<<<<<<< HEAD
      <Toaster />
=======
>>>>>>> 55ba6ae (Admin service)
      <section className="bg-white dark:bg-gray-900 mb-5">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                {data?.dataList.TotalCount}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Services
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
          Services{" "}
        </h2>
      </section>

      <CreateService
        open={state.open}
        handleClose={dispatch}
      />
<<<<<<< HEAD
      <EditServiceModal
        open={state.edit}
        handleClose={dispatch}
        service={state.service}
      />
      <DeleteDialogue
        open={state.delete}
        handleClose={dispatch}
        deleteId={state.deleteId}
        url={url}
        name='services'
      />
=======
      <EditService open={state.edit} handleClose={dispatch} service={state.service} />
>>>>>>> 55ba6ae (Admin service)

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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-darkHover dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
<<<<<<< HEAD
                  className="flex items-center gap-1 justify-center text-background bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
=======
                  className="flex items-center gap-1 justify-center text-green-600 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
>>>>>>> 55ba6ae (Admin service)
                >
                  <i className="line-icon-Add text-background font-bold text-lg"></i>
                  Add Service
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
<<<<<<< HEAD
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
                  <thead className="text-xs  uppercase bg-gray-200 dark:bg-darkMenu dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Service Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Service Icon
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Status
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
                    {data?.result.map((service) => (
                      <tr
                        key={service.Id}
                        onClick={()=>navigate(`/admin/service/${service.Id}`)}
                        className="border-b cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {service.Name}
                        </th>
                        <td className="px-4 py-3">
                          <div className="relative h-10 w-10 flex justify-center items-center ">
                            {service.ServiceIconUrl ? (
                              <img
                                className="h-full w-full rounded-full object-cover object-center "
                                src={service.ServiceIconUrl}
                                alt=""
                              />
                            ) : (
                              <i className="line-icon-Settings-Window text-2xl hover:text-green-800"></i>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">{service.Description}</td>
                        <td className="px-4 py-3">{service.IsActive ? <span className="text-background"> Active </span> : <span className="text-redborder"> In-Active </span>}</td>

                        <td className="px-4 py-3 flex items-center justify-end">
                          <div className="flex justify-end gap-4">
                            <button
                              x-data="{ tooltip: 'Delete' }"
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch({type:"delete"});
                                dispatch({type:"deleteId", payload:service.Id})
                                //setDeleteId(ap._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-redborder"
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
                                dispatch({type:"service", payload:service})
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
=======
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Product name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3"
                    >
                      Price
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
                  <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple iMac 27&#34;
                    </th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3">300</td>
                    <td className="px-4 py-3">$2999</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <div className="flex justify-end gap-4">
                        <button
                          x-data="{ tooltip: 'Delete' }"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenDeleteModal();
                            //setDeleteId(ap._id);
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
                            setAppointment(ap);
                            //handleOpenEdit();
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
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple iMac 20&#34;
                    </th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3">200</td>
                    <td className="px-4 py-3">$1499</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <div className="flex justify-end gap-4">
                        <button
                          x-data="{ tooltip: 'Delete' }"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenDeleteModal();
                            //setDeleteId(ap._id);
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
                            //setAppointment(ap);
                            handleOpenEdit();
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
                    </td>
                  </tr>

                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Monitor BenQ EX2710Q
                    </th>
                    <td className="px-4 py-3">TV/Monitor</td>
                    <td className="px-4 py-3">BenQ</td>
                    <td className="px-4 py-3">354</td>
                    <td className="px-4 py-3">$499</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <div className="flex justify-end gap-4">
                        <button
                          x-data="{ tooltip: 'Delete' }"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenDeleteModal();
                            //setDeleteId(ap._id);
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
                            setAppointment(ap);
                            //handleOpenEdit();
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
                    </td>
                  </tr>
                </tbody>
              </table>
>>>>>>> 55ba6ae (Admin service)
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <Pagination
<<<<<<< HEAD
                count={data?.dataList.TotalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="dark:text-gray-50 dark:bg-primary"
=======
                count={1}
                page={1}
                onChange={()=>{}}
                variant="outlined"
                shape="rounded"
                className="dark:text-gray-50 dark:bg-gray-200"
>>>>>>> 55ba6ae (Admin service)
              />
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminService;
