import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";

interface ProductVariant {
	Id: number;
	Name: string;
	Price: number;
	IsDefault?: boolean;
}

interface ProductExtra {
	Id: number;
	Name: string;
	Price: number;
}

interface Product {
	Id: string | number;
	Name: string;
	Tag?: string;
	Description?: string;
	Price: number;
	ProductImgUrl: string;
	Variants?: ProductVariant[];
	Extras?: ProductExtra[];
}

interface VendorLite {
	Id: string | number;
	Name?: string;
	ContactAddress?: string;
	Latitude?: number;
	Longitude?: number;
	[key: string]: unknown;
}

interface ProductModalProps {
	open: boolean;
	handleClose: (action: { type: string }) => void;
	product: Product;
	vendor: VendorLite;
}

const formatNaira = (n: number) =>
	new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 0,
	}).format(n || 0);

const ProductModal = ({
	open,
	handleClose,
	product,
	vendor,
}: ProductModalProps) => {
	const { cart, setCart } = useCart() as unknown as {
		cart: any[];
		setCart: (next: any[]) => void;
	};

	const variants = product?.Variants ?? [];
	const extras = product?.Extras ?? [];

	const defaultVariantId =
		variants.find((v) => v.IsDefault)?.Id ?? variants[0]?.Id ?? null;

	const [itemCount, setItemCount] = useState(1);
	const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
		defaultVariantId,
	);
	const [selectedExtraIds, setSelectedExtraIds] = useState<number[]>([]);

	useEffect(() => {
		if (open) {
			setItemCount(1);
			setSelectedVariantId(defaultVariantId);
			setSelectedExtraIds([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, product?.Id]);

	const selectedVariant = useMemo(
		() => variants.find((v) => v.Id === selectedVariantId) ?? null,
		[variants, selectedVariantId],
	);

	const selectedExtras = useMemo(
		() => extras.filter((e) => selectedExtraIds.includes(e.Id)),
		[extras, selectedExtraIds],
	);

	const unitBase = selectedVariant ? selectedVariant.Price : product.Price;
	const unitExtras = selectedExtras.reduce((s, e) => s + (e.Price || 0), 0);
	const unitPrice = unitBase + unitExtras;
	const lineTotal = unitPrice * itemCount;

	const handleIncrement = () => setItemCount((c) => c + 1);
	const handleDecrement = () => setItemCount((c) => (c > 1 ? c - 1 : c));

	const close = () => handleClose({ type: "open" });

	const toggleExtra = (id: number) =>
		setSelectedExtraIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);

	const handleAddToCart = () => {
		const lineKey = [
			"p",
			product.Id,
			"v",
			selectedVariantId ?? 0,
			"e",
			[...selectedExtraIds].sort().join("-"),
		].join(":");

		const existing = cart.find((x) => x?.LineKey === lineKey);
		if (existing) {
			toast.error("Item with the same options already in cart");
			return;
		}

		const newLine = {
			...product,
			LineKey: lineKey,
			Quantity: itemCount,
			// Effective per-unit price (variant base + extras). Used by cart math
			// and sent as OrderItem.Amount on the API.
			Price: unitPrice,
			Amount: lineTotal,
			SelectedVariantId: selectedVariantId,
			SelectedVariantName: selectedVariant?.Name,
			SelectedVariantPrice: selectedVariant?.Price,
			SelectedExtras: selectedExtras.map((e) => ({
				Id: e.Id,
				Name: e.Name,
				Price: e.Price,
			})),
			VendorId: vendor.Id,
			VendorName: vendor.Name,
			VendorAddress: vendor.ContactAddress,
			VendorLatitude: vendor.Latitude,
			VendorLongitude: vendor.Longitude,
		};

		setCart([...cart, newLine]);
		toast.success("Product added to cart");
		close();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				if (!next) close();
			}}>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Product details</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<div className="overflow-hidden rounded-xl border border-border bg-muted">
						<img
							src={product.ProductImgUrl}
							alt={product.Name}
							className="h-56 w-full object-cover"
						/>
					</div>

					<div className="flex items-start justify-between gap-4">
						<div>
							<h2 className="text-xl font-semibold capitalize text-foreground">
								{product.Name}
							</h2>
							{product.Tag && (
								<p className="text-sm text-muted-foreground">{product.Tag}</p>
							)}
							{product.Description && (
								<p className="mt-1 text-sm text-muted-foreground">
									{product.Description}
								</p>
							)}
						</div>
						<span className="whitespace-nowrap text-lg font-semibold text-primary">
							{formatNaira(unitBase)}
						</span>
					</div>

					{variants.length > 0 && (
						<>
							<Separator />
							<div>
								<p className="mb-2 text-sm font-medium text-foreground">
									Choose an option
								</p>
								<div className="grid gap-2">
									{variants.map((v) => {
										const checked = v.Id === selectedVariantId;
										return (
											<label
												key={v.Id}
												className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
													checked
														? "border-primary bg-primary/5"
														: "border-border bg-card hover:border-primary/40"
												}`}>
												<span className="flex items-center gap-2">
													<input
														type="radio"
														name="variant"
														className="h-4 w-4 accent-primary"
														checked={checked}
														onChange={() => setSelectedVariantId(v.Id)}
													/>
													<span className="capitalize text-foreground">
														{v.Name}
													</span>
												</span>
												<span className="font-medium text-foreground">
													{formatNaira(v.Price)}
												</span>
											</label>
										);
									})}
								</div>
							</div>
						</>
					)}

					{extras.length > 0 && (
						<>
							<Separator />
							<div>
								<p className="mb-2 text-sm font-medium text-foreground">
									Add extras{" "}
									<span className="text-xs text-muted-foreground">
										(optional)
									</span>
								</p>
								<div className="grid gap-2">
									{extras.map((e) => {
										const checked = selectedExtraIds.includes(e.Id);
										return (
											<label
												key={e.Id}
												className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
													checked
														? "border-primary bg-primary/5"
														: "border-border bg-card hover:border-primary/40"
												}`}>
												<span className="flex items-center gap-2">
													<input
														type="checkbox"
														className="h-4 w-4 accent-primary"
														checked={checked}
														onChange={() => toggleExtra(e.Id)}
													/>
													<span className="capitalize text-foreground">
														{e.Name}
													</span>
												</span>
												<span className="font-medium text-foreground">
													+{formatNaira(e.Price)}
												</span>
											</label>
										);
									})}
								</div>
							</div>
						</>
					)}

					<Separator />

					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1">
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
						<Button onClick={handleAddToCart} className="min-w-[180px]">
							Add to cart · {formatNaira(lineTotal)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProductModal;
