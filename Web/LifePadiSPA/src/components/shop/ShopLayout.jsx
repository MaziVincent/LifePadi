import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import Footer from "../home/Footer";
import { useState } from "react";

const ShopLayout = () => {
  const [cart, setCart] = useState(false);
  return (
    <main className="dark:bg-darkBg dark:text-primary w-full">
      <ShopHeader cart={cart} setCart={setCart} />
      <div className="pt-28">
        <Outlet
          context={[cart, setCart]}
        />
      </div>

      <Footer />
    </main>
  );
};

export default ShopLayout;
