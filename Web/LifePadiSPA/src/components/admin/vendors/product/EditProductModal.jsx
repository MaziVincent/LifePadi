<<<<<<< HEAD
import useUpdate from "../../../../hooks/useUpdate";
import useFetch from "../../../../hooks/useFetch";
=======

import useUpdate from "../../../../hooks/useUpdate";
>>>>>>> a0030da (vendor and product commit)
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
<<<<<<< HEAD
import LoadingGif from "../../../shared/LodingGif";

const EditProductModal = ({ open, handleClose, product, vendorId }) => {
  const update = useUpdate();
  const fetch = useFetch();
=======


const EditProductModal = ({open, handleClose, product, vendorId}) => {
  const update = useUpdate();
>>>>>>> a0030da (vendor and product commit)
  const { auth } = useAuth();
  const url = `${baseUrl}product`;
  const queryClient = useQueryClient();
  const [fileError, setFileError] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const getCategories = async (url) => {
    const res = await fetch(url, auth.accessToken);

    return res.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["categories"],
<<<<<<< HEAD
    queryFn: () => getCategories(`${baseUrl}category/allLite`),
=======
    queryFn: () => getCategories(`${baseUrl}category/all?PageSize=10`),
>>>>>>> a0030da (vendor and product commit)
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

<<<<<<< HEAD
//   

  //console.log(product)
  const updateRider = async (data) => {
    const formData = new FormData();
=======
  const updateRider = async (data) => {
    const formData = new FormData();
    if (file) {
      data = { ...data, Image: file };
      console.log(data);
    }
>>>>>>> a0030da (vendor and product commit)
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await update(
      `${url}/update/${product.Id}`,
      formData,
      auth?.accessToken
    );
    console.log(response.data);
  };

  const { mutate } = useMutation(updateRider, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendor");
      toast.success("Product Updated Successfully");
      handleClose({ type: "edit" });
      reset();
    },
  });

  const handleUpdate = (prod) => {
<<<<<<< HEAD
    
    mutate(prod);
  };

  useEffect(() => {
    if (product) {
      Object.entries(product).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [product, setValue]);

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
        className=" overflow-y-auto overflow-x-hidden absolute top-9   md:right-1/4 z-50 justify-center items-center  w-full md:w-2/4   h-modal md:h-full "
      >
        <Toaster />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-primary rounded-lg shadow dark:bg-gray-800 dark:text-gray-50 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Update Product
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
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type name of Product"
                    required=""
                  />
                  {errors.Name && (
                    <p className="text-sm text-red-400">
                      Name of product is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    {...register("Tag", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type tag of Product"
                    required=""
                  />
                  {errors.Tag && (
                    <p className="text-sm text-red-400">
                      Tag of product is required
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
                    className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write Product Descriptions here"
                  ></textarea>
                  {errors.Description && (
                    <p className="text-sm text-red-400">
                      Description is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    {...register("Price", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type price of Product"
                    required=""
                  />
                  {errors.Price && (
                    <p className="text-sm text-red-400">Price is required</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Product Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    {...register("CategoryId", {
                      required: "Category is required",
                    })}
                    defaultValue={"default"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                    >
                      Select Category
                    </option>
                    {isError && <option> Error Loading Category </option>}
                    {isLoading && <option> Loading Category... </option>}

                    {data?.map((category) => (
                      <option
                        key={category.Id}
                        value={category.Id}
                      >
                        {category.Name}
                      </option>
                    ))}
                  </select>

                  {errors.CategoryId && (
                    <span className="text-sm text-red-400">
                      {errors.CategoryId.message}
                    </span>
                  )}
                </div>

                
              </div>
              <button
                type="submit"
                disabled={ !isValid || isSubmitting}
                className={`inline-flex items-center ${
                  isSubmitting ? "text-graybg" : "text-background"
                } dark:text-gray-50 bg-primary-700 hover:bg-graybg focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
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
                {isSubmitting ? <LoadingGif /> : " Update Product" }
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
=======
    //  console.log(data)
    mutate(prod);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    //console.log(file)
    if (!file || file.size > 200 * 1024) {
      setFileError(true);
      setFile(null);
    } else {
      setFile(file);
      setFileError(false);
    }
  };

  useEffect(() => {
    Object.entries(product).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [product, setValue]);

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
          className=" overflow-y-auto overflow-x-hidden absolute top-9   md:right-1/4 z-50 justify-center items-center  w-full md:w-2/4   h-modal md:h-full "
        >
          <Toaster />
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-50 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Create Product
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
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type name of Product"
                      required=""
                    />
                    {errors.Name && (
                      <p className="text-sm text-red-400">
                        Name of product is required
                      </p>
                    )}
                  </div>
  
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="tag"
                      className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                    >
                      Tag
                    </label>
                    <input
                      type="text"
                      name="tag"
                      id="tag"
                      {...register("Tag", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type tag of Product"
                      required=""
                    />
                    {errors.Tag && (
                      <p className="text-sm text-red-400">
                        Tag of product is required
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
                      className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write Service Descriptions here"
                    ></textarea>
                    {errors.Description && (
                      <p className="text-sm text-red-400">
                        Description is required
                      </p>
                    )}
                  </div>
  
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      {...register("Price", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type price of Product"
                      required=""
                    />
                    {errors.Price && (
                      <p className="text-sm text-red-400">
                        Price is required
                      </p>
                    )}
                  </div>
  
  
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                    >
                      Product Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      {...register("CategoryId", {
                        required: "Category is required",
                      })}
                      defaultValue={"default"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option
                        disabled
                        value="default"
                        className="text-gray-600"
                      >
                        Select Category
                      </option>
                      {isError && <option> Error Loading Category </option>}
                      {isLoading && <option> Loading Category... </option>}
  
                      {data?.map((category) => (
                        <option
                          key={category.Id}
                          value={category.Id}
                        >
                          {category.Name}
                        </option>
                      ))}
                    </select>
  
                    {errors.CategoryId && (
                      <span className="text-sm text-red-400">
                        {errors.CategoryId.message}
                      </span>
                    )}
                  </div>
  
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="icon"
                      className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                    >
                      Product Image (
                      <span className="text-sm text-gray-500">
                        {" "}
                        Image should not be above 200kb
                      </span>
                      )
                    </label>
                    <input
                      type="file"
                      name="icon"
                      id="icon"
                      accept="image/*"
                      {...register("Image", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Upload Product Image"
                      required
                      onChange={handleFile}
                    />
                    {errors.icon && (
                      <p className="text-sm text-red-400">
                        Product Image is required
                      </p>
                    )}
                    {fileError && (
                      <p className="text-sm text-red-400">
                        {" "}
                        File should not be above 200kb
                      </p>
                    )}
                  </div>
  
  
                </div>
                <button
                  type="submit"
                  disabled={fileError || !isValid || isSubmitting}
                  className={`inline-flex items-center ${
                    fileError ? "text-gray-700" : "text-green-700" 
                  } dark:text-gray-50 bg-primary-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
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
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
     );
}
 
export default EditProductModal;
>>>>>>> a0030da (vendor and product commit)
