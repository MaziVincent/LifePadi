import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import VendorChangeDialogue from "./VendorChangeDialogue";

interface Product {
	Id: string | number;
	Name: string;
	Tag?: string;
	Price: number;
	ProductImgUrl: string;
}

interface ProductModalProps {
	open: boolean;
	handleClose: (action: { type: string }) => void;
	product: Product;
	vendor: { Id: string | number };
}

const ProductModal = ({
	open,
	handleClose,
	product,
	vendor,
}: ProductModalProps) => {
	const { cart, setCart, state, dispatch } = useCart();
	const [itemCount, setItemCount] = useState(1);

	const handleIncrement = () => setItemCount((c) => c + 1);
	const handleDecrement = () => setItemCount((c) => (c > 1 ? c - 1 : c));

	const close = () => {
		handleClose({ type: "open" });
		setItemCount(1);
	};

	const addToCart = (item: Product) => {
		setCart([
			...cart,
			{
				...item,
				Quantity: itemCount,
				Amount: product.Price * itemCount,
			} as any,
		]);
		toast.success("Product added to cart");
		close();
	};

	const addItem = (item: Product) => {
		setCart([
			{
				...item,
				Quantity: itemCount,
				Amount: product.Price * itemCount,
			} as any,
		]);
		toast.success("Product added to cart");
		close();
	};

	const handleCart = (item: Product) => {
		const exist = cart.find(
			(x) => (x as { Id?: string | number }).Id === item.Id,
		);
		if (exist) {
			toast.error("Product already in cart");
			return;
		}
		if (!state.vendor) {
			addToCart(item);
			dispatch({ type: "vendor", payload: vendor });
			localStorage.setItem("currentVendor", JSON.stringify(vendor));
			return;
		}
		const currentVendor = state.vendor as { Id: string | number };
		if (currentVendor?.Id === vendor.Id) {
			addToCart(item);
		} else {
			dispatch({ type: "vendorChange" });
		}
	};

	return (
		<>
			<Dialog
				open={open}
				onOpenChange={(next) => {
					if (!next) close();
				}}>
				<DialogContent className="sm:max-w-2xl">
					<DialogHeader>
						<DialogTitle>Product details</DialogTitle>
					</DialogHeader>

					<div className="space-y-4">
						<div className="overflow-hidden rounded-xl border bg-muted">
							<img
								src={product.ProductImgUrl}
								alt={product.Name}
								className="h-56 w-full object-cover"
							/>
						</div>

						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="text-xl font-semibold capitalize">
									{product.Name}
								</h2>
								{product.Tag && (
									<p className="text-sm text-muted-foreground">{product.Tag}</p>
								)}
							</div>
							<span className="whitespace-nowrap text-lg font-semibold text-primary">
								&#8358;{product.Price}
							</span>
						</div>

						<div className="flex flex-wrap items-center justify-between gap-3">
							<div className="inline-flex items-center gap-1 rounded-lg border bg-background p-1">
								<Button
									variant="ghost"
									size="icon"
									onClick={handleDecrement}
									aria-label="Decrease quantity">
									<Minus className="h-4 w-4" />
								</Button>
								<span className="min-w-8 text-center font-semibold">
									{itemCount}
								</span>
								<Button
									variant="ghost"
									size="icon"
									onClick={handleIncrement}
									aria-label="Increase quantity">
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<Button onClick={() => handleCart(product)}>
								Add {itemCount} item{itemCount > 1 ? "s" : ""} to my order
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<VendorChangeDialogue
				addToCart={addItem as (p: unknown) => void}
				product={product}
				vendor={vendor}
			/>
		</>
	);
};

export default ProductModal;
