import { useEffect, useState, type ChangeEvent } from "react";
import {
	Plus,
	Minus,
	Bookmark,
	Trash2,
	Info,
	ThumbsUp,
	MapPin,
	Gift,
	StickyNote,
	Loader2,
	ShoppingBag,
	X,
} from "lucide-react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import { useDistance } from "@/hooks/useDistance";
import baseUrl from "@/api/baseUrl";
import { addAddressToDb } from "./services/services";

interface CartItemShape {
	Id: string | number;
	Name: string;
	Price: number;
	Quantity: number;
	Amount: number;
	Description?: string;
	[key: string]: unknown;
}

interface AddressShape {
	Id: string | number;
	Name: string;
	Town?: string;
	City?: string;
	[key: string]: unknown;
}

interface CartProps {
	subTotal: number;
	handleCartDecrement: (item: CartItemShape) => void;
	handleCartIncrement: (item: CartItemShape) => void;
	handleCartItemDelete: (item: CartItemShape) => void;
	handleNewAddress: (action: { type: string }) => void;
	handleGift: () => void;
	handleDeliveryFee: () => void;
	vendor?: unknown;
}

const formatNaira = (n: unknown) => {
	const value = Number(n) || 0;
	return value.toLocaleString("en-NG");
};

const Cart = ({
	subTotal,
	handleCartDecrement,
	handleCartIncrement,
	handleCartItemDelete,
	handleNewAddress,
	handleGift,
	handleDeliveryFee,
}: CartProps) => {
	const { cartState, setCartState, cart, setCart, state, dispatch } =
		useCart() as unknown as {
			cartState: boolean;
			setCartState: (v: boolean) => void;
			cart: CartItemShape[];
			setCart: (c: CartItemShape[]) => void;
			state: any;
			dispatch: (a: any) => void;
		};

	const { auth, setLogin, location } = useAuth() as unknown as {
		auth: { accessToken?: string; Id?: string | number } | null;
		setLogin: (v: boolean) => void;
		location: any;
	};

	const [origin, setOrigin] = useState("");
	const [orderLoading, setOrderLoading] = useState(false);
	const fetcher = useFetch();
	const post = usePost();

	const addressUrl = `${baseUrl}address/customer-addresses`;
	const orderUrl = `${baseUrl}order/create`;
	const orderItemUrl = `${baseUrl}orderitem/create`;

	const getAddresses = async (url: string) => {
		const result = (await fetcher(url, auth?.accessToken)) as {
			data?: AddressShape[];
		};
		dispatch({ type: "setAddresses", payload: result.data });
		return result.data;
	};

	const { isLoading } = useQuery({
		queryKey: ["addresses"],
		queryFn: () => getAddresses(`${addressUrl}/${auth?.Id}`),
		placeholderData: keepPreviousData,
		staleTime: 20_000,
		enabled: Boolean(state.address),
	});

	const handleAddressChange = () => {
		if (!auth?.accessToken) {
			setCartState(false);
			setLogin(true);
			return;
		}
		getAddresses(`${baseUrl}address/customer-addresses/${auth?.Id}`);
		dispatch({ type: "address" });
	};

	const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: "setAddress", payload: e.target.value });
		handleDeliveryFee();
		dispatch({ type: "address" });
		dispatch({ type: "error", payload: "" });
	};

	const handleLocation = () => {
		if (!location) return;
		dispatch({ type: "setAddress", payload: location.address });
		handleDeliveryFee();
		dispatch({ type: "address" });
		dispatch({ type: "error", payload: "" });
		addAddressToDb(
			`${baseUrl}address/create`,
			location,
			auth?.accessToken,
			auth?.Id,
		);
	};

	const handleDeliveryInstruction = (e: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({ type: "setInstruction", payload: e.target.value });
	};

	const clearCart = () => {
		setCart([]);
		dispatch({ type: "setInstruction", payload: "" });
		setCartState(false);
		dispatch({ type: "empty" });
		localStorage.setItem("cart", JSON.stringify([]));
	};

	const handleOrder = async () => {
		if (!state.deliveryAddress) {
			dispatch({
				type: "error",
				payload: "Please choose an address before you proceed.",
			});
			return;
		}

		if (!auth?.accessToken) {
			setCartState(false);
			setLogin(true);
			return;
		}

		try {
			setOrderLoading(true);
			const order = {
				CustomerId: auth?.Id,
				Instruction: state.deliveryInstruction,
			};
			const response = (await post(orderUrl, order, auth.accessToken)) as any;

			if (response?.error) {
				dispatch({ type: "error", payload: "Error placing order." });
				setOrderLoading(false);
				return;
			}

			for (const item of cart) {
				const orderItem = {
					Amount: item.Price,
					Quantity: item.Quantity,
					TotalAmount: item.Amount,
					Name: item.Name,
					Description: item.Description,
					ProductId: item.Id,
					OrderId: response?.data?.Id,
				};
				dispatch({ type: "order", payload: response?.data });
				await post(orderItemUrl, orderItem, auth.accessToken);
			}

			const delivery = {
				OrderId: response?.data?.Id,
				DeliveryAddress: state.deliveryAddress,
				DeliveryFee: state.deliveryFee,
				PickupAddress: state.vendor?.ContactAddress,
				PickupType: "Normal",
			};

			dispatch({ type: "delivery", payload: delivery });
			setOrderLoading(false);
			dispatch({ type: "checkOut" });
			localStorage.setItem("delivery", JSON.stringify(delivery));
		} catch (err) {
			console.error(err);
			dispatch({ type: "error", payload: "Error placing order." });
			setOrderLoading(false);
		}
	};

	useEffect(() => {
		setOrigin(
			`${state.vendor?.ContactAddress}, ${state.vendor?.Town}, ${state.vendor?.City}, ${state.vendor?.State}`,
		);
	}, [state.vendor]);

	// Side-effect kept (computes distance, used elsewhere via context).
	useDistance(origin, state.deliveryAddress);

	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	const itemCount = cart.reduce((acc, i) => acc + (i.Quantity || 0), 0);

	return (
		<Sheet
			open={cartState}
			onOpenChange={(next) => {
				if (!next) setCartState(false);
			}}>
			<SheetContent
				side="right"
				className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
				{/* Header */}
				<SheetHeader className="border-b p-5">
					<SheetTitle className="flex items-center gap-2 pr-8 text-left">
						<ShoppingBag className="h-5 w-5 text-primary" />
						<span className="truncate">
							{state.vendor?.Name ?? "Your cart"}
						</span>
						<span className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
							{itemCount} item{itemCount === 1 ? "" : "s"}
						</span>
					</SheetTitle>
				</SheetHeader>

				{/* Scrollable body */}
				<div className="flex-1 overflow-y-auto p-5">
					{/* Items */}
					<div className="space-y-3">
						{cart.map((item, index) => (
							<div
								key={String(item.Id) + index}
								className="rounded-xl border bg-card p-3 shadow-sm">
								<div className="flex items-start justify-between gap-3">
									<div className="min-w-0 flex-1">
										<p className="text-xs uppercase tracking-wide text-muted-foreground">
											Item {index + 1}
										</p>
										<h4 className="mt-0.5 line-clamp-2 text-sm font-medium">
											{item.Name}
										</h4>
										<p className="mt-1 text-xs text-muted-foreground">
											₦{formatNaira(item.Price)}
										</p>
									</div>

									<button
										type="button"
										aria-label="Remove item"
										onClick={() => handleCartItemDelete(item)}
										className="rounded-md p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
										<Trash2 className="h-4 w-4" />
									</button>
								</div>

								<div className="mt-3 flex items-center justify-between">
									<div className="inline-flex items-center gap-2 rounded-full border bg-background px-2 py-1">
										<button
											type="button"
											aria-label="Decrease quantity"
											onClick={() => handleCartDecrement(item)}
											className="grid h-6 w-6 place-items-center rounded-full text-foreground transition hover:bg-muted">
											<Minus className="h-3.5 w-3.5" />
										</button>
										<span className="min-w-[1.5ch] text-center text-sm font-medium">
											{item.Quantity}
										</span>
										<button
											type="button"
											aria-label="Increase quantity"
											onClick={() => handleCartIncrement(item)}
											className="grid h-6 w-6 place-items-center rounded-full text-foreground transition hover:bg-muted">
											<Plus className="h-3.5 w-3.5" />
										</button>
									</div>
									<p className="text-sm font-semibold">
										₦{formatNaira(item.Amount)}
									</p>
								</div>
							</div>
						))}
					</div>

					<Separator className="my-5" />

					{/* Address */}
					<section className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex min-w-0 items-center gap-2">
								<MapPin className="h-4 w-4 shrink-0 text-primary" />
								<div className="min-w-0">
									<p className="text-xs text-muted-foreground">
										Delivery address
									</p>
									<p className="truncate text-sm font-medium">
										{state.deliveryAddress
											? String(state.deliveryAddress)
											: "No address selected"}
									</p>
								</div>
							</div>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() =>
									state.address
										? dispatch({ type: "address" })
										: handleAddressChange()
								}
								className="shrink-0 text-primary hover:bg-primary/10">
								{state.address ? "Close" : "Change"}
							</Button>
						</div>

						{state.address && (
							<div className="space-y-3 rounded-lg border bg-muted/30 p-3">
								{isLoading && (
									<div className="flex justify-center py-2">
										<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
									</div>
								)}

								<form className="space-y-1.5">
									{(state.addresses ?? []).map((ad: AddressShape) => (
										<label
											key={ad.Id}
											htmlFor={`address${ad.Id}`}
											className="flex cursor-pointer items-start gap-3 rounded-md border bg-background p-3 text-sm transition hover:border-primary/50">
											<input
												type="radio"
												name="address"
												id={`address${ad.Id}`}
												value={`${ad.Name}, ${ad.Town ?? ""}, ${ad.City ?? ""}`}
												onChange={handleClick}
												className="mt-0.5 accent-primary"
											/>
											<span>
												<span className="block font-medium">{ad.Name}</span>
												{ad.Town && (
													<span className="text-xs text-muted-foreground">
														{ad.Town}
													</span>
												)}
											</span>
										</label>
									))}
								</form>

								<div className="flex flex-wrap gap-2">
									<Button
										variant="outline"
										size="sm"
										type="button"
										onClick={handleLocation}
										className="gap-1.5">
										<MapPin className="h-3.5 w-3.5" />
										Current location
									</Button>
									<Button
										variant="outline"
										size="sm"
										type="button"
										onClick={() => handleNewAddress({ type: "edit" })}>
										+ Add new address
									</Button>
								</div>
							</div>
						)}

						{/* Instructions */}
						<div className="space-y-2">
							<button
								type="button"
								onClick={() => dispatch({ type: "instruction" })}
								className="flex w-full items-center justify-between text-left text-sm">
								<span className="flex items-center gap-2 text-muted-foreground">
									<StickyNote className="h-4 w-4" />
									Delivery instructions
								</span>
								<span className="text-xs text-primary">
									{state.instruction ? "Close" : "Add"}
								</span>
							</button>
							{state.instruction && (
								<Textarea
									rows={3}
									placeholder="e.g. Give it to the receptionist"
									onChange={handleDeliveryInstruction}
								/>
							)}
						</div>

						{/* Gift */}
						<div className="space-y-2">
							<button
								type="button"
								onClick={() => dispatch({ type: "gift" })}
								className="flex w-full items-center justify-between text-left text-sm">
								<span className="flex items-center gap-2 text-muted-foreground">
									<Gift className="h-4 w-4" />
									Gift / voucher code
								</span>
								<span className="text-xs text-primary">
									{state.gift ? "Close" : "Add"}
								</span>
							</button>
							{state.gift && (
								<div className="space-y-2">
									<div className="flex gap-2">
										<Input
											placeholder="Enter gift code"
											onChange={(e) =>
												dispatch({
													type: "voucherCode",
													payload: e.target.value,
												})
											}
										/>
										<Button
											type="button"
											variant="secondary"
											onClick={handleGift}>
											Apply
										</Button>
									</div>
									{state.voucherError && (
										<p className="text-xs text-destructive">
											{state.voucherError}
										</p>
									)}
								</div>
							)}
						</div>
					</section>

					<Separator className="my-5" />

					{/* Info banner */}
					<div className="flex items-start gap-2 rounded-lg border bg-primary/5 p-3 text-xs">
						<Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
						<div>
							<p className="font-medium">Delivery includes PIN confirmation</p>
							<p className="text-muted-foreground">
								This helps ensure your order reaches the right person.
							</p>
						</div>
					</div>

					<Separator className="my-5" />

					{/* Totals */}
					<div className="space-y-2 text-sm">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Subtotal ({cart.length} item{cart.length === 1 ? "" : "s"})
							</span>
							<span>₦{formatNaira(subTotal)}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Delivery fee</span>
							<span>
								{state.deliveryFee ? `₦${formatNaira(state.deliveryFee)}` : "—"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Service fee</span>
							<span>₦0</span>
						</div>
						<Separator className="my-2" />
						<div className="flex items-center justify-between text-base font-semibold">
							<span>Total</span>
							<span>₦{formatNaira(state.total)}</span>
						</div>
						{state.voucherMessage && (
							<p className="flex items-center gap-1.5 text-xs text-primary">
								<ThumbsUp className="h-3.5 w-3.5" />
								{state.voucherMessage}
							</p>
						)}
						{state.error && (
							<p className="text-xs text-destructive">{state.error}</p>
						)}
					</div>
				</div>

				{/* Footer / Actions */}
				<div className="space-y-2 border-t bg-card/50 p-4">
					<Button
						className="w-full gap-2"
						disabled={orderLoading}
						onClick={handleOrder}>
						{orderLoading && <Loader2 className="h-4 w-4 animate-spin" />}
						{orderLoading ? "Placing order…" : "Place order"}
					</Button>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							className="flex-1 gap-1.5"
							onClick={clearCart}>
							<X className="h-3.5 w-3.5" />
							Clear cart
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="flex-1 gap-1.5 text-muted-foreground">
							<Bookmark className="h-3.5 w-3.5" />
							Save for later
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;

export type { CartItemShape, AddressShape };
