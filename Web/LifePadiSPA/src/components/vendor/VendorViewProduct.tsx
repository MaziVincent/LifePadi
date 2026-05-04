import { useParams, useNavigate } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ArrowLeft, Pencil, Share2, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import DateFormater from "../shared/DateFormater";
import { getProductUrl } from "./vendorUri/VendorURI";

const RatingStars = ({ value = 0, size = "h-4 w-4" }) => {
	const v = Number(value) || 0;
	return (
		<div className="inline-flex items-center gap-0.5">
			{[1, 2, 3, 4, 5].map((i) => (
				<Star
					key={i}
					className={`${size} ${
						i <= Math.round(v)
							? "fill-amber-400 text-amber-400"
							: "text-muted-foreground"
					}`}
				/>
			))}
		</div>
	);
};

const VendorViewProduct = () => {
	const { auth } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const fetch = useFetch();

	const getProduct = async (url: string) => {
		const response = await fetch(url, auth.accessToken);
		return response.data;
	};

	const {
		data: product,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["vendorProduct", id],
		queryFn: () => getProduct(getProductUrl.replace("{id}", id ?? "")),
		placeholderData: keepPreviousData,
		staleTime: 30000,
		refetchOnMount: "always",
		enabled: !!id,
	});

	const reviews = product?.ProductReview || [];
	const reviewStats = {
		total: reviews.length,
		avgRating: reviews.length
			? (
					reviews.reduce(
						(sum: number, r: any) => sum + (Number(r.Rating) || 0),
						0,
					) / reviews.length
				).toFixed(1)
			: null,
		distribution: [5, 4, 3, 2, 1].map((star) => ({
			star,
			count: reviews.filter((r: any) => Number(r.Rating) === star).length,
		})),
	};

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Skeleton className="h-96 rounded-lg" />
				<div className="space-y-3">
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-6 w-1/2" />
					<Skeleton className="h-8 w-1/3" />
					<Skeleton className="h-32" />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					{error?.message ||
						"Failed to load product details. Please try again."}
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					size="icon"
					onClick={() => navigate(-1)}
					aria-label="Go back">
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<h1 className="text-2xl md:text-3xl font-bold">Product Details</h1>
			</div>

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							href="#"
							onClick={(e) => {
								e.preventDefault();
								navigate("/vendor");
							}}>
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							href="#"
							onClick={(e) => {
								e.preventDefault();
								navigate("/vendor/products");
							}}>
							Products
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{product?.Name || "Product"}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Image + basic info */}
				<Card className="overflow-hidden">
					<div className="relative">
						<img
							src={product?.ProductImgUrl || "/placeholder-product.jpg"}
							alt={product?.Name || "Product"}
							className="h-96 w-full object-cover"
						/>
						<Badge
							className={`absolute right-3 top-3 ${
								product?.Status
									? "bg-emerald-500 hover:bg-emerald-500 text-white"
									: "bg-rose-500 hover:bg-rose-500 text-white"
							}`}>
							{product?.Status ? "Active" : "Inactive"}
						</Badge>
					</div>
					<CardContent className="p-6 space-y-3">
						<h2 className="text-2xl font-bold">{product?.Name}</h2>
						<Badge variant="outline">
							{product?.Category?.Name || "Uncategorized"}
						</Badge>
						<p className="text-3xl font-bold text-primary">
							₦{Number(product?.Price || 0).toLocaleString()}
						</p>
						<div className="rounded-md bg-muted/30 p-3">
							<p className="text-xs font-medium text-muted-foreground mb-1">
								Description
							</p>
							<p className="text-sm leading-relaxed">
								{product?.Description || "No description available."}
							</p>
						</div>
						<div className="flex items-center justify-between pt-2">
							<p className="text-xs text-muted-foreground">
								Created: {DateFormater(product?.CreatedAt)}
							</p>
							<div className="flex gap-1">
								<Button variant="ghost" size="icon" aria-label="Edit">
									<Pencil className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" aria-label="Share">
									<Share2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Reviews */}
				<div className="space-y-6">
					<Card>
						<CardContent className="p-6 space-y-4">
							<h3 className="text-lg font-bold">Customer Reviews</h3>
							{reviewStats.total === 0 ? (
								<p className="py-4 text-center text-sm text-muted-foreground">
									No reviews yet. Be the first to get feedback!
								</p>
							) : (
								<>
									<div className="flex items-center gap-3">
										<div className="text-4xl font-bold text-primary">
											{reviewStats.avgRating}
										</div>
										<div>
											<RatingStars
												value={Number(reviewStats.avgRating)}
												size="h-5 w-5"
											/>
											<p className="text-xs text-muted-foreground mt-1">
												Based on {reviewStats.total} reviews
											</p>
										</div>
									</div>
									<div className="space-y-2">
										{reviewStats.distribution.map(({ star, count }) => (
											<div key={star} className="flex items-center gap-2">
												<span className="w-6 text-xs">{star}★</span>
												<div className="h-2 flex-1 rounded bg-muted overflow-hidden">
													<div
														className="h-full bg-primary"
														style={{
															width: `${
																reviewStats.total
																	? (count / reviewStats.total) * 100
																	: 0
															}%`,
														}}
													/>
												</div>
												<span className="w-8 text-right text-xs">{count}</span>
											</div>
										))}
									</div>
								</>
							)}
						</CardContent>
					</Card>

					{reviews.length > 0 && (
						<Card>
							<CardContent className="p-0">
								<div className="p-4">
									<h3 className="text-lg font-bold">Recent Reviews</h3>
								</div>
								<div className="max-h-96 overflow-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Customer</TableHead>
												<TableHead>Rating</TableHead>
												<TableHead>Review</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{reviews
												.slice(0, 10)
												.map((review: any, index: number) => (
													<TableRow key={review.Id || index}>
														<TableCell>
															<div className="font-medium text-sm">
																{review.Customer?.FirstName}{" "}
																{review.Customer?.LastName}
															</div>
															<div className="text-xs text-muted-foreground">
																{review.Customer?.Email}
															</div>
														</TableCell>
														<TableCell>
															<RatingStars value={Number(review.Rating)} />
														</TableCell>
														<TableCell className="max-w-[200px] truncate">
															{review.Body || "No comment"}
														</TableCell>
													</TableRow>
												))}
										</TableBody>
									</Table>
								</div>
								{reviews.length > 10 && (
									<div className="p-3 text-center">
										<Button variant="ghost" size="sm">
											View All Reviews ({reviews.length})
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default VendorViewProduct;
