import {
	CreditCard,
	Loader2,
	MapPin,
	Receipt,
	ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import baseUrl from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import usePost from "@/hooks/usePost";

type PostResponse = { data?: any; status?: number; error?: any };

const formatNaira = (n: unknown) => {
	const value = Number(n) || 0;
	return value.toLocaleString("en-NG");
};

const CheckOut = () => {
	const { cart, setCart, state, dispatch } = useCart();
	const postData = usePost();
	const url = `${baseUrl}transaction/paystackcheckout`;
	const { auth } = useAuth() as unknown as {
		auth: { accessToken?: string } | null;
	};
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const vendor = state.vendor as { Name?: string } | null;
	const deliveryAddress = (() => {
		const a = state.deliveryAddress as
			| { Name?: string; Town?: string; City?: string }
			| string
			| null;
		if (!a) return "";
		if (typeof a === "string") return a;
		return [a.Name, a.Town, a.City].filter(Boolean).join(", ");
	})();

	const handleMakePayment = async () => {
		setLoading(true);
		setError("");

		const data = {
			Amount: Math.trunc(state.amount as number),
			DeliveryFee: Math.trunc(state.deliveryFee as number),
			VoucherCode: state.voucherCode ?? "",
			OrderId: (state.order as { Id: string | number })?.Id,
			TotalAmount: Math.trunc(state.total as number),
		};

		try {
			const res = (await postData(
				url,
				data,
				auth?.accessToken,
			)) as PostResponse;
			if (res.status === 200 && res.data?.link) {
				setCart([]);
				localStorage.setItem("cart", JSON.stringify([]));
				window.location.href = res.data.link;
				dispatch({ type: "RESET" });
			} else {
				setError("Error proceeding to payment. Please try again.");
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
			setError("Error making payment. Please try again.");
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={Boolean(state.checkOut)}
			onOpenChange={(next) => {
				if (!next && !loading) {
					dispatch({ type: "checkOut" });
					setLoading(false);
				}
			}}>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="flex items-center gap-2">
						<Receipt className="h-5 w-5 text-primary" />
						Confirm your order
					</DialogTitle>
					<DialogDescription>
						Review the details below before proceeding to payment.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					{/* Vendor + address recap */}
					<div className="rounded-lg border bg-card p-3 text-sm">
						{vendor?.Name && <p className="font-medium">{vendor.Name}</p>}
						{deliveryAddress && (
							<div className="mt-1 flex items-start gap-1.5 text-muted-foreground">
								<MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
								<span className="line-clamp-2">{deliveryAddress}</span>
							</div>
						)}
					</div>

					{/* Order items */}
					{cart.length > 0 && (
						<div className="rounded-lg border">
							<div className="border-b bg-muted/40 px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Order summary
							</div>
							<ul className="divide-y">
								{cart.map((item, i) => {
									const it = item as {
										Id?: string | number;
										Name?: string;
										Price?: number;
										Quantity?: number;
										Amount?: number;
									};
									return (
										<li
											key={String(it.Id ?? i)}
											className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
											<div className="min-w-0">
												<p className="line-clamp-1 font-medium">
													{it.Name ?? "Item"}
												</p>
												<p className="text-xs text-muted-foreground">
													{it.Quantity ?? 1} × ₦{formatNaira(it.Price)}
												</p>
											</div>
											<p className="shrink-0 font-medium">
												₦{formatNaira(it.Amount)}
											</p>
										</li>
									);
								})}
							</ul>
						</div>
					)}

					{/* Totals */}
					<div className="space-y-1.5 rounded-lg bg-muted/40 p-3 text-sm">
						<div className="flex items-center justify-between text-muted-foreground">
							<span>Subtotal</span>
							<span>₦{formatNaira(state.amount)}</span>
						</div>
						<div className="flex items-center justify-between text-muted-foreground">
							<span>Delivery fee</span>
							<span>₦{formatNaira(state.deliveryFee)}</span>
						</div>
						{Boolean(state.voucherCode) && (
							<div className="flex items-center justify-between text-primary">
								<span>Voucher</span>
								<span>{String(state.voucherCode)}</span>
							</div>
						)}
						<Separator className="my-1.5" />
						<div className="flex items-center justify-between text-base font-semibold">
							<span>Total</span>
							<span>₦{formatNaira(state.total)}</span>
						</div>
					</div>

					<Button
						onClick={handleMakePayment}
						disabled={loading}
						className="w-full gap-2">
						{loading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<CreditCard className="h-4 w-4" />
						)}
						{loading ? "Processing…" : "Proceed to payment"}
					</Button>

					<p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
						<ShieldCheck className="h-3.5 w-3.5 text-primary" />
						Secured by Paystack
					</p>

					{error && (
						<p className="text-center text-sm text-destructive">{error}</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CheckOut;
