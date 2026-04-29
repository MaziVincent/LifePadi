import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDelete from "../../hooks/useDelete";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { deleteProductUrl } from "./vendorUri/VendorURI";

// View product details
export function ViewModal({ product, openViewModal, setOpenViewModal }) {
	return (
		<Dialog open={openViewModal} onOpenChange={setOpenViewModal}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Product Details</DialogTitle>
					<DialogDescription>Quick preview of this product.</DialogDescription>
				</DialogHeader>
				{product ? (
					<div className="space-y-4">
						{product.ProductImgUrl && (
							<img
								src={product.ProductImgUrl}
								alt={product.Name}
								className="h-48 w-full rounded-md object-cover"
							/>
						)}
						<div>
							<h3 className="text-xl font-semibold">{product.Name}</h3>
							<p className="text-muted-foreground text-sm">
								{product.Category?.Name || "Uncategorized"}
							</p>
						</div>
						<p className="text-2xl font-bold text-primary">
							₦{Number(product.Price || 0).toLocaleString()}
						</p>
						<p className="text-sm leading-relaxed">
							{product.Description || "No description available."}
						</p>
						{product.Tag && (
							<p className="text-xs text-muted-foreground">
								Tag: {product.Tag}
							</p>
						)}
					</div>
				) : (
					<p className="text-muted-foreground">No product data available.</p>
				)}
			</DialogContent>
		</Dialog>
	);
}

// Toggle status confirmation
export function ToggleStatusModal({
	open = false,
	onClose = () => {},
	product,
	onToggle = () => Promise.resolve(),
}) {
	const [loading, setLoading] = useState(false);
	const isActive = !!product?.Status;

	const handleToggle = async () => {
		setLoading(true);
		try {
			await onToggle(product);
			toast.success(`Product ${isActive ? "deactivated" : "activated"}`);
			onClose();
		} catch (err) {
			toast.error(err?.message || "Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={(next) => !next && onClose()}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{isActive ? "Deactivate" : "Activate"} product?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to {isActive ? "deactivate" : "activate"}{" "}
						<span className="font-semibold">{product?.Name}</span>?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							handleToggle();
						}}>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Updating…
							</>
						) : isActive ? (
							"Deactivate"
						) : (
							"Activate"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

// Delete product confirmation
export function DeleteModal({ product, openDeleteModal, setOpenDeleteModal }) {
	const [loading, setLoading] = useState(false);
	const deleteData = useDelete();
	const { auth } = useAuth();
	const queryClient = useQueryClient();

	const handleDelete = async () => {
		if (!product?.Id) return;
		setLoading(true);
		const url = deleteProductUrl.replace("{id}", product.Id);
		const response = await deleteData(url, auth.accessToken);
		setLoading(false);
		if (response?.error) {
			toast.error("Failed to delete product");
			return;
		}
		toast.success("Product deleted");
		queryClient.invalidateQueries("vendorProductsList");
		queryClient.invalidateQueries("vendorProductStats");
		setOpenDeleteModal(false);
	};

	return (
		<AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this product?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently remove{" "}
						<span className="font-semibold">{product?.Name}</span>. This action
						cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting…
							</>
						) : (
							"Yes, delete"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
