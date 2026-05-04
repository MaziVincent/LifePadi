import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Plus,
	Package,
	CheckCircle2,
	PauseCircle,
	Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { vendorProductStatUrl } from "./vendorUri/VendorURI";
import AddProductModal from "./AddProductModal";
import VendorProducts from "./VendorProducts";

const VendorDashboard = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const [openAddProductModal, setOpenAddProductModal] = useState(false);
	const vendorId = auth?.Id;

	const getVendorProductStats = async (url: string) => {
		const response = await fetch(url, auth.accessToken);
		return response.data;
	};

	const {
		data: stats,
		isLoading,
		error: statsError,
	} = useQuery({
		queryKey: ["vendorProductStats", vendorId],
		queryFn: () =>
			getVendorProductStats(
				vendorProductStatUrl.replace("{id}", String(vendorId ?? "")),
			),
		staleTime: 30000,
		refetchOnMount: "always",
		enabled: !!vendorId,
	});

	const cards = useMemo(
		() => [
			{
				label: "Total Products",
				value: stats?.TotalProducts ?? 0,
				Icon: Package,
				accent: "text-blue-500 bg-blue-500/10",
			},
			{
				label: "Active Products",
				value: stats?.TotalActiveProducts ?? 0,
				Icon: CheckCircle2,
				accent: "text-emerald-500 bg-emerald-500/10",
			},
			{
				label: "Inactive Products",
				value: stats?.TotalInactiveProducts ?? 0,
				Icon: PauseCircle,
				accent: "text-rose-500 bg-rose-500/10",
			},
		],
		[stats],
	);

	return (
		<div className="space-y-6">
			{/* Welcome */}
			<Card className="border-none bg-gradient-to-r from-brand to-primary text-primary-foreground">
				<CardContent className="p-6">
					<h1 className="text-2xl md:text-3xl font-bold">
						Welcome to Your Dashboard
					</h1>
					<p className="text-sm opacity-90 mt-1">
						Manage your products and track your performance
					</p>
				</CardContent>
			</Card>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{cards.map((c) => {
					const Icon = c.Icon;
					return (
						<Card
							key={c.label}
							className="transition hover:-translate-y-0.5 hover:shadow-md">
							<CardContent className="p-6 text-center">
								<div
									className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${c.accent}`}>
									<Icon className="h-6 w-6" />
								</div>
								<p className="text-3xl font-bold">
									{isLoading ? (
										<Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
									) : statsError ? (
										"--"
									) : (
										c.value
									)}
								</p>
								<p className="text-sm text-muted-foreground mt-1">{c.label}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{statsError && (
				<Alert variant="destructive">
					<AlertDescription>
						Failed to load dashboard statistics. Please try refreshing the page.
					</AlertDescription>
				</Alert>
			)}

			{/* Products */}
			<Card>
				<CardContent className="p-4 md:p-6">
					<h2 className="text-xl font-bold mb-4">Your Products</h2>
					<VendorProducts
						pageSize={8}
						onOpenAddProduct={() => setOpenAddProductModal(true)}
						showTitle={false}
					/>
				</CardContent>
			</Card>

			{/* FAB */}
			<Button
				size="icon"
				aria-label="Add product"
				onClick={() => setOpenAddProductModal(true)}
				className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-xl">
				<Plus className="h-6 w-6" />
			</Button>

			<AddProductModal
				openAddProductModal={openAddProductModal}
				setOpenAddProductModal={setOpenAddProductModal}
			/>
		</div>
	);
};

export default VendorDashboard;
