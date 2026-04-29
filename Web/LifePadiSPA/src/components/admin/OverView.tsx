import { useState, useReducer } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, Search } from "lucide-react";
import ActionsMenu from "./subcomponents/ActionsMenu";
import OrderStatusModal from "./orders/OrderStatusModal";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import baseUrl from "../../api/baseUrl";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface OverviewState {
	open: boolean;
	edit: boolean;
	rider: boolean;
	activate: boolean;
	delete: boolean;
	category: Record<string, unknown>;
	id: number | string;
}

type OverviewAction =
	| { type: "open" | "edit" | "rider" | "activate" | "delete" }
	| { type: "category"; payload: Record<string, unknown> }
	| { type: "id"; payload: number | string };

const reducer = (
	state: OverviewState,
	action: OverviewAction,
): OverviewState => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "edit":
			return { ...state, edit: !state.edit };
		case "rider":
			return { ...state, rider: !state.rider };
		case "activate":
			return { ...state, activate: !state.activate };
		case "delete":
			return { ...state, delete: !state.delete };
		case "category":
			return { ...state, category: action.payload };
		case "id":
			return { ...state, id: action.payload };
		default:
			throw new Error();
	}
};

const STAT_TILES = [
	{ key: "TotalOrders", label: "Total Orders", accent: "text-purple-600" },
	{ key: "TotalRiders", label: "Riders", accent: "text-blue-600" },
	{ key: "TotalCustomers", label: "Customers", accent: "text-teal-600" },
	{ key: "TotalVendors", label: "Vendors", accent: "text-yellow-600" },
	{
		key: "TotalProductCategories",
		label: "Product Categories",
		accent: "text-orange-600",
	},
	{ key: "TotalServices", label: "Services", accent: "text-rose-600" },
	{
		key: "TotalTransactions",
		label: "Transactions",
		accent: "text-emerald-600",
	},
	{ key: "TotalVouchers", label: "Vouchers", accent: "text-fuchsia-600" },
	{
		key: "TotalPendingOrders",
		label: "Pending Orders",
		accent: "text-amber-600",
	},
	{
		key: "TotalOngoingOrders",
		label: "Ongoing Orders",
		accent: "text-cyan-600",
	},
	{
		key: "TotalCompletedOrders",
		label: "Completed Orders",
		accent: "text-green-600",
	},
	{
		key: "TotalCancelledOrders",
		label: "Cancelled Orders",
		accent: "text-red-600",
	},
];

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const statusBadgeVariant = (status: string): BadgeVariant => {
	if (status === "Completed") return "default";
	if (status === "Pending") return "secondary";
	if (status === "Cancelled") return "destructive";
	return "outline";
};

const Overview = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const url = `${baseUrl}order`;
	const dashboardUrl = `${baseUrl}dashboard/dashboardstats`;

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		edit: false,
		rider: false,
		activate: false,
		delete: false,
		category: {},
		id: 0,
	});

	const getOrders = async (u: string) => {
		const response = await fetch(u, auth.accessToken);
		return response.data?.Data;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["orders", page, search],
		queryFn: () =>
			getOrders(
				`${url}/all?PageNumber=${page}&SearchString=${search}&PageSize=10`,
			),
		placeholderData: keepPreviousData,
		staleTime: 5000,
		refetchOnMount: "always",
	});

	const getDashboardStats = async (u: string) => {
		const response = await fetch(u, auth.accessToken);
		return response.data;
	};

	const {
		data: dashboard,
		isError: dashboardError,
		isLoading: dashboardLoading,
		isSuccess: dashboardSuccess,
	} = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => getDashboardStats(dashboardUrl),
		placeholderData: keepPreviousData,
		staleTime: 5000,
		refetchOnMount: "always",
	});

	const totalPages = data?.dataList?.TotalPages || 1;
	const handleOrderDetails = (id: number | string) =>
		navigate(`/admin/order/${id}`);

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section>
				{dashboardError && (
					<Alert variant="destructive" className="mb-4">
						<AlertDescription>Error fetching dashboard data.</AlertDescription>
					</Alert>
				)}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
					{STAT_TILES.map(({ key, label, accent }) => (
						<Card key={key}>
							<CardContent className="p-4 flex flex-col items-center justify-center text-center">
								<div
									className={`text-2xl md:text-3xl font-extrabold ${accent}`}>
									{dashboardLoading ? (
										<Skeleton className="h-8 w-12" />
									) : dashboardSuccess ? (
										(dashboard?.[key] ?? 0)
									) : (
										"—"
									)}
								</div>
								<div className="mt-1 text-xs text-muted-foreground">
									{label}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<OrderStatusModal
				open={state.edit}
				handleClose={dispatch}
				url={url}
				id={state.id}
				name="orders"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
						<div className="relative w-full md:w-1/2">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search orders…"
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
									setPage(1);
								}}
								className="pl-9"
							/>
						</div>
					</div>

					{isLoading && (
						<div className="flex items-center justify-center py-10">
							<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
						</div>
					)}
					{isError && (
						<Alert variant="destructive">
							<AlertDescription>Error fetching orders.</AlertDescription>
						</Alert>
					)}
					{isSuccess && (
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Order Date</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Delivery Status</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="text-right">
											<span className="sr-only">Actions</span>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.result?.length ? (
										data.result.map((order: any) => (
											<TableRow key={order.Id}>
												<TableCell className="font-medium whitespace-nowrap">
													{new Date(order.CreatedAt).toDateString()}
												</TableCell>
												<TableCell>
													<Badge variant={statusBadgeVariant(order.Status)}>
														{order.Status}
													</Badge>
												</TableCell>
												<TableCell>
													<Badge
														variant={
															order.IsDelivered ? "default" : "destructive"
														}>
														{order.IsDelivered ? "Delivered" : "Not Delivered"}
													</Badge>
												</TableCell>
												<TableCell>
													{order.Customer?.FirstName} {order.Customer?.LastName}
												</TableCell>
												<TableCell className="text-right">
													<ActionsMenu
														view={handleOrderDetails}
														dispatch={dispatch}
														id={order.Id}
													/>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={5}
												className="text-center text-muted-foreground py-8">
												No orders found.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					)}

					{isSuccess && totalPages > 1 && (
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
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(p) => (
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
									),
								)}
								<PaginationItem>
									<PaginationNext
										href="#"
										onClick={(e) => {
											e.preventDefault();
											if (page < totalPages) setPage(page + 1);
										}}
										aria-disabled={page >= totalPages}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Overview;
