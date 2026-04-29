import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";

import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import AssignRider from "./subcomponents/AssignRider";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface OrderItem {
	Id: number | string;
	Name: string;
	Quantity?: number;
	Amount?: number;
	TotalAmount?: number;
	IsFragile?: boolean;
	Weight?: number;
	Description?: string;
	Product?: { Vendor?: { Name?: string } };
}

interface OrderData {
	Id: number | string;
	Status?: string;
	Type?: string;
	IsDelivered?: boolean;
	CreatedAt?: string;
	OrderItems: OrderItem[];
	Customer?: {
		FirstName?: string;
		LastName?: string;
		ContactAddress?: string;
		PhoneNumber?: string;
		Email?: string;
	};
}

interface DeliveryData {
	Id: number | string;
	CreatedAt?: string;
	DeliveryFee?: number;
	PickupAddress?: { Name?: string; Town?: string };
	PickupType?: string;
	DeliveryAddress?: { Name?: string; Town?: string };
	Status?: string;
	Rider?: {
		FirstName?: string;
		LastName?: string;
		PhoneNumber?: string;
		IsActive?: boolean;
	};
}

interface TransactionData {
	PaymentId?: string;
	Status?: string;
	TotalAmount?: number;
}

interface LogisticsData {
	Item?: string;
	ItemDescription?: string;
	SenderAddress?: { Name?: string };
	SenderName?: string;
	SenderPhone?: string;
	ReceiverAddress?: { Name?: string };
	ReceiverName?: string;
	ReceiverPhone?: string;
	TrackingNumber?: string;
}

