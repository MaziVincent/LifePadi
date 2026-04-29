import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import usePost from "../../../../hooks/usePost";
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

interface CreateProductModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	vendorId: number | string;
}

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm capitalize ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);

const CreateProductModal = ({ open, handleClose, vendorId }: CreateProductModalProps) => {
	const post = usePost();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}product/create`;
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const { data: categories } = useQuery<CategoryLite[]>({
		queryKey: ["categories"],
		queryFn: async () => {
			const r = await fetch(`${baseUrl}category/allLite`, auth.accessToken);
			return r.data;
		},
		staleTime: 10000,
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const create = async (payload: Record<string, any>) => {
		const fd = new FormData();
		Object.entries(payload).forEach(([k, v]) => fd.append(k, v as any));
		await post(url, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor"] });
			toast.success("Product Created");
			handleClose({ type: "open" });
			reset();
			setFile(null);
		},
		onError: () => {
			toast.error("Failed to create");
		},
	});

	const onSubmit = (prod: any) => {
		mutate({ ...prod, VendorId: vendorId, Image: file });
	};

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f || f.size > 200 * 1024) {
			setFileError(true);
			setFile(null);
		} else {
			setFile(f);
			setFileError(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Product</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Name</Label>
							<Input {...register("Name", { required: true })} />
							{errors.Name && <p className="text-xs text-destructive">Required</p>}
						</div>
						<div className="space-y-1">
							<Label>Tag</Label>
							<Input {...register("Tag", { required: true })} />
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Description</Label>
							<Textarea rows={3} {...register("Description", { required: true })} />
						</div>
						<div className="space-y-1">
							<Label>Price</Label>
							<Input type="number" {...register("Price", { required: true })} />
						</div>
						<div className="space-y-1">
							<Label>Category</Label>
							<select
								className={selectClasses}
								defaultValue=""
								{...register("CategoryId", { required: "Category is required" })}
							>
								<option value="" disabled>
									Select Category
								</option>
								{categories?.map((c) => (
									<option key={c.Id} value={c.Id}>
										{c.Name}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Image (max 200KB)</Label>
							<Input
								type="file"
								accept="image/*"
								{...register("Image", { required: true })}
								onChange={handleFile}
							/>
							{fileError && <p className="text-xs text-destructive">File must be under 200KB</p>}
							{file && <p className="text-xs text-emerald-600">{file.name}</p>}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || fileError || !isValid}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Plus className="mr-2 h-4 w-4" />
							)}
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProductModal;
