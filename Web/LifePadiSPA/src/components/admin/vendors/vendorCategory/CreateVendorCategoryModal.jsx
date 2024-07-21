import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from 'react-hot-toast'
import { useState } from "react";

const CreateVendorCategoryModal = ({ open, handleClose }) => {
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseUrl}vendorcategory/create`;
  const queryClient = useQueryClient();
  const [fileError, setFileError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const create = async (data) => {
    const formData = new FormData()

    for(const key in data){
      formData.append(key, data[key])
    }
    try{

    const response = await post(url, formData, auth?.accessToken);

    console.log(response.data)
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendorcategories");
      toast.success("Vendor Category Created Successfully");
      reset();
      handleClose({ type: "open" });
    },
    onError: (error) => {
      toast.error("Vendor Category Failed to Create ");
      console.log(error);
    },
  });

  const handleCreate = (data) => {
  //  console.log(data)
  const cat = {...data, Icon:data.Icon[0]}
    mutate(cat);
    console.log(cat)
  };
  const handleChange = (event) => {
   
    const file = event.target.files[0];

    //console.log(file)
    
    if (!file || file.size > 50 * 1024) {
      setFileError(true);
    }else{
      setFileError(false)
    }
  };

  // console.log(data)
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "open" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-9   md:right-1/4 z-50 justify-center items-center  w-full md:w-2/4   h-modal md:h-full "
      >
        <Toaster />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-primary dark:text-primary rounded-lg shadow dark:bg-darkMenu dark:text-gray-50 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Create Vendor Category
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleClose({ type: "open" });
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
            <form onSubmit={handleSubmit(handleCreate)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("Name", { required: true })}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type name of Category"
                    required=""
                  />
                  {errors.Name && (
                    <p className="text-sm text-red">
                      Name of Vendor Category is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-50"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
                    {...register("Description", { required: true })}
                    className="block p-2.5 w-full text-base text-grayTxt bg-graybg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write Vendor Category Descriptions here"
                  ></textarea>
                  {errors.Description && (
                    <p className="text-sm text-red">
                      Description is required
                    </p>
                  )}
                  
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="icon"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Category Icon (
                    <span className="text-sm text-gray-500">
                      {" "}
                      Icon should not be above 50kb
                    </span>
                    )
                  </label>
                  <input
                    type="file"
                    name="icon"
                    id="icon"
                    accept="image/*"
                    {...register("Icon", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Upload Category Icon"
                    required
                    onChange={handleChange}
                  />
                  {errors.Icon && (
                    <p className="text-sm text-red">
                      Category icon is required
                    </p>
                  )}
                  {fileError && (
                    <p className="text-sm text-red">
                      {" "}
                      File should not be above 50kb
                    </p>
                  )}
                </div>

                 
              </div>
              <button
                  type="submit"
                  className={`inline-flex items-center text-background dark:text-gray-50 bg-primary-700 ring-2 hover:ring-background focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-darkHover dark:focus:ring-primary-800`}
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
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
                  {isSubmitting ? "Creating..." : "Create New Vendor Category"}
                  
                </button>
                
            
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateVendorCategoryModal;
