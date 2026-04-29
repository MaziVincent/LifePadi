import { useState, useEffect, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	Loader2,
	Search,
	ShieldCheck,
	ShieldAlert,
	Package,
	CheckCircle2,
	Clock,
} from "lucide-react";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import {
	riderDeliveriesUrl,
	successfulDeliveriesCountUrl,
	pendingDeliveriesCountUrl,
} from "./rider_uri/RiderURI";
import FadeMenu from "./FadeMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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

const StatCard = ({ label, value, loading, Icon, accent }) => (
	<Card className="transition hover:-translate-y-0.5 hover:shadow-md">
		<CardContent className="p-6 text-center">
			<div
				className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>
				<Icon className="h-6 w-6" />
			</div>
			<p className="text-3xl font-bold">
				{loading ? (
					<Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
				) : (
					(value ?? 0)
				)}
			</p>
			<p className="text-sm text-muted-foreground mt-1">{label}</p>
		</CardContent>
	</Card>
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

const RiderDashboard = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const riderId = auth.Id;

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const [searchInput, setSearchInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		const t = setTimeout(() => setSearchTerm(searchInput.trim()), 500);
		return () => clearTimeout(t);
	}, [searchInput]);

	const [isVerified, setIsVerified] = useState(false);

	const fetcher = async (url) => {
		const response = await fetch(url, auth.accessToken);
		return response.data;
	};

	const riderDeliveriesQuery = useQuery({
		queryKey: ["riderDeliveries", riderId, page, searchTerm],
		queryFn: () =>
			fetcher(
				`${
					riderDeliveriesUrl + riderId
				}?PageNumber=${page}&SearchString=${encodeURIComponent(searchTerm)}`,
			),
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const pendingDeliveriesCountQuery = useQuery({
		queryKey: ["pendingDeliveriesCount", riderId],
		queryFn: () => fetcher(`${pendingDeliveriesCountUrl + riderId}`),
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const successfulDeliveriesCountQuery = useQuery({
		queryKey: ["successfulDeliveriesCount", riderId],
		queryFn: () => fetcher(`${successfulDeliveriesCountUrl + riderId}`),
		staleTime: 20000,
		refetchOnMount: "always",
	});

	useEffect(() => {
		if (riderDeliveriesQuery.isSuccess && riderDeliveriesQuery.data) {
			const meta = riderDeliveriesQuery.data.dataList;
			if (meta) {
				setTotalPages(meta.TotalPages || 1);
				setPageSize(meta.PageSize || meta.TotalCount || 5);
			}
			const first = riderDeliveriesQuery.data?.result?.[0];
			if (first?.Rider?.isVeirfied) setIsVerified(true);
		}
	}, [riderDeliveriesQuery.isSuccess, riderDeliveriesQuery.data]);

	const deliveries = riderDeliveriesQuery.data?.result || [];
	const empty = !riderDeliveriesQuery.isLoading && deliveries.length === 0;

	const anyError =
		riderDeliveriesQuery.isError ||
		pendingDeliveriesCountQuery.isError ||
		successfulDeliveriesCountQuery.isError;

	const handleGlobalRetry = () => {
		riderDeliveriesQuery.refetch();
		pendingDeliveriesCountQuery.refetch();
		successfulDeliveriesCountQuery.refetch();
	};

	const pageNumbers = useMemo(
		() => Array.from({ length: totalPages }, (_, i) => i + 1),
		[totalPages],
	);

	return (
		<div className="space-y-6">
			{/* Welcome */}
			<Card className="border-none bg-gradient-to-r from-brand to-primary text-primary-foreground">
				<CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold">Rider Dashboard</h1>
						<p className="text-sm opacity-90 mt-1">
							Track and manage your deliveries
						</p>
					</div>
					<Badge
						variant="outline"
						className={`border-white/40 bg-white/10 text-white ${
							isVerified ? "" : "opacity-80"
						}`}>
						{isVerified ? (
							<>
								<ShieldCheck className="mr-1 h-3.5 w-3.5" />
								Verified Rider
							</>
						) : (
							<>
								<ShieldAlert className="mr-1 h-3.5 w-3.5" />
								Not Verified
							</>
						)}
					</Badge>
				</CardContent>
			</Card>

			{anyError && (
				<Alert
					variant="destructive"
					className="flex items-center justify-between">
					<AlertDescription>
						Couldn&apos;t load some rider stats. Please retry.
					</AlertDescription>
					<Button variant="outline" size="sm" onClick={handleGlobalRetry}>
						Retry
					</Button>
				</Alert>
			)}

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<StatCard
					label="Total Deliveries"
					value={riderDeliveriesQuery.data?.dataList?.TotalCount}
					loading={riderDeliveriesQuery.isLoading}
					Icon={Package}
					accent="text-blue-500 bg-blue-500/10"
				/>
				<StatCard
					label="Successful"
					value={successfulDeliveriesCountQuery.data}
					loading={successfulDeliveriesCountQuery.isLoading}
					Icon={CheckCircle2}
					accent="text-emerald-500 bg-emerald-500/10"
				/>
				<StatCard
					label="Pending"
					value={pendingDeliveriesCountQuery.data}
					loading={pendingDeliveriesCountQuery.isLoading}
					Icon={Clock}
					accent="text-amber-500 bg-amber-500/10"
				/>
			</div>

			{/* Deliveries table */}
			<Card>
				<CardContent className="p-4 md:p-6 space-y-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<h2 className="text-lg md:text-xl font-bold">Deliveries</h2>
						<div className="relative w-full md:w-80">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search deliveries"
								className="pl-9"
								autoComplete="off"
							/>
						</div>
					</div>

					<div className="rounded-md border overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Pick Up Address</TableHead>
									<TableHead>Delivery Fee</TableHead>
									<TableHead>Delivery Status</TableHead>
									<TableHead>Order Status</TableHead>
									<TableHead>Delivered</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Phone</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{riderDeliveriesQuery.isLoading &&
									Array.from({ length: 5 }).map((_, i) => (
										<TableRow key={`s-${i}`}>
											<TableCell colSpan={8}>
												<Skeleton className="h-6 w-full" />
											</TableCell>
										</TableRow>
									))}
								{!riderDeliveriesQuery.isLoading &&
									riderDeliveriesQuery.isError && (
										<TableRow>
											<TableCell colSpan={8}>
												<Alert
													variant="destructive"
													className="flex items-center justify-between">
													<AlertDescription>
														Failed to load deliveries.
													</AlertDescription>
													<Button
														variant="outline"
														size="sm"
														onClick={() => riderDeliveriesQuery.refetch()}>
														Retry
													</Button>
												</Alert>
											</TableCell>
										</TableRow>
									)}
								{!riderDeliveriesQuery.isLoading &&
									!riderDeliveriesQuery.isError &&
									empty && (
										<TableRow>
											<TableCell
												colSpan={8}
												className="py-10 text-center text-sm text-muted-foreground">
												No deliveries found.
											</TableCell>
										</TableRow>
									)}
								{!riderDeliveriesQuery.isLoading &&
									!empty &&
									deliveries.map((delivery) => (
										<TableRow key={delivery.Id}>
											<TableCell className="font-medium max-w-[200px] truncate">
												{delivery.PickupAddress}
											</TableCell>
											<TableCell>₦{delivery.DeliveryFee}</TableCell>
											<TableCell>
												<StatusBadge status={delivery.Status} />
											</TableCell>
											<TableCell>
												<StatusBadge status={delivery.Order?.Status} />
											</TableCell>
											<TableCell>
												<DeliveredBadge
													delivered={delivery.Order?.IsDelivered}
												/>
											</TableCell>
											<TableCell>
												{delivery.Order?.Customer?.LastName}{" "}
												{delivery.Order?.Customer?.FirstName}
											</TableCell>
											<TableCell>
												{delivery.Order?.Customer?.PhoneNumber}
											</TableCell>
											<TableCell className="text-right">
												<FadeMenu delivery={delivery} />
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>

					{totalPages > 1 && (
						<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
							<p className="text-xs text-muted-foreground">
								Showing 1-
								{riderDeliveriesQuery.isLoading ? "…" : pageSize} of{" "}
								{riderDeliveriesQuery.isLoading
									? "…"
									: riderDeliveriesQuery.data?.dataList?.TotalCount || 0}
							</p>
							<Pagination className="md:justify-end">
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
									{pageNumbers.map((p) => (
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
												if (page < totalPages) setPage(page + 1);
											}}
											aria-disabled={page >= totalPages}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default RiderDashboard;
