import { useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2, Plus, Pencil, Trash2, Mail, Phone, KeyRound } from "lucide-react";

import CreateProductModal from "../product/CreateProductModal";
import EditProductModal from "../product/EditProductModal";
import DeActivateDialogue from "../../subcomponents/DeActivateDialogue";
import ActivateDialogue from "../../subcomponents/ActivateDialogue";
import PasswordChangeModal from "../../subcomponents/AdminPasswordChange";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";

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

interface ProductRow {
	Id: number | string;
	Name: string;
	Tag?: string;
	Description?: string;
	Price?: number;
	Status?: boolean;
}

interface VendorData {
	Id: number | string;
	Name: string;
	Email: string;
	PhoneNumber?: string;
	ContactAddress?: string;
	VendorImgUrl?: string;
	VendorCategoryId?: number | string;
	IsActive?: boolean;
}

interface State {
	open: boolean;
	edit: boolean;
	activate: boolean;
	deActivate: boolean;
	delete: boolean;
	vendorId: number | string | null;
	deleteId: number | string;
	product: ProductRow | null;
	password: boolean;
}

type Action =
	| { type: "open" | "edit" | "activate" | "deActivate" | "delete" | "password" }
	| { type: "vendorId"; payload: number | string | null }
	| { type: "deleteId"; payload: number | string }
	| { type: "product"; payload: ProductRow | null };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "edit":
			return { ...state, edit: !state.edit };
		case "activate":
			return { ...state, activate: !state.activate };
		case "deActivate":
			return { ...state, deActivate: !state.deActivate };
		case "delete":
			return { ...state, delete: !state.delete };
		case "password":
			return { ...state, password: !state.password };
		case "vendorId":
			return { ...state, vendorId: action.payload };
		case "deleteId":
			return { ...state, deleteId: action.payload };
		case "product":
			return { ...state, product: action.payload };
		default:
			throw new Error();
	}
};

const AdminVendorDetails = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}vendor`;
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		edit: false,
		activate: false,
		deActivate: false,
		delete: false,
		vendorId: null,
		deleteId: 0,
		product: null,
		password: false,
	});

	const getVendorAndProducts = async () => {
		const [v, p] = await Promise.all([
			fetch(`${url}/get/${id}`, auth.accessToken),
			fetch(`${url}/products/${id}`, auth.accessToken),
		]);
		return { vendor: v.data as VendorData, products: p.data as ProductRow[] };
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["vendors", id],
		queryFn: getVendorAndProducts,
		staleTime: 5000,
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
						<BreadcrumbLink asChild>
							<Link to={`/admin/vendorcategory/${data?.vendor?.VendorCategoryId}`}>
								Vendor Category
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.vendor?.Name || "Details"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{isLoading && (
				<div className="flex items-center justify-center py-10">
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
				</div>
			)}
			{isError && (
				<Alert variant="destructive">
					<AlertDescription>Error fetching vendor.</AlertDescription>
				</Alert>
			)}

			{isSuccess && data?.vendor && (
				<>
					<Card>
						<CardContent className="p-6 flex flex-col items-center text-center gap-2">
							<div className="h-28 w-28 rounded-full overflow-hidden border bg-muted">
								{data.vendor.VendorImgUrl && (
									<img
										src={data.vendor.VendorImgUrl}
										alt={data.vendor.Name}
										className="w-full h-full object-cover"
									/>
								)}
							</div>
							<h1 className="text-2xl font-bold">{data.vendor.Name}</h1>
							<div className="text-sm text-muted-foreground flex items-center gap-1">
								<Mail className="h-4 w-4" /> {data.vendor.Email}
							</div>
							<div className="text-sm text-muted-foreground flex items-center gap-1">
								<Phone className="h-4 w-4" /> {data.vendor.PhoneNumber}
							</div>
							<div className="text-sm text-muted-foreground">{data.vendor.ContactAddress}</div>
							<div className="flex gap-2 pt-2">
								{data.vendor.IsActive ? (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => dispatch({ type: "deActivate" })}
									>
										De-Activate
									</Button>
								) : (
									<Button size="sm" onClick={() => dispatch({ type: "activate" })}>
										Activate
									</Button>
								)}
								<Button
									variant="outline"
									size="sm"
									onClick={() => dispatch({ type: "password" })}
								>
									<KeyRound className="mr-2 h-4 w-4" />
									Change Password
								</Button>
							</div>
						</CardContent>
					</Card>

					<CreateProductModal
						open={state.open}
						handleClose={dispatch}
						vendorId={id as string}
					/>
					<EditProductModal
						open={state.edit}
						handleClose={dispatch}
						product={state.product}
						vendorId={state.vendorId}
					/>
					<DeActivateDialogue
						open={state.deActivate}
						handleClose={dispatch}
						url={`${baseUrl}vendor`}
						entity="vendor"
						Id={id as string}
					/>
					<ActivateDialogue
						open={state.activate}
						handleClose={dispatch}
						url={`${baseUrl}vendor`}
						entity="vendor"
						Id={id as string}
					/>
					{data.vendor.Email && (
						<PasswordChangeModal
							open={state.password}
							onClose={() => dispatch({ type: "password" })}
							email={data.vendor.Email}
							title="Change Vendor Password"
						/>
					)}

					<Card>
						<CardContent className="p-4 space-y-4">
							<div className="flex items-center justify-between">
								<h2 className="font-bold">Products ({data.products?.length || 0})</h2>
								<Button onClick={() => dispatch({ type: "open" })}>
									<Plus className="mr-2 h-4 w-4" />
									Create Product
								</Button>
							</div>
							<div className="overflow-x-auto rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-16">ID</TableHead>
											<TableHead>Name</TableHead>
											<TableHead>Tag</TableHead>
											<TableHead>Description</TableHead>
											<TableHead>Price</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.products?.length ? (
											data.products.map((p) => (
												<TableRow
													key={p.Id}
													className="cursor-pointer"
													onClick={() => navigate(`/admin/product/${p.Id}`)}
												>
													<TableCell>{p.Id}</TableCell>
													<TableCell className="font-medium">{p.Name}</TableCell>
													<TableCell>{p.Tag}</TableCell>
													<TableCell className="max-w-xs truncate">{p.Description}</TableCell>
													<TableCell>{p.Price}</TableCell>
													<TableCell>
														<Badge variant={p.Status ? "default" : "secondary"}>
															{p.Status ? "Active" : "Inactive"}
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
																	dispatch({ type: "deleteId", payload: p.Id });
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
																	dispatch({ type: "vendorId", payload: p.Id });
																	dispatch({ type: "product", payload: p });
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
												<TableCell colSpan={7} className="text-center text-muted-foreground py-6">
													No products.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</>
			)}
		</div>
	);
};

export default AdminVendorDetails;
