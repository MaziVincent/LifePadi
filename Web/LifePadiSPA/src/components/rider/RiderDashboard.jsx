import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useMemo } from "react";
import {
	riderDeliveriesUrl,
	successfulDeliveriesCountUrl,
	pendingDeliveriesCountUrl,
} from "./rider_uri/RiderURI";
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import FadeMenu from "./FadeMenu";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

// Small presentational helpers
const StatsCard = ({ label, value, loading }) => (
	<div className="flex flex-col items-center justify-center">
		<dt className="mb-2 text-3xl md:text-4xl font-extrabold">
			{loading ? <CircularProgress size={20} /> : value ?? 0}
		</dt>
		<dd className="font-light text-gray-500 dark:text-gray-400">{label}</dd>
	</div>
);

const StatusChip = ({ delivered, className = "" }) => (
	<Chip
		size="small"
		label={delivered ? "Delivered" : "Pending"}
		color={delivered ? "success" : "warning"}
		className={className}
		variant={delivered ? "filled" : "outlined"}
	/>
);

const DeliveryStatusChip = ({ status }) => {
	const colorMap = useMemo(
		() => ({
			Pending: "warning",
			Accepted: "info",
			InTransit: "secondary",
			Delivered: "success",
			Failed: "error",
		}),
		[]
	);
	const chipColor = colorMap[status] || "default";
	return (
		<Chip size="small" label={status} color={chipColor} variant="outlined" />
	);
};

