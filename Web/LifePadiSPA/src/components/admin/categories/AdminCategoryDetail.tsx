import { useParams, Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { Card, CardContent } from "@/components/ui/card";
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
	Status?: string;
}

interface CategoryDetailData {
	Id: number | string;
	Name: string;
	Description: string;
	Icon?: string;
	Products?: ProductRow[];
}

const AdminCategoryDetails = () => {
	const { id } = useParams<{ id: string }>();
	const url = `${baseUrl}category/get`;
	const { auth } = useAuth();
	const fetch = useFetch();

	const getCategory = async (u: string) => {
		const response = await fetch(u, auth.accessToken);
		return response.data as CategoryDetailData;
	};

	const { data, isError, isSuccess, isLoading } = useQuery({
		queryKey: ["category", id],
		queryFn: () => getCategory(`${url}/${id}`),
		placeholderData: keepPreviousData,
		staleTime: 10000,
		refetchOnMount: "always",
	});

	return (
		<div className="space-y-6 p-4 md:p-6">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/admin/category">Category</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.Name || "Details"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-2xl font-bold text-center">Category Details</h1>

			{isLoading && (
				<div className="flex items-center justify-center py-10">
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
				</div>
			)}
			{isError && (
				<Alert variant="destructive">
					<AlertDescription>Error fetching category.</AlertDescription>
				</Alert>
			)}

			{isSuccess && data && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardContent className="p-4 flex flex-col items-center gap-2">
								<h3 className="text-sm font-semibold text-muted-foreground">
									Name
								</h3>
								<p className="text-base font-medium">{data.Name}</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4 flex justify-center items-center">
								{data.Icon ? (
									<div className="rounded-full border w-20 h-20 p-1 flex items-center justify-center overflow-hidden">
										<img
											src={data.Icon}
											alt={data.Name}
											className="w-full h-full object-contain"
										/>
									</div>
								) : (
									<span className="text-xs text-muted-foreground">No icon</span>
								)}
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4 flex flex-col items-center gap-2">
								<h3 className="text-sm font-semibold text-muted-foreground">
									Description
								</h3>
								<p className="text-sm text-center">{data.Description}</p>
							</CardContent>
						</Card>
					</div>

					<div>
						<h2 className="text-xl font-bold text-center mb-3">Products</h2>
						<Card>
							<CardContent className="p-0 overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-16">ID</TableHead>
											<TableHead>Product Name</TableHead>
											<TableHead>Tag</TableHead>
											<TableHead>Description</TableHead>
											<TableHead className="w-24">Price</TableHead>
											<TableHead className="w-24">Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.Products?.length ? (
											data.Products.map((p) => (
												<TableRow key={p.Id}>
													<TableCell>{p.Id}</TableCell>
													<TableCell className="font-medium">{p.Name}</TableCell>
													<TableCell>{p.Tag}</TableCell>
													<TableCell>{p.Description}</TableCell>
													<TableCell>{p.Price}</TableCell>
													<TableCell>
														<Badge variant="outline">{p.Status}</Badge>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={6}
													className="text-center text-muted-foreground py-8">
													No products in this category.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminCategoryDetails;
