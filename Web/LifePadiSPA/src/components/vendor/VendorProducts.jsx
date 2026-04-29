import { useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Search, LayoutGrid, List as ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import VendorActions from "./VendorActions";
import { vendorProductsUrl } from "./vendorUri/VendorURI";

const VendorProducts = ({
	pageSize = 12,
	onOpenAddProduct,
	showTitle = true,
	showAddButton = true,
}) => {
	const navigate = useNavigate();
	const fetch = useFetch();
	const { auth } = useAuth();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [viewMode, setViewMode] = useState("grid");

	const vendorId = auth.Id;
	const vendorProductsURL = vendorProductsUrl.replace("{id}", vendorId);

	const getVendorProducts = async (url) => {
		const response = await fetch(url, auth.accessToken);
		return response.data;
	};

	const {
		data: vendorProducts,
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["vendorProductsList", page, search, pageSize],
		queryFn: () =>
			getVendorProducts(
				`${vendorProductsURL}?PageNumber=${page}&PageSize=${pageSize}&SearchString=${search}`,
			),
		placeholderData: keepPreviousData,
		staleTime: 30000,
		refetchOnMount: "always",
		retry: 2,
	});

	const products = vendorProducts?.result || [];
	const totalPages = vendorProducts?.dataList?.TotalPages || 1;
	const totalCount = vendorProducts?.dataList?.TotalCount || 0;

	const productStats = useMemo(() => {
		if (!products.length) return { active: 0, inactive: 0 };
		return products.reduce(
			(s, p) => ({
				active: s.active + (p.Status ? 1 : 0),
				inactive: s.inactive + (!p.Status ? 1 : 0),
			}),
			{ active: 0, inactive: 0 },
		);
	}, [products]);

	const handleProductClick = (productId) => {
		navigate(`/vendor/product/${productId}`);
	};

	const ProductSkeleton = () => (
		<Card className="overflow-hidden">
			<Skeleton className="h-48 w-full" />
			<CardContent className="p-4 space-y-2">
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-6 w-1/3" />
			</CardContent>
		</Card>
	);

	const ProductCard = ({ product }) => (
		<Card
			onClick={() => handleProductClick(product.Id)}
			className="cursor-pointer overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
			<div className="relative">
				<img
					src={product.ProductImgUrl || "/placeholder-product.jpg"}
					alt={product.Name}
					className="h-48 w-full object-cover"
				/>
				<Badge
					className={`absolute right-3 top-3 ${
						product.Status
							? "bg-emerald-500 hover:bg-emerald-500 text-white"
							: "bg-rose-500 hover:bg-rose-500 text-white"
					}`}>
					{product.Status ? "Active" : "Inactive"}
				</Badge>
			</div>
			<CardContent className="p-4">
				<div className="space-y-1">
					<h3 className="font-bold text-base truncate">{product.Name}</h3>
					<p className="text-xs text-muted-foreground">
						{product.Category?.Name || "Uncategorized"}
					</p>
					<p className="text-lg font-bold text-primary">
						₦{Number(product.Price).toLocaleString()}
					</p>
					<p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5em]">
						{product.Description || "No description available"}
					</p>
				</div>
				<div
					className="mt-3 flex justify-end border-t pt-2"
					onClick={(e) => e.stopPropagation()}>
					<VendorActions product={product} />
				</div>
			</CardContent>
		</Card>
	);

	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="space-y-6">
			{showTitle && (
				<div className="flex flex-wrap items-center justify-between gap-3">
					<h2 className="text-2xl md:text-3xl font-bold">My Products</h2>
					<div className="flex items-center gap-2">
						<Badge variant="outline">{totalCount} Products</Badge>
						<Button
							variant="outline"
							size="icon"
							onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
							aria-label="Toggle view">
							{viewMode === "grid" ? (
								<ListIcon className="h-4 w-4" />
							) : (
								<LayoutGrid className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>
			)}

			{showTitle && (
				<div className="flex gap-2">
					<Badge
						variant="outline"
						className="border-emerald-500 text-emerald-600">
						{productStats.active} Active
					</Badge>
					<Badge variant="outline" className="border-rose-500 text-rose-600">
						{productStats.inactive} Inactive
					</Badge>
				</div>
			)}

			{/* Search + Add */}
			<div className="flex flex-col gap-3 md:flex-row md:items-center">
				<div className="relative max-w-md flex-1">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search products by name, category, or description…"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1);
						}}
						className="pl-9"
					/>
				</div>
				<div className="flex-1" />
				{showAddButton && onOpenAddProduct && (
					<Button onClick={onOpenAddProduct} className="hidden md:inline-flex">
						<Plus className="mr-2 h-4 w-4" /> Add Product
					</Button>
				)}
			</div>

			{/* Content */}
			{isError ? (
				<Alert variant="destructive">
					<AlertDescription>
						{error?.message || "Failed to load products. Please try again."}
					</AlertDescription>
				</Alert>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{isLoading ? (
							Array.from({ length: pageSize }).map((_, i) => (
								<ProductSkeleton key={i} />
							))
						) : products.length === 0 ? (
							<div className="col-span-full rounded-lg border border-dashed bg-card p-10 text-center">
								<h3 className="text-lg font-semibold mb-2">
									{search ? "No products found" : "No products yet"}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{search
										? `No products match "${search}". Try a different search term.`
										: "Start by adding your first product to showcase your offerings."}
								</p>
								{!search && onOpenAddProduct && (
									<Button onClick={onOpenAddProduct}>
										<Plus className="mr-2 h-4 w-4" /> Add Your First Product
									</Button>
								)}
							</div>
						) : (
							products.map((p) => <ProductCard key={p.Id} product={p} />)
						)}
					</div>

					{totalPages > 1 && (
						<div className="flex flex-col items-center gap-3">
							<p className="text-xs text-muted-foreground">
								Showing {(page - 1) * pageSize + 1}-
								{Math.min(page * pageSize, totalCount)} of {totalCount}
							</p>
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
									{pageNumbers.map((p) => (
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
						</div>
					)}
				</>
			)}

			{/* Mobile FAB */}
			{showAddButton && onOpenAddProduct && (
				<Button
					size="icon"
					aria-label="Add product"
					onClick={onOpenAddProduct}
					className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-xl md:hidden">
					<Plus className="h-6 w-6" />
				</Button>
			)}
		</div>
	);
};

export default VendorProducts;
