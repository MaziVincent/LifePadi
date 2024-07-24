import {
  Add,
  BookmarkBorderOutlined,
  DeleteOutlined,
  InfoOutlined,
  Remove,
} from "@mui/icons-material";
import { Modal } from "@mui/material";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const { cartState, setCartState } = useCart();
  return (
    <Modal
      open={cartState}
      onClose={() => {
        setCartState(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-20  z-50 justify-center items-center  w-full h-full pb-24 "
      >
        <div className=" p-4 w-full max-w-xl flex flex-col  overflow-y-auto  bg-primary ">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Create Service
              </h3>
              <button
                type="button"
                onClick={() => {
                  setCartState(false);
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
            <div className=" border border-dashed border-gray rounded-lg w-full">
            <div className=" flex justify-between items-center py-2 px-2">
              <div>
                <h3 className=" text-sm font-medium">Pack 1</h3>
              </div>
              <div>
                <span className=" text-red">
                  <DeleteOutlined />
                </span>
              </div>
            </div>
            <div className=" flex justify-between items-center py-2 px-2">
              <p className=" flex flex-col items-center">
                <span className=" text-sm">Suya spice</span>
                <span className=" text-gray text-xs">
                  &#8358;<span>10,000.00</span>
                </span>
              </p>
              <span className=" px-2 rounded-full bg-gray-200 flex items-center gap-2">
                <span className=" ">
                  {" "}
                  <Remove fontSize="" />
                </span>
                <span className=" text-md">1</span>
                <span className=" ">
                  <Add fontSize="" />
                </span>
              </span>
            </div>
            <div className=" flex justify-between px-2 py-3">
              <button className=" border border-dashed border-gray px-2 rounded-full">
                <span className=" text-sm">Duplicate this pack</span>
              </button>
            </div>
          </div>
          <div className=" border border-dashed border-gray rounded-lg w-full">
            <div className=" flex justify-between items-center py-2 px-2">
              <div>
                <h3 className=" text-sm font-medium">Pack 1</h3>
              </div>
              <div>
                <span className=" text-red">
                  <DeleteOutlined />
                </span>
              </div>
            </div>
            <div className=" flex justify-between items-center py-2 px-2">
              <p className=" flex flex-col items-center">
                <span className=" text-sm">Suya spice</span>
                <span className=" text-gray text-xs">
                  &#8358;<span>10,000.00</span>
                </span>
              </p>
              <span className=" px-2 rounded-full bg-gray-200 flex items-center gap-2">
                <span className=" ">
                  {" "}
                  <Remove fontSize="" />
                </span>
                <span className=" text-md">1</span>
                <span className=" ">
                  <Add fontSize="" />
                </span>
              </span>
            </div>
            <div className=" flex justify-between px-2 py-3">
              <button className=" border border-dashed border-gray px-2 rounded-full">
                <span className=" text-sm">Duplicate this pack</span>
              </button>
            </div>
          </div>
            <div className=" w-full">
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Payment Method</span>
                <button className=" text-background">Choose</button>
              </p>
            </div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Promo code</span>
                <button className=" text-background">Choose</button>
              </p>
            </div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Choose Address</span>
                <button className=" text-background">Change</button>
              </p>
            </div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Delivery instructions</span>
                <button className=" text-background">Add</button>
              </p>
            </div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Vendor instructions</span>
                <button className=" text-background">Add</button>
              </p>
            </div>
          </div>
          <div className=" flex justify-between items-center border-y ">
            <div className=" flex items-center gap-2 bg-cyan-100 py-2 px-1 rounded">
              <div className="">
                <span className=" text-yellow">
                  <InfoOutlined />
                </span>
              </div>
              <div className=" text-gray">
                <h1 className=" text-sm font-normal">
                  Delivery includes PIN confirmation
                </h1>
                <p className=" text-xs">
                  This helps ensure that your order is given to the right person
                </p>
              </div>
            </div>
          </div>
          <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Service fee</span>
                <span className="">&#8358;0.0</span>
              </p>
            </div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-semibold">
                <span className="">Total</span>
                <span className="">&#8358;12,000</span>
              </p>
            </div>
            <div className=" pt-3 text-center w-full">
              <button className=" w-full bg-background py-4 px-3 rounded">
                <span className=" text-primary">Place order</span>
              </button>
            </div>
            <div className=" pt-3 text-center w-full">
              <button className=" w-full bg-redborder py-4 px-3 rounded">
                <span className=" text-red">Clear order</span>
              </button>
            </div>
            <div className=" w-full">
              <button className=" w-full py-2 px-3">
                <span className=" text-background">
                  <BookmarkBorderOutlined fontSize="" />
                </span>
                <span className=" text-background text-sm">Save for later</span>
              </button>
            </div>
        </div>
        

      </div>
      
    </Modal>
  );
};

export default Cart;
