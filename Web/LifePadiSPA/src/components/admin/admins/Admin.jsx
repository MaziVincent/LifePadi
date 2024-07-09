<<<<<<< HEAD

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

const Admin = () => {

    const fetch = useFetch();
    const { auth } = useAuth();
    const url = `${baseUrl}customer`;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    // const activate = useActivate();
    const queryClient = useQueryClient();
  
    const getRiders = async (url) => {
      const result = await fetch(url, auth.accessToken);
  
      return result.data;
    };
  
    // const { data, isError, isLoading, isSuccess } = useQuery({
    //   queryKey: ["riders", page, search],
    //   queryFn: () =>
    //     getRiders(`${url}/all?PageNumber=${page}&SearchString=${search}`),
    //   keepPreviousData: true,
    //   staleTime: 20000,
    //   refetchOnMount: "always",
    // });
  
    // console.log(data);
  
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
                  {/* {data?.dataList.TotalCount || 0} */} 0
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  Admins
                </dd>
              </div>
            </dl>
          </div>
        </section>
  
        <section className="bg-white dark:bg-gray-900">
          <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
           No Admins  {" "}
          </h2>
        </section>
        
        </div>
        
    );
}
 
export default Admin;
=======
const AdminCategory = () => {
    return ( <div>
        Admins 
    </div> );
}
 
export default AdminCategory;
>>>>>>> a2698f4 (Finishing touches on the admin portal)
