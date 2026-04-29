import { useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Loader2, Upload } from "lucide-react";

import UploadImageModal from "../../subcomponents/UploadImageModal";
import ActivateDialogue from "../../subcomponents/ActivateDialogue";
import DeActivateDialogue from "../../subcomponents/DeActivateDialogue";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductData {
	Id: number | string;
	Name: string;
	Description?: string;
	Price?: number;
	Status?: boolean;
	ProductImgUrl?: string;
	VendorId?: number | string;
}

interface State {
	activate: boolean;
	deActivate: boolean;
	delete: boolean;
	upload: boolean;
}

type Action = { type: "activate" | "deActivate" | "delete" | "upload" };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "activate":
			return { ...state, activate: !state.activate };
		case "deActivate":
			return { ...state, deActivate: !state.deActivate };
		case "delete":
			return { ...state, delete: !state.delete };
		case "upload":
			return { ...state, upload: !state.upload };
		default:
			throw new Error();
	}
};

const AdminProduct = () => {
	const [state, dispatch] = useReducer(reducer, {
		activate: false,
		delete: false,
		upload: false,
		deActivate: false,
	});

	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}product`;
	const { id } = useParams<{ id: string }>();

	const getProduct = async () => {
		const response = await fetch(`${url}/get/${id}`, auth.accessToken);
		return response.data as ProductData;
	};

	const { data, isError, isSuccess, isLoading } = useQuery({
		queryKey: ["products", id],
		queryFn: getProduct,
		staleTime: 10000,
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
							<Link to={`/admin/vendor/${data?.VendorId}`}>Vendor</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.Name || "Details"}</BreadcrumbPage>
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
					<AlertDescription>Error fetching product.</AlertDescription>
				</Alert>
			)}

			{isSuccess && data && (
				<>
					<Card>
						<CardContent className="p-6 flex flex-col items-center text-center gap-3">
							<div className="h-28 w-28 rounded-full overflow-hidden border bg-muted">
								{data.ProductImgUrl && (
									<img
										src={data.ProductImgUrl}
										alt={data.Name}
										className="w-full h-full object-cover"
									/>
								)}
							</div>
							<h1 className="text-2xl font-bold">{data.Name}</h1>
							<p className="text-sm text-muted-foreground max-w-md">{data.Description}</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6 flex flex-col md:flex-row items-center justify-evenly gap-4">
							{data.Status ? (
								<Button variant="destructive" onClick={() => dispatch({ type: "deActivate" })}>
									De-Activate
								</Button>
							) : (
								<Button onClick={() => dispatch({ type: "activate" })}>Activate</Button>
							)}
							<h2 className="text-2xl font-bold">Price - {data.Price ?? 0}</h2>
							<Button variant="outline" onClick={() => dispatch({ type: "upload" })}>
								<Upload className="mr-2 h-4 w-4" />
								Upload Image
							</Button>
						</CardContent>
					</Card>

					<UploadImageModal
						open={state.upload}
						handleClose={dispatch}
						id={data.Id}
						url={`${baseUrl}product`}
						name="product"
					/>
					<DeActivateDialogue
						open={state.deActivate}
						handleClose={dispatch}
						url={`${baseUrl}product`}
						entity="product"
						Id={id as string}
					/>
					<ActivateDialogue
						open={state.activate}
						handleClose={dispatch}
						url={`${baseUrl}product`}
						entity="product"
						Id={id as string}
					/>
				</>
			)}
		</div>
	);
};

export default AdminProduct;
