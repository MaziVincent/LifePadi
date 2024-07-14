import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const OrderStatusModal = ({ open, handleClose,url, id, name }) => {
  const update = useUpdate();
  const { auth } = useAuth();
  const URI = `${url}/updateStatus/${id}`;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const create = async (data) => {
    const response = await update(`${URI}?status=${data.Status}`, data, auth?.accessToken);
    console.log(response);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${name}`);
      toast.success("Status Updated Successfully");
      reset();
      handleClose({ type: "edit" });
    },
  });

  const handleStatus = (data) => {
     console.log(data)
    mutate(data);
  };

  // console.log(data)
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
              <h3 className="text-lg font-semibold text-gray-900 capitalize dark:text-gray-50">
                {`Update ${name} Status`}
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
            <form onSubmit={handleSubmit(handleStatus)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="rider"
                      className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                    >
                      Select Status
                    </label>
                    <select
                      id="Status"
                      name="Status"
                      {...register("Status", {
                        required: "Status is required",
                      })}
                      defaultValue={"default"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option
                        disabled
                        value="default"
                        className="text-gray-600"
                      >
                        Select Status
                      </option>
                        <option
                          value="Pending"
                        >
                          Pending
                        </option>
                        <option
                          value="Ongoing"
                        >
                          Ongoing
                        </option>
                        <option
                          value="Completed"
                        >
                          Completed
                        </option>
                     
                    </select>

                    {errors.Status && (
                      <span className="text-sm text-red-400">
                        {errors.Status.message}
                      </span>
                    )}
                  </div>
                </div>
              <button
                type="submit"
                disabled={isSubmitting }
                className={`inline-flex items-center ${
                  isSubmitting || !isValid ? "text-gray-700" : "text-green-700"
                } dark:text-gray-50 bg-primary-700 hover:bg-gray-200 focus:ring-4 capitalize focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
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
                {`Update ${name} Status`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderStatusModal;
