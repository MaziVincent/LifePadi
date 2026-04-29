import {
	Plus,
	Trash2,
	Info,
	Minus,
	Star,
	Clock,
	ArrowLeft,
	ThumbsUp,
	MapPin,
	Sparkles,
	Loader2,
	ShoppingBag,
	BadgePercent,
	StickyNote,
} from "lucide-react";
import {
	useState,
	useReducer,
	useEffect,
	useCallback,
	type ChangeEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import Cart from "./Cart";
import EmptyCart from "./EmptyCart";
import EmptyCartDesktop from "./EmptyCartDesktop";
import ProductModal from "./ProductModal";
import NewAddressModal from "./NewAddressModal";
import { createAddress } from "./services/services";

import useCart from "../../hooks/useCart";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import useUpdate from "../../hooks/useUpdate";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";

import baseUrl from "../../api/baseUrl";
import VendorSkeleton from "../shared/VendorSkeleton";
import ProductSkeleton from "../shared/ProductSkeleton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

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

interface SelectedExtra {
	Id: number;
	Name: string;
	Price: number;
}

interface Product {
	Id: string | number;
	LineKey?: string;
	Name: string;
	Price: number;
	Quantity?: number;
	Amount?: number;
	Description?: string;
	Tag?: string;
	ProductImgUrl?: string;
	Variants?: ProductVariant[];
	Extras?: ProductExtra[];
	SelectedVariantId?: number | null;
	SelectedVariantName?: string;
	SelectedVariantPrice?: number;
	SelectedExtras?: SelectedExtra[];
	VendorId?: string | number;
	VendorName?: string;
	VendorAddress?: string;
	VendorLatitude?: number;
	VendorLongitude?: number;
	[key: string]: unknown;
}

interface ProductCategory {
	Id: string | number;
	Name: string;
	Products: Product[];
}

interface VendorData {
	Id?: string | number;
	Name?: string;
	Tag?: string;
	VendorImgUrl?: string;
	ContactAddress?: string;
	Town?: string;
	City?: string;
	State?: string;
	Latitude?: number;
	Longitude?: number;
	OpeningHours?: string;
	ClosingHours?: string;
	Products?: Product[];
	[key: string]: unknown;
}

interface Address {
	Id: string | number;
	Name: string;
	Town?: string;
	City?: string;
	Latitude?: number;
	Longitude?: number;
	[key: string]: unknown;
}

interface VendorLocalState {
	open: boolean;
	edit: boolean;
	error: string;
	products: Product[];
	productCategories: ProductCategory[];
	product: Product | Record<string, never>;
	subTotal: number;
	newAddress: boolean;
	loading: boolean;
	activeCategoryId: string | number | null;
}

type VendorAction =
	| { type: "open" }
	| { type: "edit" }
	| { type: "loading" }
	| { type: "newAddress" }
	| { type: "error"; payload: string }
	| { type: "products"; payload: Product[] }
	| { type: "productCategories"; payload: ProductCategory[] }
	| { type: "product"; payload: Product }
	| { type: "subTotal"; payload: number }
	| { type: "activeCategory"; payload: string | number | null };

const reducer = (
	state: VendorLocalState,
	action: VendorAction,
): VendorLocalState => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "edit":
			return { ...state, edit: !state.edit };
		case "loading":
			return { ...state, loading: !state.loading };
		case "error":
			return { ...state, error: action.payload };
		case "products":
			return { ...state, products: action.payload };
		case "productCategories":
			return { ...state, productCategories: action.payload };
		case "product":
			return { ...state, product: action.payload };
		case "subTotal":
			return { ...state, subTotal: action.payload };
		case "newAddress":
			return { ...state, newAddress: !state.newAddress };
		case "activeCategory":
			return { ...state, activeCategoryId: action.payload };
		default:
			return state;
	}
};

const formatNaira = (n: number) =>
	new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 0,
	}).format(n || 0);

