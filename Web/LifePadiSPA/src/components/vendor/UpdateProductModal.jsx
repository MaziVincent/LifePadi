import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import { getCategoriesUrl, updateProductUrl } from "./vendorUri/VendorURI";

const UpdateProductModal = ({ open, onClose, product }) => {
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
	const [errors, setErrors] = useState({});

	const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await fetch(getCategoriesUrl, auth.accessToken);
			return response.data;
		},
		staleTime: 300000,
		enabled: open,
	});

	const categories = categoriesData?.dataList || categoriesData || [];

	useEffect(() => {
		if (product && open) {
			setForm({
				Name: product.Name || "",
				Description: product.Description || "",
				Price: product.Price ?? "",
				CategoryId: product.CategoryId ? String(product.CategoryId) : "",
				Tag: product.Tag || "",
			});
			setErrors({});
		}
	}, [product, open]);

	const validate = () => {
		const e = {};
		if (!form.Name?.trim()) e.Name = "Product name is required";
		if (!form.Description?.trim()) e.Description = "Description is required";
		if (!form.Price || Number(form.Price) <= 0)
			e.Price = "Valid price is required";
		if (!form.CategoryId) e.CategoryId = "Category is required";
		return e;
	};

	const handleChange = (field) => (value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => {
				const u = { ...prev };
				delete u[field];
				return u;
			});
		}
	};

	const handleUpdate = async () => {
		const v = validate();
		if (Object.keys(v).length) {
			setErrors(v);
			return;
		}
		setLoading(true);
		try {
			const url = updateProductUrl.replace("{id}", product.Id);
			await update(url, form, auth.accessToken);
			queryClient.invalidateQueries("vendorProducts");
			queryClient.invalidateQueries("vendorProductsList");
			queryClient.invalidateQueries("vendorProductStats");
			queryClient.invalidateQueries(["vendorProduct", product.Id]);
			toast.success("Product updated successfully");
			onClose();
		} catch (err) {
			toast.error(
				err?.message || "Failed to update product. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (loading) return;
		setErrors({});
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
			<DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Update Product</DialogTitle>
					<DialogDescription>
						Make changes to your product information.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="upd-name">Product Name</Label>
						<Input
							id="upd-name"
							value={form.Name}
							onChange={(e) => handleChange("Name")(e.target.value)}
							aria-invalid={!!errors.Name}
						/>
						{errors.Name && (
							<p className="text-xs text-destructive">{errors.Name}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="upd-desc">Description</Label>
						<Textarea
							id="upd-desc"
							rows={4}
							value={form.Description}
							onChange={(e) => handleChange("Description")(e.target.value)}
							aria-invalid={!!errors.Description}
						/>
						{errors.Description && (
							<p className="text-xs text-destructive">{errors.Description}</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="upd-price">Price (₦)</Label>
							<Input
								id="upd-price"
								type="number"
								value={form.Price}
								onChange={(e) => handleChange("Price")(e.target.value)}
								aria-invalid={!!errors.Price}
							/>
							{errors.Price && (
								<p className="text-xs text-destructive">{errors.Price}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>
								{categoriesLoading ? "Loading categories…" : "Category"}
							</Label>
							<Select
								value={form.CategoryId}
								onValueChange={handleChange("CategoryId")}
								disabled={categoriesLoading}>
								<SelectTrigger aria-invalid={!!errors.CategoryId}>
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((c) => (
										<SelectItem key={c.Id} value={String(c.Id)}>
											{c.Name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.CategoryId && (
								<p className="text-xs text-destructive">{errors.CategoryId}</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="upd-tag">Tags</Label>
						<Input
							id="upd-tag"
							value={form.Tag}
							onChange={(e) => handleChange("Tag")(e.target.value)}
							placeholder="e.g., organic, fresh, premium"
						/>
						<p className="text-xs text-muted-foreground">
							Add relevant tags to help customers find your product.
						</p>
					</div>

					{form.Name && (
						<div className="rounded-md border bg-muted/30 p-3">
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Preview
							</p>
							<div className="flex items-center gap-2">
								<Badge>{form.Name}</Badge>
								{form.Price && (
									<Badge variant="outline">
										₦{Number(form.Price).toLocaleString()}
									</Badge>
								)}
							</div>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={handleClose} disabled={loading}>
						<X className="mr-2 h-4 w-4" /> Cancel
					</Button>
					<Button
						onClick={handleUpdate}
						disabled={loading || categoriesLoading}>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating…
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" /> Update Product
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateProductModal;
