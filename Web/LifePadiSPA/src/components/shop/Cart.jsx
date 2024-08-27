import {
  Add,
  BookmarkBorderOutlined,
  DeleteOutlined,
  InfoOutlined,
  Remove,
} from "@mui/icons-material";
import { Modal } from "@mui/material";
import useCart from "../../hooks/useCart";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useQuery } from "react-query";
import useFetch from "../../hooks/useFetch";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import LoadingGif from "../shared/LodingGif";
import { useDistance } from "../../hooks/useDistance";

const Cart = ({
  vendor,
  subTotal,
  handleCartDecrement,
  handleCartIncrement,
  handleCartItemDelete,
  handleNewAddress,
  
  //distance,
  //handleDeliveryInstruction,
}) => {
  const { cartState, setCartState, cart, setCart, state, dispatch } = useCart();

  const { auth, login, setLogin, location } = useAuth();
  const [origin, setOrigin ] = useState("")
  const fetch = useFetch();
  const addressUrl = `${baseUrl}address/customer-addresses`;
  const getAddresses = async (url) => {
    const result = await fetch(url, auth.accessToken);
    dispatch({ type: "setAddresses", payload: result.data });
    //console.log(state.addresses);
    return result.data;
  };

  const {
    data: addresses,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(`${addressUrl}/${auth?.user.Id}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
    enabled: state.address,
  });

  const handleAddressChange = () => {
    if (!auth.user) {
      setCartState(false);
      setLogin(true);

      return;
    }

    getAddresses(`${baseUrl}address/customer-addresses/${auth?.user.Id}`);
    dispatch({ type: "address" });
  };

  

  const handleDeliveryFee = () => {
    
    if(distance == null || distance == 0){
      const deliveryFee = 1500;
      dispatch({type:'deliveryFee', payload:deliveryFee})
    }else{
    const deliveryFee = 1500 + (200 * (distance/1000))
    dispatch({type:'deliveryFee', payload:deliveryFee})
    }
  }

  const handleClick = async (e) => {
    console.log(e.target.value);
    dispatch({ type: "setAddress", payload: e.target.value });
    handleDeliveryFee();
    dispatch({type:"address"})
 
  };

  const handleLocation = () => {
    console.log(location)
    dispatch({ type: "setAddress", payload: location.address });
    handleDeliveryFee();
    console.log(state.deliveryAddress)
    dispatch({type:"address"})
  }

  const handleTotalAmount = () => {
    const totalAmount = subTotal + state.deliveryFee
    dispatch({type:'total', payload:totalAmount })

    
  }

  const handleDeliveryInstruction = (e) => {
    dispatch({type:'setInstruction', payload:e.target.value})
  }

  const clearCart = () => {
    setCart([])
    dispatch({type:'setInstruction', payload:""})
    setCartState(false)
    dispatch({type:'empty'})
  }


  useEffect(()=> {
    setOrigin( `${vendor?.ContactAddress}, ${vendor?.Town}, ${vendor?.City}, ${vendor?.State}`)
  }, [vendor ])

  const {distance, loading:disLoading } = useDistance(origin, state.deliveryAddress)
 useEffect(() => {
  handleTotalAmount();
 },[subTotal, distance, state.deliveryFee, cart])

  console.log(distance)
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
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t  sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-secondary dark:text-gray-50">
                {state.vendor?.Name}
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
            {cart?.map((item, index) => (
              <div
                key={item.Id}
                className=" border border-dashed border-gray rounded-lg w-full mb-3"
              >
                <div className=" flex justify-between items-center py-2 px-2">
                  <div>
                    <h3 className=" text-sm font-medium">{`Item ${
                      index + 1
                    }`}</h3>
                  </div>
                  <button onClick={() => handleCartItemDelete(item)}>
                    <span className=" text-red hover:text-redborder">
                      <DeleteOutlined />
                    </span>
                  </button>
                </div>
                <div className=" flex justify-between items-center py-2 px-2">
                  <p className=" flex flex-col items-start">
                    <span className=" text-sm">{item.Name}</span>
                    <span className=" text-gray text-xs">
                      &#8358;<span>{item.Price}</span>
                    </span>
                  </p>
                  <span className=" px-2 rounded-full bg-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => handleCartDecrement(item)}
                      className="shadow-md cursor-pointer rounded-lg px-1 "
                    >
                      {" "}
                      <Remove fontSize="" />
                    </button>
                    <span className=" text-md">{item.Quantity}</span>
                    <button
                      onClick={() => handleCartIncrement(item)}
                      className=" shadow-lg cursor-pointer rounded-lg px-1 "
                    >
                      <Add fontSize="" />
                    </button>
                  </span>
                </div>
                {/* <div className=" flex justify-between px-2 py-3">
                <button className=" border border-dashed border-gray px-2 rounded-full">
                  <span className=" text-sm">Duplicate this pack</span>
                </button>
              </div> */}
              </div>
            ))}
            <div className=" w-full">
              {/* <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Payment Method</span>
                <button className=" text-background">Choose</button>
              </p>
            </div> */}
              {/* <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Promo code</span>
                <button className=" text-background">Choose</button>
              </p>
            </div> */}
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Choose Address: {state.deliveryAddress} </span>
                  {state.address ? (
                    <button
                      onClick={() => dispatch({ type: "address" })}
                      className=" text-background cursor-pointer"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddressChange()}
                      className=" text-background cursor-pointer"
                    >
                      Change
                    </button>
                  )}
                </p>
              </div>
              <div
                className={`${
                  state.address ? "block" : "hidden"
                } border-2 rounded-lg border-graybg`}
              >
                {isLoading && (
                  <div className="flex justify-center items-center">
                    {" "}
                    <LoadingGif />{" "}
                  </div>
                )}
                <form>
                  {state.addresses.map((ad) => (
                    <div
                      key={ad.Id}
                      className=" flex gap-3 text-gray text-sm rounded-lg px-5 py-2"
                    >
                      {" "}
                      <input
                        type="radio"
                        name="address"
                        id={`address${ad.Id}`}
                        value={`${ad.Name}, ${ad.Town}, ${ad.City}`}
                        onChange={(e) => {
                          handleClick(e);
                          //handleDeliveryAddress(e)
                        }}
                      />
                      <label htmlFor={`address${ad.Id}`}>
                        {" "}
                        {ad.Name} {ad.Town}
                      </label>
                    </div>
                  ))}
                </form>

                <div className="text-sm flex justify-between px-2 py-2">
                <button
                    onClick={() => handleLocation()}
                    className="text-background border p-2 rounded-xl border-gray cursor-pointer"
                  >
                    {" "}
                    Use Current Location {" "}
                  </button>
                  <button
                    onClick={() => handleNewAddress({ type: "edit" })}
                    className="text-background border p-2 rounded-xl border-gray cursor-pointer"
                  >
                    {" "}
                    Add new Address{" "}
                  </button>
                </div>
              </div>
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Delivery instructions</span>
                  {state.instruction ? (
                    <button
                      onClick={() => dispatch({ type: "instruction" })}
                      className=" text-background"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch({ type: "instruction" })}
                      className=" text-background"
                    >
                      Add
                    </button>
                  )}
                </p>
                <div
                  className={`flex flex-col ${
                    state.instruction ? "block" : "hidden"
                  }`}
                >
                  <textarea
                    name="instructions"
                    id=""
                    //cols="30"
                    rows="3"
                    className="border rounded-lg border-gray bg-graybg p-3 "
                    placeholder="e.g  give it to the receptionist"
                    onChange={(e) => handleDeliveryInstruction(e)}
                  ></textarea>
                </div>
              </div>
              {/* <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Vendor instructions</span>
                <button className=" text-background">Add</button>
              </p>
            </div> */}
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
                    This helps ensure that your order is given to the right
                    person
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>
                    Sub total <span>({cart.length} item)</span>
                  </span>
                  <span className="">&#8358;{subTotal}</span>
                </p>
              </div>
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Delivery fee</span>
                  
                  {
                    disLoading && <span> distance loading... </span>
                  }
                  {
                    state.deliveryFee && <span className="">&#8358;{state.deliveryFee}</span>
                  }
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
                  <span className="">&#8358;{state.total}</span>
                </p>
              </div>
              <div className=" pt-3 text-center w-full">
                <button className=" w-full bg-background py-4 px-3 rounded">
                  <span className=" text-primary">Place Order</span>
                </button>
              </div>
              <div className=" pt-3 text-center w-full">
                <button onClick={clearCart} className=" w-full bg-redborder py-4 px-3 rounded">
                  <span className=" text-red">Clear Order</span>
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
    </Modal>
  );
};

export default Cart;
