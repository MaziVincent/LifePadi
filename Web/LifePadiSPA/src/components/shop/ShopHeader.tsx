import { Loader2, MapPin, ShoppingCart, User } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import Register from "@/components/auth/Register";
import UserLogin from "@/components/auth/UserLogin";
import VerifyCode from "@/components/auth/VerifyCode";
import ResponsiveLogo from "@/components/shared/ResponsiveLogo";
import useAddress from "@/hooks/useAddress";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { useCoordinates } from "@/hooks/useCoordinates";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import EmptyCart from "./EmptyCart";

const CartAny = Cart as unknown as React.FC;

const ShopHeader = () => {
	const { cart, setCartState, dispatch } = useCart();
	const { auth, setLogin, setLocation } = useAuth();
	const navigate = useNavigate();
	const { coordinates } = useCoordinates();
	const { address, loading: addLoading } = useAddress(
		coordinates.latitude,
		coordinates.longitude,
	) as { address: { Name?: string } | null; loading: boolean };

	useEffect(() => {
		setLocation({ coordinates, address });
	}, [address, coordinates, setLocation]);

	return (
		<div className="fixed top-0 z-40 flex w-full justify-center bg-primary p-4 shadow-md dark:bg-card dark:text-primary">
			<div className="flex w-full justify-between lg:w-10/12">
				<div className="flex w-1/2 items-center md:gap-10">
					<ResponsiveLogo />
					<div className="min-w-36">
						<Link
							to="#"
							className="flex min-w-28 items-center text-sm font-normal max-lg:text-xs max-lg:font-medium">
							<span className="text-secondary">
								<MapPin className="h-5 w-5" />
							</span>
							{addLoading && (
								<Loader2 className="ml-1 h-4 w-4 animate-spin text-muted-foreground" />
							)}
							{address && (
								<span className="line-clamp-2"> {address.Name} </span>
							)}
						</Link>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => {
								if (!cart.length) dispatch({ type: "empty" });
								else setCartState((c) => !c);
							}}
							className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary lg:hidden"
							aria-label="Open cart">
							<ShoppingCart className="h-5 w-5" />
							{cart.length > 0 && (
								<Badge
									className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full p-0 px-1 text-xs"
									variant="default">
									{cart.length}
								</Badge>
							)}
						</button>
						<button
							type="button"
							onClick={
								auth?.accessToken
									? () => navigate("/user")
									: () => setLogin((prev) => !prev)
							}
							className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary"
							aria-label="Account">
							<User className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
			<UserLogin />
			{cart.length >= 1 ? <CartAny /> : <EmptyCart />}
			<Register />
			<VerifyCode />
			<CheckOut />
		</div>
	);
};

export default ShopHeader;
