import { createContext, useState, useReducer } from "react";

const CartContext = createContext({});

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
    case "total":
      return { ...state, total: action.payload };
    case "order":
      return { ...state, order: action.payload };
    case "checkOut":
      return { ...state, checkOut: !state.checkOut };
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    deliveryAddress: "",
    deliveryInstruction: "",
    address: false,
    instruction: false,
    error: "",
    addresses: [],
    vendor: null,
    empty: false,
    vendorChange: false,
    deliveryFee: 0,
    total: 0,
    checkOut: false,
    order: null
  });

  const [cart, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartState, setCartState, state, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
