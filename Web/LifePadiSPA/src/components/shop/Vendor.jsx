import {
  Add,
  BookmarkBorderOutlined,
  Clear,
  DeleteOutlined,
  ExpandLessRounded,
  ExpandMoreRounded,
  InfoOutlined,
  Remove,
  StarOutlined,
  WatchLaterOutlined,
  WestRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Rice1 from "../../assets/images/rice.jpeg";

const Vendor = () => {
  const [select, setSelect] = useState(false);
  const [isSpice, setIsSpice] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  const toggleSelect = () => {
    setSelect(!select);
  };
  const toggleSpiceDiv = () => {
    setIsSpice(!isSpice);
  };
  const handleOrder = () => {
    setIsOrder(!isOrder);
  };
  const handleCancel = () => {
    if (setIsOrder !== isOrder) {
      setIsOrder(false);
    }
  };
  return (
    <div className=" w-full grid grid-cols-1 lg:grid-cols-3">
      <div className="relative col-span-2">
        <div className=" flex flex-col w-full justify-center gap-5 px-6 ">
         
            <div>
              <Link to="/store/restaurant" className="text-gray">
                <span>
                  <WestRounded fontSize="" />
                </span>
                <span className=" text-md">Vendors</span>
              </Link>
            </div>
            
              <div className=" border-2 relative z-0 w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" pb-1 absolute z-10 bottom-1 m-2 ">
                  <span className=" flex items-center gap-1 text-secondary bg-white py-2 px-2 rounded border bg-darkHover border-accent">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className="">16-26 mins</span>
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-xl font-bold">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-lightgreen">
                    <span className=" text-grayTxt">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>

                <div className=" flex flex-col  ">
                  
                  <span className=" text-gray text-md font-medium">
                    8:00 am - 10:00 pm
                  </span>
                  <span className=" capitalize text-secondary text-md font-medium">
                    meat
                  </span>
                </div>
              </div>
         
            <div className="pt-3 ">
              <div className=" flex justify-end items-center">
                
                <p className=" text-accent">
                  <span>
                    Min Order: <span>&#8358;2,000</span>
                  </span>
                </p>
              </div>
            </div>
            
              <div className=" flex justify-start gap-3 pt-3 text-center flex-nowrap overflow-x-scroll ">
                <Link className=" px-3 py-1 bg-secondary capitalize rounded-lg shadow-md">
                  All
                </Link>
                <Link className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md">
                  Jellof rice
                </Link>
                <Link className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md">
                  Pepper soup
                </Link>
                <Link className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md">
                  Pepper soup
                </Link>
                <Link className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md">
                  Pepper soup
                </Link>
                
              </div>
          
            <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link onClick={handleOrder}>
                <div className=" flex justify-between items-center border border-gray rounded-lg p-4 ">
                  <div className=" flex flex-col">
                    <h3 className=" text-base font-semibold capitalize">Suya Spice</h3>
                    <p className=" text-sm text-gray">Suya spice</p>
                    <span className=" text-secondary">&#8358;15,000</span>
                  </div>
                  <div className=" w-20 h-20 rounded-md">
                    <img
                      src={Rice1}
                      alt=""
                      className=" w-full h-full rounded-md"
                    />
                  </div>
                </div>
              </Link>
              <Link onClick={handleOrder}>
                <div className=" flex justify-between items-center border border-gray rounded-lg p-4 ">
                  <div className=" flex flex-col">
                    <h3 className=" text-base font-semibold capitalize">Suya Spice</h3>
                    <p className=" text-sm text-gray">Suya spice</p>
                    <span className=" text-secondary">&#8358;15,000</span>
                  </div>
                  <div className=" w-20 h-20">
                    <img
                      src={Rice1}
                      alt=""
                      className=" w-full h-full"
                    />
                  </div>
                </div>
              </Link>
              <Link onClick={handleOrder}>
                <div className=" flex justify-between items-center border border-gray rounded-lg p-4 ">
                  <div className=" flex flex-col">
                    <h3 className=" text-base font-semibold">Suya Spice</h3>
                    <p className=" text-sm text-gray">Suya spice</p>
                    <span className=" text-secondary">&#8358;15,000</span>
                  </div>
                  <div className=" w-20 h-20">
                    <img
                      src={Rice1}
                      alt=""
                      className=" w-full h-full"
                    />
                  </div>
                </div>
              </Link>
            </div>
          
          <div className=" hidden w-2/6 stick -top-16 h-lvh p-4 overflow-auto">
            <div className=" flex justify-between items-center pb-4">
              <p className=" text-sm text-secondary">
                Lekki's global suya spot
              </p>
              <button className=" py-1 px-3 rounded-full bg-background">
                <span className=" text-sm font-normal text-primary">
                  + Add another pack
                </span>
              </button>
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
                <button className=" border border-gray px-2 rounded-full">
                  <span className=" text-sm">+ Add to this pack</span>
                </button>
                <button className=" border border-dashed border-gray px-2 rounded-full">
                  <span className=" text-sm">Duplicate this pack</span>
                </button>
              </div>
            </div>
            <Link>
              <div className=" flex justify-between items-center border-y py-4 my-4">
                <div>
                  <input
                    type="radio"
                    className=" focus:bg-grayTxt cursor-pointer"
                  />
                </div>
              </div>
            </Link>
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
                    This helps ensure that your order is given to the right
                    person
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
                  <span className=" text-background text-sm">
                    Save for later
                  </span>
                </button>
              </div>
            </div>
          </div>
          
        </div>
        <div className="fixed bottom-10 md:hidden w-full px-5">
            <button className="flex justify-between w-full bg-background p-3 rounded-lg shadow-md">
              <span> Proceed to order 2 items</span>
              <span className="text-base">&#8358;30000 </span>
            </button>
          </div>
      </div>
     
        <div className=" hidden  w-full   overflow-y-auto  lg:flex justify-center ">

        <div className=' stick -top-16 h-lvh p-4 overflow-auto'>
            <div className=' flex justify-between items-center pb-4'>
                <p className=' text-sm text-secondary'>Lekki's global suya spot</p>
                <button className=' py-1 px-3 rounded-full bg-background'>
                    <span className=' text-sm font-normal text-primary'>+ Add another pack</span>
                </button>
            </div>
            <div className=' border border-dashed border-gray rounded-lg'>
                <div className=' flex justify-between items-center py-2 px-2'>
                    <div>
                        <h3 className=' text-sm font-medium'>Pack 1</h3>
                    </div>
                    <div>
                        <span className=' text-red'><DeleteOutlined /></span>
                    </div>
                </div>
                <div className=' flex justify-between items-center py-2 px-2'>
                    <p className=' flex flex-col items-center'>
                        <span className=' text-xs text-accent'>Suya spice</span>
                        <span className=' text-gray text-xs'>&#8358;<span>10,000.00</span></span>
                    </p>
                    <span className=' px-2 rounded-full bg-gray-200 flex items-center gap-2'>
                        <button className=' text-accent'> <Remove fontSize='' /></button>
                        <span className=' text-sm'>1</span>
                        <button className=' text-accent'><Add fontSize='' /></button>
                    </span>
                </div>
                <div className=' flex justify-between px-2 py-3'>
                    <button className=' border border-gray px-2 rounded-full'>
                        <span className=' text-sm'>+ Add to this pack</span>
                    </button>
                    <button className=' border border-dashed border-gray px-2 rounded-full'>
                        <span className=' text-sm'>Duplicate this pack</span>
                    </button>
                </div>
            </div>
            
            <div className='py-4'>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Payment Method</span>
                        <button className=' text-background'>Choose</button>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Promo code</span>
                        <button className=' text-background'>Choose</button>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Choose Address</span>
                        <button className=' text-background'>Change</button>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Delivery instructions</span>
                        <button className=' text-background'>Add</button>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Vendor instructions</span>
                        <button className=' text-background'>Add</button>
                    </p>
                </div>
            </div>
            <div className=' flex justify-between items-center border-y py-6 my-4'>
                <div className=' flex items-center gap-2 bg-cyan-100 py-2 px-1 rounded'>
                    <div className=''>
                        <span className=' text-accent'><InfoOutlined /></span>
                    </div>
                    <div className=' text-accent'>
                        <h1 className=' text-sm font-normal'>Delivery includes PIN confirmation</h1>
                        <p className=' text-xs'>This helps ensure that your order is given to the right person</p>
                    </div>
                </div>
            </div>
            <div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Sub total<span>(1 item)</span></span>
                        <span className=''>&#8358;12,000</span>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Delivery fee</span>
                        <span className=''>&#8358;0.0</span>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-normal'>
                        <span>Service fee</span>
                        <span className=''>&#8358;0.0</span>
                    </p>
                </div>
                <div className=' py-2'>
                    <p className=' flex justify-between items-center text-sm font-semibold'>
                        <span className=''>Total</span>
                        <span className=''>&#8358;12,000</span>
                    </p>
                </div>
                <div className=' pt-3 text-center w-full'>
                    <button className=' w-full bg-background py-4 px-3 rounded'>
                        <span className=' text-primary'>Place order</span>
                    </button>
                </div>
                <div className=' pt-3 text-center w-full'>
                    <button className=' w-full bg-redborder py-4 px-3 rounded'>
                        <span className=' text-red'>Clear order</span>
                    </button>
                </div>
                <div className=' w-full'>
                    <button className=' w-full py-2 px-3'>
                        <span className=' text-background'><BookmarkBorderOutlined fontSize=''  /></span>
                        <span className=' text-background text-sm'>Save for later</span>
                    </button>
                </div>
            </div>
        </div>
         
        </div>
    
    </div>
  );
};

export default Vendor;
