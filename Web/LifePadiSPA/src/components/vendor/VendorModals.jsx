// ViewModal for viewing product details in a modal
import React, { useState, useEffect, useRef } from "react";
import UpdateProductModal from "./UpdateProductModal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Alert,
	DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";

export function ViewModal({ product, openViewModal, setOpenViewModal }) {
	return (
		<Dialog
			open={openViewModal}
			onClose={() => setOpenViewModal(false)}
			maxWidth="md"
			fullWidth>
			<DialogTitle>Product Details</DialogTitle>
			<DialogContent dividers>
				{/* You can customize this to show product details, or reuse VendorViewProduct logic */}
				{/* For now, show basic product info. You can expand as needed. */}
				{product ? (
					<Box>
						<Typography variant="h6" gutterBottom>
							{product.name || product.Name}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							Price: ₦{product.price || product.Price}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Description: {product.description || product.Description}
						</Typography>
						{/* Add more fields as needed */}
					</Box>
				) : (
					<Typography>No product data available.</Typography>
				)}
			</DialogContent>
		</Dialog>
	);
}
/* eslint-disable react/prop-types */
// Legacy modal implementations below still rely on Modal from MUI
import Modal from "@mui/material/Modal";
import DateFormater from "../shared/DateFormater";
import useUpdate from "../../hooks/useUpdate";
import useDelete from "../../hooks/useDelete";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "react-query";
import { getCategoriesUrl } from "./vendorUri/VendorURI";
// ...existing code...

// Inline UpdateProductModal removed; now imported above.

