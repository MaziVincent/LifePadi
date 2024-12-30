import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import Footer from "./ShopFooter";
import { useState } from "react";
import { CartProvider } from "../../context/CartProvider";
const ShopLayout = () => {
  //const [cart, setCart] = useState(false);
  return (
    <CartProvider>
      <main className="dark:bg-darkBg dark:text-primary w-full">
        <ShopHeader />
        <div className="py-28">
          <Outlet  />
        </div>

        <Footer />
      </main>
    </CartProvider>
  );
};

export default ShopLayout;
