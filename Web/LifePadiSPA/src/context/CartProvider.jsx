import { createContext, useState, useReducer } from "react";

const CartContext = createContext({});

const initialState = {
  deliveryAddress: "",
  deliveryInstruction: "",
  address: false,
  instruction: false,
  error: "",
  voucherError: "",
  addresses: [],
  vendor: null,
  empty: false,
  vendorChange: false,
  deliveryFee: 0,
  amount: 0,
  total: 0,
  checkOut: false,
  order: null,
  delivery: null,
  gift:false,
  voucherCode:"",
  voucher: null,
  voucherMessage:""
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setAddress":
      return { ...state, deliveryAddress: action.payload };
    case "setInstruction":
      return { ...state, deliveryInstruction: action.payload };
    case "address":
      return { ...state, address: !state.address };
    case "instruction":
      return { ...state, instruction: !state.instruction };
    case "error":
      return { ...state, error: action.payload };
    case "voucherError":
      return { ...state, voucherError: action.payload };
    case "setAddresses":
      return { ...state, addresses: action.payload };
    case "vendor":
      return { ...state, vendor: action.payload };
    case "empty":
      return { ...state, empty: !state.empty };
    case "vendorChange":
      return { ...state, vendorChange: !state.vendorChange };
    case "deliveryFee":
      return { ...state, deliveryFee: action.payload };
    case "amount":
      return { ...state, amount: action.payload };
    case "total":
      return { ...state, total: action.payload };
    case "order":
      return { ...state, order: action.payload };
    case "delivery":
      return { ...state, delivery: action.payload };
    case "voucherCode":
      return { ...state, voucherCode: action.payload };
    case "voucher":
      return { ...state, voucher: action.payload };
    case "voucherMessage":
      return { ...state, voucherMessage: action.payload };
    case "gift":
      return { ...state, gift: !state.gift };
    case "checkOut":
      return { ...state, checkOut: !state.checkOut };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState );

  const [cart, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [deliveryAddress, setDeliveryAddress ] = useState("");
  const [deliveryInstruction, setDeliveryInstruction ] = useState("");

  return (
<<<<<<< HEAD
    <CartContext.Provider
      value={{ cart, setCart, cartState, setCartState, state, dispatch }}
    >
=======
    <CartContext.Provider value={{ cart, setCart, cartState, setCartState,deliveryAddress, setDeliveryAddress, deliveryInstruction, setDeliveryInstruction }}>
>>>>>>> 0ab4b1c (Google Maps Controller)
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
