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
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import UploadImageModal from "../../subcomponents/UploadImageModal";


const reducer = (state, action) => {
    switch (action.type) {
      case "activate":
        return { ...state, activate: !state.activate };
      case "delete":
        return { ...state, delete: !state.delete };
      case "upload":
        return { ...state, upload: !state.upload };
  
      default:
        throw new Error();
    }
  };


const AdminProduct = () => {

    const [state, dispatch] = useReducer(reducer, {
        activate: false,
        delete: false,
        upload: false
      });

  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}product`;
  const navigate = useNavigate();
  const { id } = useParams();
  // const activate = useActivate();
  const queryClient = useQueryClient();

  const getService = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => getService(`${url}/get/${id}`),
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });
  //console.log(data);

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <section className="bg-white dark:bg-gray-900 mb-5 flex flex-col gap-3">
        <div className="flex justify-start p-3 w-full">
          {" "}
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/admin/vendorcategory"
<<<<<<< HEAD
              className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
=======
              className="hover:border-b-2 hover:border-b-green-700"
>>>>>>> 4dc5d34 (worked on product component)
            >
              Category
            </Link>

            <Link
              to={`/admin/vendor/${data?.VendorId}`}
              aria-current="page"
<<<<<<< HEAD
              className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
=======
              className="hover:border-b-2 hover:border-b-green-700"
>>>>>>> 4dc5d34 (worked on product component)
            >
              Vendor
            </Link>

            <Link
              to="#"
              aria-current="page"
<<<<<<< HEAD
              className="hover:border-b-2 hover:border-b-secondary dark:text-primary"
=======
              className="hover:border-b-2 hover:border-b-green-700"
>>>>>>> 4dc5d34 (worked on product component)
            >
              {data?.Name}
            </Link>
          </Breadcrumbs>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full flex items-center justify-center border-4 w-28">
                <img
                  src={data?.ProductImgUrl}
                  className="w-full rounded-full"
                />
              </div>
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

<<<<<<< HEAD
<<<<<<< HEAD
      <section className="bg-white dark:bg-gray-900 flex flex-col md:flex-row py-6 justify-evenly items-center ">
        <div>
          {" "}
          <button className={`shadow-lg p-3 rounded-xl ${data?.Status?'bg-redborder': 'bg-background'} font-bold cursor-pointer`}>
=======
      <section className="bg-white dark:bg-gray-900 flex justify-evenly items-center">
=======
      <section className="bg-white dark:bg-gray-900 flex flex-col md:flex-row py-6 justify-evenly items-center ">
>>>>>>> a2698f4 (Finishing touches on the admin portal)
        <div>
          {" "}
          <button className={`shadow-lg p-3 rounded-xl ${data?.Status?'bg-red-400': 'bg-green-400'} font-bold cursor-pointer`}>
>>>>>>> 4dc5d34 (worked on product component)
            {data?.Status ? 'De-activate' : 'Activate'}
          </button>
        </div>
        <h2 className="text-center text-4xl p-4 font-bold text-gray-900 dark:text-gray-50 ">
          Price - {data?.Price ? data?.Price : 0}
        </h2>
        <div>
          {" "}
<<<<<<< HEAD
          <button onClick={() => dispatch({type:'upload'})} className="shadow-lg p-3 rounded-xl bg-blue font-bold cursor-pointer">Upload Image</button>
=======
          <button onClick={() => dispatch({type:'upload'})} className="shadow-lg p-3 rounded-xl bg-blue-400 font-bold cursor-pointer">Upload Image</button>
>>>>>>> 4dc5d34 (worked on product component)
        </div>
      </section>
      <UploadImageModal
        open={state.upload}
        handleClose={dispatch}
        id={data?.Id}
        url={`${baseUrl}product`}
        name={'product'}
      />
    </div>
  );
};

export default AdminProduct;
