import { useReducer, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Search, Pencil, Trash2 } from "lucide-react";

import CreateVendorCategoryModal from "./vendorCategory/CreateVendorCategoryModal";
import EditVendorCategoryModal, {
	type VendorCategoryRow,
} from "./vendorCategory/EditVendorCategoryModal";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

interface VendorCategoryState {
	open: boolean;
	edit: boolean;
	delete: boolean;
	category: VendorCategoryRow | Record<string, unknown>;
	deleteId: number | string;
}

type VendorCategoryAction =
	| { type: "open" | "edit" | "delete" }
	| { type: "category"; payload: VendorCategoryRow }
	| { type: "deleteId"; payload: number | string };

const reducer = (
	state: VendorCategoryState,
	action: VendorCategoryAction,
): VendorCategoryState => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "edit":
			return { ...state, edit: !state.edit };
		case "delete":
			return { ...state, delete: !state.delete };
		case "category":
			return { ...state, category: action.payload };
		case "deleteId":
			return { ...state, deleteId: action.payload };
		default:
			throw new Error();
	}
};

const AdminVendorCategory = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}vendorcategory`;
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [state, dispatch] = useReducer(reducer, {
		open: false,
		edit: false,
		delete: false,
		category: {},
		deleteId: 0,
	});

	const getCategories = async (u: string) => {
		const result = await fetch(u, auth.accessToken);
		return result.data;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["vendorcategories", page, search],
		queryFn: () => getCategories(`${url}/all?PageNumber=${page}&SearchString=${search}`),
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const totalPages = data?.dataList?.TotalPages || 1;

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Vendor Categories</h1>
					<p className="text-sm text-muted-foreground">
						{data?.dataList?.TotalCount || 0} total
					</p>
				</div>
				<Button onClick={() => dispatch({ type: "open" })}>
					<Plus className="mr-2 h-4 w-4" />
					Create
				</Button>
			</section>

			<CreateVendorCategoryModal open={state.open} handleClose={dispatch} />
			<EditVendorCategoryModal
				open={state.edit}
				handleClose={dispatch}
				vendorCategory={state.category}
			/>
			<DeleteDialogue
				open={state.delete}
				handleClose={dispatch}
				deleteId={state.deleteId}
				url={url}
				name="vendorcategories"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="relative w-full md:w-1/2">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search categories…"
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
							<AlertDescription>Error fetching categories.</AlertDescription>
						</Alert>
					)}
					{isSuccess && (
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Icon</TableHead>
										<TableHead>Description</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.result?.length ? (
										data.result.map((cat: VendorCategoryRow) => (
											<TableRow
												key={cat.Id}
												className="cursor-pointer"
												onClick={() => navigate(`/admin/vendorcategory/${cat.Id}`)}
											>
												<TableCell className="font-medium">{cat.Name}</TableCell>
												<TableCell>
													{cat.IconUrl ? (
														<img
															src={cat.IconUrl}
															alt={cat.Name}
															className="h-10 w-10 rounded-full object-cover"
														/>
													) : (
														<div className="h-10 w-10 rounded-full bg-muted" />
													)}
												</TableCell>
												<TableCell className="max-w-md truncate">
													{cat.Description}
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															aria-label="Delete"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "delete" });
																dispatch({ type: "deleteId", payload: cat.Id });
															}}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															aria-label="Edit"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "edit" });
																dispatch({ type: "category", payload: cat });
															}}
														>
															<Pencil className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={4} className="text-center text-muted-foreground py-8">
												No categories found.
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

export default AdminVendorCategory;
