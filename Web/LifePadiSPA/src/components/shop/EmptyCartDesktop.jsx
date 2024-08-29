import useCart from "../../hooks/useCart";
import { Modal } from "@mui/material";
import emptyCart from "../../assets/images/empty cart.svg"


const EmptyCartDesktop = () => {
    return (   
        
        <div
          id="defaultModal"
          className=" overflow-y-auto col-span-4 hidden lg:block overflow-x-hidden top-20  z-50 justify-center items-center  w-full h-full pb-24 "
        >     
            <div className=" p-4 w-full flex flex-col  overflow-y-auto  bg-primary dark:bg-darkBg rounded-xl dark:text-primary ">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t  sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-secondary dark:text-gray-50">
                  The cart is empty
                </h3>
              </div>
              {/* <!-- Modal body --> */}
             
              <div className=" w-full">
                The cart is empty 
                <img src={emptyCart} alt="" />
              
              </div>
              
            </div>
        </div>
     
     );
}
 
export default EmptyCartDesktop;