const Vendor = () => {
	const { id } = useParams();
	const fetch = useFetch();
	const post = usePost();
	const update = useUpdate();
	const [orderLoading, setOrderLoading] = useState(false);
	const { auth, setLogin, location } = useAuth() as unknown as {
		auth: { accessToken?: string; Id?: string | number } | null;
		setLogin: (v: boolean) => void;
		location: { address: string; Latitude?: number; Longitude?: number } | null;
	};
	const url = `${baseUrl}vendor`;
	const addressUrl = `${baseUrl}address/`;
	const orderUrl = `${baseUrl}order/create`;
	const orderItemUrl = `${baseUrl}orderitem/create`;
	const navigate = useNavigate();
	const { calculateDistance } = useDistanceCalculator();

	const {
		cart,
		setCart,
		setCartState,
		state: cartState,
		dispatch: cartDispatch,
	} = useCart() as unknown as {
		cart: Product[];
		setCart: (next: Product[] | ((prev: Product[]) => Product[])) => void;
		setCartState: (v: boolean) => void;
		state: any;
		dispatch: (a: any) => void;
	};

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		edit: false,
		error: "",
		products: [],
		productCategories: [],
		product: {},
		subTotal: 0,
		newAddress: false,
		loading: false,
		activeCategoryId: null,
	});

	const getVendor = async (vendorUrl: string): Promise<VendorData> => {
		const response = (await fetch(vendorUrl, auth?.accessToken)) as {
			data: VendorData;
		};
		dispatch({
			type: "products",
			payload: response.data?.Products ?? [],
		});
		return response.data;
	};

	const { data, isLoading, isSuccess } = useQuery<VendorData>({
		queryKey: ["vendor", id],
		queryFn: () => getVendor(`${url}/get/${id}`),
		staleTime: 20_000,
		refetchOnMount: "always",
	});

	const getProductCategory = useCallback(async () => {
		try {
			const result = (await fetch(
				`${baseUrl}category/vendorProductCategories/${id}`,
			)) as { data: ProductCategory[] };
			dispatch({ type: "productCategories", payload: result.data ?? [] });
		} catch (error) {
			console.error("Error fetching product categories:", error);
			dispatch({
				type: "error",
				payload: "Error fetching products. Please try again later.",
			});
		}
	}, [id]);

	const getAddresses = async (addrUrl: string): Promise<Address[]> => {
		const result = (await fetch(addrUrl, auth?.accessToken)) as {
			data: Address[];
		};
		cartDispatch({ type: "setAddresses", payload: result.data });
		return result.data;
	};

	const { isLoading: loadingAddress } = useQuery<Address[]>({
		queryKey: ["addresses"],
		queryFn: () => getAddresses(`${addressUrl}customer-addresses/${auth?.Id}`),
		placeholderData: keepPreviousData,
		staleTime: 20_000,
		refetchOnMount: "always",
		enabled: cartState.address,
	});

	const calculateTotalAmount = () => {
		if (cart) {
			const total = cart.reduce((sum, item) => sum + (item.Amount ?? 0), 0);
			dispatch({ type: "subTotal", payload: total });
			cartDispatch({ type: "amount", payload: total });
		}
	};

	// Same product can appear multiple times in the cart with different
	// variant/extras combinations, so we key cart-line operations on LineKey
	// (set in ProductModal) and fall back to Id for legacy lines.
	const lineMatch = (a: Product, b: Product) =>
		a.LineKey && b.LineKey ? a.LineKey === b.LineKey : a.Id === b.Id;

	const handleCartIncrement = (item: Product) => {
		setCart(
			cart.map((prod) =>
				lineMatch(prod, item)
					? {
							...prod,
							Quantity: (prod.Quantity ?? 0) + 1,
							Amount: ((item.Quantity ?? 0) + 1) * item.Price,
						}
					: prod,
			),
		);
		calculateTotalAmount();
	};

	const handleCartDecrement = (item: Product) => {
		if ((item.Quantity ?? 0) > 1) {
			setCart(
				cart.map((prod) =>
					lineMatch(prod, item)
						? {
								...prod,
								Quantity: (prod.Quantity ?? 0) - 1,
								Amount: ((item.Quantity ?? 0) - 1) * item.Price,
							}
						: prod,
				),
			);
			calculateTotalAmount();
		}
	};

	const handleCartItemDelete = (item: Product) => {
		setCart((prev) => prev.filter((prod) => !lineMatch(prod, item)));
	};

	const handleAddressChange = () => {
		if (!auth?.accessToken) {
			setCartState(false);
			setLogin(true);
			return;
		}
		getAddresses(`${baseUrl}address/customer-addresses/${auth?.Id}`);
		cartDispatch({ type: "address" });
	};

	const handleDeliveryInstruction = (e: ChangeEvent<HTMLTextAreaElement>) => {
		cartDispatch({ type: "setInstruction", payload: e.target.value });
	};

	const handleGift = async () => {
		cartDispatch({ type: "voucherError", payload: "" });
		if (!auth?.accessToken) {
			setCartState(false);
			setLogin(true);
			return;
		}
		const response = (await update(
			`${baseUrl}voucher/use?voucherCode=${cartState.voucherCode}&customerId=${auth.Id}`,
			cartState.voucherCode,
			auth.accessToken,
		)) as any;
		if (response.data?.IsActive && !response.data?.IsExpired) {
			cartDispatch({ type: "voucher", payload: response.data });
			cartDispatch({ type: "voucherError", payload: "" });
			cartDispatch({ type: "gift" });
			cartDispatch({
				type: "voucherMessage",
				payload: `${response.data?.DiscountAmount} Naira Discount applied `,
			});
		}
		if (response.error) {
			cartDispatch({ type: "voucherError", payload: response.error });
		}
	};

	const handleDeliveryFee = () => {
		if (cartState.distance == null || cartState.distance == 0) {
			if (cartState.voucher?.DiscountAmount) {
				const deliveryFee = 1500 - cartState.voucher.DiscountAmount;
				cartDispatch({ type: "deliveryFee", payload: deliveryFee });
				return;
			}
			if (cartState.voucher?.DiscountPercentage) {
				const deliveryFee = Math.trunc(
					1500 - (cartState.voucher?.DiscountPercentage / 100) * 1500,
				);
				cartDispatch({ type: "deliveryFee", payload: deliveryFee });
				return;
			}
			cartDispatch({ type: "deliveryFee", payload: 1500 });
		} else {
			if (cartState.voucher?.DiscountAmount) {
				const deliveryFee = Math.trunc(
					1500 +
						200 * (cartState.distance / 1000) -
						cartState.voucher.DiscountAmount,
				);
				cartDispatch({ type: "deliveryFee", payload: deliveryFee });
				return;
			}
			if (cartState.voucher?.DiscountPercentage) {
				const deliveryFee = Math.trunc(
					1500 +
						200 * (cartState.distance / 1000) -
						(cartState.voucher?.DiscountPercentage / 100) *
							(1500 + 200 * (cartState.distance / 1000)),
				);
				cartDispatch({ type: "deliveryFee", payload: deliveryFee });
				return;
			}
			const deliveryFee = Math.trunc(1500 + 200 * (cartState.distance / 1000));
			cartDispatch({ type: "deliveryFee", payload: deliveryFee });
		}
	};

	const handleLocation = async () => {
		cartDispatch({ type: "address" });
		cartDispatch({ type: "error", payload: "" });
		if (!location) return;
		const data = await createAddress(
			location.address,
			auth?.accessToken,
			auth?.Id,
			cartDispatch,
		);
		if (!data) return;
		cartDispatch({ type: "setAddress", payload: data });
		handleDeliveryFee();
	};

	const handleClick = async (address: Address) => {
		cartDispatch({ type: "setAddress", payload: address });
		cartDispatch({ type: "address" });
		cartDispatch({ type: "error", payload: "" });
	};

	const handleOrder = async () => {
		if (!cartState.deliveryAddress) {
			cartDispatch({
				type: "error",
				payload: "Please choose an address before you proceed ",
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
				Instruction: cartState.deliveryInstruction,
			};
			const response = (await post(orderUrl, order, auth.accessToken)) as any;
			if (response?.error) {
				cartDispatch({ type: "error", payload: "Error placing order " });
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
					OrderId: response.data?.Id,
					SelectedVariantId: item.SelectedVariantId ?? null,
					SelectedVariantName: item.SelectedVariantName ?? null,
					SelectedVariantPrice: item.SelectedVariantPrice ?? null,
					SelectedExtrasJson:
						item.SelectedExtras && item.SelectedExtras.length > 0
							? JSON.stringify(item.SelectedExtras)
							: null,
				};
				cartDispatch({ type: "order", payload: response.data });
				await post(orderItemUrl, orderItem, auth.accessToken);
			}

			// Multi-vendor: build one delivery (Logistic) record per unique vendor
			// in the cart. The current vendor page is the fallback for legacy lines
			// without a VendorId stamped on them.
			const vendorBuckets = new Map<
				string,
				{
					PickupAddress?: string;
					VendorId?: string | number;
					VendorName?: string;
				}
			>();
			for (const item of cart) {
				const vId = item.VendorId ?? data?.Id;
				const pickup = item.VendorAddress ?? data?.ContactAddress;
				if (!vId) continue;
				if (!vendorBuckets.has(String(vId))) {
					vendorBuckets.set(String(vId), {
						PickupAddress: pickup,
						VendorId: vId,
						VendorName: item.VendorName ?? data?.Name,
					});
				}
			}

			const pickups = Array.from(vendorBuckets.values());
			// Delivery fee is split evenly across pickups so the merchant settlement
			// per-leg is at least sane; the customer total stays cartState.deliveryFee.
			const perLegFee =
				pickups.length > 0
					? Math.trunc(cartState.deliveryFee / pickups.length)
					: cartState.deliveryFee;

			const deliveries = pickups.map((p) => ({
				PickupAddress: p.PickupAddress,
				DeliveryAddress: cartState.deliveryAddress,
				OrderId: response.data?.Id,
				DeliveryFee: perLegFee,
				PickupType: "Normal",
				VendorId: p.VendorId,
				VendorName: p.VendorName,
			}));

			// Keep the legacy single-pickup payload for downstream consumers that
			// still read `state.delivery` / localStorage.delivery as a single object.
			const primaryDelivery = deliveries[0] ?? {
				PickupAddress: data?.ContactAddress,
				DeliveryAddress: cartState.deliveryAddress,
				OrderId: response.data?.Id,
				DeliveryFee: cartState.deliveryFee,
				PickupType: "Normal",
			};
			cartDispatch({ type: "delivery", payload: primaryDelivery });
			setOrderLoading(false);
			cartDispatch({ type: "checkOut" });
			localStorage.setItem("delivery", JSON.stringify(primaryDelivery));
			localStorage.setItem("deliveries", JSON.stringify(deliveries));
		} catch (error) {
			console.log(error);
			dispatch({ type: "error", payload: "Error placing Order" });
			setOrderLoading(false);
		}
	};

	const clearCart = () => {
		setCart([]);
		cartDispatch({ type: "setInstruction", payload: "" });
		cartDispatch({ type: "total", payload: 0 });
		setCartState(false);
		localStorage.setItem("cart", JSON.stringify([]));
	};

	const handleTotalAmount = () => {
		const totalAmount = Math.trunc(state.subTotal + cartState.deliveryFee);
		cartDispatch({ type: "total", payload: totalAmount });
	};

	useEffect(() => {
		getProductCategory();
	}, []);

	useEffect(() => {
		if (cart.length === 0) {
			const currentCart = (JSON.parse(localStorage.getItem("cart") ?? "[]") ??
				[]) as Product[];
			const currentVendor = JSON.parse(
				localStorage.getItem("currentVendor") ?? "null",
			);
			if (currentCart) setCart(currentCart);
			if (currentVendor)
				cartDispatch({ type: "vendor", payload: currentVendor });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		calculateTotalAmount();
		if (cart.length > 0) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	useEffect(() => {
		if (cartState.vendor && cartState.deliveryAddress) {
			const distance = calculateDistance(
				{ lat: cartState.vendor?.Latitude, lng: cartState.vendor?.Longitude },
				{
					lat: cartState.deliveryAddress?.Latitude,
					lng: cartState.deliveryAddress?.Longitude,
				},
			);
			cartDispatch({ type: "distance", payload: distance });
		}
	}, [cartState.vendor, cartState.deliveryAddress]);

	useEffect(() => {
		handleDeliveryFee();
		handleTotalAmount();
	}, [
		state.subTotal,
		cartState.distance,
		cartState.deliveryFee,
		cart,
		cartState.voucher,
	]);

	const itemCount = cart.reduce((n, i) => n + (i.Quantity ?? 0), 0);

	const renderProductsGrid = () =>
		state.products.length === 0 ? (
			<div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
				<p className="text-sm text-muted-foreground">
					No products in this category yet.
				</p>
			</div>
		) : (
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{state.products.map((prod) => (
					<button
						type="button"
						key={prod.Id}
						onClick={() => {
							if (
								prod.Name.includes("Send Package") ||
								prod.Name.includes("Recieve Package")
							) {
								navigate("/shop/logistics");
								return;
							}
							dispatch({ type: "open" });
							dispatch({ type: "product", payload: prod });
						}}
						className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
						<div className="min-w-0 flex-1">
							<h3 className="line-clamp-1 text-sm font-semibold capitalize text-foreground">
								{prod.Name}
							</h3>
							{prod.Tag && (
								<p className="line-clamp-1 text-xs text-muted-foreground">
									{prod.Tag}
								</p>
							)}
							<p className="mt-1 text-sm font-medium text-primary">
								{formatNaira(prod.Price)}
							</p>
						</div>
						<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
							{prod.ProductImgUrl ? (
								<img
									src={prod.ProductImgUrl}
									alt={prod.Name}
									className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
									loading="lazy"
								/>
							) : (
								<div className="flex h-full items-center justify-center text-muted-foreground">
									<ShoppingBag className="h-5 w-5" />
								</div>
							)}
						</div>
					</button>
				))}
			</div>
		);

	return (
		<main className="bg-background text-foreground">
			<div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-12 lg:px-8">
				{/* LEFT: Vendor + products */}
				<div className="col-span-1 lg:col-span-8">
					<div className="flex flex-col gap-5">
						<div>
							<Link
								to="/shop"
								className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
								<ArrowLeft className="h-4 w-4" />
								<span>Back to vendors</span>
							</Link>
						</div>

						{isSuccess && (
							<>
								<div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border bg-muted md:h-72">
									{data?.VendorImgUrl ? (
										<img
											src={data.VendorImgUrl}
											alt={data.Name ?? "Vendor"}
											className="h-full w-full object-cover"
										/>
									) : (
										<div className="flex h-full items-center justify-center text-muted-foreground">
											No image
										</div>
									)}
									<Badge
										variant="secondary"
										className="absolute bottom-3 left-3 gap-1 rounded-full bg-background/80 text-foreground backdrop-blur">
										<Clock className="h-3.5 w-3.5" />
										16–26 mins
									</Badge>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between gap-3">
										<h1 className="text-2xl font-bold tracking-tight">
											{data?.Name}
										</h1>
										<span className="flex items-center gap-1 text-sm">
											<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
											<span className="text-muted-foreground">4.3</span>
										</span>
									</div>
									<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
										{(data?.OpeningHours || data?.ClosingHours) && (
											<span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5">
												<Clock className="h-3 w-3" />
												{data?.OpeningHours} – {data?.ClosingHours}
											</span>
										)}
										{data?.Tag && (
											<span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 capitalize">
												<Sparkles className="h-3 w-3" />
												{data.Tag}
											</span>
										)}
										{data?.ContactAddress && (
											<span className="inline-flex items-center gap-1 truncate rounded-full border border-border bg-card px-2 py-0.5">
												<MapPin className="h-3 w-3" />
												<span className="max-w-[220px] truncate">
													{data.ContactAddress}
												</span>
											</span>
										)}
									</div>
								</div>
							</>
						)}

						{isLoading && <VendorSkeleton />}

						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>Tap a product to add it to your cart.</span>
							<span>
								Min order:{" "}
								<span className="font-medium text-foreground">
									{formatNaira(2000)}
								</span>
							</span>
						</div>

						{/* Category tabs */}
						<div className="sticky top-16 z-10 -mx-1 flex gap-2 overflow-x-auto bg-background/95 px-1 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70">
							<button
								type="button"
								onClick={() => {
									dispatch({ type: "activeCategory", payload: null });
									dispatch({ type: "products", payload: data?.Products ?? [] });
								}}
								className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
									state.activeCategoryId === null
										? "border-primary bg-primary text-primary-foreground"
										: "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/40"
								}`}>
								All
							</button>
							{state.productCategories.map((cat) => {
								const isActive = state.activeCategoryId === cat.Id;
								return (
									<button
										type="button"
										key={cat.Id}
										onClick={() => {
											dispatch({ type: "activeCategory", payload: cat.Id });
											dispatch({ type: "products", payload: cat.Products });
										}}
										className={`shrink-0 rounded-full border px-4 py-1.5 text-sm capitalize transition ${
											isActive
												? "border-primary bg-primary text-primary-foreground"
												: "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/40"
										}`}>
										{cat.Name}
									</button>
								);
							})}
						</div>

						{isSuccess && renderProductsGrid()}

						{isLoading && (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<ProductSkeleton />
								<ProductSkeleton />
								<ProductSkeleton />
								<ProductSkeleton />
							</div>
						)}
					</div>
				</div>

				{/* RIGHT: Desktop cart sidebar */}
				{cart.length > 0 ? (
					<aside className="col-span-1 hidden lg:col-span-4 lg:block">
						<Card className="sticky top-20 border-border/60 shadow-sm">
							<CardContent className="space-y-4 p-5">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-xs uppercase tracking-wider text-muted-foreground">
											Your cart
										</p>
										<p className="text-base font-semibold capitalize">
											{(() => {
												const names = Array.from(
													new Set(
														cart
															.map((c) => c.VendorName)
															.filter(Boolean) as string[],
													),
												);
												if (names.length === 0) return data?.Name;
												if (names.length === 1) return names[0];
												return `${names.length} vendors`;
											})()}
										</p>
									</div>
									<Badge variant="secondary" className="rounded-full">
										{itemCount} item{itemCount === 1 ? "" : "s"}
									</Badge>
								</div>

								<div className="space-y-2">
									{cart.map((item) => (
										<div
											key={String(item.LineKey ?? item.Id)}
											className="rounded-lg border border-border bg-background p-3">
											<div className="flex items-start justify-between gap-2">
												<div className="min-w-0">
													<p className="line-clamp-1 text-sm font-medium">
														{item.Name}
													</p>
													{item.VendorName && (
														<p className="line-clamp-1 text-[11px] uppercase tracking-wide text-muted-foreground">
															{item.VendorName}
														</p>
													)}
													{item.SelectedVariantName && (
														<p className="text-xs text-muted-foreground">
															{item.SelectedVariantName}
														</p>
													)}
													{item.SelectedExtras &&
														item.SelectedExtras.length > 0 && (
															<p className="line-clamp-1 text-xs text-muted-foreground">
																+{" "}
																{item.SelectedExtras.map((e) => e.Name).join(
																	", ",
																)}
															</p>
														)}
													<p className="text-xs text-muted-foreground">
														{formatNaira(item.Price)}
													</p>
												</div>
												<button
													type="button"
													onClick={() => handleCartItemDelete(item)}
													aria-label="Remove item"
													className="rounded-md p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
											<div className="mt-2 flex items-center justify-between">
												<div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
													<button
														type="button"
														onClick={() => handleCartDecrement(item)}
														aria-label="Decrease quantity"
														className="rounded-full p-1 hover:bg-muted">
														<Minus className="h-3.5 w-3.5" />
													</button>
													<span className="min-w-[1.25rem] text-center text-sm font-medium">
														{item.Quantity}
													</span>
													<button
														type="button"
														onClick={() => handleCartIncrement(item)}
														aria-label="Increase quantity"
														className="rounded-full p-1 hover:bg-muted">
														<Plus className="h-3.5 w-3.5" />
													</button>
												</div>
												<span className="text-sm font-semibold">
													{formatNaira(item.Amount ?? 0)}
												</span>
											</div>
										</div>
									))}
								</div>

								<Separator />

								{/* Address */}
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="flex items-center gap-1.5 font-medium">
											<MapPin className="h-4 w-4 text-primary" /> Delivery
											address
										</span>
										<button
											type="button"
											onClick={() =>
												cartState.address
													? cartDispatch({ type: "address" })
													: handleAddressChange()
											}
											className="text-xs text-primary hover:underline">
											{cartState.address ? "Close" : "Change"}
										</button>
									</div>
									{cartState.deliveryAddress && (
										<p className="line-clamp-2 text-xs text-muted-foreground">
											{cartState.deliveryAddress?.Name}
										</p>
									)}
									{cartState.address && (
										<div className="rounded-lg border border-border bg-background p-3">
											{loadingAddress && (
												<div className="flex items-center justify-center py-2">
													<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
												</div>
											)}
											<div className="space-y-2">
												{(cartState.addresses as Address[]).map((ad) => (
													<label
														key={ad.Id}
														htmlFor={`address${ad.Id}`}
														className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent/40">
														<input
															type="radio"
															name="address"
															id={`address${ad.Id}`}
															value={`${ad.Name}, ${ad.Town}, ${ad.City}`}
															onChange={() => handleClick(ad)}
															className="h-4 w-4 cursor-pointer accent-primary"
														/>
														<span className="line-clamp-1 text-foreground">
															{ad.Name} {ad.Town}
														</span>
													</label>
												))}
											</div>
											<div className="mt-3 flex flex-wrap justify-between gap-2 text-xs">
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => handleLocation()}>
													Use current location
												</Button>
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => dispatch({ type: "edit" })}>
													Add new address
												</Button>
											</div>
										</div>
									)}
								</div>

								{/* Instructions */}
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="flex items-center gap-1.5 font-medium">
											<StickyNote className="h-4 w-4 text-primary" /> Delivery
											instructions
										</span>
										<button
											type="button"
											onClick={() => cartDispatch({ type: "instruction" })}
											className="text-xs text-primary hover:underline">
											{cartState.instruction ? "Close" : "Add"}
										</button>
									</div>
									{cartState.instruction && (
										<Textarea
											rows={3}
											placeholder="e.g. give it to the receptionist"
											onChange={handleDeliveryInstruction}
										/>
									)}
								</div>

								{/* Voucher */}
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="flex items-center gap-1.5 font-medium">
											<BadgePercent className="h-4 w-4 text-primary" /> Use a
											gift code
										</span>
										<button
											type="button"
											onClick={() => cartDispatch({ type: "gift" })}
											className="text-xs text-primary hover:underline">
											{cartState.gift ? "Close" : "Add"}
										</button>
									</div>
									{cartState.gift && (
										<div className="space-y-2">
											<Input
												placeholder="Gift code"
												onChange={(e) =>
													cartDispatch({
														type: "voucherCode",
														payload: e.target.value,
													})
												}
											/>
											<div className="flex items-center justify-between gap-2">
												{cartState.voucherError && (
													<p className="text-xs text-destructive">
														{cartState.voucherError}
													</p>
												)}
												<Button
													type="button"
													size="sm"
													variant="outline"
													className="ml-auto"
													onClick={() => handleGift()}>
													Use code
												</Button>
											</div>
										</div>
									)}
								</div>

								<div className="flex items-start gap-2 rounded-lg border border-amber-200/60 bg-amber-50 p-3 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
									<Info className="mt-0.5 h-4 w-4 shrink-0" />
									<p className="text-xs">
										Confirm your delivery address so we bring your order to the
										right place.
									</p>
								</div>

								<Separator />

								<div className="space-y-1.5 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Subtotal ({cart.length} item{cart.length === 1 ? "" : "s"}
											)
										</span>
										<span>{formatNaira(state.subTotal)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Delivery fee</span>
										<span>{formatNaira(cartState.deliveryFee)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Service fee</span>
										<span>{formatNaira(0)}</span>
									</div>
									<Separator />
									<div className="flex justify-between text-base font-semibold">
										<span>Total</span>
										<span>{formatNaira(cartState.total)}</span>
									</div>
									{cartState.voucherMessage && (
										<p className="flex items-center gap-1 text-xs text-primary">
											<ThumbsUp className="h-3.5 w-3.5" />
											{cartState.voucherMessage}
										</p>
									)}
								</div>

								{(cartState.error || state.error) && (
									<p className="text-xs text-destructive">
										{cartState.error || state.error}
									</p>
								)}

								<div className="space-y-2">
									<Button
										onClick={handleOrder}
										disabled={orderLoading}
										className="w-full">
										{orderLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Placing order…
											</>
										) : (
											"Place order"
										)}
									</Button>
									<Button
										type="button"
										variant="outline"
										onClick={clearCart}
										className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
										Clear cart
									</Button>
								</div>
							</CardContent>
						</Card>
					</aside>
				) : (
					<EmptyCartDesktop />
				)}
			</div>

			{/* Mobile cart Sheet (when items present) / Empty state otherwise */}
			{cart.length >= 1 ? (
				<Cart
					vendor={data}
					subTotal={state.subTotal}
					handleCartDecrement={handleCartDecrement}
					handleCartIncrement={handleCartIncrement}
					handleCartItemDelete={handleCartItemDelete}
					handleNewAddress={
						dispatch as unknown as (a: { type: string }) => void
					}
					handleGift={handleGift}
					handleDeliveryFee={handleDeliveryFee}
				/>
			) : (
				<EmptyCart />
			)}

			<ProductModal
				open={state.open}
				handleClose={dispatch as unknown as (a: { type: string }) => void}
				product={
					state.product as unknown as {
						Id: string | number;
						Name: string;
						Tag?: string;
						Price: number;
						ProductImgUrl: string;
					}
				}
				vendor={(data ?? { Id: "" }) as { Id: string | number }}
			/>
			<NewAddressModal
				open={state.edit}
				handleClose={dispatch as unknown as (a: { type: string }) => void}
			/>
		</main>
	);
};

export default Vendor;
