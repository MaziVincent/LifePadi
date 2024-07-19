// import usePost from "../../../hooks/usePost";
// import useAuth from "../../../hooks/useAuth";
// import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from 'react-hot-toast'
import { useState } from "react";

const ProductModal = ({ open, handleClose }) => {
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseUrl}category/create`;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const create = async (data) => {
    const formData = new FormData()

    for(const key in data){
      formData.append(key, data[key])
    }
    const response = await post(url, formData, auth?.accessToken);
    //console.log(response);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("Category Created Successfully");
      reset();
      handleClose({ type: "open" });
    },
  });

  const handleCreate = (category) => {
  //  console.log(data)
    mutate(category);
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
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-50 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Create Category
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
            <div className=" hidden z-40 bg-accent bg-opacity-50 w-full top-0 h-svh bg-cover overflow-y-auto overflow-x-hidden lg:flex justify-center pb-8">
          <div className=" relative bg-primary z-10 p-4 rounded-2xl h-lvh mt-16">
            <div className=" absolute right-5 top-5">
              <span
                onClick={handleCancel}
                className=" bg-primary border border-grayTxt rounded-full flex justify-center items-center p-3 text-accent hover:text-red cursor-pointer"
              >
                <Clear fontSize="" />
              </span>
            </div>
            <div className=" w-full h-full">
              <div className=" w-full h-72">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full h-full rounded-md    "
                />
              </div>
              <div className=" flex justify-between py-3">
                <h2 className=" flex flex-col">
                  <span className=" text-xl font-normal text-background">
                    Rice and chicken
                  </span>
                  <span className=" text-xl text-grayTxt font-light">
                    Rice, Stew and Chicken
                  </span>
                </h2>
                <span className=" text-secondary font-medium">
                  &#8358;6,500
                </span>
              </div>
              <div>
                <Link className="">
                  <div
                    onClick={toggleSpiceDiv}
                    className=" flex justify-between items-center bg-graybg p-2"
                  >
                    <span className=" flex gap-4 items-center">
                      <span className=" font-medium text-base text-background">
                        Spice
                      </span>
                      <span className=" text-red border border-redborder rounded-full px-2 text-xs">
                        required
                      </span>
                    </span>
                    <span className=" border-2 rounded-full border-background h-4 w-4 flex justify-center items-center">
                     
                        <span
                          onClick={toggleSpiceDiv}
                          className=" flex items-center"
                        >
                          <ExpandMoreRounded fontSize="" />
                        </span>
                      
                        {/* <span
                          onClick={toggleSpiceDiv}
                          className=" flex items-center"
                        >
                          <ExpandLessRounded fontSize="" />
                          {isSpice}
                        </span> */}
                      
                    </span>
                  </div>
                  {isSpice && (
                    <div className="">
                      <span className=" uppercase text-gray-500 text-xs py-2">
                        Select1
                      </span>
                      <div className=" flex justify-between py-2 pr-2">
                        <span className=" flex flex-col">
                          <span className=" text-base font-normal text-grayTxt">
                            Very Spicy
                          </span>
                          <span className=" text-gray">+&#8358;200</span>
                        </span>
                        <div
                          onClick={toggleSelect}
                          className=" flex justify-center items-center border border-secondary hover:border-background w-5 h-5 rounded-full cursor-pointer"
                        >
                          {select && (
                            <div className=" bg-secondary w-3 h-3 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
                <div className=" flex gap-4 w-full pt-2">
                  <span className=" w-1/4 rounded bg-primary border justify-center py-3 flex gap-4">
                    <button className=" text-background">
                      {" "}
                      <Remove />
                    </button>
                    <span className=" text-lg text-background">1</span>
                    <button className=" text-background">
                      <Add />
                    </button>
                  </span>
                  <button className=" bg-secondary rounded text-2xl w-4/5">
                    <span className="">
                      Add <span>1</span> item to my order
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
