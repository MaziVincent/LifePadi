import ResponsiveLogo from "../shared/ResponsiveLogo";
import useLocation from "../../hooks/useLocation";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import {
  LocationOn,
  PersonOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import UserLogin from "../auth/UserLogin";
import Register from "../auth/Register";
import { useQuery } from "react-query";
import Cart from "./Cart";
import { useCoordinates } from "../../hooks/useCoordinates";
import useAddress from "../../hooks/useAddress";
import EmptyCart from "./EmptyCart";
import VerifyCode from "../auth/VerifyCode";
import CheckOut from "./CheckOut";
import { Badge } from "@mui/material";


const ShopHeader = () => {
  const { cart, cartState, setCartState, dispatch } = useCart();
  const { auth,login, setLogin, location, setLocation } = useAuth();
  const navigate = useNavigate();
  const getLocation = useLocation();
<<<<<<< HEAD
  const {coordinates, error, loading } = useCoordinates()
  const {address, error:addError, loading:addLoading } = useAddress(coordinates.latitude, coordinates.longitude);

// console.log(address)
//   console.log(coordinates)
  useEffect(() => {
    setLocation({coordinates, address})
    //dispatch({type:"setAddress", payload: address })
  },[address])
=======
  const fetch = useFetch();
  const getAddress = useAddress();

  const [state, dispatch] = useReducer(reducer, {
    login: false,
  });
  const handleLocation = async () => {
    if (!location?.longitude || !location?.latitude  || location?.accuracy > 100) {
     const {data, error} =  await getLocation();
     console.log(data)
     if(error){
      console.log(error)
      return;
     }

     setLocation(data);
     
      
    } else {
      console.log(result.data);
    }
  };

  

  useEffect(()=> {
    // handleLocation();

    // console.log(location);  
   
  },[])

  
  
>>>>>>> d189281 (worked on Login)
  return (
    <div className=" dark:bg-darkMenu dark:text-primary flex justify-center fixed top-0 z-40 bg-primary w-full p-4  shadow-md ">
      <div className=" flex justify-between w-full lg:w-10/12">
        <div className=" flex items-center md:gap-10 w-1/2 ">
          <ResponsiveLogo />
          <div className="min-w-36 ">
            <Link className=" min-w-28 flex items-center font-normal text-sm max-lg:text-xs max-lg:font-medium">
              <span className=" text-secondary">
                <LocationOn />
              </span>
<<<<<<< HEAD
              {
                addLoading && <>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-graybg animate-spin dark:text-darkHover fill-background"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>{" "}
              </>
              }
              {address && 
                <span className="line-clamp-2"> {address }  </span>
               }
=======
              {location ? (
                <span> {location.address}  </span>
              ) : (
                <>
                  <span className="">Enter address</span>
                  <span>
                    <ExpandMore />
                  </span>{" "}
                </>
              )}
>>>>>>> d189281 (worked on Login)
            </Link>
          </div>
        </div>
        <div className=" flex items-center ">
          <div className=" flex items-center gap-4">
            <span
              onClick={() => {
                !cart.length ? dispatch({type:"empty"}) :  setCartState((cart) => !cart);
              }}
              className=" lg:hidden bg-secondary rounded-full flex justify-center items-center h-10 w-10"
            >
              <Badge badgeContent={cart.length} color="primary">
               <ShoppingCartOutlined /> 
               </Badge>
              
            </span>
            <span
              onClick={
                auth.accessToken
                  ? () => {
                      navigate("/user");
                    }
                  : () => setLogin((prev) => !prev)
              }
              className=" bg-secondary rounded-full flex justify-center items-center h-10 w-10"
            >
              <span className=" text-primary">
                <PersonOutlined />
              </span>
            </span>
          </div>
        </div>
      </div>
      <UserLogin />

      {
        cart.length >= 1 ?  <Cart /> : <EmptyCart />
      }
      
      
      <Register />
      <VerifyCode   />
      <CheckOut />
     
    </div>
  );
};

export default ShopHeader;
