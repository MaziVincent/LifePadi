import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

import useUpdate from "../../../../hooks/useUpdate";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CategoryLite {
	Id: number | string;
	Name: string;
}

interface ProductLike {
	Id?: number | string;
	[k: string]: any;
}

interface EditProductModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	product: ProductLike | null;
	vendorId: number | string | null;
}

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm capitalize ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);

const EditProductModal = ({
	open,
	handleClose,
	product,
}: EditProductModalProps) => {
	const update = useUpdate();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}product`;
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const { data: categories } = useQuery<CategoryLite[]>({
		queryKey: ["categories"],
		queryFn: async () => {
			const r = await fetch(`${baseUrl}category/allLite`, auth.accessToken);
			return r.data as CategoryLite[];
		},
		staleTime: 20000,
	});

	const updateProduct = async (data: any) => {
		const fd = new FormData();
		Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
		await update(`${url}/update/${product?.Id}`, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor"] });
			toast.success("Product Updated");
			handleClose({ type: "edit" });
			reset();
		},
		onError: () => {
			toast.error("Update Failed");
		},
	});

	useEffect(() => {
		if (product) {
			Object.entries(product).forEach(([k, v]) => setValue(k, v as never));
		}
	}, [product, setValue]);

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "edit" })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Update Product</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Name</Label>
							<Input {...register("Name", { required: true })} />
							{errors.Name && (
								<p className="text-xs text-destructive">Required</p>
							)}
						</div>
						<div className="space-y-1">
							<Label>Tag</Label>
							<Input {...register("Tag", { required: true })} />
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Description</Label>
							<Textarea
								rows={3}
								{...register("Description", { required: true })}
							/>
						</div>
						<div className="space-y-1">
							<Label>Price</Label>
							<Input type="number" {...register("Price", { required: true })} />
						</div>
						<div className="space-y-1">
							<Label>Category</Label>
							<select
								className={selectClasses}
								{...register("CategoryId", {
									required: "Category is required",
								})}>
								<option value="">Select Category</option>
								{categories?.map((c) => (
									<option key={c.Id} value={c.Id}>
										{c.Name}
									</option>
								))}
							</select>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || !isValid}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 h-4 w-4" />
							)}
							Update
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProductModal;
