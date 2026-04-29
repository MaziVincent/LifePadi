import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Package } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import DateFormater from "../shared/DateFormater";
import { getDeliveryUrl } from "./rider_uri/RiderURI";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Field = ({ label, children }) => (
	<div className="text-sm">
		<div className="text-xs font-medium text-muted-foreground mb-0.5">
			{label}
		</div>
		<div className="text-foreground break-words">
			{children || <span className="text-muted-foreground">N/A</span>}
		</div>
	</div>
);

const statusVariant = (status) => {
	if (!status) return "outline";
	const v = String(status).toLowerCase();
	if (["delivered", "success", "successful", "completed"].includes(v))
		return "success";
	if (["pending", "processing"].includes(v)) return "warning";
	if (["failed", "cancelled", "canceled", "declined"].includes(v))
		return "destructive";
	if (["intransit", "ongoing", "active", "accepted"].includes(v)) return "info";
	return "outline";
};

const StatusBadge = ({ status }) => {
	const v = statusVariant(status);
	const cls = {
		success: "bg-emerald-500 hover:bg-emerald-500 text-white",
		warning: "bg-amber-500 hover:bg-amber-500 text-white",
		destructive: "bg-rose-500 hover:bg-rose-500 text-white",
		info: "bg-sky-500 hover:bg-sky-500 text-white",
		outline: "",
	}[v];
	if (v === "outline") return <Badge variant="outline">{status || "—"}</Badge>;
	return <Badge className={cls}>{status}</Badge>;
};

const DeliveredBadge = ({ delivered }) =>
	delivered ? (
		<Badge className="bg-emerald-500 hover:bg-emerald-500 text-white">
			Delivered
		</Badge>
	) : (
		<Badge variant="outline">Pending</Badge>
	);

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
	return [addr.Name, addr.Town, addr.City, addr.LocalGovt, addr.State]
		.filter(Boolean)
		.map((p) => String(p).trim())
		.join(", ");
};

