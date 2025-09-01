import { useState, useRef, useEffect } from "react";
import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Alert,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { getCategoriesUrl, createProductUrl } from "./vendorUri/VendorURI";

const AddProductModal = ({ openAddProductModal, setOpenAddProductModal }) => {
	const { auth } = useAuth();
	const fetchdata = useFetch();
	const postData = usePost();
	const queryClient = useQueryClient();
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [tag, setTag] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	// Dark mode detection (observes root class changes added by layout toggle)
	const [isDark, setIsDark] = useState(
		() =>
			typeof document !== "undefined" &&
			document.documentElement.classList.contains("dark")
	);
	useEffect(() => {
		if (typeof document === "undefined") return;
		const update = () =>
			setIsDark(document.documentElement.classList.contains("dark"));
		const observer = new MutationObserver(update);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		window.addEventListener("storage", update);
		return () => {
			observer.disconnect();
			window.removeEventListener("storage", update);
		};
	}, []);

	// Shared field styling for better dark appearance
	const fieldSx = {
		"& .MuiOutlinedInput-root": {
			backgroundColor: isDark ? "#212121" : "#ffffff",
			borderRadius: 2,
			"& fieldset": {
				borderColor: isDark ? "#3d3d3d" : "#c9c9c9",
			},
			"&:hover fieldset": {
				borderColor: isDark ? "#5a5a5a" : "#9c9c9c",
			},
			"&.Mui-focused fieldset": {
				borderColor: isDark ? "#9ec81d" : "#609963",
			},
		},
		"& .MuiInputBase-input": {
			color: isDark ? "#f1f1f1" : "#222",
		},
		"& .MuiInputLabel-root": {
			color: isDark ? "#b5b5b5" : "#555",
		},
		"& .MuiInputLabel-root.Mui-focused": {
			color: isDark ? "#d2e781" : "#4d7b4f",
		},
	};
	const fileInputRef = useRef();
	const vendorId = auth.Id;

	const fetchCategories = async (url) => {
		const response = await fetchdata(url, auth.accessToken);
		return response.data;
	};

	const { data: categories, isLoading: isLoadingCategories } = useQuery({
		queryKey: "categories",
		queryFn: () => fetchCategories(getCategoriesUrl),
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const handleClose = () => {
		setOpenAddProductModal(false);
		setCategory("");
		setName("");
		setPrice("");
		setDescription("");
		setTag("");
		setImage(null);
		setImagePreview(null);
		setLoading(false);
		setSuccess(false);
		setError("");
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		} else {
			setImagePreview(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess(false);
		try {
			const formData = new FormData();
			formData.append("Image", image);
			formData.append("Name", name);
			formData.append("Price", Number(price));
			formData.append("Description", description);
			formData.append("Tag", tag);
			formData.append("CategoryId", Number(category));
			formData.append("VendorId", vendorId);
			const result = await postData(
				createProductUrl,
				formData,
				auth.accessToken
			);
			if (result && result.success !== false) {
				setSuccess(true);
				// Invalidate product list & stats caches
				queryClient.invalidateQueries("vendorProductsList");
				queryClient.invalidateQueries("vendorProductStats");
				setTimeout(() => {
					handleClose();
				}, 1200);
			} else {
				setError(result?.message || "Failed to add product.");
			}
		} catch (err) {
			setError("Failed to add product.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			open={openAddProductModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 420,
					borderRadius: 4,
					boxShadow: 24,
					p: 4,
					maxHeight: "92vh",
					overflowY: "auto",
					bgcolor: isDark ? "#181818" : "#ffffff",
					border: `1px solid ${isDark ? "#2c2c2c" : "#e5e7eb"}`,
					backgroundImage: isDark
						? "linear-gradient(145deg, rgba(30,30,30,0.95), rgba(24,24,24,0.92))"
						: "linear-gradient(145deg, #ffffff, #fafafa)",
					transition: "background-color .25s, border-color .25s",
				}}>
				<div className="flex justify-between items-center mb-4">
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ fontWeight: 600, color: isDark ? "#e4e6eb" : "#1f2937" }}>
						Add Product
					</Typography>
					<IconButton
						onClick={handleClose}
						size="small"
						sx={{
							color: isDark ? "#b5b5b5" : "#555",
							"&:hover": { color: isDark ? "#e4e6eb" : "#111" },
						}}>
						<span className="text-lg">×</span>
					</IconButton>
				</div>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Product Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						required
						margin="normal"
						variant="outlined"
						sx={fieldSx}
					/>
					<TextField
						label="Product Price"
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						fullWidth
						required
						margin="normal"
						variant="outlined"
						inputProps={{ min: 0 }}
						sx={fieldSx}
					/>
					<TextField
						label="Product Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						required
						margin="normal"
						variant="outlined"
						multiline
						rows={3}
						sx={fieldSx}
					/>
					<TextField
						label="Product Tag"
						value={tag}
						onChange={(e) => setTag(e.target.value)}
						fullWidth
						required
						margin="normal"
						variant="outlined"
						sx={fieldSx}
					/>
					<FormControl fullWidth required margin="normal" sx={fieldSx}>
						<InputLabel id="category-label">Product Category</InputLabel>
						<Select
							labelId="category-label"
							value={category}
							label="Product Category"
							onChange={(e) => setCategory(e.target.value)}
							disabled={isLoadingCategories}
							MenuProps={{
								PaperProps: {
									sx: {
										bgcolor: isDark ? "#222" : "#fff",
										"& .MuiMenuItem-root": { fontSize: 14 },
									},
								},
							}}>
							<MenuItem value="">
								<em>Select Category</em>
							</MenuItem>
							{categories &&
								categories.map((cat) => (
									<MenuItem
										key={cat.Id}
										value={cat.Id}
										sx={{ color: isDark ? "#e4e6eb" : "#111" }}>
										{cat.Name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<Box mt={2} mb={2}>
						<Button
							variant="outlined"
							component="label"
							startIcon={<AddPhotoAlternateIcon />}
							fullWidth
							sx={{
								justifyContent: "flex-start",
								textTransform: "none",
								fontWeight: 500,
								bgcolor: isDark ? "#212121" : "#f9fafb",
								color: isDark ? "#d1d5db" : "#374151",
								borderColor: isDark ? "#3d3d3d" : "#d1d5db",
								"&:hover": { bgcolor: isDark ? "#2a2a2a" : "#f3f4f6" },
							}}>
							{image ? "Change Image" : "Upload Image"}
							<input
								type="file"
								accept="image/png, image/jpeg"
								hidden
								onChange={handleImageChange}
								ref={fileInputRef}
								required={!image}
							/>
						</Button>
						{imagePreview && (
							<Box mt={2} display="flex" justifyContent="center">
								<img
									src={imagePreview}
									alt="Preview"
									className="rounded max-h-32"
								/>
							</Box>
						)}
					</Box>
					{error && (
						<Alert
							severity="error"
							variant="filled"
							sx={{ mt: 1, bgcolor: "#b91c1c" }}>
							{error}
						</Alert>
					)}
					{success && (
						<Alert
							severity="success"
							variant="filled"
							sx={{ mt: 1, bgcolor: "#4d7c0f" }}>
							Product added successfully!
						</Alert>
					)}
					<Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
						<Button
							onClick={handleClose}
							disabled={loading}
							sx={{ textTransform: "none" }}>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							disabled={loading}
							sx={{
								textTransform: "none",
								fontWeight: 600,
								bgcolor: isDark ? "#9ec81d" : "#609963",
								"&:hover": { bgcolor: isDark ? "#8ab017" : "#4f7d52" },
								boxShadow: "none",
							}}>
							{loading ? <CircularProgress size={20} /> : "Add Product"}
						</Button>
					</Box>
				</form>
			</Box>
		</Modal>
	);
};

export default AddProductModal;
