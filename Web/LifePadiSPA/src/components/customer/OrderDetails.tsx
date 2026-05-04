import { useParams, Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const OrderDetails = () => {
	const { id } = useParams();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}order`;

	const getOrder = async (url: string) => {
		const response = await fetch(url, auth.accessToken);

		return response.data;
	};

	const getData = async (url: string) => {
		const response = await fetch(url, auth.accessToken);

		//console.log(response);
		return response.data;
	};

	const {
		data: order,
		isError: orderError,
		isSuccess: orderSuccess,
		isLoading: orderLoading,
	} = useQuery({
		queryKey: ["order"],
		queryFn: () => getOrder(`${url}/get/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	const {
		data: delivery,
		isError: deliveryError,
		isSuccess: deliverySuccess,
		isLoading: deliveryLoading,
	} = useQuery({
		queryKey: ["delivery"],
		queryFn: () => getData(`${baseUrl}delivery/order/get/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	const {
		data: transaction,
		isError: transactionError,
		isSuccess: transactionSuccess,
		isLoading: transactionLoading,
	} = useQuery({
		queryKey: ["transaction"],
		queryFn: () => getData(`${baseUrl}transaction/transactionByOrderId/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	const {
		data: logistics,
		isError: logisticsError,
		isSuccess: logisticsSuccess,
		isLoading: logisticsLoading,
	} = useQuery({
		queryKey: ["logistics"],
		queryFn: () => getData(`${baseUrl}logistics/getByOrder/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
		enabled: order?.Type === "Logistics",
	});

	console.log(logistics);

	return (
		<section className=" p-2 text-gray-900 dark:text-primary pb-10">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/user">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Order Details</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-center text-2xl font-bold py-4"> Order Details </h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5  ">
				{orderLoading && (
					<p className="flex items-center justify-center">
						{" "}
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</p>
				)}
				{orderError && (
					<p className="flex items-center justify-center">
						{" "}
						<Alert variant="destructive">
							<AlertDescription>Error Fetching Data..</AlertDescription>
						</Alert>
					</p>
				)}
				{orderSuccess && (
					<div className="col-span-2 border-2 dark:bg-card bg-graybg shadow-sm flex flex-col md:flex-row justify-between p-5 bg-white rounded-lg shadow-lightgreen">
						{" "}
						<div>
							<h2 className="font-bold border-b-2 mb-2"> Order Info. </h2>
							<p> Order Date : {new Date(order.CreatedAt).toDateString()} </p>
							<p> Order Status : {order.Status} </p>
							<p> Order Type : {order.Type}</p>
							<p>
								{" "}
								Delivery Status :{" "}
								{order.IsDelivered ? "Delivered" : "Not Delivered"}{" "}
							</p>
						</div>
					</div>
				)}
				{orderLoading && (
					<p className="flex items-center justify-center">
						{" "}
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</p>
				)}
				{orderError && (
					<p className="flex items-center justify-center">
						{" "}
						<Alert variant="destructive">
							<AlertDescription>Error Fetching Data..</AlertDescription>
						</Alert>
					</p>
				)}
				{orderSuccess && (
					<div className="overflow-x-auto col-span-2 dark:bg-card bg-graybg shadow-sm shadow-lightyellow rounded-lg">
						<h2 className="text-xl font-bold text-center p-2"> Order Items</h2>

						{orderError && (
							<p className="flex items-center justify-center">
								{" "}
								<Alert variant="destructive">
									<AlertDescription>Error Fetching Data..</AlertDescription>
								</Alert>
							</p>
						)}
						{orderSuccess && (
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-muted dark:text-gray-400">
									<tr>
										<th scope="col" className="px-4 py-3">
											Item Name
										</th>
										<th scope="col" className="px-4 py-3">
											Quantity
										</th>
										<th scope="col" className="px-4 py-3">
											Amount
										</th>
										<th scope="col" className="px-4 py-3">
											Total Amount
										</th>

										<th scope="col" className="px-4 py-3">
											Fragile
										</th>
										<th scope="col" className="px-4 py-3">
											Weight
										</th>

										<th scope="col" className="px-4 py-3">
											Description
										</th>
									</tr>
								</thead>
								<tbody>
									{order.OrderItems.map((item: any) => (
										<tr key={item.Id} className="border-b dark:border-gray-700">
											<th
												scope="row"
												className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{item.Name}
											</th>
											<td className="px-4 py-3">{item.Quantity}</td>
											<td className="px-4 py-3">{item.Amount}</td>
											<td className="px-4 py-3"> {item.TotalAmount}</td>
											<td className="px-4 py-3">
												{" "}
												{item.IsFragile ? "Fragile" : "Not Fragile"}
											</td>
											<td className="px-4 py-3"> {item.Weight}</td>
											<td className="px-4 py-3"> {item.Description}</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				)}

				{deliveryLoading && (
					<p className="flex items-center justify-center">
						{" "}
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</p>
				)}
				{deliveryError && (
					<p className="flex items-center justify-center">
						{" "}
						<Alert variant="destructive">
							<AlertDescription>
								You currently have no delivery Information..
							</AlertDescription>
						</Alert>
					</p>
				)}
				{deliverySuccess && (
					<div className="border-2 col-span-2 dark:bg-card bg-graybg p-3 shadow-sm shadow-lightcyan rounded-lg ">
						{" "}
						<h1 className="font-bold text-center text-xl">
							Delivery Details{" "}
						</h1>{" "}
						<p>
							{" "}
							Delivery Date :{" "}
							{delivery.CreatedAt &&
								new Date(delivery.CreatedAt).toDateString()}
						</p>
						<p> Delivery Fee : {delivery.DeliveryFee}</p>
						<p> Pickup Address : {delivery.PickupAddress}</p>
						<p> Pickup Type : {delivery.PickupType}</p>
						<p> Status : {delivery.Status}</p>
					</div>
				)}

				{deliveryLoading && (
					<p className="flex items-center justify-center">
						{" "}
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</p>
				)}
				{deliveryError && (
					<p className="flex items-center justify-center ">
						{" "}
						<Alert variant="destructive">
							<AlertDescription>Rider is yet to be assigned..</AlertDescription>
						</Alert>
					</p>
				)}
				{deliverySuccess && (
					<div className="border-2 col-span-2 p-3 dark:bg-card bg-graybg shadow-sm shadow-lightemerald rounded-lg ">
						{" "}
						<h1 className="font-bold text-center text-xl">
							Rider Details{" "}
						</h1>{" "}
						<p>
							{" "}
							Rider Full Name : {delivery.Rider?.FirstName}{" "}
							{delivery.Rider?.LastName}
						</p>
						<p> Rider Phone Number : {delivery.Rider?.PhoneNumber}</p>
						<p>
							{" "}
							Rider Status :{" "}
							{delivery.Rider?.IsActive ? "Active" : " In-Active"}
						</p>
					</div>
				)}

				{transactionLoading && (
					<p className="flex items-center justify-center">
						{" "}
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</p>
				)}
				{transactionError && (
					<p className="flex items-center justify-center">
						{" "}
						<Alert variant="destructive">
							<AlertDescription>
								{" "}
								No Payment Information or Order is yet to be Paid for ..
							</AlertDescription>
						</Alert>
					</p>
				)}
				{transactionSuccess && (
					<div className="col-span-2 border-2 dark:bg-card bg-graybg shadow-sm flex flex-col md:flex-row justify-between p-5 bg-white rounded-lg shadow-lightgreen">
						{" "}
						<div>
							<h2 className="font-bold border-b-2 mb-2"> Payment Details . </h2>
							<p> Payment ID : {transaction.PaymentId} </p>
							<p>
								{" "}
								Payment Status :{" "}
								{transaction.Status === "success" ? (
									<span className="text-background">{transaction.Status} </span>
								) : (
									<span className="text-redborder">{transaction.Status} </span>
								)}
							</p>
							<p> Total Amount : {transaction.TotalAmount}</p>
						</div>
					</div>
				)}

				{logistics && (
					<div className="border-2 col-span-2 p-3 dark:bg-card bg-graybg shadow-lg shadow-brown-200 rounded-lg">
						{" "}
						<h1 className="font-bold text-center text-xl">
							Logistics Details{" "}
						</h1>{" "}
						<p> Item : {logistics.Item} </p>
						<p> Item Description : {logistics.ItemDescription} </p>
						<p> Sender Address : {logistics.SenderAddress} </p>
						<p> Sender Name : {logistics.SenderName} </p>
						<p> Sender Phone Number : {logistics.SenderPhone} </p>
						<p> Receiver Address : {logistics.RecieverAddress} </p>
						<p> Receiver Name : {logistics.RecieverName} </p>
						<p> Receiver Phone Number : {logistics.RecieverAddress} </p>
						<p>
							{" "}
							Tracking Number :{" "}
							{logistics.TrackingNumber
								? logistics.TrackingNumber
								: "Not Available"}
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default OrderDetails;
