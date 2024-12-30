import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import toast, { Toaster } from "react-hot-toast";
import LoadingGif from "../../shared/LodingGif";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "react-query";
import baseUrl from "../../../api/baseUrl";
import useUpdate from "../../../hooks/useUpdate";
import { set } from "react-hook-form";

const CancelOrder = ({ open, handleClose, Id }) => {
  const { auth } = useAuth();
  const url = `${baseUrl}order/updateStatus/${Id}`;
  const queryClient = useQueryClient();
  const update = useUpdate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (_id) => {
    setLoading(true);
    const result = await update(
      `${url}?status=Cancelled`,
      { id: Id },
      auth.accessToken
    );
    if (result.error) {
      toast.error(`error cancelling Order, try again `);
      //handleClose({type:"deActivate"});
      setLoading(false);
      return;
    }
    toast.success(`Order Cancelled successfully`);
    queryClient.invalidateQueries(`orders`);
    setLoading(false);
    handleClose({ type: "cancel" });

    //
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose({ type: "cancel" });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto bg-lightGray dark:bg-darkBg">
        <Toaster />
        <div className="relative p-4 text-center bg-primary dark:bg-darkMenu text-primary  rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            onClick={() => handleClose({ type: "cancel" })}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
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
          <div className="flex justify-center my-5 ">
          <svg
            className="w-10 h-10 text-gray-800 dark:text-primary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clipRule="evenodd"
            />
          </svg>
          </div>

          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to Cancel Order?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              onClick={() => handleClose({ type: "cancel" })}
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-background dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, close
            </button>
            <button
              type="submit"
              onClick={() => handleDelete()}
              className="py-2 px-3 text-sm font-medium text-center text-white bg-redborder rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              {loading ? <LoadingGif /> : "Yes, I'm sure "}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CancelOrder;
