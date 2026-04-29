import { useParams, Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";

import { Card, CardContent } from "@/components/ui/card";
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

interface AddressRow {
	Id: number | string;
	Name?: string;
	Town?: string;
	City?: string;
	State?: string;
	PostalCode?: string;
	Longitude?: number | string;
	Latitude?: number | string;
}

interface OrderRow {
	Id: number | string;
	CreatedAt?: string;
	Type?: string;
	Status?: string;
	IsDelivered?: boolean;
}

interface CustomerDetailData {
	Id: number | string;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber: string;
	Dob?: string;
	ContactAddress?: string;
	Addresses?: AddressRow[];
	Orders?: OrderRow[];
}

const AdminCustomerDetails = () => {
	const { id } = useParams<{ id: string }>();
	const url = `${baseUrl}customer/get`;
	const { auth } = useAuth();
	const fetch = useFetch();

	const getCustomer = async (u: string) => {
		const response = await fetch(u, auth.accessToken);
		return response.data as CustomerDetailData;
	};

	const { data, isError, isSuccess, isLoading } = useQuery({
		queryKey: ["customer", id],
		queryFn: () => getCustomer(`${url}/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	return (
		<div className="space-y-6 p-4 md:p-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/admin/customer">Customers</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.FirstName || "Details"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-2xl font-bold text-center">Customer Details</h1>

			{isLoading && (
				<div className="flex items-center justify-center py-10">
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
				</div>
			)}
			{isError && (
				<Alert variant="destructive">
					<AlertDescription>Error fetching customer.</AlertDescription>
				</Alert>
			)}

			{isSuccess && data && (
				<>
					<Card>
						<CardContent className="p-4 space-y-2">
							<div className="flex justify-between">
								<span className="text-sm font-semibold">Full Name</span>
								<span className="capitalize text-sm">
									{data.FirstName} {data.LastName}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-semibold">Phone</span>
								<span className="text-sm">{data.PhoneNumber}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-semibold">DoB</span>
								<span className="text-sm">{data.Dob}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-semibold">Email</span>
								<span className="text-sm">{data.Email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-semibold">Address</span>
								<span className="text-sm capitalize">{data.ContactAddress}</span>
							</div>
						</CardContent>
					</Card>

					<div>
						<h2 className="text-xl font-bold mb-3">Addresses</h2>
						<Card>
							<CardContent className="p-0 overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Town</TableHead>
											<TableHead>City</TableHead>
											<TableHead>State</TableHead>
											<TableHead>Postal Code</TableHead>
											<TableHead>Longitude</TableHead>
											<TableHead>Latitude</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.Addresses?.length ? (
											data.Addresses.map((a) => (
												<TableRow key={a.Id}>
													<TableCell>{a.Name}</TableCell>
													<TableCell>{a.Town}</TableCell>
													<TableCell>{a.City}</TableCell>
													<TableCell>{a.State}</TableCell>
													<TableCell>{a.PostalCode}</TableCell>
													<TableCell>{a.Longitude}</TableCell>
													<TableCell>{a.Latitude}</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={7} className="text-center text-muted-foreground py-6">
													No addresses.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>

					<div>
						<h2 className="text-xl font-bold mb-3">Orders</h2>
						<Card>
							<CardContent className="p-0 overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-16">ID</TableHead>
											<TableHead>Order Date</TableHead>
											<TableHead>Type</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Delivered</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.Orders?.length ? (
											data.Orders.map((o) => (
												<TableRow key={o.Id}>
													<TableCell>{o.Id}</TableCell>
													<TableCell>{o.CreatedAt}</TableCell>
													<TableCell>{o.Type}</TableCell>
													<TableCell>
														<Badge variant="outline">{o.Status}</Badge>
													</TableCell>
													<TableCell>
														<Badge variant={o.IsDelivered ? "default" : "secondary"}>
															{o.IsDelivered ? "Yes" : "No"}
														</Badge>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={5} className="text-center text-muted-foreground py-6">
													No orders.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminCustomerDetails;
