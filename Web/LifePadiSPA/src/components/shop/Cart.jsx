import {
  Add,
  BookmarkBorderOutlined,
  DeleteOutlined,
  InfoOutlined,
  Remove,
} from "@mui/icons-material";

const Cart = ({ cart }) => {
  return (
    <aside
      className={`fixed md:relative top-10 md:top-0 right-0  z-30 w-auto overflow-auto lg:w-58 h-full pb-10 dark:bg-darkMenu transition-transform  shadow-lg md:translate-x-0  dark:border-x-grayTxt ${
        cart ? "translate-x-0" : "-translate-x-full"
      } rounded-lg`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-10 px-2  flex flex-col   items-start justify-center  h-full bg-gray-50 dark:bg-gray-800">
        <div className=" stick -top-16 h-lvh p-4 overflow-auto">
          <div className=" flex justify-between items-center pb-4">
            <p className=" text-sm capitalize text-secondary">Lekki's global suya spot</p>
            
          </div>
          <div className=" border border-dashed border-gray rounded-lg">
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
                <span className=" text-xs text-accent">Suya spice</span>
                <span className=" text-gray text-xs">
                  &#8358;<span>10,000.00</span>
                </span>
              </p>
              <span className=" px-2 rounded-full bg-gray-200 flex items-center gap-2">
                <button className=" text-accent">
                  {" "}
                  <Remove fontSize="" />
                </button>
                <span className=" text-sm">1</span>
                <button className=" text-accent">
                  <Add fontSize="" />
                </button>
              </span>
            </div>
            <div className=" flex justify-between px-2 py-3">
              
              <button className=" border border-dashed border-gray px-2 rounded-full">
                <span className=" text-sm">Duplicate this pack</span>
              </button>
            </div>
          </div>

          <div className="py-4">
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
          <div className=" flex justify-between items-center border-y py-6 my-4">
            <div className=" flex items-center gap-2 bg-cyan-100 py-2 px-1 rounded">
              <div className="">
                <span className=" text-accent">
                  <InfoOutlined />
                </span>
              </div>
              <div className=" text-accent">
                <h1 className=" text-sm font-normal">
                  Delivery includes PIN confirmation
                </h1>
                <p className=" text-xs">
                  This helps ensure that your order is given to the right person
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>
                  Sub total<span>(1 item)</span>
                </span>
                <span className="">&#8358;12,000</span>
              </p>
            </div>
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Delivery fee</span>
                <span className="">&#8358;0.0</span>
              </p>
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
      </div>
    </aside>
  );
};

export default Cart;
