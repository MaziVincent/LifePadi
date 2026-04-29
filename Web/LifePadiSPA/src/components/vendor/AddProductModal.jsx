import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2 } from "lucide-react";
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
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { getCategoriesUrl, createProductUrl } from "./vendorUri/VendorURI";

const AddProductModal = ({ openAddProductModal, setOpenAddProductModal }) => {
	const { auth } = useAuth();
	const fetchdata = useFetch();
	const postData = usePost();
	const queryClient = useQueryClient();
	const fileInputRef = useRef(null);

	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [tag, setTag] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchCategories = async (url) => {
		const response = await fetchdata(url, auth.accessToken);
		return response.data;
	};

	const { data: categories, isLoading: isLoadingCategories } = useQuery({
		queryKey: "categories",
		queryFn: () => fetchCategories(getCategoriesUrl),
		staleTime: 20000,
		refetchOnMount: "always",
		enabled: openAddProductModal,
	});

	const reset = () => {
		setCategory("");
		setName("");
		setPrice("");
		setDescription("");
		setTag("");
		setImage(null);
		setImagePreview(null);
		setLoading(false);
	};

	const handleClose = () => {
		setOpenAddProductModal(false);
		reset();
	};

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		setImage(file || null);
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
		if (!image) {
			toast.error("Please select a product image");
			return;
		}
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("Image", image);
			formData.append("Name", name);
			formData.append("Price", Number(price));
			formData.append("Description", description);
			formData.append("Tag", tag);
			formData.append("CategoryId", Number(category));
			formData.append("VendorId", auth.Id);
			const result = await postData(
				createProductUrl,
				formData,
				auth.accessToken,
			);
			if (result && result.success !== false && !result.error) {
				toast.success("Product added successfully");
				queryClient.invalidateQueries("vendorProductsList");
				queryClient.invalidateQueries("vendorProductStats");
				handleClose();
			} else {
				toast.error(result?.message || "Failed to add product");
			}
		} catch (err) {
			toast.error("Failed to add product");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={openAddProductModal}
			onOpenChange={(o) => !o && handleClose()}>
			<DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add Product</DialogTitle>
					<DialogDescription>
						Create a new product for your store.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="product-name">Product Name</Label>
						<Input
							id="product-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="product-price">Product Price (₦)</Label>
						<Input
							id="product-price"
							type="number"
							min={0}
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="product-description">Product Description</Label>
						<Textarea
							id="product-description"
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="product-tag">Product Tag</Label>
						<Input
							id="product-tag"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label>Product Category</Label>
						<Select
							value={category}
							onValueChange={setCategory}
							disabled={isLoadingCategories}
							required>
							<SelectTrigger>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories?.map((cat) => (
									<SelectItem key={cat.Id} value={String(cat.Id)}>
										{cat.Name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Product Image</Label>
						<Button
							type="button"
							variant="outline"
							className="w-full justify-start"
							onClick={() => fileInputRef.current?.click()}>
							<ImagePlus className="mr-2 h-4 w-4" />
							{image ? "Change image" : "Upload image"}
						</Button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/png, image/jpeg"
							hidden
							onChange={handleImageChange}
						/>
						{imagePreview && (
							<div className="flex justify-center pt-2">
								<img
									src={imagePreview}
									alt="Preview"
									className="max-h-32 rounded-md"
								/>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={handleClose}
							disabled={loading}>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Adding…
								</>
							) : (
								"Add Product"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddProductModal;
