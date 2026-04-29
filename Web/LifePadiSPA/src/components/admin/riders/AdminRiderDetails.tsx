import { useParams, Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, KeyRound, Image as ImageIcon } from "lucide-react";

import baseUrl from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import PasswordChangeModal from "../subcomponents/AdminPasswordChange";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface DeliveryRow {
	Id: number | string;
	CreatedAt?: string;
	DeliveryFee?: number;
	PickupAddress?: string;
	Status?: string;
}

interface RiderDetailData {
	Id: number | string;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber: string;
	EmergencyContact?: string;
	ContactAddress?: string;
	IdentityType?: string;
	IdentityNumber?: string;
	IdentityImgUrl?: string;
	IsActive?: boolean;
	Deliveries?: DeliveryRow[];
}

const AdminRiderDetails = () => {
	const { id } = useParams<{ id: string }>();
	const url = `${baseUrl}rider/get`;
	const { auth } = useAuth();
	const fetch = useFetch();
	const [idImage, setIdImage] = useState(false);
	const [pwOpen, setPwOpen] = useState(false);

	const getRider = async (u: string) => {
		const response = await fetch(u, auth.accessToken);
		return response.data as RiderDetailData;
	};

	const { data, isError, isSuccess, isLoading } = useQuery({
		queryKey: ["rider", id],
		queryFn: () => getRider(`${url}/${id}`),
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
							<Link to="/admin/rider">Riders</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data?.FirstName || "Details"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-2xl font-bold text-center">Rider Details</h1>

			{isLoading && (
				<div className="flex items-center justify-center py-10">
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
				</div>
			)}
			{isError && (
				<Alert variant="destructive">
					<AlertDescription>Error fetching rider.</AlertDescription>
				</Alert>
			)}

			{isSuccess && data && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card>
							<CardContent className="p-4 space-y-2">
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Full Name</span>
									<span className="capitalize text-sm">
										{data.FirstName} {data.LastName}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Phone</span>
									<span className="text-sm">{data.PhoneNumber}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Emergency</span>
									<span className="text-sm">{data.EmergencyContact}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Email</span>
									<span className="text-sm">{data.Email}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Address</span>
									<span className="text-sm capitalize">{data.ContactAddress}</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4 space-y-2">
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Identity Type</span>
									<span className="text-sm capitalize">{data.IdentityType}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm font-semibold">Identity Number</span>
									<span className="text-sm">{data.IdentityNumber}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm font-semibold">Status</span>
									<Badge variant={data.IsActive ? "default" : "destructive"}>
										{data.IsActive ? "Active" : "De-Activated"}
									</Badge>
								</div>
								<div className="pt-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setPwOpen(true)}
									>
										<KeyRound className="mr-2 h-4 w-4" />
										Change Password
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardContent className="p-4 flex flex-col items-center gap-3">
							<h3 className="text-lg font-bold">Identity Image</h3>
							<Button variant="outline" onClick={() => setIdImage((v) => !v)}>
								<ImageIcon className="mr-2 h-4 w-4" />
								{idImage ? "Hide" : "View"} ID Image
							</Button>
							{idImage && data.IdentityImgUrl && (
								<img
									src={data.IdentityImgUrl}
									alt="ID"
									className="w-full max-w-xl h-96 object-cover rounded-lg shadow"
								/>
							)}
						</CardContent>
					</Card>

					<div>
						<h2 className="text-xl font-bold mb-3">Deliveries</h2>
						<Card>
							<CardContent className="p-0 overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-16">ID</TableHead>
											<TableHead>Delivery Date</TableHead>
											<TableHead>Fee</TableHead>
											<TableHead>Pickup Address</TableHead>
											<TableHead>Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.Deliveries?.length ? (
											data.Deliveries.map((d) => (
												<TableRow key={d.Id}>
													<TableCell>{d.Id}</TableCell>
													<TableCell>{d.CreatedAt}</TableCell>
													<TableCell>{d.DeliveryFee}</TableCell>
													<TableCell>{d.PickupAddress}</TableCell>
													<TableCell>
														<Badge variant="outline">{d.Status}</Badge>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={5} className="text-center text-muted-foreground py-8">
													No deliveries.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>

					<PasswordChangeModal
						open={pwOpen}
						onClose={() => setPwOpen(false)}
						email={data.Email}
						title="Change Rider Password"
					/>
				</>
			)}
		</div>
	);
};

export default AdminRiderDetails;
