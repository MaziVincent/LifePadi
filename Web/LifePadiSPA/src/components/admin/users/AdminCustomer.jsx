
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
//import DeActivateDialogue from "../subcomponents/DeActivateDialogue";

const AdminCustomer = () => {
    const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}customer`;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const activate = useActivate();
  const queryClient = useQueryClient();

  const getCustomers = async (url) => {
    const result = await fetch(url, auth.accessToken);

    return result.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["customers", page, search],
    queryFn: () =>
      getCustomers(`${url}/all?PageNumber=${page}&SearchString=${search}`),
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
          Customers {" "}
        </h2>
      </section>

      {/* <CreateRiderModal
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
      /> */}

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
             { isSuccess && (
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

                    </tr>
                  </thead>
                  <tbody>
                    {data?.result.map((customer) => (
                      <tr className="hover:bg-gray dark:hover:bg-darkHover cursor-pointer" key={customer.Id} onClick={()=>navigate(`/admin/customer/${customer.Id}`)}>
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
                            <div className="text-gray-400">{customer.Email}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4 text-center">{customer.PhoneNumber}</td>
                        <td className="px-6 py-4 text-center">{customer.ContactAddress}</td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) }
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
                className="dark:text-gray-50 dark:bg-primary "
              />
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default AdminCustomer;