import { useState, useEffect, useMemo } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	CircularProgress,
	Alert,
	Box,
	Typography,
	Divider,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Chip,
	Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import { getCategoriesUrl, updateProductUrl } from "./vendorUri/VendorURI";

const UpdateProductModal = ({ open, onClose, product }) => {
	const theme = useTheme();
	const { auth } = useAuth();
	const fetch = useFetch();
	const update = useUpdate();
	const queryClient = useQueryClient();

	const [form, setForm] = useState({
		Name: "",
		Description: "",
		Price: "",
		CategoryId: "",
		Tag: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [validationErrors, setValidationErrors] = useState({});

	// Fetch categories
	const {
		data: categoriesData,
		isLoading: categoriesLoading,
		error: categoriesError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await fetch(getCategoriesUrl, auth.accessToken);
			console.log("Categories response:", response.data); // Debug log
			return response.data;
		},
		staleTime: 300000, // 5 minutes
		enabled: open,
	});

	// Handle different possible response structures
	const categories = categoriesData?.dataList || categoriesData || [];

	// Reset form when product changes or modal opens
	useEffect(() => {
		if (product && open) {
			setForm({
				Name: product.Name || "",
				Description: product.Description || "",
				Price: product.Price || "",
				CategoryId: product.CategoryId || "",
				Tag: product.Tag || "",
			});
			setError("");
			setSuccess("");
			setValidationErrors({});
		}
	}, [product, open]);

	// Validation logic
	const validateForm = useMemo(() => {
		const errors = {};
		if (!form.Name?.trim()) errors.Name = "Product name is required";
		if (!form.Description?.trim())
			errors.Description = "Description is required";
		if (!form.Price || form.Price <= 0)
			errors.Price = "Valid price is required";
		if (!form.CategoryId) errors.CategoryId = "Category is required";

		return errors;
	}, [form]);

	const isFormValid = Object.keys(validateForm).length === 0;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));

		// Clear validation error for this field
		if (validationErrors[name]) {
			setValidationErrors((prev) => {
				const updated = { ...prev };
				delete updated[name];
				return updated;
			});
		}
	};

	const handleUpdate = async () => {
		// Validate form
		const errors = validateForm;
		if (Object.keys(errors).length > 0) {
			setValidationErrors(errors);
			return;
		}

		setLoading(true);
		setError("");

		try {
			const url = updateProductUrl.replace("{id}", product.Id);
			await update(url, form, auth.accessToken);

			// Invalidate queries to refresh data
			queryClient.invalidateQueries("vendorProducts");
			queryClient.invalidateQueries("vendorProductsList");
			queryClient.invalidateQueries("vendorProductStats");
			queryClient.invalidateQueries(["vendorProduct", product.Id]);

			setSuccess("Product updated successfully!");
			setTimeout(() => {
				setSuccess("");
				onClose();
			}, 1500);
		} catch (err) {
			setError(err?.message || "Failed to update product. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (loading) return;
		setForm({});
		setError("");
		setSuccess("");
		setValidationErrors({});
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 3,
					background:
						theme.palette.mode === "dark"
							? "linear-gradient(135deg, #212121 0%, #2c2c2c 100%)"
							: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
					backdropFilter: "blur(10px)",
				},
				className: "bg-white dark:bg-darkMenu shadow-2xl",
			}}
			BackdropProps={{
				sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
			}}>
			{/* Header */}
			<DialogTitle sx={{ pb: 1 }}>
				<Box display="flex" alignItems="center" gap={1}>
					<EditIcon color="primary" />
					<Typography
						variant="h5"
						fontWeight="bold"
						className="text-accent dark:text-white">
						Update Product
					</Typography>
				</Box>
				<Typography
					variant="body2"
					color="text.secondary"
					className="dark:text-darkSecondaryText mt-1">
					Make changes to your product information
				</Typography>
			</DialogTitle>

			<Divider sx={{ mx: 3 }} />

			<DialogContent dividers sx={{ py: 3 }}>
				<Stack spacing={3}>
					{/* Alert Messages */}
					{error && (
						<Alert
							severity="error"
							sx={{ borderRadius: 2 }}
							className="dark:bg-red-900/20 dark:text-red-200 dark:border-red-800">
							{error}
						</Alert>
					)}
					{categoriesError && (
						<Alert
							severity="warning"
							sx={{ borderRadius: 2 }}
							className="dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800">
							Failed to load categories: {categoriesError.message}
						</Alert>
					)}
					{success && (
						<Alert
							severity="success"
							sx={{ borderRadius: 2 }}
							className="dark:bg-green-900/20 dark:text-green-200 dark:border-green-800">
							{success}
						</Alert>
					)}

					{/* Debug info - remove in production */}
					{process.env.NODE_ENV === "development" && (
						<Alert severity="info" sx={{ borderRadius: 2 }}>
							Categories loaded: {categories.length} | Loading:{" "}
							{categoriesLoading ? "Yes" : "No"}
						</Alert>
					)}

					{/* Form Fields */}
					<Paper
						elevation={0}
						sx={{ p: 3, borderRadius: 2, backgroundColor: "rgba(0,0,0,0.02)" }}
						className="dark:bg-darkHover/30">
						<Stack spacing={3}>
							{/* Product Name */}
							<TextField
								label="Product Name"
								name="Name"
								value={form.Name || ""}
								onChange={handleChange}
								fullWidth
								required
								error={!!validationErrors.Name}
								helperText={validationErrors.Name}
								variant="outlined"
								InputProps={{
									className: "dark:text-white",
								}}
								InputLabelProps={{
									className: "dark:text-darkSecondaryText",
								}}
							/>

							{/* Description */}
							<TextField
								label="Description"
								name="Description"
								value={form.Description || ""}
								onChange={handleChange}
								fullWidth
								required
								multiline
								minRows={3}
								maxRows={5}
								error={!!validationErrors.Description}
								helperText={validationErrors.Description}
								variant="outlined"
								InputProps={{
									className: "dark:text-white",
								}}
								InputLabelProps={{
									className: "dark:text-darkSecondaryText",
								}}
							/>

							{/* Price and Category Row */}
							<Box display="flex" gap={2}>
								<TextField
									label="Price (₦)"
									name="Price"
									type="number"
									value={form.Price || ""}
									onChange={handleChange}
									required
									error={!!validationErrors.Price}
									helperText={validationErrors.Price}
									variant="outlined"
									sx={{ flex: 1 }}
									InputProps={{
										className: "dark:text-white",
									}}
									InputLabelProps={{
										className: "dark:text-darkSecondaryText",
									}}
								/>

								{/* Category Select */}
								<FormControl
									sx={{ flex: 1 }}
									error={!!validationErrors.CategoryId}>
									<InputLabel className="dark:text-darkSecondaryText">
										{categoriesLoading ? "Loading categories..." : "Category"}
									</InputLabel>
									<Select
										name="CategoryId"
										value={form.CategoryId || ""}
										onChange={handleChange}
										label={
											categoriesLoading ? "Loading categories..." : "Category"
										}
										disabled={categoriesLoading}
										className="dark:text-white">
										{categoriesLoading ? (
											<MenuItem disabled>
												<CircularProgress size={16} sx={{ mr: 1 }} />
												Loading...
											</MenuItem>
										) : categories.length > 0 ? (
											categories.map((category) => (
												<MenuItem key={category.Id} value={category.Id}>
													{category.Name}
												</MenuItem>
											))
										) : (
											<MenuItem disabled>No categories available</MenuItem>
										)}
									</Select>
									{validationErrors.CategoryId && (
										<Typography
											variant="caption"
											color="error"
											sx={{ mt: 0.5, ml: 1.5 }}>
											{validationErrors.CategoryId}
										</Typography>
									)}
								</FormControl>
							</Box>

							{/* Tags */}
							<TextField
								label="Tags"
								name="Tag"
								value={form.Tag || ""}
								onChange={handleChange}
								fullWidth
								variant="outlined"
								placeholder="e.g., organic, fresh, premium"
								helperText="Add relevant tags to help customers find your product"
								InputProps={{
									className: "dark:text-white",
								}}
								InputLabelProps={{
									className: "dark:text-darkSecondaryText",
								}}
							/>
						</Stack>
					</Paper>

					{/* Product Preview */}
					{form.Name && (
						<Paper
							elevation={0}
							sx={{
								p: 2,
								borderRadius: 2,
								backgroundColor: "rgba(0,0,0,0.02)",
							}}
							className="dark:bg-darkHover/30">
							<Typography
								variant="subtitle2"
								color="text.secondary"
								gutterBottom>
								Preview
							</Typography>
							<Box display="flex" alignItems="center" gap={1}>
								<Chip
									label={form.Name}
									color="primary"
									size="small"
									className="dark:bg-lightgreen dark:text-darkBg"
								/>
								{form.Price && (
									<Chip
										label={`₦${Number(form.Price).toLocaleString()}`}
										variant="outlined"
										size="small"
										className="dark:border-darkSecondaryText dark:text-darkSecondaryText"
									/>
								)}
							</Box>
						</Paper>
					)}
				</Stack>
			</DialogContent>

			<Divider sx={{ mx: 3 }} />

			<DialogActions sx={{ p: 3, gap: 1 }}>
				<Button
					onClick={handleClose}
					disabled={loading}
					variant="outlined"
					startIcon={<CloseIcon />}
					className="dark:border-darkSecondaryText dark:text-darkSecondaryText hover:dark:bg-darkHover">
					Cancel
				</Button>
				<Button
					onClick={handleUpdate}
					variant="contained"
					disabled={loading || !isFormValid || categoriesLoading}
					startIcon={loading ? <CircularProgress size={18} /> : <SaveIcon />}
					sx={{
						background: "linear-gradient(45deg, #667eea, #764ba2)",
						"&:hover": {
							background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
						},
						"&:disabled": {
							background: "rgba(0,0,0,0.12)",
						},
					}}
					className="min-w-[120px]">
					{loading ? "Updating..." : "Update Product"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UpdateProductModal;
