import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import {
	Box,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	TextField,
	Button,
	Chip,
	Container,
	Alert,
	Skeleton,
	Pagination,
	Stack,
	InputAdornment,
	Fab,
	Badge,
	IconButton,
	Tooltip,
	useTheme,
} from "@mui/material";
import {
	Add as AddIcon,
	Search as SearchIcon,
	FilterList as FilterIcon,
	GridView as GridViewIcon,
	ViewList as ViewListIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
	const theme = useTheme();
	const navigate = useNavigate();
	const fetch = useFetch();
	const { auth } = useAuth();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

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
				`${vendorProductsURL}?PageNumber=${page}&PageSize=${pageSize}&SearchString=${search}`
			),
		keepPreviousData: true,
		staleTime: 30000,
		refetchOnMount: "always",
		retry: 2,
	});

	const products = vendorProducts?.result || [];
	const totalPages = vendorProducts?.dataList?.TotalPages || 1;
	const totalCount = vendorProducts?.dataList?.TotalCount || 0;

	// Memoized calculations for performance
	const productStats = useMemo(() => {
		if (!products.length) return { active: 0, inactive: 0 };

		return products.reduce(
			(stats, product) => ({
				active: stats.active + (product.Status ? 1 : 0),
				inactive: stats.inactive + (!product.Status ? 1 : 0),
			}),
			{ active: 0, inactive: 0 }
		);
	}, [products]);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		setPage(1); // Reset to first page when searching
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleProductClick = (productId) => {
		navigate(`/vendor/products/${productId}`);
	};

	// Loading skeleton component
	const ProductSkeleton = () => (
		<Card
			sx={{
				borderRadius: 3,
				height: "100%",
				background:
					theme.palette.mode === "dark"
						? "linear-gradient(135deg, #212121 0%, #2c2c2c 100%)"
						: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
			}}
			className="shadow-lg">
			<Skeleton variant="rectangular" height={200} />
			<CardContent>
				<Skeleton variant="text" width="80%" height={32} />
				<Skeleton variant="text" width="60%" height={24} />
				<Skeleton variant="text" width="40%" height={28} />
				<Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
					<Skeleton variant="rectangular" width={60} height={24} />
					<Skeleton variant="circular" width={32} height={32} />
				</Box>
			</CardContent>
		</Card>
	);

	// Product card component
	const ProductCard = ({ product }) => (
		<Card
			sx={{
				borderRadius: 3,
				height: "100%",
				background:
					theme.palette.mode === "dark"
						? "linear-gradient(135deg, #212121 0%, #2c2c2c 100%)"
						: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
				cursor: "pointer",
				transition: "all 0.3s ease",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: theme.shadows[8],
				},
			}}
			className="shadow-lg hover:shadow-xl"
			onClick={() => handleProductClick(product.Id)}>
			{/* Product Image */}
			<Box sx={{ position: "relative" }}>
				<CardMedia
					component="img"
					height="200"
					image={product.ProductImgUrl || "/placeholder-product.jpg"}
					alt={product.Name}
					sx={{
						objectFit: "cover",
						filter:
							theme.palette.mode === "dark"
								? "brightness(0.9)"
								: "brightness(0.95)",
					}}
				/>
				{/* Status Badge */}
				<Chip
					label={product.Status ? "Active" : "Inactive"}
					size="small"
					color={product.Status ? "success" : "error"}
					sx={{
						position: "absolute",
						top: 12,
						right: 12,
						fontWeight: "bold",
						backdropFilter: "blur(10px)",
						backgroundColor: product.Status
							? "rgba(76, 175, 80, 0.9)"
							: "rgba(244, 67, 54, 0.9)",
					}}
				/>
			</Box>

			<CardContent sx={{ flexGrow: 1, p: 3 }}>
				<Stack spacing={1}>
					{/* Product Name */}
					<Typography
						variant="h6"
						fontWeight="bold"
						className="text-accent dark:text-white"
						sx={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}>
						{product.Name}
					</Typography>

					{/* Category */}
					<Typography
						variant="caption"
						color="text.secondary"
						className="dark:text-darkSecondaryText">
						{product.Category?.Name || "Uncategorized"}
					</Typography>

					{/* Price */}
					<Typography
						variant="h6"
						color="primary"
						fontWeight="bold"
						className="dark:!text-lightgreen">
						₦{Number(product.Price).toLocaleString()}
					</Typography>

					{/* Description */}
					<Typography
						variant="body2"
						color="text.secondary"
						className="dark:text-darkSecondaryText"
						sx={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							minHeight: "2.5em",
						}}>
						{product.Description || "No description available"}
					</Typography>
				</Stack>

				{/* Actions */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
						mt: 2,
						pt: 1,
						borderTop: "1px solid",
						borderColor: "divider",
					}}
					onClick={(e) => e.stopPropagation()}>
					<VendorActions product={product} />
				</Box>
			</CardContent>
		</Card>
	);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "background.default",
				transition: "background-color 0.3s ease",
			}}
			className="bg-gradient-to-br from-white to-gray-50 dark:from-darkBg dark:to-gray-900">
			<Container maxWidth="xl" sx={{ py: 4 }}>
				{/* Header */}
				{showTitle && (
					<Box sx={{ mb: 4 }}>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ mb: 2 }}>
							<Typography
								variant="h4"
								fontWeight="bold"
								className="text-accent dark:text-white">
								My Products
							</Typography>
							<Stack direction="row" spacing={1} alignItems="center">
								<Badge badgeContent={productStats.active} color="success">
									<Chip
										label={`${totalCount} Products`}
										variant="outlined"
										className="dark:border-darkSecondaryText dark:text-darkSecondaryText"
									/>
								</Badge>
								<Tooltip title="Toggle View">
									<IconButton
										onClick={() =>
											setViewMode(viewMode === "grid" ? "list" : "grid")
										}
										className="dark:text-darkSecondaryText">
										{viewMode === "grid" ? <ViewListIcon /> : <GridViewIcon />}
									</IconButton>
								</Tooltip>
							</Stack>
						</Stack>

						{/* Stats */}
						<Stack direction="row" spacing={2}>
							<Chip
								label={`${productStats.active} Active`}
								color="success"
								size="small"
								variant="outlined"
							/>
							<Chip
								label={`${productStats.inactive} Inactive`}
								color="error"
								size="small"
								variant="outlined"
							/>
						</Stack>
					</Box>
				)}

				{/* Search and Filters */}
				<Box sx={{ mb: 4 }}>
					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={2}
						alignItems="center">
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Search products by name, category, or description..."
							value={search}
							onChange={handleSearchChange}
							sx={{ maxWidth: { md: 400 } }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon className="text-gray-400 dark:text-darkSecondaryText" />
									</InputAdornment>
								),
								className: "dark:text-white bg-white dark:bg-darkMenu",
							}}
							InputLabelProps={{
								className: "dark:text-darkSecondaryText",
							}}
						/>

						<Box sx={{ flexGrow: 1 }} />

						{showAddButton && onOpenAddProduct && (
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								onClick={onOpenAddProduct}
								sx={{
									background: "linear-gradient(45deg, #667eea, #764ba2)",
									"&:hover": {
										background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
									},
								}}>
								Add Product
							</Button>
						)}
					</Stack>
				</Box>

				{/* Content */}
				{isError ? (
					<Alert
						severity="error"
						sx={{ borderRadius: 2 }}
						className="dark:bg-red-900/20 dark:text-red-200">
						{error?.message || "Failed to load products. Please try again."}
					</Alert>
				) : (
					<>
						{/* Products Grid/List */}
						<Grid container spacing={3} sx={{ mb: 4 }}>
							{isLoading ? (
								Array.from({ length: pageSize }).map((_, index) => (
									<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
										<ProductSkeleton />
									</Grid>
								))
							) : products.length === 0 ? (
								<Grid item xs={12}>
									<Box
										sx={{
											textAlign: "center",
											py: 8,
											borderRadius: 3,
											bgcolor: "background.paper",
										}}
										className="dark:bg-darkMenu">
										<Typography
											variant="h6"
											color="text.secondary"
											gutterBottom>
											{search ? "No products found" : "No products yet"}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{ mb: 3 }}>
											{search
												? `No products match "${search}". Try a different search term.`
												: "Start by adding your first product to showcase your offerings."}
										</Typography>
										{!search && onOpenAddProduct && (
											<Button
												variant="contained"
												startIcon={<AddIcon />}
												onClick={onOpenAddProduct}
												sx={{
													background:
														"linear-gradient(45deg, #667eea, #764ba2)",
													"&:hover": {
														background:
															"linear-gradient(45deg, #5a67d8, #6b46c1)",
													},
												}}>
												Add Your First Product
											</Button>
										)}
									</Box>
								</Grid>
							) : (
								products.map((product) => (
									<Grid item xs={12} sm={6} md={4} lg={3} key={product.Id}>
										<ProductCard product={product} />
									</Grid>
								))
							)}
						</Grid>

						{/* Pagination */}
						{totalPages > 1 && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: 2,
								}}>
								<Typography
									variant="body2"
									color="text.secondary"
									className="dark:text-darkSecondaryText">
									Showing {(page - 1) * pageSize + 1}-
									{Math.min(page * pageSize, totalCount)} of {totalCount}
								</Typography>
								<Pagination
									count={totalPages}
									page={page}
									onChange={handlePageChange}
									color="primary"
									showFirstButton
									showLastButton
									className="dark:text-white"
									sx={{
										"& .MuiPaginationItem-root": {
											color:
												theme.palette.mode === "dark" ? "white" : "inherit",
										},
									}}
								/>
							</Box>
						)}
					</>
				)}
			</Container>

			{/* Floating Add Button */}
			{showAddButton && onOpenAddProduct && (
				<Fab
					color="primary"
					aria-label="add product"
					onClick={onOpenAddProduct}
					sx={{
						position: "fixed",
						bottom: 24,
						right: 24,
						background: "linear-gradient(45deg, #667eea, #764ba2)",
						"&:hover": {
							background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
						},
						display: { xs: "flex", md: "none" }, // Show only on mobile
					}}>
					<AddIcon />
				</Fab>
			)}
		</Box>
	);
};

export default VendorProducts;
