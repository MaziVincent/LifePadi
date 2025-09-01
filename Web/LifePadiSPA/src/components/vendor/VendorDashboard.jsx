import useFetch from "../../hooks/useFetch";
import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import useAuth from "../../hooks/useAuth";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	CircularProgress,
	Fab,
	Container,
	Paper,
	Skeleton,
	Alert,
} from "@mui/material";
import { vendorProductStatUrl } from "./vendorUri/VendorURI";
import AddProductModal from "./AddProductModal";
import AddIcon from "@mui/icons-material/Add";
import VendorProducts from "./VendorProducts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const VendorDashboard = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const [openAddProductModal, setOpenAddProductModal] = useState(false);
	const vendorId = auth?.Id;

	const handleOpenAddProductModal = () => setOpenAddProductModal(true);
	const handleCloseAddProductModal = () => setOpenAddProductModal(false);

	const getVendorProductStats = async (url) => {
		const response = await fetch(url, auth.accessToken);
		return response.data;
	};

	const {
		data: vendorProductStats,
		isLoading: vendorProductStatsIsLoading,
		error: statsError,
	} = useQuery({
		queryKey: ["vendorProductStats", vendorId],
		queryFn: () =>
			getVendorProductStats(vendorProductStatUrl.replace("{id}", vendorId)),
		staleTime: 30000,
		refetchOnMount: "always",
		enabled: !!vendorId,
	});

	// Memoized stats data for performance
	const statsCards = useMemo(
		() => [
			{
				label: "Total Products",
				value: vendorProductStats?.TotalProducts ?? 0,
				icon: <InventoryIcon />,
				color: "#2196f3",
				bgColor: "rgba(33, 150, 243, 0.1)",
			},
			{
				label: "Active Products",
				value: vendorProductStats?.TotalActiveProducts ?? 0,
				icon: <CheckCircleIcon />,
				color: "#4caf50",
				bgColor: "rgba(76, 175, 80, 0.1)",
			},
			{
				label: "Inactive Products",
				value: vendorProductStats?.TotalInactiveProducts ?? 0,
				icon: <PauseCircleIcon />,
				color: "#f44336",
				bgColor: "rgba(244, 67, 54, 0.1)",
			},
		],
		[vendorProductStats]
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
				{/* Welcome Section */}
				<Paper
					elevation={0}
					sx={{
						p: 3,
						mb: 4,
						borderRadius: 3,
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						color: "white",
					}}
					className="dark:!bg-gradient-to-r dark:!from-darkMenu dark:!to-darkHover">
					<Typography variant="h4" fontWeight="bold" gutterBottom>
						Welcome to Your Dashboard
					</Typography>
					<Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
						Manage your products and track your performance
					</Typography>
				</Paper>

				{/* Stats Section */}
				<Grid container spacing={3} sx={{ mb: 4 }}>
					{statsCards.map((card, idx) => (
						<Grid item xs={12} sm={6} md={4} key={idx}>
							<Card
								sx={{
									p: 2,
									borderRadius: 3,
									transition: "all 0.3s ease",
									cursor: "pointer",
									"&:hover": {
										transform: "translateY(-4px)",
										boxShadow: 4,
									},
								}}
								className="bg-white/80 dark:bg-darkMenu/90 backdrop-blur-sm border border-gray-100 dark:border-darkHover hover:shadow-lg">
								<CardContent sx={{ textAlign: "center", py: 1 }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: 60,
											height: 60,
											borderRadius: "50%",
											backgroundColor: card.bgColor,
											color: card.color,
											margin: "0 auto 16px",
										}}>
										{card.icon}
									</Box>
									<Typography
										variant="h3"
										fontWeight="bold"
										sx={{ color: card.color, mb: 1 }}
										className="dark:!text-lightgreen">
										{vendorProductStatsIsLoading ? (
											<CircularProgress size={24} />
										) : statsError ? (
											"--"
										) : (
											card.value
										)}
									</Typography>
									<Typography
										variant="subtitle2"
										color="text.secondary"
										className="dark:text-darkSecondaryText font-medium">
										{card.label}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				{/* Error State */}
				{statsError && (
					<Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
						Failed to load dashboard statistics. Please try refreshing the page.
					</Alert>
				)}

				{/* Products Section */}
				<Paper
					elevation={0}
					sx={{ borderRadius: 3, overflow: "hidden" }}
					className="bg-white/80 dark:bg-darkMenu/90 backdrop-blur-sm border border-gray-100 dark:border-darkHover">
					<Box sx={{ p: 3 }}>
						<Typography
							variant="h5"
							fontWeight="bold"
							gutterBottom
							className="text-accent dark:text-white">
							Your Products
						</Typography>
						<VendorProducts
							pageSize={8}
							onOpenAddProduct={handleOpenAddProductModal}
							showTitle={false}
						/>
					</Box>
				</Paper>

				{/* Floating Action Button */}
				<Fab
					color="primary"
					aria-label="add product"
					onClick={handleOpenAddProductModal}
					sx={{
						position: "fixed",
						bottom: 24,
						right: 24,
						zIndex: 1000,
						width: 64,
						height: 64,
						background: "linear-gradient(45deg, #667eea, #764ba2)",
						"&:hover": {
							background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
						},
					}}
					className="shadow-xl hover:shadow-2xl transition-all duration-300">
					<AddIcon fontSize="large" />
				</Fab>

				{/* Add Product Modal */}
				<AddProductModal
					openAddProductModal={openAddProductModal}
					setOpenAddProductModal={setOpenAddProductModal}
				/>
			</Container>
		</Box>
	);
};

export default VendorDashboard;
