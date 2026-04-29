import { useReducer } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2, Plus, Pencil, Trash2, Upload } from "lucide-react";

import CreateVendorModal from "./vendor/CreateVendorModal";
import EditVendorModal from "./vendor/EditVendorModal";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
import UploadImageModal from "../subcomponents/UploadImageModal";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface VendorRow {
	Id: number | string;
	Name: string;
	Tag?: string;
	PhoneNumber?: string;
	ContactAddress?: string;
	IsActive?: boolean;
}

interface VendorCategoryDetailData {
	Id: number | string;
	Name: string;
	Description?: string;
	Vendors?: VendorRow[];
}

interface State {
	open: boolean;
	edit: boolean;
	delete: boolean;
	upload: boolean;
	vendorId: number | string | null;
	deleteId: number | string;
}

type Action =
	| { type: "open" | "edit" | "delete" | "upload" }
	| { type: "vendorId"; payload: number | string | null }
	| { type: "deleteId"; payload: number | string };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "edit":
			return { ...state, edit: !state.edit };
		case "delete":
			return { ...state, delete: !state.delete };
		case "upload":
			return { ...state, upload: !state.upload };
		case "vendorId":
			return { ...state, vendorId: action.payload };
		case "deleteId":
			return { ...state, deleteId: action.payload };
		default:
			throw new Error();
	}
};

const AdminVendorCategoryDetails = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}vendorcategory`;
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		edit: false,
		delete: false,
		upload: false,
		vendorId: null,
		deleteId: 0,
	});

	const getCategory = async (u: string) => {
		const result = await fetch(u, auth.accessToken);
		return result.data as VendorCategoryDetailData;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["vendorcategory", id],
		queryFn: () => getCategory(`${url}/get/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	return (
		<div className="space-y-6 p-4 md:p-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/admin/vendorcategory">Categories</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.Name || "Details"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<section className="text-center">
				<h1 className="text-2xl font-bold">{data?.Name}</h1>
				<p className="text-sm text-muted-foreground">{data?.Description}</p>
			</section>

			<CreateVendorModal open={state.open} handleClose={dispatch} vendorCategory={id || ""} />
			<EditVendorModal open={state.edit} handleClose={dispatch} vendorId={state.vendorId} />
			<UploadImageModal
				open={state.upload}
				handleClose={dispatch}
				id={state.vendorId as number | string}
				url={`${baseUrl}vendor`}
				name="Vendor"
			/>
			<DeleteDialogue
				open={state.delete}
				handleClose={dispatch}
				deleteId={state.deleteId}
				url={`${baseUrl}vendor`}
				name="vendorcategory"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="font-bold">Vendors ({data?.Vendors?.length || 0})</h2>
						<Button onClick={() => dispatch({ type: "open" })}>
							<Plus className="mr-2 h-4 w-4" />
							Create Vendor
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
										<TableHead className="w-16">ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Tag</TableHead>
										<TableHead>Phone</TableHead>
										<TableHead>Address</TableHead>
										<TableHead>Active</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.Vendors?.length ? (
										data.Vendors.map((v) => (
											<TableRow
												key={v.Id}
												className="cursor-pointer"
												onClick={() => navigate(`/admin/vendor/${v.Id}`)}
											>
												<TableCell>{v.Id}</TableCell>
												<TableCell className="font-medium">{v.Name}</TableCell>
												<TableCell>{v.Tag}</TableCell>
												<TableCell>{v.PhoneNumber}</TableCell>
												<TableCell>{v.ContactAddress}</TableCell>
												<TableCell>
													<Badge variant={v.IsActive ? "default" : "secondary"}>
														{v.IsActive ? "Active" : "Inactive"}
													</Badge>
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
																dispatch({ type: "deleteId", payload: v.Id });
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
																dispatch({ type: "vendorId", payload: v.Id });
															}}
														>
															<Pencil className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															aria-label="Upload"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "upload" });
																dispatch({ type: "vendorId", payload: v.Id });
															}}
														>
															<Upload className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={7} className="text-center text-muted-foreground py-8">
												No vendors.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminVendorCategoryDetails;
