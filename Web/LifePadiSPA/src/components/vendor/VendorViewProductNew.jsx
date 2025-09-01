import { useParams, useNavigate } from "react-router-dom";
import { getProductUrl } from "./vendorUri/VendorURI";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import DateFormater from "../shared/DateFormater";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Alert,
	Rating,
	Skeleton,
	Container,
	Breadcrumbs,
	Link,
	Chip,
	Stack,
	Button,
	Divider,
	useTheme,
	Badge,
	IconButton,
	Tooltip,
} from "@mui/material";
import {
	ArrowBack,
	Edit,
	Share,
	Favorite,
	ShoppingCart,
	Visibility,
	TrendingUp,
} from "@mui/icons-material";

const VendorViewProduct = () => {
	const { auth } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const theme = useTheme();
	const fetch = useFetch();

	const getProduct = async (url) => {
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
		queryFn: () => getProduct(getProductUrl.replace("{id}", id)),
		keepPreviousData: true,
		staleTime: 30000,
		refetchOnMount: "always",
		enabled: !!id,
	});

	// Calculate review statistics
	const reviews = product?.ProductReview || [];
	const reviewStats = {
		total: reviews.length,
		avgRating: reviews.length
			? (
					reviews.reduce((sum, r) => sum + (Number(r.Rating) || 0), 0) /
					reviews.length
			  ).toFixed(1)
			: null,
		distribution: [5, 4, 3, 2, 1].map((star) => ({
			star,
			count: reviews.filter((r) => Number(r.Rating) === star).length,
		})),
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleEdit = () => {
		// Navigate to edit product page or open edit modal
		console.log("Edit product:", id);
	};

	// Loading state
	if (isLoading) {
		return (
			<Container maxWidth="xl" sx={{ py: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Skeleton
							variant="rectangular"
							height={400}
							sx={{ borderRadius: 3 }}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Stack spacing={2}>
							<Skeleton variant="text" width="80%" height={40} />
							<Skeleton variant="text" width="60%" height={30} />
							<Skeleton variant="text" width="40%" height={35} />
							<Skeleton variant="rectangular" height={120} />
						</Stack>
					</Grid>
				</Grid>
			</Container>
		);
	}

	// Error state
	if (isError) {
		return (
			<Container maxWidth="xl" sx={{ py: 4 }}>
				<Alert
					severity="error"
					sx={{ borderRadius: 2 }}
					className="dark:bg-red-900/20 dark:text-red-200">
					{error?.message ||
						"Failed to load product details. Please try again."}
				</Alert>
			</Container>
		);
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "background.default",
				transition: "background-color 0.3s ease",
			}}
			className="bg-gradient-to-br from-white to-gray-50 dark:from-darkBg dark:to-gray-900">
			<Container maxWidth="xl" sx={{ py: 4 }}>
				{/* Header with Navigation */}
				<Box sx={{ mb: 4 }}>
					<Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
						<IconButton
							onClick={handleGoBack}
							sx={{
								bgcolor: "rgba(0,0,0,0.04)",
								"&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
							}}
							className="dark:bg-darkHover dark:hover:bg-darkSecondaryText/20">
							<ArrowBack />
						</IconButton>
						<Typography
							variant="h4"
							fontWeight="bold"
							className="text-accent dark:text-white">
							Product Details
						</Typography>
					</Stack>

					<Breadcrumbs
						aria-label="breadcrumb"
						className="text-gray-600 dark:text-darkSecondaryText">
						<Link
							underline="hover"
							color="inherit"
							onClick={() => navigate("/vendor")}
							sx={{ cursor: "pointer" }}>
							Dashboard
						</Link>
						<Link
							underline="hover"
							color="inherit"
							onClick={() => navigate("/vendor/products")}
							sx={{ cursor: "pointer" }}>
							Products
						</Link>
						<Typography color="text.primary" className="dark:text-white">
							{product?.Name || "Product Details"}
						</Typography>
					</Breadcrumbs>
				</Box>

				<Grid container spacing={4}>
					{/* Product Image and Basic Info */}
					<Grid item xs={12} lg={6}>
						<Card
							sx={{
								borderRadius: 4,
								overflow: "hidden",
								position: "relative",
								background:
									theme.palette.mode === "dark"
										? "linear-gradient(135deg, #212121 0%, #2c2c2c 100%)"
										: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
							}}
							className="shadow-xl">
							{/* Status Badge */}
							<Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}>
								<Chip
									label={product?.Status ? "Active" : "Inactive"}
									color={product?.Status ? "success" : "error"}
									sx={{
										fontWeight: "bold",
										backdropFilter: "blur(10px)",
										backgroundColor: product?.Status
											? "rgba(76, 175, 80, 0.9)"
											: "rgba(244, 67, 54, 0.9)",
									}}
								/>
							</Box>

							{/* Product Image */}
							<CardMedia
								component="img"
								height="400"
								image={product?.ProductImgUrl || "/placeholder-product.jpg"}
								alt={product?.Name || "Product"}
								sx={{
									objectFit: "cover",
									bgcolor: "grey.100",
									filter:
										theme.palette.mode === "dark"
											? "brightness(0.9)"
											: "brightness(0.95)",
								}}
							/>

							<CardContent sx={{ p: 3 }}>
								<Stack spacing={2}>
									{/* Product Name */}
									<Typography
										variant="h4"
										fontWeight="bold"
										className="text-accent dark:text-white">
										{product?.Name}
									</Typography>

									{/* Category */}
									<Box>
										<Chip
											label={product?.Category?.Name || "Uncategorized"}
											variant="outlined"
											size="small"
											className="dark:border-darkSecondaryText dark:text-darkSecondaryText"
										/>
									</Box>

									{/* Price */}
									<Typography
										variant="h3"
										color="primary"
										fontWeight="bold"
										className="dark:!text-lightgreen">
										₦{Number(product?.Price || 0).toLocaleString()}
									</Typography>

									{/* Description */}
									<Paper
										elevation={0}
										sx={{ p: 2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 2 }}
										className="dark:bg-darkHover/30">
										<Typography
											variant="subtitle2"
											color="text.secondary"
											gutterBottom>
											Description
										</Typography>
										<Typography
											variant="body1"
											className="text-gray-700 dark:text-darkSecondaryText leading-relaxed">
											{product?.Description || "No description available."}
										</Typography>
									</Paper>

									{/* Metadata */}
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center">
										<Typography
											variant="caption"
											color="text.secondary"
											className="dark:text-darkSecondaryText">
											Created: {DateFormater(product?.CreatedAt)}
										</Typography>
										<Stack direction="row" spacing={1}>
											<Tooltip title="Edit Product">
												<IconButton
													size="small"
													onClick={handleEdit}
													color="primary">
													<Edit />
												</IconButton>
											</Tooltip>
											<Tooltip title="Share Product">
												<IconButton size="small" color="primary">
													<Share />
												</IconButton>
											</Tooltip>
										</Stack>
									</Stack>
								</Stack>
							</CardContent>
						</Card>
					</Grid>

					{/* Reviews and Statistics */}
					<Grid item xs={12} lg={6}>
						<Stack spacing={3}>
							{/* Review Summary */}
							<Card
								sx={{
									borderRadius: 3,
									background:
										theme.palette.mode === "dark"
											? "linear-gradient(135deg, #212121 0%, #2c2c2c 100%)"
											: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
								}}
								className="shadow-lg">
								<CardContent sx={{ p: 3 }}>
									<Typography
										variant="h6"
										fontWeight="bold"
										gutterBottom
										className="text-accent dark:text-white">
										Customer Reviews
									</Typography>

									{reviewStats.total === 0 ? (
										<Box textAlign="center" py={3}>
											<Typography
												color="text.secondary"
												className="dark:text-darkSecondaryText">
												No reviews yet. Be the first to get feedback!
											</Typography>
										</Box>
									) : (
										<>
											<Box display="flex" alignItems="center" gap={2} mb={3}>
												<Typography
													variant="h3"
													fontWeight="bold"
													color="primary"
													className="dark:!text-lightgreen">
													{reviewStats.avgRating}
												</Typography>
												<Box>
													<Rating
														value={Number(reviewStats.avgRating)}
														readOnly
														precision={0.1}
														size="large"
													/>
													<Typography
														variant="caption"
														color="text.secondary"
														display="block">
														Based on {reviewStats.total} reviews
													</Typography>
												</Box>
											</Box>

											{/* Rating Distribution */}
											<Stack spacing={1}>
												{reviewStats.distribution.map(({ star, count }) => (
													<Box
														key={star}
														display="flex"
														alignItems="center"
														gap={2}>
														<Typography variant="body2" width={20}>
															{star}★
														</Typography>
														<Box
															flex={1}
															height={8}
															bgcolor="grey.200"
															borderRadius={1}
															className="dark:bg-darkHover">
															<Box
																height="100%"
																bgcolor="primary.main"
																borderRadius={1}
																width={`${
																	reviewStats.total
																		? (count / reviewStats.total) * 100
																		: 0
																}%`}
																className="dark:!bg-lightgreen"
															/>
														</Box>
														<Typography
															variant="caption"
															width={30}
															textAlign="right">
															{count}
														</Typography>
													</Box>
												))}
											</Stack>
										</>
									)}
								</CardContent>
							</Card>

							{/* Recent Reviews */}
							{reviews.length > 0 && (
								<Card
									sx={{
										borderRadius: 3,
										background:
											theme.palette.mode === "dark"
												? "linear-gradient(135deg, #212121 0%, #2c2c2c 100%)"
												: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
									}}
									className="shadow-lg">
									<CardContent sx={{ p: 0 }}>
										<Box sx={{ p: 3, pb: 1 }}>
											<Typography
												variant="h6"
												fontWeight="bold"
												className="text-accent dark:text-white">
												Recent Reviews
											</Typography>
										</Box>

										<TableContainer
											sx={{ maxHeight: 400 }}
											className="dark:bg-transparent">
											<Table size="small" stickyHeader>
												<TableHead>
													<TableRow>
														<TableCell className="dark:!bg-darkHover dark:!text-darkSecondaryText font-semibold">
															Customer
														</TableCell>
														<TableCell className="dark:!bg-darkHover dark:!text-darkSecondaryText font-semibold">
															Rating
														</TableCell>
														<TableCell className="dark:!bg-darkHover dark:!text-darkSecondaryText font-semibold">
															Review
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{reviews.slice(0, 10).map((review, index) => (
														<TableRow
															key={review.Id || index}
															hover
															sx={{
																"&:nth-of-type(odd)": {
																	backgroundColor: "rgba(0,0,0,0.02)",
																},
																"&.dark &:nth-of-type(odd)": {
																	backgroundColor: "rgba(255,255,255,0.02)",
																},
															}}>
															<TableCell className="dark:text-darkSecondaryText">
																<Stack>
																	<Typography
																		variant="body2"
																		fontWeight="medium">
																		{review.Customer?.FirstName}{" "}
																		{review.Customer?.LastName}
																	</Typography>
																	<Typography
																		variant="caption"
																		color="text.secondary">
																		{review.Customer?.Email}
																	</Typography>
																</Stack>
															</TableCell>
															<TableCell>
																<Rating
																	value={Number(review.Rating)}
																	readOnly
																	size="small"
																	precision={0.5}
																/>
															</TableCell>
															<TableCell className="dark:text-darkSecondaryText">
																<Typography
																	variant="body2"
																	noWrap
																	sx={{ maxWidth: 200 }}>
																	{review.Body || "No comment"}
																</Typography>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>

										{reviews.length > 10 && (
											<Box sx={{ p: 2, textAlign: "center" }}>
												<Button variant="text" size="small">
													View All Reviews ({reviews.length})
												</Button>
											</Box>
										)}
									</CardContent>
								</Card>
							)}
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default VendorViewProduct;