const AdminOrderDetails = () => {
	const { id } = useParams<{ id: string }>();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}order`;
	const [assignRider, setAssignRider] = useState(false);

	const orderQ = useQuery<OrderData>({
		queryKey: ["order", id],
		queryFn: async () => {
			const r = await fetch(`${url}/get/${id}`, auth.accessToken);
			return r.data?.Data;
		},
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	const deliveryQ = useQuery<DeliveryData>({
		queryKey: ["delivery", id],
		queryFn: async () => {
			const r = await fetch(`${baseUrl}delivery/order/get/${id}`, auth.accessToken);
			return r.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	const transactionQ = useQuery<TransactionData>({
		queryKey: ["transaction", id],
		queryFn: async () => {
			const r = await fetch(
				`${baseUrl}transaction/transactionByOrderId/${id}`,
				auth.accessToken,
			);
			return r.data?.Data;
		},
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	const logisticsQ = useQuery<LogisticsData>({
		queryKey: ["logistics", id],
		queryFn: async () => {
			const r = await fetch(`${baseUrl}logistics/getByOrder/${id}`, auth.accessToken);
			return r.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
		enabled: orderQ.data?.Type === "Logistics",
	});

	const { data: order } = orderQ;
	const { data: delivery } = deliveryQ;
	const { data: transaction } = transactionQ;
	const { data: logistics } = logisticsQ;

	const blockAssign =
		order?.Status === "Delivered" ||
		order?.Status === "Cancelled" ||
		order?.Status === "Completed";

	return (
		<section className="space-y-6 p-4 md:p-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/admin">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Order Details</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Order Details</h1>
				{delivery && (
					<Button onClick={() => setAssignRider(true)} disabled={blockAssign}>
						<Plus className="mr-2 h-4 w-4" />
						Assign Rider
					</Button>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{orderQ.isLoading && (
					<div className="lg:col-span-2 flex items-center justify-center py-10">
						<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
					</div>
				)}
				{orderQ.isError && (
					<Alert variant="destructive" className="lg:col-span-2">
						<AlertDescription>Error fetching order data.</AlertDescription>
					</Alert>
				)}
				{orderQ.isSuccess && order && (
					<Card className="lg:col-span-2">
						<CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h2 className="font-bold border-b pb-1 mb-2">Order Info</h2>
								<p className="text-sm">Order Date: {new Date(order.CreatedAt || "").toDateString()}</p>
								<p className="text-sm">Order Status: {order.Status}</p>
								<p className="text-sm">Order Type: {order.Type}</p>
								<p className="text-sm">
									Delivery Status: {order.IsDelivered ? "Delivered" : "Not Delivered"}
								</p>
							</div>
							<div>
								<h2 className="font-bold border-b pb-1 mb-2">Customer Info</h2>
								<p className="text-sm">
									Full Name: {order.Customer?.FirstName} {order.Customer?.LastName}
								</p>
								<p className="text-sm">Address: {order.Customer?.ContactAddress}</p>
								<p className="text-sm">Phone: {order.Customer?.PhoneNumber}</p>
								<p className="text-sm">Email: {order.Customer?.Email}</p>
							</div>
						</CardContent>
					</Card>
				)}

				{orderQ.isSuccess && order && (
					<Card className="lg:col-span-2">
						<CardContent className="p-4 space-y-3">
							<h2 className="text-xl font-bold text-center">Order Items</h2>
							<div className="overflow-x-auto rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Vendor Name</TableHead>
											<TableHead>Item Name</TableHead>
											<TableHead>Qty</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead>Total</TableHead>
											<TableHead>Fragile</TableHead>
											<TableHead>Weight</TableHead>
											<TableHead>Description</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{order.OrderItems?.map((item) => (
											<TableRow key={item.Id}>
												<TableCell className="font-medium">
													{item.Product?.Vendor?.Name}
												</TableCell>
												<TableCell>{item.Name}</TableCell>
												<TableCell>{item.Quantity}</TableCell>
												<TableCell>{item.Amount}</TableCell>
												<TableCell>{item.TotalAmount}</TableCell>
												<TableCell>{item.IsFragile ? "Yes" : "No"}</TableCell>
												<TableCell>{item.Weight}</TableCell>
												<TableCell className="max-w-xs truncate">{item.Description}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				)}

				{deliveryQ.isLoading && (
					<div className="flex items-center justify-center py-10">
						<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
					</div>
				)}
				{deliveryQ.isError && (
					<Alert variant="destructive">
						<AlertDescription>
							No delivery data available. Maybe the order isn't paid.
						</AlertDescription>
					</Alert>
				)}
				{deliveryQ.isSuccess && delivery && (
					<>
						<Card>
							<CardContent className="p-5 space-y-1">
								<h1 className="font-bold text-lg text-center">Delivery Details</h1>
								<p className="text-sm">
									Delivery Date:{" "}
									{delivery.CreatedAt ? new Date(delivery.CreatedAt).toDateString() : "—"}
								</p>
								<p className="text-sm">Delivery Fee: {delivery.DeliveryFee}</p>
								{delivery.PickupAddress && (
									<p className="text-sm">
										Pickup Address: {delivery.PickupAddress.Name}, {delivery.PickupAddress.Town}
									</p>
								)}
								<p className="text-sm">Pickup Type: {delivery.PickupType}</p>
								<p className="text-sm">
									Delivery Address: {delivery.DeliveryAddress?.Name},{" "}
									{delivery.DeliveryAddress?.Town}
								</p>
								<p className="text-sm">
									Status:{" "}
									<Badge variant="default" className="ml-1">
										{delivery.Status}
									</Badge>
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-5 space-y-1">
								<h1 className="font-bold text-lg text-center">Rider Details</h1>
								<p className="text-sm">
									Full Name: {delivery.Rider?.FirstName} {delivery.Rider?.LastName}
								</p>
								<p className="text-sm">Phone: {delivery.Rider?.PhoneNumber}</p>
								<p className="text-sm">
									Status:{" "}
									<Badge variant={delivery.Rider?.IsActive ? "default" : "destructive"}>
										{delivery.Rider?.IsActive ? "Active" : "Inactive"}
									</Badge>
								</p>
							</CardContent>
						</Card>
					</>
				)}

				{transactionQ.isError && (
					<Alert variant="destructive" className="lg:col-span-2">
						<AlertDescription>
							No transaction data, or the order hasn't been paid for.
						</AlertDescription>
					</Alert>
				)}
				{transactionQ.isSuccess && transaction && (
					<Card className="lg:col-span-2">
						<CardContent className="p-5 space-y-1">
							<h1 className="font-bold text-lg text-center">Transaction Details</h1>
							<p className="text-sm">Payment ID: {transaction.PaymentId}</p>
							<p className="text-sm">
								Payment Status:{" "}
								<Badge
									variant={transaction.Status === "successful" ? "default" : "destructive"}
								>
									{transaction.Status}
								</Badge>
							</p>
							<p className="text-sm">Total Amount: {transaction.TotalAmount}</p>
						</CardContent>
					</Card>
				)}

				{logistics && (
					<Card className="lg:col-span-2">
						<CardContent className="p-5 space-y-1">
							<h1 className="font-bold text-lg text-center">Logistics Details</h1>
							<p className="text-sm">Item: {logistics.Item}</p>
							<p className="text-sm">Item Description: {logistics.ItemDescription}</p>
							<p className="text-sm">Sender Address: {logistics.SenderAddress?.Name}</p>
							<p className="text-sm">Sender Name: {logistics.SenderName}</p>
							<p className="text-sm">Sender Phone: {logistics.SenderPhone}</p>
							<p className="text-sm">Receiver Address: {logistics.ReceiverAddress?.Name}</p>
							<p className="text-sm">Receiver Name: {logistics.ReceiverName}</p>
							<p className="text-sm">Receiver Phone: {logistics.ReceiverPhone}</p>
							<p className="text-sm">
								Tracking Number: {logistics.TrackingNumber || "Not Available"}
							</p>
						</CardContent>
					</Card>
				)}
			</div>

			{delivery && (
				<AssignRider id={delivery.Id} open={assignRider} handleClose={setAssignRider} />
			)}
		</section>
	);
};

export default AdminOrderDetails;