const RiderDashboard = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const riderId = auth.Id;

	// pagination + data meta
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	// search with debounce
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
				}?PageNumber=${page}&SearchString=${encodeURIComponent(searchTerm)}`
			),
		keepPreviousData: true,
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

	// derive metadata + verified flag
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

	const goToPage = (i) => {
		if (i > 0 && i <= totalPages && i !== page) setPage(i);
	};
	const nextPage = () => page < totalPages && setPage((p) => p + 1);
	const prevPage = () => page > 1 && setPage((p) => p - 1);

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

	return (
		<div className="dark:bg-darkBg bg-primary min-h-full sm:pt-14">
			<section className="bg-white dark:bg-gray-900 mb-5">
				<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 ">
					{anyError && (
						<div className="mb-6">
							<Alert
								severity="error"
								className="flex justify-between items-center">
								<span className="mr-4">
									Couldn't load some rider stats. Please retry.
								</span>
								<Button
									variant="outlined"
									size="small"
									onClick={handleGlobalRetry}>
									Retry
								</Button>
							</Alert>
						</div>
					)}
					<dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
						<StatsCard
							label="Total Deliveries"
							value={riderDeliveriesQuery.data?.dataList?.TotalCount}
							loading={riderDeliveriesQuery.isLoading}
						/>
						<StatsCard
							label="Successful"
							value={successfulDeliveriesCountQuery.data}
							loading={successfulDeliveriesCountQuery.isLoading}
						/>
						<StatsCard
							label="Pending"
							value={pendingDeliveriesCountQuery.data}
							loading={pendingDeliveriesCountQuery.isLoading}
						/>
					</dl>
				</div>
			</section>
			<section className="dark:bg-darkMenu bg-primary dark:bg-gray-900 p-3 sm:p-5">
				<div className="mx-auto max-w-screen-xl">
					<div className="bg-white relative shadow-md rounded-lg">
						<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
							<div className="w-full md:w-1/2">
								<form className="flex items-center">
									<label htmlFor="simple-search" className="sr-only">
										Search
									</label>
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<svg
												aria-hidden="true"
												className="w-5 h-5 text-darkBg dark:text-gray-400"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<input
											value={searchInput}
											onChange={(e) => setSearchInput(e.target.value)}
											type="text"
											id="simple-search"
											className="bg-gray-50 border border-gray-300 text-darkBg text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder="Search deliveries"
											autoComplete="off"
										/>
									</div>
								</form>
							</div>
							<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
								<Chip
									color={isVerified ? "success" : "default"}
									variant={isVerified ? "filled" : "outlined"}
									label={isVerified ? "Verified Rider" : "Not Verified"}
								/>
							</div>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-4 py-3">
											Pick Up Address
										</th>
										<th scope="col" className="px-4 py-3">
											Delivery Fee
										</th>
										<th scope="col" className="px-4 py-3">
											Delivery Status
										</th>
										<th scope="col" className="px-4 py-3">
											Order Status
										</th>
										<th scope="col" className="px-4 py-3">
											IsDelivered
										</th>
										<th scope="col" className="px-4 py-3">
											Customer Name
										</th>
										<th scope="col" className="px-4 py-3">
											Customer Phone
										</th>
										<th scope="col" className="px-4 py-3">
											<span className="">Actions</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{riderDeliveriesQuery.isLoading && (
										<tr className="">
											<td colSpan={8} className="">
												<div className="p-3 flex flex-row justify-center items-center w-full">
													<CircularProgress />
												</div>
											</td>
										</tr>
									)}
									{!riderDeliveriesQuery.isLoading &&
										riderDeliveriesQuery.isError && (
											<tr>
												<td colSpan={8} className="px-4 py-6">
													<Alert
														severity="error"
														action={
															<Button
																color="inherit"
																size="small"
																onClick={riderDeliveriesQuery.refetch}>
																Retry
															</Button>
														}>
														Failed to load deliveries.
													</Alert>
												</td>
											</tr>
										)}
									{!riderDeliveriesQuery.isLoading &&
										!riderDeliveriesQuery.isError &&
										empty && (
											<tr>
												<td
													colSpan={8}
													className="px-4 py-10 text-center text-sm text-gray-400">
													No deliveries found.
												</td>
											</tr>
										)}
									{!riderDeliveriesQuery.isLoading &&
										!empty &&
										deliveries.map((delivery) => (
											<tr
												className="border-b dark:border-gray-700"
												key={delivery.Id}>
												<th
													scope="row"
													className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{delivery.PickupAddress}
												</th>
												<td className="px-4 py-3">
													&#x20A6; {delivery.DeliveryFee}
												</td>
												<td className="px-4 py-3">
													<DeliveryStatusChip status={delivery.Status} />
												</td>
												<td className="px-4 py-3">
													<DeliveryStatusChip status={delivery.Order.Status} />
												</td>
												<td className="px-4 py-3">
													<StatusChip delivered={delivery.Order?.IsDelivered} />
												</td>
												<td className="px-4 py-3">
													{delivery.Order.Customer.LastName +
														" " +
														delivery.Order.Customer.FirstName}
												</td>
												<td className="px-4 py-3">
													{delivery.Order.Customer.PhoneNumber}
												</td>
												<td className="px-5 py-3 flex items-center justify-end dropdown">
													<FadeMenu delivery={delivery} />
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
						<nav
							className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
							aria-label="Table navigation">
							<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
								Showing
								<span className="font-semibold text-gray-900 dark:text-white m-1">
									1-
									{riderDeliveriesQuery.isLoading ? (
										<CircularProgress size={16} />
									) : (
										pageSize
									)}
								</span>
								of
								<span className="font-semibold text-gray-900 dark:text-white m-1">
									{riderDeliveriesQuery.isLoading
										? "Loading"
										: riderDeliveriesQuery.data?.dataList?.TotalCount || 0}
								</span>
							</span>
							<ul className="inline-flex items-stretch -space-x-px">
								<li>
									<button
										onClick={prevPage}
										className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
										<span className="sr-only">Previous</span>
										<svg
											className="w-5 h-5"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</li>
								{Array.from({ length: totalPages }, (_, i) => (
									<li key={i}>
										<button
											onClick={() => goToPage(i + 1)}
											className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border hover:bg-gray-100 dark:hover:bg-gray-700 ${
												page === i + 1
													? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white border-gray-400 dark:border-gray-600"
													: "text-gray-500 bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
											}`}>
											{i + 1}
										</button>
									</li>
								))}
								<li className="hidden">
									<Link
										to="#"
										className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
										...
									</Link>
								</li>
								<li className="hidden">
									<Link
										to="#"
										className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
										100
									</Link>
								</li>
								<li>
									<button
										onClick={nextPage}
										className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
										<span className="sr-only">Next</span>
										<svg
											className="w-5 h-5"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RiderDashboard;
