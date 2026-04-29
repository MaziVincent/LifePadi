import { useReducer, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Loader2, Plus, Search, KeyRound, Pencil, Trash2, ShieldX, ShieldCheck } from "lucide-react";

import CreateAdminModal from "./CreateAdminModal";
import EditAdminModal from "./EditAdminModal";
import DeActivateDialogue from "../subcomponents/DeActivateDialogue";
import ActivateDialogue from "../subcomponents/ActivateDialogue";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
import AdminPasswordChange from "../subcomponents/AdminPasswordChange";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

interface AdminRow {
	Id: number | string;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber?: string;
	IsActive?: boolean;
	ContactAddress?: string;
}

interface AdminListResp {
	result: AdminRow[];
	dataList: { TotalCount: number; TotalPages: number };
}

interface State {
	open: boolean;
	delete: boolean;
	edit: boolean;
	activate: boolean;
	password: boolean;
	deActivate: boolean;
	admin: AdminRow | null;
	id: number | string;
}

type Action =
	| { type: "open" | "delete" | "edit" | "activate" | "password" | "deActivate" }
	| { type: "admin"; payload: AdminRow | null }
	| { type: "id"; payload: number | string };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "delete":
			return { ...state, delete: !state.delete };
		case "edit":
			return { ...state, edit: !state.edit };
		case "activate":
			return { ...state, activate: !state.activate };
		case "password":
			return { ...state, password: !state.password };
		case "deActivate":
			return { ...state, deActivate: !state.deActivate };
		case "admin":
			return { ...state, admin: action.payload };
		case "id":
			return { ...state, id: action.payload };
		default:
			throw new Error();
	}
};

const Admin = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}admin`;
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		delete: false,
		edit: false,
		activate: false,
		password: false,
		deActivate: false,
		admin: null,
		id: 0,
	});

	const { data, isError, isLoading, isSuccess } = useQuery<AdminListResp>({
		queryKey: ["admins", page, search],
		queryFn: async () => {
			const r = await fetch(
				`${url}/all?PageNumber=${page}&SearchString=${search}`,
				auth.accessToken,
			);
			return r.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 5000,
		refetchOnMount: "always",
	});

	const totalPages = data?.dataList?.TotalPages || 1;
	const emailForPassword = data?.result?.find((a) => a.Id === state.id)?.Email;

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section className="text-center">
				<div className="text-3xl font-bold">{data?.dataList?.TotalCount || 0}</div>
				<div className="text-sm text-muted-foreground">Admins</div>
				<h1 className="mt-4 text-3xl font-bold">Admins</h1>
			</section>

			<CreateAdminModal open={state.open} handleClose={dispatch} />
			<EditAdminModal open={state.edit} handleClose={dispatch} admin={state.admin} />
			<DeActivateDialogue
				open={state.deActivate}
				handleClose={dispatch}
				Id={state.id}
				url={url}
				entity="admin"
			/>
			<ActivateDialogue
				open={state.activate}
				handleClose={dispatch}
				Id={state.id}
				url={url}
				entity="admin"
			/>
			<DeleteDialogue
				open={state.delete}
				handleClose={dispatch}
				deleteId={state.id}
				url={url}
				name="admin"
			/>
			<AdminPasswordChange
				open={state.password}
				handleClose={() => dispatch({ type: "password" })}
				email={emailForPassword}
				title="Change Admin Password"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="flex flex-col md:flex-row items-center justify-between gap-3">
						<div className="relative w-full md:w-1/2">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								className="pl-9"
								placeholder="Search"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<Button onClick={() => dispatch({ type: "open" })}>
							<Plus className="mr-2 h-4 w-4" />
							Create Admin
						</Button>
					</div>

					{isLoading && (
						<div className="flex items-center justify-center py-10">
							<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
						</div>
					)}
					{isError && (
						<Alert variant="destructive">
							<AlertDescription>Error fetching data.</AlertDescription>
						</Alert>
					)}
					{isSuccess && (
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Admin Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Phone Number</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.result?.length ? (
										data.result.map((a) => (
											<TableRow key={a.Id}>
												<TableCell>
													<div className="font-medium capitalize">
														{a.FirstName} {a.LastName}
													</div>
													<div className="text-xs text-muted-foreground">{a.Email}</div>
												</TableCell>
												<TableCell>
													<Badge variant={a.IsActive ? "default" : "secondary"}>
														{a.IsActive ? "Active" : "Inactive"}
													</Badge>
												</TableCell>
												<TableCell>{a.PhoneNumber}</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														{a.IsActive ? (
															<Button
																variant="ghost"
																size="icon"
																className="text-destructive"
																aria-label="De-activate"
																onClick={() => {
																	dispatch({ type: "id", payload: a.Id });
																	dispatch({ type: "deActivate" });
																}}
															>
																<ShieldX className="h-5 w-5" />
															</Button>
														) : (
															<Button
																variant="ghost"
																size="icon"
																className="text-emerald-600"
																aria-label="Activate"
																onClick={() => {
																	dispatch({ type: "id", payload: a.Id });
																	dispatch({ type: "activate" });
																}}
															>
																<ShieldCheck className="h-5 w-5" />
															</Button>
														)}
														<Button
															variant="ghost"
															size="icon"
															aria-label="Edit"
															onClick={() => {
																dispatch({ type: "admin", payload: a });
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
															onClick={() => {
																dispatch({ type: "id", payload: a.Id });
																dispatch({ type: "delete" });
															}}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
														<Button
															variant="outline"
															size="sm"
															onClick={() => {
																dispatch({ type: "id", payload: a.Id });
																dispatch({ type: "password" });
															}}
														>
															<KeyRound className="mr-2 h-4 w-4" />
															Password
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={4} className="text-center text-muted-foreground py-8">
												No admins.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					)}

					{totalPages > 1 && (
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										onClick={() => setPage((p) => Math.max(1, p - 1))}
										aria-disabled={page <= 1}
										className={page <= 1 ? "pointer-events-none opacity-50" : ""}
									/>
								</PaginationItem>
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
									<PaginationItem key={p}>
										<PaginationLink isActive={p === page} onClick={() => setPage(p)}>
											{p}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									<PaginationNext
										onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
										aria-disabled={page >= totalPages}
										className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
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

export default Admin;
