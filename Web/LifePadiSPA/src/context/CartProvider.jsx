import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [deliveryAddress, setDeliveryAddress ] = useState("");
  const [deliveryInstruction, setDeliveryInstruction ] = useState("");

  return (
    <CartContext.Provider value={{ cart, setCart, cartState, setCartState,deliveryAddress, setDeliveryAddress, deliveryInstruction, setDeliveryInstruction }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
