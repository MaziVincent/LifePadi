import useUpdate from "../../../../hooks/useUpdate";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";
import SubmitButton from "../../subcomponents/SubmitButton";



const EditVendorCategoryModal = ({ open, handleClose, vendorCategory }) => {
  const queryClient = useQueryClient();
  const update = useUpdate();
  const { auth } = useAuth();
  const url = `${baseUrl}vendorcategory`;
  const [fileError, setFileError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const editService = async (data) => {
   
    const formData = new FormData()
    formData.append("Name",data.Name)
    formData.append("Description",data.Description)
    formData.append("Icon", data.Icon)
    
    const response = await update(`${url}/update/${data.Id}`, formData, auth?.accessToken);

    console.log(response.data);
  };

  const { mutate } = useMutation(editService, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendorcategories");
      reset();
      toast.success("Vendor Category Updated Successfully");
      handleClose({ type: "edit" });
    },
    onError:()=>{
      toast.error("Update Failed")
    }
  });

  const handleCategory = (category) => {
    if(category.Icon){
      category.Icon = category.Icon[0]
    }
    mutate(category);
    console.log(category)
  };

  useEffect(() => {
    Object.entries(vendorCategory).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [vendorCategory, setValue]);

  const handleChange = (event) => {
   
    const file = event.target.files[0];

    //console.log(file)
    
    if (!file || file.size > 50 * 1024) {
      setFileError(true);
    }else{
      setFileError(false)
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "edit" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-9   md:right-1/4 z-50 justify-center items-center  w-full md:w-2/4   h-modal md:h-full"
      >
        <Toaster />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-primary rounded-lg shadow dark:bg-darkMenu sm:p-5 dark:text-primary">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Category
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleClose({ type: "edit" });
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
            <form onSubmit={handleSubmit(handleCategory)}>
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
                    {...register("Name", )}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type name of Vendor Category"
                    required=""
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">
                      Name of Vendor Category is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-base font-medium  dark:text-gray-50"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
                    {...register("Description", )}
                    className="block p-2.5 w-full text-base text-grayTxt bg-graybg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write Vendor Category Descriptions here"
                  ></textarea>
                  {errors.description && (
                    <p className="text-sm text-red-400">
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
                    {...register("Icon",)}
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

              <SubmitButton isSubmitting={isSubmitting} name="Update Vendor Category" />
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditVendorCategoryModal;