const ViewDelivery = () => {
	const { id } = useParams();
	const fetch = useFetch();
	const { auth } = useAuth();
	const navigate = useNavigate();

	const { data, isLoading, isError } = useQuery(
		["delivery", id, auth?.accessToken],
		async () => fetch(`${getDeliveryUrl.replace("{id}", id)}`),
		{
			enabled: !!id,
			retry: 1,
			staleTime: 1000 * 30,
		},
	);

	const delivery = data?.data;
	const isLogistic = delivery?.PickupType?.toLowerCase() === "logistics";
	const logisticId = delivery?.Order?.Id;

	const logisticQuery = useQuery(
		["logistic", logisticId, auth?.accessToken],
		async () => fetch(`/logistics/getByOrder/${logisticId}`),
		{
			enabled: !!logisticId && isLogistic,
			retry: 1,
		},
	);

	const logistic = logisticQuery.data;
	const orderItems = delivery?.Order?.OrderItems || [];
	const totalMoney = orderItems.reduce(
		(sum, o) => sum + (Number(o.TotalAmount) || 0),
		0,
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					size="icon"
					onClick={() => navigate(-1)}
					aria-label="Go back">
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<h1 className="text-2xl md:text-3xl font-bold">Delivery Details</h1>
			</div>

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							href="#"
							onClick={(e) => {
								e.preventDefault();
								navigate("/rider");
							}}>
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Delivery</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{isError && !isLoading && (
				<Alert variant="destructive">
					<AlertDescription>Failed to load delivery.</AlertDescription>
				</Alert>
			)}

			<div className="grid gap-4 lg:grid-cols-3">
				{/* Delivery Details */}
				<Card>
					<CardContent className="p-4 md:p-6">
						<h2 className="font-semibold mb-3">Delivery Details</h2>
						{isLoading ? (
							<div className="space-y-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<Skeleton key={i} className="h-6 w-full" />
								))}
							</div>
						) : delivery ? (
							<div className="space-y-3">
								<Field label="Pickup Address">
									{delivery.PickUpAddress?.Name}
								</Field>
								<Field label="Delivery Address">
									{delivery.DeliveryAddress?.Name}
								</Field>
								<Field label="Delivery Fee">
									{currency(delivery.DeliveryFee)}
								</Field>
								<Field label="Delivery Status">
									<StatusBadge status={delivery.Status} />
								</Field>
								<Field label="Delivery Type">{delivery.PickupType}</Field>
								<Field label="Created At">
									{DateFormater(delivery.CreatedAt)}
								</Field>
								<Field label="Ordered Date">
									{DateFormater(delivery.Order?.CreatedAt)}
								</Field>
								<Field label="Order Status">
									<StatusBadge status={delivery.Order?.Status} />
								</Field>
								<Field label="Final Delivery Time">
									<div className="flex items-center gap-2">
										<DeliveredBadge delivered={delivery.Order?.IsDelivered} />
										{delivery.Order?.IsDelivered && (
											<span className="text-xs text-muted-foreground">
												{DateFormater(delivery.UpdatedAt)}
											</span>
										)}
									</div>
								</Field>
							</div>
						) : null}
					</CardContent>
				</Card>

				{/* Customer Details */}
				<Card>
					<CardContent className="p-4 md:p-6">
						<h2 className="font-semibold mb-3">Customer Details</h2>
						{isLoading ? (
							<div className="space-y-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton key={i} className="h-6 w-full" />
								))}
							</div>
						) : delivery ? (
							<div className="space-y-3">
								<Field label="First Name">
									{delivery.Order?.Customer?.FirstName}
								</Field>
								<Field label="Last Name">
									{delivery.Order?.Customer?.LastName}
								</Field>
								<Field label="Phone">
									{delivery.Order?.Customer?.PhoneNumber}
								</Field>
								<Field label="Address">
									{formatAddress(delivery.Order?.Customer?.Addresses?.[0])}
								</Field>
								<Field label="Email">{delivery.Order?.Customer?.Email}</Field>
							</div>
						) : null}
					</CardContent>
				</Card>

				{/* Logistic Details */}
				{isLogistic && (
					<Card>
						<CardContent className="p-4 md:p-6">
							<h2 className="font-semibold mb-3">Logistic Details</h2>
							{logisticQuery.isLoading ? (
								<div className="space-y-3">
									{Array.from({ length: 6 }).map((_, i) => (
										<Skeleton key={i} className="h-6 w-full" />
									))}
								</div>
							) : logisticQuery.isError ? (
								<Alert variant="destructive">
									<AlertDescription>Could not load logistics.</AlertDescription>
								</Alert>
							) : logistic ? (
								<div className="space-y-3">
									<Field label="Sender Name">{logistic.SenderName}</Field>
									<Field label="Sender Phone">{logistic.SenderPhone}</Field>
									<Field label="Sender Address">{logistic.SenderAddress}</Field>
									<Field label="Receiver Name">{logistic.ReceiverName}</Field>
									<Field label="Receiver Phone">{logistic.ReceiverPhone}</Field>
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
										<StatusBadge status={logistic.Status} />
									</Field>
								</div>
							) : null}
						</CardContent>
					</Card>
				)}
			</div>

			{/* Order Items */}
			<Card>
				<CardContent className="p-4 md:p-6">
					<h2 className="font-semibold mb-4 flex items-center gap-2">
						<Package className="h-5 w-5" />
						Order Items
					</h2>

					{isLoading ? (
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{Array.from({ length: 4 }).map((_, i) => (
								<Card key={i}>
									<Skeleton className="h-40 w-full" />
									<CardContent className="p-4 space-y-2">
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-3 w-1/2" />
									</CardContent>
								</Card>
							))}
						</div>
					) : !delivery ? (
						<p className="py-10 text-center text-sm text-muted-foreground">
							Delivery not found
						</p>
					) : orderItems.length === 0 ? (
						<p className="py-10 text-center text-sm text-muted-foreground">
							No items found
						</p>
					) : (
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{orderItems.map((o) => (
								<Card
									key={o.Id}
									className="group overflow-hidden transition hover:shadow-md">
									<div className="relative h-40 overflow-hidden bg-muted">
										<img
											src={o.Product.ProductImgUrl}
											alt={o.Product.Name}
											loading="lazy"
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute left-2 top-2 flex gap-2">
											<Badge className="bg-primary text-primary-foreground hover:bg-primary">
												Qty: {o.Quantity}
											</Badge>
											{o?.IsFragile ? (
												<Badge className="bg-amber-500 hover:bg-amber-500 text-white">
													Fragile
												</Badge>
											) : (
												<Badge variant="outline" className="bg-background/80">
													Safe
												</Badge>
											)}
										</div>
									</div>
									<CardContent className="p-4">
										<h4
											className="mb-1 line-clamp-1 font-semibold text-sm"
											title={o.Product.Name}>
											{o.Product.Name}
										</h4>
										<p
											className="mb-2 line-clamp-2 text-xs text-muted-foreground"
											title={o.Product.Description}>
											{o.Product.Description}
										</p>
										<div className="space-y-1 text-xs text-muted-foreground">
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
													className="max-w-[180px] truncate"
													title={formatAddress(
														o.Product.Vendor?.ContactAddress,
													)}>
													{o.Product.Vendor?.Name}
												</span>
											</div>
											{o.Name && (
												<div className="flex justify-between">
													<span className="font-medium">Item:</span>
													<span
														className="max-w-[180px] truncate"
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
														className="max-w-[180px] truncate"
														title={o.Description}>
														{o.Description}
													</span>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}

					<Separator className="my-4" />
					<div className="flex justify-end">
						<div className="text-right">
							<p className="text-sm font-medium text-muted-foreground">
								Total Amount
							</p>
							<p className="text-2xl font-bold">{currency(totalMoney)}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ViewDelivery;
