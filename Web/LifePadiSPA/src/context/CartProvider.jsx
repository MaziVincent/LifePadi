import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);

  return (
    <CartContext.Provider value={{ cart, setCart, cartState, setCartState }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
