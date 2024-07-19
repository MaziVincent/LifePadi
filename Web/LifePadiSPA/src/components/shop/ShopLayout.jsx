
import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader"
import Footer from "../home/Footer"

const ShopLayout = () => {
    return ( <main className="dark:bg-darkBg dark:text-primary w-full">
        <ShopHeader />
        <div className="pt-28">
        <Outlet />
        </div>
        
        <Footer />
      
    </main> );
}
 
export default ShopLayout;