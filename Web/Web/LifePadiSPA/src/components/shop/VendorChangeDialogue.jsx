import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import toast, { Toaster } from "react-hot-toast";
import useCart from "../../hooks/useCart";
// import useDeActivate from "../../../hooks/useDeactivate";
// import useAuth from "../../../hooks/useAuth";
// import { useQueryClient } from "react-query";

const VendorChangeDialogue = ({addToCart, product, vendor}) => {
 
    const {cart,setCart, state, dispatch }  = useCart();

    const handleVendorChange = () => {
        
        addToCart(product);
        dispatch({type:'vendor', payload:vendor})
        localStorage.setItem("currentVendor", JSON.stringify(vendor))
        dispatch({type:'vendorChange'});
    }

  return (
    <Dialog
      open={state.vendorChange}
      onClose={() => {
        dispatch({ type: "vendorChange" });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <Toaster />
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            onClick={() => dispatch({ type: "vendorChange" })}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
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
          
          <p className=" flex flex-col mb-4 text-gray-500 dark:text-gray-300 mt-10">
            <span className="text-lg font-bold"> Are you sure you want to switch to another Vendor?</span>
            <span> This action will remove your current cart items </span>
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              onClick={() => dispatch({ type: "vendorChange" })}
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="submit"
              onClick={() => handleVendorChange()}
              className="py-2 px-3 text-sm font-medium text-center text-white bg-background rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default VendorChangeDialogue;
