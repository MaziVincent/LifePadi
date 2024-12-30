import useCart from "../../hooks/useCart";
import { Modal } from "@mui/material";
import emptyCart from "../../assets/images/empty cart.svg"


const EmptyCart = () => {
    const { state, dispatch } = useCart();
    return ( 
        
        <Modal
        open={state.empty}
        onClose={() => {
          dispatch({type:"empty"});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <div
          id="defaultModal"
          className=" overflow-y-auto overflow-x-hidden absolute  top-20  z-50 justify-center items-center  w-full h-full pb-24 "
        >
            
            <div className=" p-4 w-full max-w-xl flex flex-col  overflow-y-auto  bg-primary dark:bg-darkBg rounded-xl dark:text-primary ">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t  sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-secondary dark:text-gray-50">
                  The cart is empty
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({type:"empty"});
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 border-2 border-gray rounded-full hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
             
              <div className=" w-full">
                The cart is empty 
                <img src={emptyCart} alt="" />
              
              </div>
              
            </div>
        </div>
        
      </Modal>
     );
}
 
export default EmptyCart;