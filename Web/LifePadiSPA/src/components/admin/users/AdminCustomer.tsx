import { useReducer, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, Search, ShieldCheck, ShieldX, Trash2 } from "lucide-react";

import DeActivateDialogue from "../subcomponents/DeActivateDialogue";
import ActivateDialogue from "../subcomponents/ActivateDialogue";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Build a compact pagination range with ellipses so it never spills off
 * narrow screens. Always shows first & last pages, the current page, and
 * one neighbour on each side.
 */
const buildPageRange = (current: number, total: number): (number | "…")[] => {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const pages: (number | "…")[] = [1];
	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);
	if (start > 2) pages.push("…");
	for (let p = start; p <= end; p++) pages.push(p);
	if (end < total - 1) pages.push("…");
	pages.push(total);
	return pages;
};

interface CustomerRow {
	Id: number | string;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber: string;
	ContactAddress?: string;
	IsActive?: boolean;
}

interface CustomerState {
	delete: boolean;
	activate: boolean;
	deActivate: boolean;
	id: number | string;
}

type CustomerAction =
	| { type: "delete" | "activate" | "deActivate" }
	| { type: "id"; payload: number | string };

const reducer = (
	state: CustomerState,
	action: CustomerAction,
): CustomerState => {
	switch (action.type) {
		case "delete":
			return { ...state, delete: !state.delete };
		case "activate":
			return { ...state, activate: !state.activate };
		case "deActivate":
			return { ...state, deActivate: !state.deActivate };
		case "id":
			return { ...state, id: action.payload };
		default:
			throw new Error();
	}
};

const AdminCustomer = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}customer`;
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [state, dispatch] = useReducer(reducer, {
		delete: false,
		activate: false,
		deActivate: false,
		id: 0,
	});

	const getCustomers = async (u: string) => {
		const result = await fetch(u, auth.accessToken);
		return result.data;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["customers", page, search],
		queryFn: () =>
			getCustomers(
				`${url}/all?PageNumber=${page}&SearchString=${search}&PageSize=10`,
			),
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const totalPages = data?.dataList?.TotalPages || 1;

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section>
				<h1 className="text-2xl font-bold">Customers</h1>
				<p className="text-sm text-muted-foreground">
					{data?.dataList?.TotalCount || 0} total
				</p>
			</section>

			<DeActivateDialogue
				open={state.deActivate}
				handleClose={dispatch}
				Id={state.id}
				url={url}
				entity="customer"
			/>
			<ActivateDialogue
				open={state.activate}
				handleClose={dispatch}
				Id={state.id}
				url={url}
				entity="customer"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="relative w-full md:w-1/2">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search customers…"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setPage(1);
							}}
							className="pl-9"
						/>
					</div>

					{isLoading && (
						<div className="flex items-center justify-center py-10">
							<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
						</div>
					)}
					{isError && (
						<Alert variant="destructive">
							<AlertDescription>Error fetching customers.</AlertDescription>
						</Alert>
					)}
					{isSuccess && (
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Customer</TableHead>
										<TableHead>Phone</TableHead>
										<TableHead>Address</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.result?.length ? (
										data.result.map((c: CustomerRow) => (
											<TableRow
												key={c.Id}
												className="cursor-pointer"
												onClick={() => navigate(`/admin/customer/${c.Id}`)}>
												<TableCell>
													<div className="flex items-center gap-3">
														<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium uppercase">
															{c.FirstName?.[0]}
															{c.LastName?.[0]}
														</div>
														<div>
															<div className="font-medium capitalize">
																{c.FirstName} {c.LastName}
															</div>
															<div className="text-xs text-muted-foreground">
																{c.Email}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>{c.PhoneNumber}</TableCell>
												<TableCell className="capitalize">
													{c.ContactAddress}
												</TableCell>
												<TableCell>
													<Badge variant={c.IsActive ? "default" : "secondary"}>
														{c.IsActive ? "Active" : "Inactive"}
													</Badge>
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														{c.IsActive ? (
															<Button
																variant="ghost"
																size="icon"
																className="text-destructive"
																aria-label="Deactivate"
																onClick={(e) => {
																	e.stopPropagation();
																	dispatch({ type: "id", payload: c.Id });
																	dispatch({ type: "deActivate" });
																}}>
																<ShieldX className="h-4 w-4" />
															</Button>
														) : (
															<Button
																variant="ghost"
																size="icon"
																className="text-emerald-600"
																aria-label="Activate"
																onClick={(e) => {
																	e.stopPropagation();
																	dispatch({ type: "id", payload: c.Id });
																	dispatch({ type: "activate" });
																}}>
																<ShieldCheck className="h-4 w-4" />
															</Button>
														)}
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															aria-label="Delete"
															onClick={(e) => e.stopPropagation()}>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={5}
												className="text-center text-muted-foreground py-8">
												No customers found.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					)}

					{isSuccess && totalPages > 1 && (
						<Pagination>
							<PaginationContent className="flex-wrap">
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
								{buildPageRange(page, totalPages).map((p, idx) =>
									p === "…" ? (
										<PaginationItem key={`e-${idx}`}>
											<PaginationEllipsis />
										</PaginationItem>
									) : (
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

export default AdminCustomer;
