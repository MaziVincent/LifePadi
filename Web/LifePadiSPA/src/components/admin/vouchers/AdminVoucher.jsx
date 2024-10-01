<<<<<<< HEAD
<<<<<<< HEAD

import CreateVoucher from "./CreateVoucher";
  // import EditServiceModal from "./EditServiceModal";
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
  import DeleteDialogue from "../subcomponents/DeleteDialogue"
  //import serviceIcon from "../../../assets/images/services.png";
  
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
      case "service":
        return { ...state, service: action.payload };
      case "deleteId":
        return { ...state, deleteId: action.payload };
  
      default:
        throw new Error();
    }
  };
  
  const AdminVoucher = () => {
    const fetch = useFetch();
    const { auth } = useAuth();
    const url = `${baseUrl}voucher`;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    // const activate = useActivate();
    //const queryClient = useQueryClient();
  
    const [state, dispatch] = useReducer(reducer, {
      open: false,
      edit: false,
      activate: false,
      delete: false,
      service: {},
      deleteId: null,
    });
  
    const getVouchers = async (url) => {
      const result = await fetch(url, auth.accessToken);
  
      return result.data;
    };
  
    const { data, isError, isLoading, isSuccess } = useQuery({
      queryKey: ["vouchers",],
      queryFn: () =>
        getVouchers(`${url}/all`),
      keepPreviousData: true,
      staleTime: 20000,
      refetchOnMount: "always",
    });
  
    console.log(data);
  
    const handlePageChange = (event, value) => {
      setPage(value);
      //console.log("page " + value);
    };

    const deActivateVoucher = () => {
      
    }
  
    return (
      <div className="bg-gray-100 dark:bg-gray-900">
        <Toaster />
        <section className="bg-white dark:bg-gray-900 mb-5">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
            <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 dark:text-white">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                   {data?.length} 
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  Vouchers
                </dd>
              </div>
            </dl>
          </div>
        </section>
  
        <section className="bg-white dark:bg-gray-900">
          <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
            Vouchers{" "}
          </h2>
        </section>
  
        <CreateVoucher
          open={state.open}
          handleClose={dispatch}
        />
        {/* <EditServiceModal
          open={state.edit}
          handleClose={dispatch}
          service={state.service}
        />
        */}
        <DeleteDialogue
          open={state.delete}
          handleClose={dispatch}
          deleteId={state.deleteId}
          url={url}
          name='vouchers'
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
                        // onChange={(e) => {
                        //   setSearch(e.target.value);
                        // }}
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
                    className="flex items-center gap-1 justify-center text-background bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <i className="line-icon-Add text-background font-bold text-lg"></i>
                    Create Voucher
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
                    <Alert severity="error"> We cant get your vouchers currently </Alert>
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
                          Voucher Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Voucher Code
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Active
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Expired
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Usage
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Used
<<<<<<< HEAD
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Discount %
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3"
                        >
                          Discount Amt
=======
>>>>>>> 28e0a99 (rider corrections and other)
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
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((voucher) => (
                        <tr
                          key={voucher.Id}
                          //onClick={()=>navigate(`/admin/service/${service.Id}`)}
                          className="border-b cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {voucher.Name}
                          </th>
                        
                          <td className="px-4 py-3">{voucher.Code}</td>
                          <td className="px-4 py-3">{voucher.IsActive ? <span className="text-background"> Active </span> : <span className="text-redborder"> In-Active </span>}</td>
                          <td className="px-4 py-3">{voucher.IsExpired ? <span className="text-background"> Expired </span> : <span className="text-redborder"> Still Valid </span>}</td>
                          <td className="px-4 py-3">{voucher.TotalNumberAvailable}</td>
                          <td className="px-4 py-3">{voucher.TotalNumberUsed}</td>
<<<<<<< HEAD
                          <td className="px-4 py-3">{voucher.DiscountPercentage}</td>
                          <td className="px-4 py-3">{voucher.DiscountAmount}</td>
=======
>>>>>>> 28e0a99 (rider corrections and other)
                          <td className="px-4 py-3">{voucher.Description}</td>

                          <td className="px-4 py-3 flex items-center justify-end">
                            <div className="flex justify-end gap-4">
                              <button
                                x-data="{ tooltip: 'Delete' }"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  dispatch({type:"delete"});
                                  dispatch({type:"deleteId", payload:voucher.Id})
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
                              {
                                voucher.IsActive ? 
                                <button
                               className="bg-redborder rounded-lg p-2 text-nowrap"
                                onClick={(event) => {
                                  event.stopPropagation();
                                 // dispatch({ type: "edit" });
                                 // dispatch({type:"service", payload:service})
                                }}
                              >
                              De-Activate
                              </button> 
                              :  <button
                              className="bg-background rounded-lg p-2 text-nowrap"
                               onClick={(event) => {
                                 event.stopPropagation();
                                // dispatch({ type: "edit" });
                                // dispatch({type:"service", payload:service})
                               }}
                             >
                              Activate
                             </button>
                              }
                             
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {/* <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <Pagination
                  count={data?.dataList.TotalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  className="dark:text-gray-50 dark:bg-primary"
                />
              </nav> */}
            </div>
          </div>
        </section>
      </div>
    );
  };


export default AdminVoucher;
=======
=======



>>>>>>> eda1965 (User Dashboard and Landing Page)
const AdminVoucher = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-green-500 font-bold">
          {" "}
          Vouchers Coming soon ...{" "}
        </h1>
      </div>
    </div>
  );
};

<<<<<<< HEAD
        <div><h1 className="text-3xl text-green-500 font-bold"> Vouchers Coming soon ... </h1></div>

    </div> );
}
 
export default AdminVoucher;
>>>>>>> a2698f4 (Finishing touches on the admin portal)
=======
export default AdminVoucher;
>>>>>>> eda1965 (User Dashboard and Landing Page)
