import { Outlet } from "react-router-dom";

import { CartProvider } from "@/context/CartProvider";
import ShopFooter from "./ShopFooter";
import ShopHeader from "./ShopHeader";

const ShopLayout = () => {
	return (
		<CartProvider>
			<main className="w-full dark:bg-background dark:text-primary">
				<ShopHeader />
				<div className="py-28">
					<Outlet />
				</div>
				<ShopFooter />
			</main>
		</CartProvider>
	);
};

export default ShopLayout;
