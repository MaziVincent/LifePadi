import { useParams, Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
}

interface ServiceDetailData {
	Id: number | string;
	Name: string;
	Description: string;
	ServiceIconUrl?: string;
	Vendors?: VendorRow[];
}

const AdminServiceDetails = () => {
	const { id } = useParams<{ id: string }>();
	const url = `${baseUrl}service/get`;
	const { auth } = useAuth();
	const fetch = useFetch();

	const getService = async (u: string) => {
		const response = await fetch(u, auth.accessToken);
		return response.data as ServiceDetailData;
	};

	const { data, isError, isSuccess, isLoading } = useQuery({
		queryKey: ["service", id],
		queryFn: () => getService(`${url}/${id}`),
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
							<Link to="/admin/service">Services</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.Name || "Details"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-2xl font-bold text-center">Service Details</h1>

			{isLoading && (
				<div className="flex items-center justify-center py-10">
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
				</div>
			)}
			{isError && (
				<Alert variant="destructive">
					<AlertDescription>Error fetching service.</AlertDescription>
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
								{data.ServiceIconUrl ? (
									<div className="rounded-full border w-20 h-20 p-1 flex items-center justify-center overflow-hidden">
										<img
											src={data.ServiceIconUrl}
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
						<h2 className="text-xl font-bold text-center mb-3">Vendors</h2>
						<Card>
							<CardContent className="p-0 overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-16">ID</TableHead>
											<TableHead>Business Name</TableHead>
											<TableHead>Tag</TableHead>
											<TableHead>Phone</TableHead>
											<TableHead>Contact Address</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.Vendors?.length ? (
											data.Vendors.map((v) => (
												<TableRow key={v.Id}>
													<TableCell>{v.Id}</TableCell>
													<TableCell className="font-medium">{v.Name}</TableCell>
													<TableCell>{v.Tag}</TableCell>
													<TableCell>{v.PhoneNumber}</TableCell>
													<TableCell>{v.ContactAddress}</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={5}
													className="text-center text-muted-foreground py-8">
													No vendors under this service.
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

export default AdminServiceDetails;