// DeleteProductModal
export function DeleteProductModal({
	open = false,
	onClose = () => {},
	product,
	onDelete = () => Promise.resolve(),
}) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleDelete = async () => {
		setLoading(true);
		setError("");
		try {
			await onDelete(product);
			setSuccess("Product deleted!");
			setTimeout(() => {
				setSuccess("");
				onClose();
			}, 1000);
		} catch (err) {
			setError(err?.message || "Failed to delete product");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="xs"
			PaperProps={{
				className:
					"bg-white dark:bg-darkMenu text-accent dark:text-darkSecondaryText",
			}}>
			<DialogTitle>Delete Product</DialogTitle>
			<DialogContent dividers>
				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}
				{success && (
					<Alert severity="success" sx={{ mb: 2 }}>
						{success}
					</Alert>
				)}
				<Typography>
					Are you sure you want to delete <b>{product?.name}</b>?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button
					onClick={handleDelete}
					color="error"
					variant="contained"
					disabled={loading}>
					{loading ? <CircularProgress size={20} /> : "Delete"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

// ToggleStatusModal
export function ToggleStatusModal({
	open = false,
	onClose = () => {},
	product,
	onToggle = () => Promise.resolve(),
}) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleToggle = async () => {
		setLoading(true);
		setError("");
		try {
			await onToggle(product);
			setSuccess(`Product ${product?.isActive ? "deactivated" : "activated"}!`);
			setTimeout(() => {
				setSuccess("");
				onClose();
			}, 1000);
		} catch (err) {
			setError(err?.message || "Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs">
			<DialogTitle>
				{product?.isActive ? "Deactivate" : "Activate"} Product
			</DialogTitle>
			<DialogContent dividers>
				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}
				{success && (
					<Alert severity="success" sx={{ mb: 2 }}>
						{success}
					</Alert>
				)}
				<Typography>
					Are you sure you want to{" "}
					{product?.isActive ? "deactivate" : "activate"} <b>{product?.name}</b>
					?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button
					onClick={handleToggle}
					color={product?.isActive ? "warning" : "success"}
					variant="contained"
					disabled={loading}>
					{loading ? (
						<CircularProgress size={20} />
					) : product?.isActive ? (
						"Deactivate"
					) : (
						"Activate"
					)}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export const UpdateModal = ({
	product,
	openUpdateModal,
	setOpenUpdateModal,
}) => {
	// Local style object used for legacy modal layout (previously missing, caused ReferenceError)
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 500,
		maxHeight: "90vh",
		overflowY: "auto",
		bgcolor: "background.paper",
		borderRadius: 4,
		boxShadow: 24,
		p: 4,
	};
	const handleCloseUpdateModal = () => setOpenUpdateModal(false);
	const updateData = useUpdate();
	const { auth } = useAuth();
	const fetchdata = useFetch();
	const [productCategory, setProductCategory] = useState(product.Category.Id);
	const [name, setName] = useState(product.Name);
	const [price, setPrice] = useState(product.Price);
	const [description, setDescription] = useState(product.Description);
	const [tag, setTag] = useState(product.Tag);
	const [imgUrl] = useState(product.ProductImgUrl);
	const [image, setImage] = useState(null);
	let vendoId = auth.Id;
	const [response, setResponse] = useState(null);

	const fetchCategories = async (url) => {
		const response = await fetchdata(url, auth.accessToken);
		return response.data;
	};

	const {
		data: categories,
		isError,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: "categories",
		queryFn: () => fetchCategories(getCategoriesUrl),
		keepPreviousData: true,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const handleUpdateProduct = async (productId) => {
		console.log(productId);
		const formData = new FormData();
		formData.append("Image", image);
		formData.append("Name", name);
		formData.append("Price", Number(price));
		formData.append("Description", description);
		formData.append("Tag", tag);
		formData.append("CategoryId", Number(productCategory));
		formData.append("VendorId", vendoId);
		const updatePUrl = updateProductUrl.replace("{id}", productId);
		try {
			const res = await updateData(updatePUrl, formData, auth.accessToken);
			setResponse(res.data);
			setTimeout(() => {
				handleCloseUpdateModal();
				Window.location.refresh();
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Modal
				open={openUpdateModal}
				onClose={handleCloseUpdateModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box
					sx={style}
					className="bg-white dark:bg-darkMenu text-accent dark:text-darkSecondaryText">
					{response && <span className="text-lightgreen p-2">{response}</span>}
					{isError && <span className="text-red p-2">{isError}</span>}
					<div className="flex justify-between items-center w-full ">
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Update Product
						</Typography>
						<button
							onClick={() => setOpenUpdateModal(false)}
							className="py-2 px-4 rounded-md bg-graybg text-darkBg">
							X
						</button>
					</div>
					<div className="mt-2">
						<form
							onSubmit={(e) => handleUpdateProduct(product.Id)}
							method="post">
							<div className="">
								<label
									htmlFor="product-name"
									className="block text-sm font-medium text-gray-700">
									Product Name
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="name"
										id="product-name"
										autoComplete="product-name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
										className="shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
									/>
								</div>
							</div>
							<div className="mt-4">
								<label
									htmlFor="product-price"
									className="block text-sm font-medium text-gray-700">
									Product Price
								</label>
								<div className="mt-1">
									<input
										type="number"
										name="price"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										id="product-price"
										autoComplete="product-price"
										required
										className="shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
									/>
								</div>
							</div>
							<div className="mt-4">
								<label
									htmlFor="product-description"
									className="block text-sm font-medium text-gray-700">
									Product Description
								</label>
								<div className="mt-1">
									<textarea
										name="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										id="product-description"
										autoComplete="product-description"
										required
										className="shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"></textarea>
								</div>
							</div>
							<div className="mt-4">
								<label
									htmlFor="product-tag"
									className="block text-sm font-medium text-gray-700">
									Product Tag
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="tag"
										value={tag}
										onChange={(e) => setTag(e.target.value)}
										id="product-tag"
										autoComplete="product-tag"
										required
										className="shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
									/>
								</div>
							</div>
							<div className="mt-4">
								<label
									htmlFor="product-category"
									className="block text-sm font-medium text-gray-700">
									Product Category
								</label>
								<div className="mt-1">
									<select
										name="category"
										onChange={(e) => setProductCategory(e.target.value)}
										id="product-category"
										autoComplete="product-category"
										required
										className="shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md">
										{isLoading && <option>Loading...</option>}
										{categories &&
											categories.map((category) => (
												<option
													key={category.Id}
													value={category.Id}
													selected={
														Number(category.Id) === Number(productCategory)
													}>
													{category.Name}
												</option>
											))}
									</select>
								</div>
							</div>
							<div className="mt-4">
								<label
									htmlFor="product-image"
									className="block text-sm font-medium text-gray-700">
									Product Image
								</label>
								<div className="mt-1 flex justify-center items-center gap-2">
									<div>
										<input
											type="file"
											name="image"
											onChange={(e) => setImage(e.target.files[0])}
											id="product-image"
											autoComplete="product-image"
											accept="image/png, image/jpeg"
											required
											className="shadow-sm text-lg px-5 py-2 sm:text-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
										/>
									</div>
									<div className="w-56 ">
										<span className="block text-center">Current Image</span>
										<div className="">
											<img src={imgUrl} alt="" />
										</div>
									</div>
								</div>
							</div>
							<div className="flex justify-end mt-3 gap-2">
								<button
									type="submit"
									className="bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded">
									Create Product
								</button>
								<button
									type="button"
									className="bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded"
									onClick={handleCloseUpdateModal}>
									Cancle
								</button>
							</div>
						</form>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export const DeleteModal = ({
	product,
	openDeleteModal,
	setOpenDeleteModal,
}) => {
	// Local style reused for legacy modal containers
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		borderRadius: 4,
		boxShadow: 24,
		p: 4,
	};
	const handleCloseDeleteModal = () => setOpenDeleteModal(false);
	const [result, setResult] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const deleteData = useDelete();
	const { auth } = useAuth();
	const productId = product.Id;
	// console.log(productId);

	const handleDeleteProduct = async (productId) => {
		setDeleteLoading(true);
		const url = deleteProductUrl.replace("{id}", productId);

		const response = await deleteData(url, auth.accessToken);
		if (response.error) {
			setResult(response.error);
		}
		if (response) {
			setResult(response);
			console.log(response);
		}
		setResult(response);
		setTimeout(() => {
			setDeleteLoading(false);
			handleCloseDeleteModal();
			window.location.reload();
		}, 2000);
	};
	return (
		<div>
			<Modal
				open={openDeleteModal}
				onClose={handleCloseDeleteModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box
					sx={style}
					className="bg-white dark:bg-darkMenu text-accent dark:text-darkSecondaryText">
					{result && <p className="text-lightgreen">{result}</p>}
					<div className="flex justify-between items-center w-full ">
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Delete Product
						</Typography>
						<button
							onClick={() => setOpenDeleteModal(false)}
							className="py-2 px-4 rounded-md bg-graybg text-darkBg">
							X
						</button>
					</div>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Are you sure you want to delete this product?
					</Typography>
					<div className="flex justify-end mt-3 gap-2">
						<button
							type="button"
							className="bg-secondary hover:bg-lightgreen text-white font-bold py-2 px-4 rounded"
							onClick={() => handleDeleteProduct(productId)}
							disabled={deleteLoading}>
							Yes
						</button>
						<button
							type="button"
							className="bg-graybg text-darkBg hover:bg-red hover:text-primary font-bold py-2 px-4 rounded"
							onClick={handleCloseDeleteModal}>
							No
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

// Removed obsolete addProductStyle (was used by extracted AddProductModal)

// AddProductModal extracted to its own file (AddProductModal.jsx)
