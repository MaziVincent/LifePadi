import { useReducer, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Search, Pencil, Trash2 } from "lucide-react";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
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

interface CategoryRow {
	Id: number | string;
	Name: string;
	Description: string;
	Icon?: string;
}

interface CategoryState {
	open: boolean;
	edit: boolean;
	activate: boolean;
	delete: boolean;
	category: CategoryRow | Record<string, unknown>;
	deleteId: number | string;
}

type CategoryAction =
	| { type: "open" | "edit" | "activate" | "delete" }
	| { type: "category"; payload: CategoryRow }
	| { type: "deleteId"; payload: number | string };

const reducer = (state: CategoryState, action: CategoryAction): CategoryState => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "edit":
			return { ...state, edit: !state.edit };
		case "activate":
			return { ...state, activate: !state.activate };
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

const AdminCategory = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}category`;
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		edit: false,
		activate: false,
		delete: false,
		category: {},
		deleteId: 0,
	});

	const getCategories = async (u: string) => {
		const result = await fetch(u, auth.accessToken);
		return result.data;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["categories", page, search],
		queryFn: () =>
			getCategories(
				`${url}/all?PageNumber=${page}&SearchString=${search}&PageSize=10`,
			),
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const totalPages = data?.dataList?.TotalPages || 1;

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Categories</h1>
					<p className="text-sm text-muted-foreground">
						{data?.dataList?.TotalCount || 0} total
					</p>
				</div>
				<Button onClick={() => dispatch({ type: "open" })}>
					<Plus className="mr-2 h-4 w-4" />
					Add Category
				</Button>
			</section>

			<CreateCategoryModal open={state.open} handleClose={dispatch} />
			<EditCategoryModal
				open={state.edit}
				handleClose={dispatch}
				category={state.category as CategoryRow}
			/>
			<DeleteDialogue
				open={state.delete}
				handleClose={dispatch}
				deleteId={state.deleteId}
				url={url}
				name="categorie"
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
										<TableHead>Category Name</TableHead>
										<TableHead>Description</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.result?.length ? (
										data.result.map((cat: CategoryRow) => (
											<TableRow
												key={cat.Id}
												className="cursor-pointer"
												onClick={() => navigate(`/admin/category/${cat.Id}`)}>
												<TableCell className="font-medium">{cat.Name}</TableCell>
												<TableCell>{cat.Description}</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "delete" });
																dispatch({ type: "deleteId", payload: cat.Id });
															}}
															aria-label="Delete">
															<Trash2 className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "edit" });
																dispatch({ type: "category", payload: cat });
															}}
															aria-label="Edit">
															<Pencil className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={3}
												className="text-center text-muted-foreground py-8">
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
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminCategory;
