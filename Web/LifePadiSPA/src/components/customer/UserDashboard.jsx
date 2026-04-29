import {
	X as Clear,
	CreditCard,
	Check as Done,
	Truck as LocalShipping,
	Frown,
	ChevronLeft,
	AlertOctagon,
	Crosshair,
	Eye,
	History,
	Loader2,
	MapPin,
	Heart,
	Gift as GiftIcon,
	ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import baseUrl from "../../api/baseUrl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useReducer } from "react";
import CancelOrder from "./subcomponents/CancelOrder";

const reducer = (state, action) => {
	switch (action.type) {
		case "open":
			return { ...state, open: true };
		case "close":
			return { ...state, open: false };
		case "cancel":
			return { ...state, cancel: !state.cancel };
		case "orderId":
			return { ...state, orderId: action.payload };
		default:
			return state;
	}
};

const UserDashboard = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}order/customer/`;
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		close: false,
		cancel: false,
		orderId: null,
	});

	const getOrder = async (url) => {
		const response = await fetch(url, auth.accessToken);

		return response.data;
	};

	const {
		data: orders,
		isError: ordersError,
		isSuccess: ordersSuccess,
		isLoading: ordersLoading,
	} = useQuery({
		queryKey: ["orders", page, search],
		queryFn: () =>
			getOrder(`${url}${auth.Id}?PageNumber=${page}&SearchString=${search}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	return (
		<section className="  dark:bg-background text-foreground dark:text-primary bg-lightGray h-auto min-h-screen">
			<div className=" px-3 md:px-10 py-3">
				<Link to="/shop" className="text-lg">
					<ChevronLeft className="inline h-5 w-5" />
					Back to shop
				</Link>
			</div>
			<div className="pt-5 flex flex-col items-center">
				<div className="w-full max-w-5xl px-3 md:px-0 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
					<Link
						to="/user/address"
						className="rounded-xl border border-border bg-card hover:bg-muted/40 transition p-4 flex items-center gap-3">
						<span className="rounded-full bg-blue-500/10 text-blue-500 p-2">
							<MapPin className="h-5 w-5" />
						</span>
						<div>
							<p className="text-sm font-semibold">Addresses</p>
							<p className="text-xs text-muted-foreground">Manage</p>
						</div>
					</Link>
					<Link
						to="/user/favourite"
						className="rounded-xl border border-border bg-card hover:bg-muted/40 transition p-4 flex items-center gap-3">
						<span className="rounded-full bg-rose-500/10 text-rose-500 p-2">
							<Heart className="h-5 w-5" />
						</span>
						<div>
							<p className="text-sm font-semibold">Favourites</p>
							<p className="text-xs text-muted-foreground">Saved items</p>
						</div>
					</Link>
					<Link
						to="/user/gift"
						className="rounded-xl border border-border bg-card hover:bg-muted/40 transition p-4 flex items-center gap-3">
						<span className="rounded-full bg-amber-500/10 text-amber-500 p-2">
							<GiftIcon className="h-5 w-5" />
						</span>
						<div>
							<p className="text-sm font-semibold">Gifts</p>
							<p className="text-xs text-muted-foreground">Send & receive</p>
						</div>
					</Link>
					<Link
						to="/shop"
						className="rounded-xl border border-border bg-card hover:bg-muted/40 transition p-4 flex items-center gap-3">
						<span className="rounded-full bg-emerald-500/10 text-emerald-500 p-2">
							<ShoppingBag className="h-5 w-5" />
						</span>
						<div>
							<p className="text-sm font-semibold">Shop</p>
							<p className="text-xs text-muted-foreground">Browse stores</p>
						</div>
					</Link>
				</div>
				<h1 className=" mb-5 text-4xl text-center font-bold">My Orders</h1>
				<main className=" flex gap-8">
					<section className="right-section right-0 top-0 max-lg:w-full">
						{ordersLoading && (
							<Loader2 className="h-8 w-8 animate-spin text-primary" />
						)}

						{ordersError && (
							<Alert variant="destructive">
								<AlertDescription>
									Cannot fetch your orders right now. Please try again later.
								</AlertDescription>
							</Alert>
						)}

						{orders?.orders?.length < 1 ? (
							<div className="flex flex-col items-center gap-6">
								<h1 className="text-2xl">
									{" "}
									You currently have no orders{" "}
									<span className="text-background ">
										{" "}
										<Frown className="animate-bounce h-8 w-8 inline" />{" "}
									</span>{" "}
								</h1>
								<div>
									<Link
										to="/shop"
										className="bg-secondary p-4 rounded-xl shadow-xl text-xl font-semibold hover:bg-background cursor-pointer">
										{" "}
										Explore our stores{" "}
									</Link>
								</div>
							</div>
						) : (
							<>
								{ordersSuccess &&
									orders.orders?.map((order) => (
										<div
											key={order.Id}
											className=" bg-primary hover:bg-graybg dark:hover:bg-muted dark:bg-card dark:text-primary border border-gray border-opacity-15 rounded-lg mt-5 p-4 shadow-lg">
											<div className="">
												<div className=" flex justify-between flex-wrap max-sm:gap-2 items-center pb-4">
													<div className=" flex gap-2 items-center">
														<span className=" text-base font-medium  text-opacity-60">
															Order ID:
															<span className="text-base px-2 font-normal">
																{order.Order_Id}
															</span>
														</span>
														{order.Status === "Pending" && (
															<span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-light px-2">
																Pending
															</span>
														)}
														{order.Status === "Ongoing" && (
															<span className=" bg-gold rounded-md text-lightorange text-opacity- text-sm font-normal inline-flex gap-1 items-center px-2">
																<LocalShipping />
																In transit
															</span>
														)}
														{order.Status === "Cancelled" && (
															<span className=" bg-red bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
																<Clear />
																Cancelled
															</span>
														)}

														{order.Status === "Completed" && (
															<span className=" bg-lightcyan bg-opacity-25 rounded-md text-sm font-thin inline-flex gap-1 items-center px-2">
																<Done />
																Completed
															</span>
														)}
													</div>
													{/* <div className="">
                        <button className=" flex items-center gap-1 text-background text-lg font-normal">
                          <span>
                            <FileDownloadOutlined />
                          </span>
                          Download invoice
                        </button>
                      </div> */}
												</div>
												<div className=" flex items-center max-sm:flex-col gap-4 mb-5">
													<button
														disabled={
															order.Status == "Ongoing" ||
															order.Status == "Completed" ||
															order.Status == "Cancelled"
																? true
																: false
														}
														className={`${
															order.Status == "Ongoing" ||
															order.Status == "Completed" ||
															order.Status == "Cancelled"
																? "bg-gray"
																: "bg-redborder"
														}  p-1 cursor-pointer rounded-md max-sm:w-full`}
														onClick={() => {
															dispatch({
																type: "orderId",
																payload: `${order.Id}`,
															});
															dispatch({ type: "cancel" });
														}}>
														<span className="flex items-center justify-center">
															{" "}
															<AlertOctagon className="inline h-5 w-5" />
															Cancel Order
														</span>
													</button>
													<button
														onClick={() =>
															navigate(`/user/track/${order.Status}`)
														}
														className="border border-gray cursor-pointer font-normal text-opacity-60 hover:text-gray border-opacity-50 p-1 rounded-md max-sm:w-full">
														<span className=" flex items-center max-sm:justify-center gap-1">
															<span className="">
																<Crosshair className="inline h-5 w-5" />
															</span>
															Track Order
														</span>
													</button>
													<button className="border border-gray bg-background border-opacity-50 bg-opacity-80 p-1 cursor-pointer rounded-md max-sm:w-full">
														<Link
															to={`/user/details/${order.Id}`}
															className=" font-normal  text-opacity-80 hover:text-gray block">
															<span>
																{" "}
																<Eye className="inline h-5 w-5" /> Order Details
															</span>
														</Link>
													</button>
												</div>
											</div>
											<hr className=" border-gray border-opacity-30" />
											<div className=" mt-5">
												<div className=" flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4 pb-5">
													<span className=" inline-flex gap-2 items-center font-normal text-base max-md:text-sm max-sm:text-xl">
														Order Date:
														<span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
															{new Date(order.CreatedAt).toDateString()}
														</span>
													</span>
													<span className=" inline-flex gap-2 items-center font-normal text-base max-md:text-sm max-sm:text-xl">
														Type:
														<span className=" text-grayTxt dark:text-gray text-opacity-70 font-normal">
															{" "}
															{order.Type}
														</span>
													</span>
													<span className="inline-flex items-center gap-2 font-normal text-base max-md:text-sm ">
														Delivery Status:
														<span className=" text-grayTxt dark:text-gray  text-opacity-70 font-normal inline-flex gap-1 items-center">
															{order.IsDelivered ? (
																<span>
																	{" "}
																	<i className="line-icon-Box-Open text-background"></i>{" "}
																	Delivered{" "}
																</span>
															) : (
																<span>
																	{" "}
																	<i className="line-icon-Box-Close text-lightorange"></i>{" "}
																	Not Delivered{" "}
																</span>
															)}
														</span>
													</span>
												</div>
												<p className="bg-gray bg-opacity-15 p-2 inline-flex items-center gap-2 w-full rounded-md text-lightorange">
													{order.Status == "Pending" ? (
														<span>
															{" "}
															<History className="inline h-5 w-5" /> Processing
															Order{" "}
														</span>
													) : order.Status == "Ongoing" ? (
														<span>
															{" "}
															<LocalShipping /> Expected Delivery - less than 20
															min{" "}
														</span>
													) : order.Status == "Cancelled" ? (
														<span>
															{" "}
															<Clear /> Order Cancelled{" "}
														</span>
													) : order.Status == "Completed" ? (
														<span>
															{" "}
															<Done /> Order Completed{" "}
														</span>
													) : (
														""
													)}
												</p>
											</div>
										</div>
									))}

								<nav className=" mt-5 mb-10 flex justify-center">
									<Pagination>
										<PaginationContent>
											<PaginationItem>
												<PaginationPrevious
													href="#"
													onClick={(e) => {
														e.preventDefault();
														if (page > 1) setPage(page - 1);
													}}
													aria-disabled={page <= 1}
												/>
											</PaginationItem>
											{Array.from(
												{ length: orders?.dataList?.TotalPages || 0 },
												(_, i) => i + 1,
											).map((p) => (
												<PaginationItem key={p}>
													<PaginationLink
														href="#"
														isActive={p === page}
														onClick={(e) => {
															e.preventDefault();
															setPage(p);
														}}>
														{p}
													</PaginationLink>
												</PaginationItem>
											))}
											<PaginationItem>
												<PaginationNext
													href="#"
													onClick={(e) => {
														e.preventDefault();
														if (page < (orders?.dataList?.TotalPages || 1))
															setPage(page + 1);
													}}
													aria-disabled={
														page >= (orders?.dataList?.TotalPages || 1)
													}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								</nav>
							</>
						)}
					</section>
					<CancelOrder
						open={state.cancel}
						handleClose={dispatch}
						Id={state.orderId}
					/>
				</main>
			</div>
		</section>
	);
};

export default UserDashboard;
