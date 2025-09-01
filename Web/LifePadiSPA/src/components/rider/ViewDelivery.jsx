import { useParams, Link } from "react-router-dom";
import { getDeliveryUrl } from "./rider_uri/RiderURI";
import { CircularProgress, Chip, Alert, Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import DateFormater from "../shared/DateFormater";

// Helper components
const Field = ({ label, children }) => (
	<div className="mb-2 text-xs md:text-sm">
		<div className="text-gray-500 dark:text-gray-400 font-medium mb-[2px]">
			{label}
		</div>
		<div className="text-gray-800 dark:text-gray-200 break-words max-w-full">
			{children || <span className="text-gray-400">N/A</span>}
		</div>
	</div>
);

const statusColor = (value) => {
	if (!value) return "default";
	const v = value.toLowerCase();
	if (["pending", "processing"].includes(v)) return "warning";
	if (["delivered", "success", "successful", "completed"].includes(v))
		return "success";
	if (["failed", "cancelled", "canceled", "declined"].includes(v))
		return "error";
	if (["intransit", "ongoing", "active"].includes(v)) return "info";
	return "default";
};

const StatusChip = ({ value, deliveredFlag }) => {
	if (deliveredFlag !== undefined) {
		return (
			<Chip
				size="small"
				label={deliveredFlag ? "Delivered" : "Pending"}
				color={deliveredFlag ? "success" : "warning"}
				variant={deliveredFlag ? "filled" : "outlined"}
			/>
		);
	}
	return (
		<Chip
			size="small"
			label={value || "Unknown"}
			color={statusColor(value)}
			variant={statusColor(value) === "default" ? "outlined" : "filled"}
		/>
	);
};

const currency = (v) =>
	typeof v === "number"
		? new Intl.NumberFormat("en-NG", {
				style: "currency",
				currency: "NGN",
				minimumFractionDigits: 2,
		  }).format(v)
		: v;

const formatAddress = (addr) => {
	if (!addr) return "";
	if (typeof addr === "string") return addr;
	const parts = [
		addr.Name,
		addr.Town,
		addr.City,
		addr.LocalGovt,
		addr.State,
	]
		.filter(Boolean)
		.map((p) => p.trim());
	return parts.join(", ");
};

const ViewDelivery = () => {
	const { id } = useParams();
	const fetch = useFetch();
	const { auth } = useAuth();
	const backLink = "/rider";

	const { data, isLoading, isError } = useQuery(
		["delivery", id, auth?.accessToken],
		async () => fetch(`${getDeliveryUrl.replace("{id}", id)}`),
		{
			enabled: !!id,
			retry: 1,
			staleTime: 1000 * 30,
		}
  );
  
  //console.log(data)

	const delivery = data?.data;
	const isLogistic = delivery?.PickupType?.toLowerCase() === "logistics";
	const logisticId = delivery?.Order?.Id;

	const logisticQuery = useQuery(
		["logistic", logisticId, auth?.accessToken],
		async () => fetch(`/logistics/getByOrder/${logisticId}`),
		{
			enabled: !!logisticId && isLogistic,
			retry: 1,
		}
	);

	const logistic = logisticQuery.data;
	const orderItems = delivery?.Order?.OrderItems || [];
	const totalMoney = orderItems.reduce(
		(sum, o) => sum + (Number(o.TotalAmount) || 0),
		0
	);

	return (
		<div>
			<section className="dark:bg-darkMenu dark:bg-gray-900 p-1 sm:p-5">
				<div className="flex items-center mb-4">
					<Link
						className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center"
						to={backLink}>
						<span className="text-lg mr-1">&larr;</span> Back
					</Link>
				</div>
				<div className="mx-auto max-w-screen-xl px-2 lg:px-3">
					<div className="bg-white relative sm:rounded-lg shadow-md">
						<div className="flex flex-col lg:flex-row gap-4 p-4">
							{/* Delivery Details */}
							<div className="w-full lg:w-1/3">
								<Box className="dark:bg-darkHover rounded-md p-3 h-full border border-gray-100 dark:border-gray-700">
									<Typography
										variant="subtitle1"
										className="font-semibold mb-2">
										Delivery Details
									</Typography>
									{isLoading && (
										<div className="flex justify-center py-6">
											<CircularProgress size={28} />
										</div>
									)}
									{isError && !isLoading && (
										<Alert severity="error" className="mb-2">
											Failed to load delivery.
										</Alert>
									)}
									{delivery && (
										<div className="overflow-auto max-h-72 pr-2">
											<Field label="Pickup Address">
												{`${delivery.PickUpAddress?.Name}`}
											</Field>
											<Field label="Delivery Address">
												{`${delivery.DeliveryAddress?.Name}`}
											</Field>
											<Field label="Delivery Fee">
												{currency(delivery.DeliveryFee)}
											</Field>
											<Field label="Delivery Status">
												<StatusChip value={delivery.Status} />
											</Field>
											<Field label="Delivery Type">{delivery.PickupType}</Field>
											<Field label="Created At">
												{DateFormater(delivery.CreatedAt)}
											</Field>
											<Field label="Ordered Date">
												{DateFormater(delivery.Order.CreatedAt)}
											</Field>
											<Field label="Order Status">
												<StatusChip value={delivery.Order.Status} />
											</Field>
											<Field label="Final Delivery Time">
												<StatusChip
													deliveredFlag={delivery.Order.IsDelivered}
												/>
												{delivery.Order.IsDelivered && (
													<span className="ml-2 text-xs text-gray-500">
														{DateFormater(delivery.UpdatedAt)}
													</span>
												)}
											</Field>
										</div>
									)}
								</Box>
							</div>
							{/* Customer Details */}
							<div className="w-full lg:w-1/3">
								<Box className="dark:bg-darkHover rounded-md p-3 h-full border border-gray-100 dark:border-gray-700">
									<Typography
										variant="subtitle1"
										className="font-semibold mb-2">
										Customer Details
									</Typography>
									{delivery && (
										<div className="overflow-auto max-h-72 pr-2">
											<Field label="First Name">
												{delivery.Order.Customer.FirstName}
											</Field>
											<Field label="Last Name">
												{delivery.Order.Customer.LastName}
											</Field>
											<Field label="Phone">
												{delivery.Order.Customer.PhoneNumber}
											</Field>
											<Field label="Address">
												{formatAddress(delivery.Order.Customer.Addresses[0])}
											</Field>
											<Field label="Email">
												{delivery.Order.Customer.Email}
											</Field>
										</div>
									)}
								</Box>
							</div>
							{/* Logistic Details */}
							{isLogistic && (
								<div className="w-full lg:w-1/3">
									<Box className="dark:bg-darkHover rounded-md p-3 h-full border border-gray-100 dark:border-gray-700">
										<Typography
											variant="subtitle1"
											className="font-semibold mb-2">
											Logistic Details
										</Typography>
										{logisticQuery.isLoading && (
											<div className="flex justify-center py-6">
												<CircularProgress size={24} />
											</div>
										)}
										{logisticQuery.isError && !logisticQuery.isLoading && (
											<Alert severity="error" className="mb-2">
												Could not load logistics.
											</Alert>
										)}
										{logistic && (
											<div className="overflow-auto max-h-72 pr-2">
												<Field label="Sender Name">{logistic.SenderName}</Field>
												<Field label="Sender Phone">
													{logistic.SenderPhone}
												</Field>
												<Field label="Sender Address">
													{logistic.SenderAddress}
												</Field>
												<Field label="Receiver Name">
													{logistic.ReceiverName}
												</Field>
												<Field label="Receiver Phone">
													{logistic.ReceiverPhone}
												</Field>
												<Field label="Receiver Address">
													{logistic.ReceiverAddress}
												</Field>
												<Field label="Item">{logistic.Item}</Field>
												<Field label="Item Description">
													{logistic.ItemDescription}
												</Field>
												<Field label="Item Weight">{logistic.ItemWeight}</Field>
												<Field label="Tracking Number">
													{logistic.TrackingNumber}
												</Field>
												<Field label="Status">
													<StatusChip value={logistic.Status} />
												</Field>
											</div>
										)}
									</Box>
								</div>
							)}
						</div>
						{/* Order Items Cards */}
						<div className="border-t border-gray-100 dark:border-gray-700 px-4 py-6">
							<h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-200">
								Order Items
							</h3>
							{isLoading && (
								<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{Array.from({ length: 4 }).map((_, i) => (
										<div
											key={i}
											className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-darkHover animate-pulse">
											<div className="h-32 mb-3 bg-gray-200 dark:bg-gray-700 rounded" />
											<div className="h-3 w-3/4 mb-2 bg-gray-200 dark:bg-gray-700 rounded" />
											<div className="h-3 w-1/2 mb-3 bg-gray-200 dark:bg-gray-700 rounded" />
											<div className="flex gap-2">
												<div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
												<div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
											</div>
										</div>
									))}
								</div>
							)}
							{!isLoading && delivery && orderItems.length > 0 && (
								<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{orderItems.map((o) => {
										return (
											<div
												key={o.Id}
												className="group relative flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-darkHover shadow-sm hover:shadow-md transition-shadow">
												<div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
													<img
														src={o.Product.ProductImgUrl}
														alt={o.Product.Name}
														className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
														loading="lazy"
													/>
													<div className="absolute top-2 left-2 flex gap-2">
														<Chip
															size="small"
															label={`Qty: ${o.Quantity}`}
															color="primary"
														/>
														<Chip
															size="small"
															label={o?.IsFragile ? "Fragile" : "Safe"}
															color={o?.IsFragile ? "warning" : "default"}
															variant={o?.IsFragile ? "filled" : "outlined"}
														/>
													</div>
												</div>
												<div className="flex flex-col flex-1 p-4">
													<h4
														className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-1 line-clamp-1"
														title={o.Product.Name}>
														{o.Product.Name}
													</h4>
													<p
														className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2"
														title={o.Product.Description}>
														{o.Product.Description}
													</p>
													<div className="mt-auto space-y-1 text-xs text-gray-600 dark:text-gray-300">
														<div className="flex justify-between">
															<span className="font-medium">Unit:</span>
															<span>{currency(o.Product.Price)}</span>
														</div>
														<div className="flex justify-between">
															<span className="font-medium">Total:</span>
															<span>{currency(o.TotalAmount)}</span>
														</div>
														<div className="flex justify-between">
															<span className="font-medium">Vendor:</span>
															<span
																className=" max-w-[180px]"
																title={formatAddress(
																	o.Product.Vendor.ContactAddress
																)}>
																{o.Product.Vendor.Name}
															</span>
														</div>
														{o.Name && (
															<div className="flex justify-between">
																<span className="font-medium">Item:</span>
																<span
																	className=" max-w-[180px]"
																	title={o.Name}>
																	{o.Name}
																</span>
															</div>
														)}
														{o.Weight && (
															<div className="flex justify-between">
																<span className="font-medium">Weight:</span>
																<span>{o.Weight}</span>
															</div>
														)}
														{o.Description && (
															<div className="flex justify-between">
																<span className="font-medium">Item Desc:</span>
																<span
																	className="truncate max-w-[180px]"
																	title={o.Description}>
																	{o.Description}
																</span>
															</div>
														)}
													</div>
												</div>
											</div>
										);
									})}
								</div>
							)}
							{!isLoading && delivery && orderItems.length === 0 && (
								<div className="text-center text-sm text-gray-400 py-10">
									No items found
								</div>
							)}
							{!isLoading && !delivery && (
								<div className="text-center text-sm text-gray-400 py-10">
									Delivery not found
								</div>
							)}
						</div>
						<div className="flex justify-end p-4">
							<div className="text-right">
								<div className="text-sm font-semibold">Total Amount:</div>
								<div className="text-lg font-bold mt-1">
									{currency(totalMoney)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ViewDelivery;
