import {
	Plus,
	Bookmark,
	Trash2,
	Info,
	Minus,
	Star,
	Clock,
	ArrowLeft,
	ThumbsUp,
} from "lucide-react";
import {
	useState,
	useReducer,
	useEffect,
	useCallback,
	type ChangeEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cart from "./Cart";
import EmptyCart from "./EmptyCart";
import useCart from "../../hooks/useCart";
import ProductModal from "./ProductModal";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import baseUrl from "../../api/baseUrl";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import LoadingGif from "../shared/LodingGif";
import EmptyCartDesktop from "./EmptyCartDesktop";
import usePost from "../../hooks/usePost";
import { createAddress } from "./services/services";
import VendorSkeleton from "../shared/VendorSkeleton";
import ProductSkeleton from "../shared/ProductSkeleton";
import useUpdate from "../../hooks/useUpdate";
import NewAddressModal from "./NewAddressModal";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";

interface Product {
	Id: string | number;
	Name: string;
	Price: number;
	Quantity?: number;
	Amount?: number;
	Description?: string;
	Tag?: string;
	ProductImgUrl?: string;
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
	| { type: "subTotal"; payload: number };

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
		default:
			return state;
	}
};

const Vendor = () => {
	const { id } = useParams();
	const fetch = useFetch();
	const post = usePost();
	const update = useUpdate();
	const [, setProducts] = useState<unknown>(null);
	const [, setOrigin] = useState("");
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

	//console.log(data)

	const getProductCategory = useCallback(async () => {
		try {
			const result = (await fetch(
				`${baseUrl}category/vendorProductCategories/${id}`,
			)) as { data: ProductCategory[] };
			setProducts(result);
			dispatch({ type: "productCategories", payload: result.data ?? [] });
		} catch (error) {
			console.error("Error fetching product categories:", error);
			dispatch({
				type: "error",
				payload: "Error fetching products. Please try again later.",
			});
		}
	}, [id]);

	//console.log(state.productCategories)

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
			const total = cart.reduce((sum, item) => {
				return sum + (item.Amount ?? 0);
			}, 0);

			dispatch({ type: "subTotal", payload: total });
			cartDispatch({ type: "amount", payload: total });
		}

		return;
	};

	const handleCartIncrement = (item: Product) => {
		setCart(
			cart.map((prod) =>
				prod.Id === item.Id
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
					prod.Id === item.Id
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

		return;
	};

	const handleCartItemDelete = (item: Product) => {
		setCart((prev) => prev.filter((prod) => prod.Id !== item.Id));
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
			//handleTotalAmount()
			//handleDeliveryFee(response.data?.DiscountAmount)
		}

		if (response.error) {
			cartDispatch({ type: "voucherError", payload: response.error });
			console.log(response.error);
			return;
		}
	};

	const handleDeliveryFee = () => {
		if (cartState.distance == null || cartState.distance == 0) {
			// if(discountPercentage){
			//   const deliveryFee = Math.trunc( 1500 - ((discountPercentage / 100) * (1500) ));
			//   cartDispatch({ type: "deliveryFee", payload: deliveryFee });
			//   return;
			// }else
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
			const deliveryFee = 1500;
			cartDispatch({ type: "deliveryFee", payload: deliveryFee });
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
				cartDispatch({
					type: "error",
					payload: "Error placing order ",
				});
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
				};

				cartDispatch({ type: "order", payload: response.data });
				await post(orderItemUrl, orderItem, auth.accessToken);
			}

			const delivery = {
				PickupAddress: cartState.vendor?.ContactAddress,
				DeliveryAddress: cartState.deliveryAddress,
				OrderId: response.data?.Id,
				DeliveryFee: cartState.deliveryFee,
				PickupType: "Normal",
			};
			cartDispatch({ type: "delivery", payload: delivery });

			setOrderLoading(false);
			cartDispatch({ type: "checkOut" });

			localStorage.setItem("delivery", JSON.stringify(delivery));
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
		//setVendors(data?.result);
		//console.log('services')
	}, []);

	useEffect(() => {
		if (cart.length === 0) {
			const currentCart = (JSON.parse(localStorage.getItem("cart") ?? "[]") ??
				[]) as Product[];
			const currentVendor = JSON.parse(
				localStorage.getItem("currentVendor") ?? "null",
			);
			if (currentCart) {
				setCart(currentCart);
			}
			if (currentVendor) {
				cartDispatch({ type: "vendor", payload: currentVendor });
			}
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
				{
					lat: cartState.vendor?.Latitude,
					lng: cartState.vendor?.Longitude,
				},
				{
					lat: cartState.deliveryAddress?.Latitude,
					lng: cartState.deliveryAddress?.Longitude,
				},
			);
			cartDispatch({ type: "distance", payload: distance });
			console.log(distance);
		}
	}, [cartState.vendor, cartState.deliveryAddress]);

	// const { distance, duration, error } = useDistance(
	//   origin,
	//   cartState.deliveryAddress?.Name
	// );

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

	//console.log(distance);
	//console.log(cartState.vendor);
	return (
		<main className=" flex justify-center  ">
			<div className=" w-11/12 lg:w-10/12  grid grid-cols-1 lg:grid-cols-12 justify-center gap-8">
				<div className=" w-full  col-span-8">
					<div className=" flex flex-col  w-full justify-center gap-5 px-2">
						<div>
							<Link to="/shop" className="text-gray flex gap-2 items-center">
								<span>
									<ArrowLeft className="h-5 w-5" />
								</span>
								<span className="text-sm">Vendors</span>
							</Link>
						</div>
						{isSuccess && (
							<>
								<div className=" border-2 relative w-full rounded-lg h-48 md:h-72 ">
									<img
										src={data?.VendorImgUrl}
										alt=""
										className=" w-full rounded-lg h-full"
									/>
									<div className=" pb-1 absolute z-10 bottom-1 m-2 ">
										<span className=" flex items-center gap-1 text-secondary bg-white py-2 px-2 rounded border bg-muted border-accent">
											<Clock className="h-4 w-4" />{" "}
											<span className="">16-26 mins</span>
										</span>
									</div>
								</div>
								<div>
									<div className=" flex justify-between items-center py-2">
										<h2 className=" text-xl font-bold">{data?.Name}</h2>
										<span className=" flex items-center gap-1 text-sm text-lightgreen">
											<span className=" dark:text-gray text-grayTxt">4.3</span>{" "}
											<Star className="h-4 w-4" />
										</span>
									</div>

									<div className=" flex flex-col  ">
										<span className=" text-gray text-md font-medium">
											{data?.OpeningHours} - {data?.ClosingHours}
										</span>
										<span className=" capitalize text-secondary text-md font-medium">
											{data?.Tag}
										</span>
									</div>
								</div>
							</>
						)}

						{isLoading && <VendorSkeleton />}

						<div className="pt-3 ">
							<div className=" flex justify-end items-center">
								<p className="">
									<span>
										Min Order: <span>&#8358;2,000</span>
									</span>
								</p>
							</div>
						</div>

						<div className=" sticky top-20 bg-primary dark:bg-background flex justify-start gap-3 pt-3 text-center flex-nowrap overflow-x-auto ">
							<button
								type="button"
								onClick={() =>
									dispatch({
										type: "products",
										payload: data?.Products ?? [],
									})
								}
								className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md">
								All
							</button>

							{state.productCategories.map((cat) => (
								<button
									type="button"
									key={cat.Id}
									onClick={() =>
										dispatch({ type: "products", payload: cat.Products })
									}
									className=" px-3 py-1 bg-secondary capitalize text-nowrap rounded-lg shadow-md ">
									{cat.Name}
								</button>
							))}
						</div>

						{isSuccess && (
							<div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
								{state.products.map((prod) => (
									<span
										key={prod.Id}
										onClick={() => {
											if (
												prod.Name.includes("Send Package") ||
												prod.Name.includes("Recieve Package")
											) {
												console.log("clicked");
												navigate("/shop/logistics");
												return;
											}
											dispatch({ type: "open" });
											dispatch({ type: "product", payload: prod });
										}}>
										<div className=" cursor-pointer flex justify-between items-center border border-gray rounded-lg p-4 hover:bg-graybg dark:hover:bg-muted shadow-lg ">
											<div className=" flex flex-col">
												<h3 className=" text-base font-semibold capitalize">
													{prod.Name}
												</h3>
												<p className=" text-sm text-gray">{prod.Tag}</p>
												<span className=" text-secondary">
													&#8358;{prod.Price}
												</span>
											</div>
											<div className=" w-20 h-20 rounded-md">
												<img
													src={prod.ProductImgUrl}
													alt=""
													className=" w-full h-full rounded-md"
												/>
											</div>
										</div>
									</span>
								))}
							</div>
						)}

						{isLoading && (
							<div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
								<ProductSkeleton />
								<ProductSkeleton />
								<ProductSkeleton />
								<ProductSkeleton />
							</div>
						)}
					</div>
				</div>
				{cart.length > 0 ? (
					<div className=" hidden  overflow-y-auto border-l-2 border-graybg col-span-4 py-10 px-2 lg:flex flex-col   items-start   h-full rounded-lg">
						<div className=" flex justify-between items-center pb-4">
							<p className=" text-base capitalize text-secondary">
								{cartState.vendor?.Name}
							</p>
						</div>
						{cart?.map((item, index) => (
							<div
								key={item.Id}
								className=" border border-dashed border-gray rounded-lg w-full mb-3">
								<div className=" flex justify-between items-center py-2 px-2">
									<div>
										<h3 className=" text-sm font-medium">{`Item ${
											index + 1
										}`}</h3>
									</div>
									<button onClick={() => handleCartItemDelete(item)}>
										<span className=" text-red hover:text-redborder">
											<Trash2 className="h-5 w-5" />
										</span>
									</button>
								</div>
								<div className=" flex justify-between items-center py-2 px-2">
									<p className=" flex flex-col items-start">
										<span className=" text-sm">{item.Name}</span>
										<span className=" text-gray text-xs">
											&#8358;<span>{item.Price}</span>
										</span>
									</p>
									<span className=" px-2 rounded-full bg-gray-200 flex items-center gap-2">
										<button
											onClick={() => handleCartDecrement(item)}
											className="shadow-md cursor-pointer rounded-lg px-1 ">
											{" "}
											<Minus className="h-4 w-4" />
										</button>
										<span className=" text-md">{item.Quantity}</span>
										<button
											onClick={() => handleCartIncrement(item)}
											className=" shadow-lg cursor-pointer rounded-lg px-1 ">
											<Plus className="h-4 w-4" />
										</button>
									</span>
								</div>
							</div>
						))}

						<div className=" w-full">
							<div className=" py-2">
								<div className=" flex justify-between items-center text-sm font-normal">
									<p>
										<span className="font-bold">Choose Address:</span>{" "}
										{cartState.deliveryAddress?.Name}{" "}
									</p>
									{cartState.address ? (
										<button
											onClick={() => cartDispatch({ type: "address" })}
											className=" text-background cursor-pointer">
											Close
										</button>
									) : (
										<button
											onClick={() => handleAddressChange()}
											className=" text-background cursor-pointer">
											Change
										</button>
									)}
								</div>
							</div>
							<div
								className={`${
									cartState.address ? "block" : "hidden"
								} border-2 rounded-lg border-graybg`}>
								{loadingAddress && (
									<div className="flex justify-center items-center">
										{" "}
										<LoadingGif />{" "}
									</div>
								)}
								<form>
									{(cartState.addresses as Address[]).map((ad) => (
										<div
											key={ad.Id}
											className=" flex gap-3 text-gray  text-sm rounded-lg px-5 py-2">
											{" "}
											<input
												type="radio"
												name="address"
												id={`address${ad.Id}`}
												value={`${ad.Name}, ${ad.Town}, ${ad.City}`}
												onChange={(e) => {
													handleClick(ad);
													//handleDeliveryAddress(e)
												}}
												className="cursor-pointer"
											/>
											<label
												htmlFor={`address${ad.Id}`}
												className="cursor-pointer">
												{" "}
												{ad.Name} {ad.Town}
											</label>
										</div>
									))}
								</form>

								<div className="text-sm flex justify-between px-2 py-2">
									<button
										onClick={() => handleLocation()}
										className="text-background border p-2 rounded-xl border-gray hover:bg-graybg cursor-pointer">
										{" "}
										Use Current Location{" "}
									</button>
									<button
										onClick={() => dispatch({ type: "edit" })}
										className="text-background border p-2 rounded-xl border-gray hover:bg-graybg cursor-pointer">
										{" "}
										Add new Address{" "}
									</button>
								</div>
							</div>
							<div className=" py-2">
								<p className=" flex justify-between items-center text-sm font-normal">
									<span>Delivery instructions</span>
									{cartState.instruction ? (
										<button
											onClick={() => cartDispatch({ type: "instruction" })}
											className=" text-background">
											Close
										</button>
									) : (
										<button
											onClick={() => cartDispatch({ type: "instruction" })}
											className=" text-background">
											Add
										</button>
									)}
								</p>
								<div
									className={`flex flex-col ${
										cartState.instruction ? "block" : "hidden"
									}`}>
									<textarea
										name="instructions"
										id=""
										rows={3}
										className="border rounded-lg border-gray bg-graybg text-accent p-3 "
										placeholder="e.g  give it to the receptionist"
										onChange={(e) => handleDeliveryInstruction(e)}></textarea>
								</div>
							</div>
							<div className=" py-2">
								<p className=" flex justify-between items-center text-sm font-normal mb-2">
									<span>Use Gift </span>
									{cartState.gift ? (
										<button
											onClick={() => cartDispatch({ type: "gift" })}
											className=" text-background">
											Close
										</button>
									) : (
										<button
											onClick={() => cartDispatch({ type: "gift" })}
											className=" text-background">
											Add
										</button>
									)}
								</p>
								<div
									className={`flex flex-col ${
										cartState.gift ? "block" : "hidden"
									} mb-2`}>
									<input
										name="gift"
										id=""
										className="border rounded-lg border-gray bg-graybg text-accent p-3 mb-1"
										placeholder="gift code"
										onChange={(e) =>
											cartDispatch({
												type: "voucherCode",
												payload: e.target.value,
											})
										}
									/>
									<div className="flex justify-between">
										{cartState.voucherError && (
											<p className="text-sm text-redborder">
												{" "}
												{cartState.voucherError}
											</p>
										)}
										<button
											onClick={() => {
												handleGift();
											}}
											className=" text-background ">
											Use Code
										</button>{" "}
									</div>
								</div>
							</div>
						</div>
						<div className=" flex justify-between items-center border-y ">
							<div className=" flex items-center gap-2 bg-cyan-100 py-2 px-1 rounded">
								<div className="">
									<span className=" text-yellow">
										<Info className="h-5 w-5" />
									</span>
								</div>
								<div className=" text-gray">
									<h1 className=" text-sm font-normal">
										Delivery Address confirmation
									</h1>
									<p className=" text-xs">
										This helps ensure that your order is brought to the right
										address
									</p>
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className=" py-2">
								<p className=" flex justify-between items-center text-sm font-normal">
									<span>
										Sub total <span>({cart.length} item)</span>
									</span>
									<span className="">&#8358;{state.subTotal}</span>
								</p>
							</div>
							<div className=" py-2">
								<p className=" flex justify-between items-center text-sm font-normal">
									<span>Delivery fee</span>
									<span className="">&#8358;{cartState.deliveryFee}</span>
								</p>
							</div>
							<div className=" py-2">
								<p className=" flex justify-between items-center text-sm font-normal">
									<span>Service fee</span>
									<span className="">&#8358;0.0</span>
								</p>
							</div>
							<div className=" py-2">
								<p className=" flex justify-between items-center text-sm font-semibold">
									<span className="">Total</span>
									<span className="">&#8358;{cartState.total}</span>
								</p>
								{cartState.voucherMessage && (
									<p className="text-sm text-background">
										{" "}
										{cartState.voucherMessage}{" "}
										<ThumbsUp className="inline h-4 w-4" />{" "}
									</p>
								)}
							</div>
							<div>
								{cartState.error && (
									<span className="text-redborder"> {cartState.error}</span>
								)}
							</div>
							{state.error && (
								<span className="text-redborder"> {state.error}</span>
							)}
							<div className=" pt-3 text-center w-full">
								<button
									onClick={handleOrder}
									className=" w-full bg-background py-4 px-3 flex justify-center rounded">
									{orderLoading ? (
										<LoadingGif />
									) : (
										<span className=" text-primary">Place Order</span>
									)}
								</button>
							</div>
							<div className=" pt-3 text-center w-full">
								<button
									onClick={clearCart}
									className=" w-full bg-redborder py-4 px-3 rounded">
									<span className=" text-red">Clear Order</span>
								</button>
							</div>
							<div className=" w-full">
								<button className=" w-full py-2 px-3">
									<span className=" text-background">
										<Bookmark className="inline h-4 w-4" />
									</span>
									<span className=" text-background text-sm">
										Save for later
									</span>
								</button>
							</div>
						</div>
					</div>
				) : (
					<EmptyCartDesktop />
				)}
			</div>

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
