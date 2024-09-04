import {
  Add,
  BookmarkBorderOutlined,
  Clear,
  DeleteOutlined,
  InfoOutlined,
  Remove,
  StarOutlined,
  WatchLaterOutlined,
  WestRounded,
} from "@mui/icons-material";
import { useState, useReducer, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cart from "./Cart";
import EmptyCart from "./EmptyCart";
import useCart from "../../hooks/useCart";
import ProductModal from "./ProductModal";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import baseUrl from "../../api/baseUrl";
import { useQuery } from "react-query";
import AddAddressModal from "./AddAddressModal";
<<<<<<< HEAD
<<<<<<< HEAD
import LoadingGif from "../shared/LodingGif";
import { useDistance } from "../../hooks/useDistance";
import EmptyCartDesktop from "./EmptyCartDesktop";
import usePost from "../../hooks/usePost";
<<<<<<< HEAD
import { addAddressToDb } from "./services/services";
import VendorSkeleton from "../shared/VendorSkeleton";
import ProductSkeleton from "../shared/ProductSkeleton";
import useUpdate from "../../hooks/useUpdate";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Alert } from "@mui/material";
=======
>>>>>>> 38d66ec (Order and Order Items)
=======
import LoadingGif from "../shared/LodingGif";
=======
import { addAddressToDb} from "./services/services"
>>>>>>> e848b7b (Payment Response)

<<<<<<< HEAD
>>>>>>> 360c46c (vendor)

=======
>>>>>>> 3f80dfc (latest commit)
const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, open: !state.open };
    case "edit":
      return { ...state, edit: !state.edit };
    case "loading":
      return { ...state, loading: !state.loading };
    case "error":
      return { ...state, error: action.payload };
    case "products":
      return { ...state, products: action.payload };
    case "productCategories":
      return { ...state, productCategories: action.payload };
    case "product":
      return { ...state, product: action.payload };
    case "subTotal":
      return { ...state, subTotal: action.payload };

    case "newAddress":
      return { ...state, newAddress: !state.newAddress };

    default:
      throw new Error();
  }
};

