import { useReducer, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
	Loader2,
	Plus,
	Search,
	Pencil,
	Trash2,
	ShieldCheck,
	ShieldX,
} from "lucide-react";

import CreateRiderModal from "./CreateRiderModal";
import EditRiderModal, { type RiderRow } from "./EditRiderModal";
import DeActivateDialogue from "../subcomponents/DeActivateDialogue";
import ActivateDialogue from "../subcomponents/ActivateDialogue";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
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
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface RiderState {
	open: boolean;
	delete: boolean;
	edit: boolean;
	activate: boolean;
	deActivate: boolean;
	rider: RiderRow | Record<string, unknown>;
	id: number | string;
}

type RiderAction =
	| { type: "open" | "delete" | "edit" | "activate" | "deActivate" }
	| { type: "rider"; payload: RiderRow }
	| { type: "id"; payload: number | string };

const reducer = (state: RiderState, action: RiderAction): RiderState => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "delete":
			return { ...state, delete: !state.delete };
		case "edit":
			return { ...state, edit: !state.edit };
		case "activate":
			return { ...state, activate: !state.activate };
		case "deActivate":
			return { ...state, deActivate: !state.deActivate };
		case "rider":
			return { ...state, rider: action.payload };
		case "id":
			return { ...state, id: action.payload };
		default:
			throw new Error();
	}
};

const AdminRider = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}rider`;
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		delete: false,
		edit: false,
		activate: false,
		deActivate: false,
		rider: {},
		id: 0,
	});

	const getRiders = async (u: string) => {
		const result = await fetch(u, auth.accessToken);
		return result.data;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["riders", page, search],
		queryFn: () => getRiders(`${url}/all?PageNumber=${page}&SearchString=${search}`),
		placeholderData: keepPreviousData,
		staleTime: 2000,
		refetchOnMount: "always",
	});

	const totalPages = data?.dataList?.TotalPages || 1;

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Riders</h1>
					<p className="text-sm text-muted-foreground">
						{data?.dataList?.TotalCount || 0} total
					</p>
				</div>
				<Button onClick={() => dispatch({ type: "open" })}>
					<Plus className="mr-2 h-4 w-4" />
					Create Rider
				</Button>
			</section>

			<CreateRiderModal open={state.open} handleClose={dispatch} />
			<EditRiderModal open={state.edit} handleClose={dispatch} rider={state.rider} />
			<DeActivateDialogue
				open={state.deActivate}
				handleClose={dispatch}
				Id={state.id}
				url={url}
				entity="rider"
			/>
			<ActivateDialogue
				open={state.activate}
				handleClose={dispatch}
				Id={state.id}
				url={url}
				entity="rider"
			/>
			<DeleteDialogue
				open={state.delete}
				handleClose={dispatch}
				deleteId={state.id}
				url={url}
				name="rider"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="relative w-full md:w-1/2">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search riders…"
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
							<AlertDescription>Error fetching riders.</AlertDescription>
						</Alert>
					)}
					{isSuccess && (
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Rider</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Phone</TableHead>
										<TableHead>Verification</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.result?.length ? (
										data.result.map((rider: RiderRow) => (
											<TableRow
												key={rider.Id}
												className="cursor-pointer"
												onClick={() => navigate(`/admin/rider/${rider.Id}`)}
											>
												<TableCell>
													<div className="flex items-center gap-3">
														<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium uppercase">
															{rider.FirstName?.[0]}
															{rider.LastName?.[0]}
														</div>
														<div>
															<div className="font-medium capitalize">
																{rider.FirstName} {rider.LastName}
															</div>
															<div className="text-xs text-muted-foreground">
																{rider.Email}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge variant={rider.IsActive ? "default" : "secondary"}>
														{rider.IsActive ? "Active" : "Inactive"}
													</Badge>
												</TableCell>
												<TableCell>{rider.PhoneNumber}</TableCell>
												<TableCell>
													<Badge variant={rider.IsVerified ? "default" : "outline"}>
														{rider.IsVerified ? "Verified" : "Not Verified"}
													</Badge>
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														{rider.IsActive ? (
															<Button
																variant="ghost"
																size="icon"
																className="text-destructive"
																aria-label="Deactivate"
																onClick={(e) => {
																	e.stopPropagation();
																	dispatch({ type: "id", payload: rider.Id });
																	dispatch({ type: "deActivate" });
																}}
															>
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
																	dispatch({ type: "id", payload: rider.Id });
																	dispatch({ type: "activate" });
																}}
															>
																<ShieldCheck className="h-4 w-4" />
															</Button>
														)}
														<Button
															variant="ghost"
															size="icon"
															aria-label="Edit"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "rider", payload: rider });
																dispatch({ type: "edit" });
															}}
														>
															<Pencil className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															aria-label="Delete"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "id", payload: rider.Id });
																dispatch({ type: "delete" });
															}}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5} className="text-center text-muted-foreground py-8">
												No riders found.
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
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
									<PaginationItem key={p}>
										<PaginationLink
											href="#"
											isActive={p === page}
											onClick={(e) => {
												e.preventDefault();
												setPage(p);
											}}
										>
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
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminRider;
