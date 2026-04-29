import emptyCart from "@/assets/images/empty cart.svg";

const EmptyCartDesktop = () => {
	return (
		<aside className="col-span-4 hidden lg:block">
			<div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
				<h3 className="text-lg font-semibold">Your cart is empty</h3>
				<div className="mt-4 flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
					<img src={emptyCart} alt="Empty cart" className="h-40 w-auto" />
					<p>Add items from a vendor to get started.</p>
				</div>
			</div>
		</aside>
	);
};

export default EmptyCartDesktop;
