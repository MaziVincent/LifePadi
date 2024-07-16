
import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader"
import Footer from "../home/Footer"

const ShopLayout = () => {
    return ( <main>
        <ShopHeader />
        <Outlet />
        <Footer />
      
    </main> );
}
 
export default ShopLayout;