const Vendor = () => {
  const { id } = useParams();
  const fetch = useFetch();
  const post = usePost();
<<<<<<< HEAD
  const update = useUpdate();
=======
>>>>>>> 3f80dfc (latest commit)
  const [products, setProducts] = useState(null);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e848b7b (Payment Response)
  const [origin, setOrigin] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const { auth, setLogin, location } = useAuth();
<<<<<<< HEAD
  const url = `${baseUrl}vendor`;
<<<<<<< HEAD
  const addressUrl = `${baseUrl}address/`;
  const orderUrl = `${baseUrl}order/create`;
  const orderItemUrl = `${baseUrl}orderitem/create`;
  const navigate = useNavigate();

  const {
    cart,
    setCart,
    setCartState,
    state: cartState,
    dispatch: cartDispatch,
  } = useCart();
=======
  const { cart, setCart, deliveryAddress, setDeliveryAddress, deliveryInstruction, setDeliveryInstruction } = useCart();
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
  const {auth, setLogin} = useAuth();
  const url = `${baseUrl}vendor`;
  const addressUrl = `${baseUrl}address/customer-addresses`;

  const { cart, setCart, setCartState, state: cartState, dispatch: cartDispatch } = useCart();
>>>>>>> 38d66ec (Order and Order Items)
=======
  const url = `${baseUrl}vendor`;
  const addressUrl = `${baseUrl}address/`;
  const orderUrl = `${baseUrl}order/create`;
  const orderItemUrl = `${baseUrl}orderitem/create`;

  const {
    cart,
    setCart,
    setCartState,
    state: cartState,
    dispatch: cartDispatch,
  } = useCart();
>>>>>>> 3f80dfc (latest commit)

  const [state, dispatch] = useReducer(reducer, {
    open: false,
    edit: false,
    error: "",
    products: [],
    productCategories: [],
    product: {},
    subTotal: 0,
    newAddress: false,
<<<<<<< HEAD
    loading: false,
=======
>>>>>>> 38d66ec (Order and Order Items)
  });

  const getVendor = async (url) => {
    const response = await fetch(url, auth.accessToken);

    dispatch({ type: "products", payload: response.data.Products });

    return response.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => getVendor(`${url}/get/${id}`),
    //keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

  //console.log(data)

  const getProductCategory = useCallback(async () => {
    try {
      const result = await fetch(
        `${baseUrl}category/vendorProductCategories/${id}`
      );
      setProducts(result);
      dispatch({ type: "productCategories", payload: result.data });
    } catch (error) {
      console.error("Error fetching product categories:", error);
      dispatch({
        type: "error",
        payload: "Error fetching products. Please try again later.",
      });
    }
  }, [baseUrl]);

<<<<<<< HEAD
  //console.log(state.productCategories)

  const getAddresses = async (url) => {
    const result = await fetch(url, auth.accessToken);
    cartDispatch({ type: "setAddresses", payload: result.data });
=======
  const getAddresses = async (url) => {
    const result = await fetch(url, auth.accessToken);
    dispatch({ type: "setAddresses", payload: result.data });
>>>>>>> 360c46c (vendor)
    //console.log(state.addresses);
    return result.data;
  };

  const {
    data: addresses,
<<<<<<< HEAD
<<<<<<< HEAD
    isError: addressError,
    isLoading: loadingAddress,
    isSuccess: addressSuccess,
  } = useQuery({
    queryKey: ["addresses"],
<<<<<<< HEAD
    queryFn: () => getAddresses(`${addressUrl}customer-addresses/${auth?.Id}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
    enabled: cartState.address,
=======
    isError:addressError,
    isLoading:loadingAddress,
    isSuccess:addressSuccess,
=======
    isError: addressError,
    isLoading: loadingAddress,
    isSuccess: addressSuccess,
>>>>>>> 3f80dfc (latest commit)
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(`${addressUrl}/${auth?.user.Id}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
    enabled: state.address,
>>>>>>> 360c46c (vendor)
=======
    queryFn: () => getAddresses(`${addressUrl}customer-addresses/${auth?.user?.Id}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
    enabled: cartState.address,
>>>>>>> e848b7b (Payment Response)
  });

  const calculateTotalAmount = () => {
    if (cart) {
      const total = cart.reduce((total, item) => {
        return total + item.Amount;
      }, 0);

      dispatch({ type: "subTotal", payload: total });
      cartDispatch({ type: "amount", payload: total });
    }

    return;
  };

  const handleCartIncrement = (item) => {
    setCart(
      cart.map((prod) =>
        prod.Id === item.Id
          ? {
              ...prod,
              Quantity: prod.Quantity + 1,
              Amount: (item.Quantity + 1) * item.Price,
            }
          : prod
      )
    );

    calculateTotalAmount();

    // console.log(item);
  };

  const handleCartDecrement = (item) => {
    if (item.Quantity > 1) {
      setCart(
        cart.map((prod) =>
          prod.Id === item.Id
            ? {
                ...prod,
                Quantity: prod.Quantity - 1,
                Amount: (item.Quantity - 1) * item.Price,
              }
            : prod
        )
      );

      calculateTotalAmount();
    }

    return;
  };

  const handleCartItemDelete = (item) => {
    setCart((prev) => prev.filter((prod) => prod.Id !== item.Id));
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const handleAddressChange = () => {
    if (!auth.accessToken) {
      setCartState(false);
      setLogin(true);

      return;
    }

    getAddresses(`${baseUrl}address/customer-addresses/${auth?.Id}`);
    cartDispatch({ type: "address" });
  };

  const handleDeliveryInstruction = (e) => {
    cartDispatch({ type: "setInstruction", payload: e.target.value });
  };

<<<<<<< HEAD
  const handleGift = async () => {
    cartDispatch({type:"voucherError", payload:""})

    if (!auth.accessToken) {
      setCartState(false);
      setLogin(true);

      return;
    }
  
      const response = await update(`${baseUrl}voucher/use?voucherCode=${cartState.voucherCode}&customerId=${auth.Id}`,cartState.voucherCode, auth.accessToken);
      if(response.data?.IsActive && !response.data?.IsExpired){
        cartDispatch({type:"voucher", payload:response.data})
        cartDispatch({type:"voucherError", payload:""})
        cartDispatch({type:"gift"})
        cartDispatch({type:"voucherMessage", payload:`${response.data?.DiscountAmount} Naira Discount applied `})
        //handleTotalAmount()
        //handleDeliveryFee(response.data?.DiscountAmount)

      }
     

      if(response.error){
        cartDispatch({type:"voucherError", payload:response.error})
        console.log(response.error)
        return
      }

    
=======
  const handleAddressChange = () => {
    if (!auth.user) {
      setCartState(false);
      setLogin(true);
>>>>>>> 38d66ec (Order and Order Items)

      return;
    }

<<<<<<< HEAD
=======
    getAddresses(`${baseUrl}address/customer-addresses/${auth?.user.Id}`);
    cartDispatch({ type: "address" });
>>>>>>> 38d66ec (Order and Order Items)
  };

  const handleDeliveryFee = ( ) => {
    if (distance == null || distance == 0) {
      // if(discountPercentage){
      //   const deliveryFee = Math.trunc( 1500 - ((discountPercentage / 100) * (1500) ));
      //   cartDispatch({ type: "deliveryFee", payload: deliveryFee });
      //   return;
      // }else 
      if(cartState.voucher?.DiscountAmount){
        const deliveryFee = 1500 - cartState.voucher.DiscountAmount;
        cartDispatch({ type: "deliveryFee", payload: deliveryFee });
        return;
      }
      if(cartState.voucher?.DiscountPercentage){
        const deliveryFee = Math.trunc( 1500 - ((cartState.voucher?.DiscountPercentage / 100) * (1500) ));
        cartDispatch({ type: "deliveryFee", payload: deliveryFee });
        return;
      }
      const deliveryFee = 1500;
      cartDispatch({ type: "deliveryFee", payload: deliveryFee });
      
    } else {
      if(cartState.voucher?.DiscountAmount){
        const deliveryFee =  Math.trunc((1500 + 200 * (distance / 1000)) - cartState.voucher.DiscountAmount);
        cartDispatch({ type: "deliveryFee", payload: deliveryFee });
        return;
      }
      if(cartState.voucher?.DiscountPercentage){
        const deliveryFee = Math.trunc( (1500 + 200 * (distance / 1000)) - ((cartState.voucher?.DiscountPercentage / 100) * (1500 + 200 * (distance / 1000)) ));
        cartDispatch({ type: "deliveryFee", payload: deliveryFee });
        return;
      }
      const deliveryFee = Math.trunc(1500 + 200 * (distance / 1000));
      cartDispatch({ type: "deliveryFee", payload: deliveryFee });
    }
  };

  const handleLocation = () => {
   // console.log(location);
    cartDispatch({ type: "setAddress", payload: location.address });
    handleDeliveryFee();
   // console.log(cartState.deliveryAddress);
    cartDispatch({ type: "address" });
    cartDispatch({ type: "error", payload: "" });
    addAddressToDb(`${addressUrl}create`, location, auth.accessToken, auth?.Id);
=======
  const handleDeliveryFee = () => {
    if (distance == null || distance == 0) {
      const deliveryFee = 1500;
      cartDispatch({ type: "deliveryFee", payload: deliveryFee });
    } else {
      const deliveryFee = 1500 + 200 * (distance / 1000);
      cartDispatch({ type: "deliveryFee", payload: deliveryFee });
    }
  };

  const handleLocation = () => {
    console.log(location);
    cartDispatch({ type: "setAddress", payload: location.address });
    handleDeliveryFee();
    console.log(cartState.deliveryAddress);
    cartDispatch({ type: "address" });
<<<<<<< HEAD
>>>>>>> 3f80dfc (latest commit)
=======
    cartDispatch({type:"error", payload:""})
    addAddressToDb(`${addressUrl}create`, location, auth.accessToken, auth.user?.Id)
>>>>>>> e848b7b (Payment Response)
  };

  const handleClick = async (e) => {
    console.log(e.target.value);
    cartDispatch({ type: "setAddress", payload: e.target.value });
    handleDeliveryFee();
    cartDispatch({ type: "address" });
<<<<<<< HEAD
<<<<<<< HEAD
    cartDispatch({ type: "error", payload: "" });
  };

  const handleOrder = async () => {
    if (!cartState.deliveryAddress) {
      cartDispatch({
        type: "error",
        payload: "Please choose an address before you proceed ",
      });
=======
    cartDispatch({type:"error", payload:""})
  };

  const handleOrder = async () => {

    if(!cartState.deliveryAddress){
      cartDispatch({type:'error', payload:"Please choose an address before you proceed "})
>>>>>>> e848b7b (Payment Response)
      return;
    }

    if (!auth.accessToken) {
      setCartState(false);
      setLogin(true);

      return;
    }

    try {
      setOrderLoading(true);
      const order = {
        CustomerId: auth?.Id,
        Instruction: cartState.deliveryInstruction,
      };
      const response = await post(orderUrl, order, auth.accessToken);

      console.log(response);

      if (response.error) {
        cartDispatch({
          type: "error",
          payload: "Error placing order ",
        });
        return;
      }

      for (let item of cart) {
        const orderItem = {
          Amount: item.Price,
          Quantity: item.Quantity,
          TotalAmount: item.Amount,
          Name: item.Name,
          Description: item.Description,
          ProductId: item.Id,
          OrderId: response.data?.Id,
        };

        cartDispatch({ type: "order", payload: response.data });
        const result = await post(orderItemUrl, orderItem, auth.accessToken);

        console.log(result.data);
      }

      const delivery = {
        PickupAddress: cartState.vendor.ContactAddress,
        DeliveryAddress: cartState.deliveryAddress,
        OrderId: response.data?.Id,
        DeliveryFee: cartState.deliveryFee,
        PickupType: "Normal",
      };
      cartDispatch({ type: "delivery", payload: delivery });

      setOrderLoading(false);
      cartDispatch({ type: "checkOut" });
      //console.log(delivery)
     
      localStorage.setItem("delivery", JSON.stringify(delivery));
    } catch (error) {
      console.log(error);
      dispatch({ type: "error", payload: "Error placing Order" });
      setOrderLoading(false);
    }
  };

=======
  };

  const handleOrder = async () => {
    setOrderLoading(true);
    const order = {
      CustomerId: auth?.user.Id,
      Instruction: cartState.deliveryInstruction,
    };
    const response = await post(orderUrl, order, auth.accessToken);

    console.log(response.data);

    for (let item of cart) {
      const orderItem = {
        Amount: item.Price,
        Quantity: item.Quantity,
        TotalAmount: item.Amount,
        Name: item.Name,
        Description: item.Description,
        ProductId: item.Id,
        OrderId: response.data?.Id,
      };

      cartDispatch({ type: "order", payload: response.data });
      const result = await post(orderItemUrl, orderItem, auth.accessToken);
      console.log(result.data);
    }

    setOrderLoading(false);
    cartDispatch({ type: "checkOut" });
<<<<<<< HEAD
=======
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
>>>>>>> e848b7b (Payment Response)
  };
>>>>>>> 3f80dfc (latest commit)

  const clearCart = () => {
    setCart([]);
    cartDispatch({ type: "setInstruction", payload: "" });
    cartDispatch({ type: "total", payload: 0 });
    setCartState(false);
<<<<<<< HEAD
<<<<<<< HEAD
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const handleTotalAmount = () => {
    
    const totalAmount = Math.trunc( state.subTotal + cartState.deliveryFee);
    cartDispatch({ type: "total", payload: totalAmount });
  };

=======
  const handleDeliveryAddress = (e) => {
    e.preventDefault()
   setDeliveryAddress(e.target.value)

    console.log(deliveryAddress)
  }

=======
    //cartDispatch({type:'empty'})
  };

  const { distance, loading: disLoading } = useDistance(
    origin,
    state.deliveryAddress
  );
>>>>>>> 3f80dfc (latest commit)

>>>>>>> 0ab4b1c (Google Maps Controller)
=======
    localStorage.setItem("cart", JSON.stringify([]));
  };

>>>>>>> e848b7b (Payment Response)
  useEffect(() => {
    getProductCategory();
    //setVendors(data?.result);
    //console.log('services')

  }, []);

  useEffect(() => {
    if (cart.length == 0) {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const currentVendor = JSON.parse(localStorage.getItem("currentVendor"));
      //console.log(cart);
      if (currentCart) {
        setCart(currentCart);
      }
      if (currentVendor) {
        cartDispatch({ type: "vendor", payload: currentVendor });
      }
    }
  }, []);

  useEffect(() => {
    calculateTotalAmount();
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e848b7b (Payment Response)
  useEffect(() => {
    setOrigin(
      `${cartState.vendor?.ContactAddress}, ${cartState.vendor?.Town}, ${cartState.vendor?.City}, ${cartState.vendor?.State}`
    );
  }, [cartState.vendor]);

<<<<<<< HEAD
  


  const { distance, duration, error } = useDistance(
    origin,
    cartState.deliveryAddress
  );

  useEffect(() => {
    handleDeliveryFee();
    handleTotalAmount();
  }, [state.subTotal, distance, cartState.deliveryFee, cart, cartState.voucher]);

  //console.log(distance);
  //console.log(cartState.vendor);
=======
 console.log(deliveryInstruction);
  //console.log(state.subTotal);
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
  //console.log(deliveryInstruction);
=======
  const {distance, duration, error, } = useDistance(origin, cartState.deliveryAddress)

  //console.log(distance);
>>>>>>> e848b7b (Payment Response)
  //console.log(cartState.vendor);
>>>>>>> 38d66ec (Order and Order Items)
  return (
    <main className=" flex justify-center  ">
      <div className=" w-11/12 lg:w-10/12  grid grid-cols-1 lg:grid-cols-12 justify-center gap-8">
        <div className=" w-full  col-span-8">
          <div className=" flex flex-col  w-full justify-center gap-5 px-2">
            <div>
              <Link
                to="/shop"
                className="text-gray flex gap-2 items-center"
              >
                <span>
                  <WestRounded fontSize="" />
                </span>
                <span className="text-sm">Vendors</span>
              </Link>
            </div>
            {isSuccess && (
              <>
                <div className=" border-2 relative w-full rounded-lg h-48 md:h-72 ">
                  <img
                    src={data?.VendorImgUrl}
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
                    <h2 className=" text-xl font-bold">{data?.Name}</h2>
                    <span className=" flex items-center gap-1 text-sm text-lightgreen">
                      <span className=" dark:text-gray text-grayTxt">4.3</span>{" "}
                      <StarOutlined fontSize="" />
                    </span>
                  </div>

<<<<<<< HEAD
                  <div className=" flex flex-col  ">
                    <span className=" text-gray text-md font-medium">
                      {data?.OpeningHours} - {data?.ClosingHours}
                    </span>
                    <span className=" capitalize text-secondary text-md font-medium">
                      {data?.Tag}
                    </span>
                  </div>
                </div>
              </>
            )}
=======
            <div className=" border-2 relative w-full rounded-lg h-48 md:h-72 ">
              <img
                src={data?.VendorImgUrl}
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
                <h2 className=" text-xl font-bold">{data?.Name}</h2>
                <span className=" flex items-center gap-1 text-sm text-lightgreen">
                  <span className=" text-grayTxt">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
>>>>>>> e848b7b (Payment Response)

            {isLoading && <VendorSkeleton />}

            <div className="pt-3 ">
              <div className=" flex justify-end items-center">
                <p className="">
                  <span>
                    Min Order: <span>&#8358;2,000</span>
                  </span>
                </p>
              </div>
            </div>

<<<<<<< HEAD
            <div className=" sticky top-20 bg-primary dark:bg-darkBg flex justify-start gap-3 pt-3 text-center flex-nowrap overflow-x-auto ">
=======
            <div className=" sticky top-28 bg-primary flex justify-start gap-3 pt-3 text-center flex-nowrap overflow-x-auto ">
>>>>>>> e848b7b (Payment Response)
              <Link
                onClick={() =>
                  dispatch({ type: "products", payload: data?.Products })
                }
                className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md"
              >
                All
              </Link>

              {state.productCategories.map((cat) => (
                <Link
                  key={cat.Id}
                  onClick={() =>
                    dispatch({ type: "products", payload: cat.Products })
                  }
                  className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md "
                >
                  {cat.Name}
                </Link>
              ))}
            </div>

            {isSuccess && (
              <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                {state.products.map((prod) => (
                  <span
                    key={prod.Id}
                    onClick={() => {
                      if (
                        prod.Name.includes("Send Package") ||
                        prod.Name.includes("Recieve Package")
                      ) {
                        console.log("clicked");
                        navigate("/shop/logistics");
                        return;
                      }
                      dispatch({ type: "open" });
                      dispatch({ type: "product", payload: prod });
                    }}
                  >
                    <div className=" cursor-pointer flex justify-between items-center border border-gray rounded-lg p-4 hover:bg-graybg dark:hover:bg-darkHover shadow-lg ">
                      <div className=" flex flex-col">
                        <h3 className=" text-base font-semibold capitalize">
                          {prod.Name}
                        </h3>
                        <p className=" text-sm text-gray">{prod.Tag}</p>
                        <span className=" text-secondary">
                          &#8358;{prod.Price}
                        </span>
                      </div>
                      <div className=" w-20 h-20 rounded-md">
                        <img
                          src={prod.ProductImgUrl}
                          alt=""
                          className=" w-full h-full rounded-md"
                        />
                      </div>
                    </div>
<<<<<<< HEAD
                  </span>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </div>
            )}
=======
                    <div className=" w-20 h-20 rounded-md">
                      <img
                        src={prod.ProductImgUrl}
                        alt=""
                        className=" w-full h-full rounded-md"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
>>>>>>> 3f80dfc (latest commit)
          </div>
        </div>
        {cart.length > 0 ? (
          <div className=" hidden  overflow-y-auto border-l-2 border-graybg col-span-4 py-10 px-2 lg:flex flex-col   items-start   h-full rounded-lg">
            <div className=" flex justify-between items-center pb-4">
              <p className=" text-base capitalize text-secondary">
                {cartState.vendor?.Name}
<<<<<<< HEAD
              </p>
            </div>
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
              </div>
            ))}

            <div className=" w-full">
              <div className=" py-2">
                <div className=" flex justify-between items-center text-sm font-normal">
                  <p>
                    <span className="font-bold">Choose Address:</span>{" "}
                    {cartState.deliveryAddress}{" "}
                  </p>
                  {cartState.address ? (
                    <button
                      onClick={() => cartDispatch({ type: "address" })}
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
                </div>
              </div>
              <div
                className={`${
                  cartState.address ? "block" : "hidden"
                } border-2 rounded-lg border-graybg`}
              >
                {loadingAddress && (
                  <div className="flex justify-center items-center">
                    {" "}
                    <LoadingGif />{" "}
                  </div>
<<<<<<< HEAD
                )}
                <form>
                  {cartState.addresses.map((ad) => (
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
=======
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
        </div>
        <div className=" hidden  overflow-y-auto border-l-2 border-graybg col-span-1 py-5 px-2 lg:flex flex-col   items-start justify-center  h-full rounded-lg">
          <div className=" flex justify-between items-center pb-4">
            <p className=" text-base capitalize text-secondary">
              {cartState.vendor?.Name}
            </p>
          </div>
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
>>>>>>> 38d66ec (Order and Order Items)
                  <button
                    onClick={() => handleLocation()}
                    className="text-background border p-2 rounded-xl border-gray hover:bg-graybg cursor-pointer"
                  >
                    {" "}
                    Use Current Location{" "}
                  </button>
                  <button
                    onClick={() => dispatch({ type: "edit" })}
                    className="text-background border p-2 rounded-xl border-gray hover:bg-graybg cursor-pointer"
                  >
                    {" "}
                    Add new Address{" "}
                  </button>
                </div>
              </div>
<<<<<<< HEAD
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Delivery instructions</span>
                  {cartState.instruction ? (
                    <button
                      onClick={() => cartDispatch({ type: "instruction" })}
                      className=" text-background"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => cartDispatch({ type: "instruction" })}
                      className=" text-background"
                    >
                      Add
                    </button>
                  )}
                </p>
                <div
                  className={`flex flex-col ${
                    cartState.instruction ? "block" : "hidden"
                  }`}
                >
                  <textarea
                    name="instructions"
                    id=""
                    //cols="30"
                    rows="3"
                    className="border rounded-lg border-gray bg-graybg text-accent p-3 "
                    placeholder="e.g  give it to the receptionist"
                    onChange={(e) => handleDeliveryInstruction(e)}
                  ></textarea>
                </div>
              </div>
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal mb-2">
                  <span>Use Gift </span>
                  {cartState.gift ? (
                    <button
                      onClick={() => cartDispatch({ type: "gift" })}
                      className=" text-background"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => cartDispatch({ type: "gift" })}
                      className=" text-background"
                    >
                      Add
                    </button>
                  )}
                </p>
                <div
                  className={`flex flex-col ${
                    cartState.gift ? "block" : "hidden"
                  } mb-2`}
                >
                  <input
                    name="gift"
                    id=""
                    className="border rounded-lg border-gray bg-graybg text-accent p-3 mb-1"
                    placeholder="gift code"
                    onChange={(e) =>
                      cartDispatch({
                        type: "voucherCode",
                        payload: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-between">
                  {cartState.voucherError && <p className="text-sm text-redborder"> {cartState.voucherError }</p>}

                    <button
                      onClick={() =>{ handleGift(); } }
                      className=" text-background "
                    >
                      Use Code
                    </button>{" "}
                    
                  </div>
                </div>
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
                    Delivery Address confirmation
                  </h1>
                  <p className=" text-xs">
                    This helps ensure that your order is brought to the right
                    address
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
                  <span className="">&#8358;{state.subTotal}</span>
                </p>
              </div>
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Delivery fee</span>
                  <span className="">&#8358;{cartState.deliveryFee}</span>
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
                  <span className="">&#8358;{cartState.total}</span>
                </p>
                {
                  cartState.voucherMessage && <p className="text-sm text-background"> {cartState.voucherMessage} <ThumbUpOffAltIcon /> </p>
                }
              </div>
              <div>
                {cartState.error && (
                  <span className="text-redborder"> {cartState.error}</span>
                )}
              </div>
              {state.error && (
                <span className="text-redborder"> {state.error}</span>
              )}
              <div className=" pt-3 text-center w-full">
                <button
                  onClick={handleOrder}
                  className=" w-full bg-background py-4 px-3 flex justify-center rounded"
                >
                  {orderLoading ? (
                    <LoadingGif />
                  ) : (
                    <span className=" text-primary">Place Order</span>
                  )}
                </button>
              </div>
              <div className=" pt-3 text-center w-full">
                <button
                  onClick={clearCart}
                  className=" w-full bg-redborder py-4 px-3 rounded"
                >
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
=======
            </div>
          ))}

          <div className=" w-full">
            <div className=" py-2">
              <p className=" flex justify-between items-center text-sm font-normal">
                <span>Choose Address: {cartState.deliveryAddress} </span>
                {state.address ? (
                  <button
                    onClick={() => cartDispatch({ type: "address" })}
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
                cartState.address ? "block" : "hidden"
              } border-2 rounded-lg border-graybg`}
            >
              {loadingAddress && (
                <div className="flex justify-center items-center">
                  {" "}
                  <LoadingGif />{" "}
                </div>
              )}
              <form>
                {cartState.addresses.map((ad) => (
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
                  Use Current Location{" "}
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
>>>>>>> 38d66ec (Order and Order Items)
=======
              </p>
            </div>
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
              </div>
            ))}

            <div className=" w-full">
              <div className=" py-2">
                <div className=" flex justify-between items-center text-sm font-normal">
                <p><span className="font-bold">Choose Address:</span> {cartState.deliveryAddress} </p>
                  {cartState.address ? (
                    <button
                      onClick={() => cartDispatch({ type: "address" })}
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
                </div>
              </div>
              <div
                className={`${
                  cartState.address ? "block" : "hidden"
                } border-2 rounded-lg border-graybg`}
              >
                {loadingAddress && (
                  <div className="flex justify-center items-center">
                    {" "}
                    <LoadingGif />{" "}
                  </div>
                )}
                <form>
                  {cartState.addresses.map((ad) => (
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
                    className="text-background border p-2 rounded-xl border-gray hover:bg-graybg cursor-pointer"
                  >
                    {" "}
                    Use Current Location{" "}
                  </button>
                  <button
                    onClick={() => dispatch({ type: "edit" })}
                    className="text-background border p-2 rounded-xl border-gray hover:bg-graybg cursor-pointer"
                  >
                    {" "}
                    Add new Address{" "}
                  </button>
                </div>
              </div>
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Delivery instructions</span>
                  {cartState.instruction ? (
                    <button
                      onClick={() => cartDispatch({ type: "instruction" })}
                      className=" text-background"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => cartDispatch({ type: "instruction" })}
                      className=" text-background"
                    >
                      Add
                    </button>
                  )}
                </p>
                <div
                  className={`flex flex-col ${
                    cartState.instruction ? "block" : "hidden"
                  }`}
                >
                  <textarea
                    name="instructions"
                    id=""
                    //cols="30"
                    rows="3"
                    className="border rounded-lg border-gray bg-graybg text-accent p-3 "
                    placeholder="e.g  give it to the receptionist"
                    onChange={(e) => handleDeliveryInstruction(e)}
                  ></textarea>
                </div>
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
                  <span className="">&#8358;{state.subTotal}</span>
                </p>
              </div>
              <div className=" py-2">
                <p className=" flex justify-between items-center text-sm font-normal">
                  <span>Delivery fee</span>
                  <span className="">&#8358;{cartState.deliveryFee}</span>
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
                  <span className="">&#8358;{cartState.total}</span>
                </p>
              </div>
<<<<<<< HEAD
=======
              <div>{cartState.error && <span className="text-redborder"> {cartState.error }</span>}</div>
>>>>>>> e848b7b (Payment Response)
              <div className=" pt-3 text-center w-full">
                <button
                  onClick={handleOrder}
                  className=" w-full bg-background py-4 px-3 flex justify-center rounded"
                >
                  <span className=" text-primary">Place Order</span>
                </button>
              </div>
              <div className=" pt-3 text-center w-full">
                <button
                  onClick={clearCart}
                  className=" w-full bg-redborder py-4 px-3 rounded"
                >
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
>>>>>>> 3f80dfc (latest commit)
          </div>
        ) : (
          <EmptyCartDesktop />
        )}
      </div>
<<<<<<< HEAD

      {cart.length >= 1 ? (
        <Cart
          vendor={data}
          subTotal={state.subTotal}
          handleCartDecrement={handleCartDecrement}
          handleCartIncrement={handleCartIncrement}
          handleCartItemDelete={handleCartItemDelete}
          handleNewAddress={dispatch}
<<<<<<< HEAD
          handleGift={handleGift}
          handleDeliveryFee={handleDeliveryFee}
         // handleTotalAmount={handleTotalAmount}
=======
>>>>>>> 38d66ec (Order and Order Items)
          //distance={handleDistance}
          //handleDeliveryInstruction = {setDeliveryInstruction}
        />
      ) : (
        <EmptyCart />
      )}
<<<<<<< HEAD
=======
      <Cart
        vendor={data}
        subTotal={state.subTotal}
        handleCartDecrement={handleCartDecrement}
        handleCartIncrement={handleCartIncrement}
        handleCartItemDelete = {handleCartItemDelete}
        handleNewAddress = {dispatch}
        handleDeliveryAddress = {handleDeliveryAddress}
        handleDeliveryInstruction = {setDeliveryInstruction}
      />
>>>>>>> 0ab4b1c (Google Maps Controller)
=======
>>>>>>> 38d66ec (Order and Order Items)

      <ProductModal
        open={state.open}
        handleClose={dispatch}
        product={state.product}
        vendor={data}
      />
      <AddAddressModal
        open={state.edit}
        handleClose={dispatch}
      />
    </main>
  );
};

export default Vendor;
