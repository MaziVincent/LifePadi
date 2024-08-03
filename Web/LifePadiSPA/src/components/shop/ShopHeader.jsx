import ResponsiveLogo from "../shared/ResponsiveLogo";
import useLocation from "../../hooks/useLocation";
import useAddress from "../../hooks/useAddress";
import { useEffect } from "react";
import {
  ExpandMore,
  LocationOn,
  PersonOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import UserLogin from "../auth/UserLogin";
import { useReducer } from "react";
import Cart from "./Cart";

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, login: !state.login };
    default:
      throw new Error();
  }
};

const ShopHeader = () => {
  const { cartState, setCartState } = useCart();
  const { auth, setLogin, location, setLocation } = useAuth();
  const navigate = useNavigate();
  const getLocation = useLocation();
  const getAddress = useAddress();

  const [state, dispatch] = useReducer(reducer, {
    login: false,
  });
  const handleLocation = async () => {
    if (!location || location.accuracy > 100) {
      await getLocation();
      console.log(location)
      // setTimeout(() => {
      //   const result =  getAddress();
      //   console.log(result.data);
      // }, 1000);
    } else {
      const result = getAddress();
      console.log(result.data);
    }
  };

  useEffect(()=> {
    handleLocation();
  },[])
  // console.log(cartState);
  return (
    <div className=" dark:bg-darkMenu dark:text-primary  fixed top-0 z-40 bg-primary w-full p-4 lg:px-28 shadow-md ">
      <div className=" flex justify-between">
        <div className=" flex items-center md:gap-10 w-1/2">
          <ResponsiveLogo />
          <div className="min-w-36">
            <Link className=" min-w-28 flex items-center font-normal text-sm max-lg:text-xs max-lg:font-medium">
              <span className=" text-secondary">
                <LocationOn />
              </span>
              {location ? (
                <span> {location.address} </span>
              ) : (
                <>
                  <span className="">Enter address</span>
                  <span>
                    <ExpandMore />
                  </span>{" "}
                </>
              )}
            </Link>
          </div>
        </div>
        <div className=" flex items-center ">
          <div className=" flex items-center gap-4">
            <span
              onClick={() => {
                setCartState((cart) => !cart);
              }}
              className=" bg-secondary rounded-full flex justify-center items-center h-10 w-10"
            >
              <div className=" text-primary">
                <ShoppingCartOutlined />
              </div>
            </span>
            <span
              onClick={
                auth?.user
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
      <UserLogin
        open={state.login}
        handleClose={dispatch}
      />
      <Cart />
      {/* <div className=" absolute top-5 right-40 w-1/4 max-lg:hidden">
        <span className=" absolute z-10 top-2 left-1">
          <SearchOutlined />
        </span>
        <div className="">
          <input
            type="search"
            placeholder="search the store"
            className=" w-full pl-8 pr-2 py-2 relative z-0 bg-gray-100 focus:outline-gray-300 "
          />
        </div>
      </div> */}
    </div>
  );
};

export default ShopHeader;
