import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import { useQueryClient, useMutation } from "react-query";
import { useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";
import LoadingGif from "../../shared/LodingGif";


=======
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> 55ba6ae (Admin service)

const EditServiceModal = ({ open, handleClose, service }) => {
  const queryClient = useQueryClient();
  const update = useUpdate();
  const { auth } = useAuth();
  const url = `${baseUrl}service`;
  const [fileError, setFileError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
<<<<<<< HEAD
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const editService = async (data) => {
   
    const formData = new FormData()
    formData.append("Name",data.Name)
    formData.append("Description",data.Description)
    formData.append("IsActive",data.IsActive)
    
    if(data.ServiceIcon){
      formData.append("Image",data.ServiceIcon[0])
      const result = await update(`${url}/uploadImg/${data.Id}`, formData, auth?.accessToken)
   // console.log(result.data)
    }
    
    const response = await update(`${url}/update/${data.Id}`, formData, auth?.accessToken);

   // console.log(response.data);
=======
    formState: { errors },
  } = useForm({ mode: "all" });

  const editService = async (data) => {
    const response = await update(url, data, auth?.accessToken);

    console.log(response.data);
>>>>>>> 55ba6ae (Admin service)
  };

  const { mutate } = useMutation(editService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      reset();
      toast.success("Service Updated Successfully");
      handleClose({ type: "edit" });
    },
<<<<<<< HEAD
    onError:()=>{
      toast.error("Update Failed")
    }
=======
>>>>>>> 55ba6ae (Admin service)
  });

  const handleService = (service) => {
    mutate(service);
  };

  useEffect(() => {
    Object.entries(service).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [service, setValue]);

  const handleChange = (event) => {
   
    const file = event.target.files[0];

<<<<<<< HEAD
    //console.log(file)
    
    if (!file || file.size > 50 * 1024) {
      setFileError(true);
      
    }else{
      setFileError(false)
=======
    console.log(file)
    
    if (!file || file.size > 200 * 1024) {
      setFileError(true);
>>>>>>> 55ba6ae (Admin service)
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
<<<<<<< HEAD
        handleClose({ type: "edit" });
=======
        handleClose({ type: "open" });
>>>>>>> 55ba6ae (Admin service)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-9   md:right-1/4 z-50 justify-center items-center  w-full md:w-2/4   h-modal md:h-full"
      >
<<<<<<< HEAD
        <Toaster />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow bg-primary dark:text-primary dark:bg-darkMenu dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Service
=======
        <ToastContainer />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">
                Create Service
>>>>>>> 55ba6ae (Admin service)
              </h3>
              <button
                type="button"
                onClick={() => {
<<<<<<< HEAD
                  handleClose({ type: "edit" });
=======
                  handleClose({ type: "open" });
>>>>>>> 55ba6ae (Admin service)
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleSubmit(handleService)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
<<<<<<< HEAD
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
=======
                    className="block mb-2 text-base font-medium text-gray-800"
>>>>>>> 55ba6ae (Admin service)
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
<<<<<<< HEAD
                    {...register("Name", )}
                    className="bg-gray-50 border border-gray-300 text-grayTxt bg-graybg text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
=======
                    {...register("Name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
>>>>>>> 55ba6ae (Admin service)
                    placeholder="Type name of Service"
                    required=""
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">
                      Name of service is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
<<<<<<< HEAD
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-50"
=======
                    className="block mb-2 text-base font-medium text-gray-900"
>>>>>>> 55ba6ae (Admin service)
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
<<<<<<< HEAD
                    {...register("Description", )}
                    className="block p-2.5 w-full text-base text-grayTxt bg-graybg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
=======
                    {...register("Description", { required: true })}
                    className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
>>>>>>> 55ba6ae (Admin service)
                    placeholder="Write Service Descriptions here"
                  ></textarea>
                  {errors.description && (
                    <p className="text-sm text-red-400">
                      Description is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
<<<<<<< HEAD
                    htmlFor="status"
                    className="block mb-2 text-sm font-bold text-gray-900"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    {...register("IsActive", {
                      required: "Status is required",
                    })}
                    defaultValue={"default"}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-grayTxt"
                    >
                      Change Status
                    </option>
                    
                    <option value={true} >
                        Active
                      </option>
                      <option value={false} >
                        De-Activate
                      </option>
                  
                  </select>

                  {errors.IsActive && (
                    <span className="text-sm text-red-400">
                      {errors.IsActive.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="icon"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Service Icon (
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {" "}
                      Icon should not be above 50kb
=======
                    htmlFor="icon"
                    className="block mb-2 text-base font-medium text-gray-800"
                  >
                    Service Icon (
                    <span className="text-sm text-gray-500">
                      {" "}
                      Icon should not be above 200kb
>>>>>>> 55ba6ae (Admin service)
                    </span>
                    )
                  </label>
                  <input
                    type="file"
                    name="icon"
                    id="icon"
                    accept="image/*"
<<<<<<< HEAD
                    {...register("ServiceIcon", )}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type icon of diagnosis"
=======
                    {...register("IconUrl", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type icon of diagnosis"
                    required
>>>>>>> 55ba6ae (Admin service)
                    onChange={handleChange}
                  />
                  {errors.icon && (
                    <p className="text-sm text-red-400">
                      Service icon is required
                    </p>
                  )}
                  {fileError ?? (
                    <p className="text-sm text-red-400">
                      {" "}
<<<<<<< HEAD
                      File should not be above 50kb
=======
                      File should not be above 200kb
>>>>>>> 55ba6ae (Admin service)
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={fileError}
<<<<<<< HEAD
                className="inline-flex items-center text-background dark:text-gray-50 bg-primary-700 ring-2 hover:ring-background focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-darkHover dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6 text-green-600"
=======
                className="inline-flex items-center text-gray-700 bg-primary-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
>>>>>>> 55ba6ae (Admin service)
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
<<<<<<< HEAD
               {
                isSubmitting ? <LoadingGif /> : "Update Service"
               } 
=======
                Create New Service
>>>>>>> 55ba6ae (Admin service)
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditServiceModal;
