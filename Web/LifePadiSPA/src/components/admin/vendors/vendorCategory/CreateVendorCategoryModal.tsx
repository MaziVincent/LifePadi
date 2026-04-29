import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";

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

interface CreateVendorCategoryFormValues {
	Name: string;
	Description: string;
	Icon: FileList;
}

interface CreateVendorCategoryModalProps {
	open: boolean;
	handleClose: (action: any) => void;
}

const CreateVendorCategoryModal = ({ open, handleClose }: CreateVendorCategoryModalProps) => {
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}vendorcategory/create`;
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreateVendorCategoryFormValues>({ mode: "all" });

	const create = async (payload: Record<string, any>) => {
		const fd = new FormData();
		Object.entries(payload).forEach(([k, v]) => fd.append(k, v as any));
		await post(url, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendorcategories"] });
			toast.success("Vendor Category Created");
			reset();
			handleClose({ type: "open" });
		},
		onError: () => {
			toast.error("Vendor Category Failed to Create");
		},
	});

	const onSubmit = (data: CreateVendorCategoryFormValues) => {
		mutate({ ...data, Icon: data.Icon[0] });
	};

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setFileError(!file || file.size > 50 * 1024);
	};

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Create Vendor Category</DialogTitle>
					<DialogDescription>Add a new vendor category.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="vc-name">Name</Label>
						<Input id="vc-name" {...register("Name", { required: true })} />
						{errors.Name && <p className="text-sm text-destructive">Name is required</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="vc-desc">Description</Label>
						<Textarea id="vc-desc" rows={4} {...register("Description", { required: true })} />
						{errors.Description && (
							<p className="text-sm text-destructive">Description is required</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="vc-icon">Icon (max 50KB)</Label>
						<Input
							id="vc-icon"
							type="file"
							accept="image/*"
							{...register("Icon", { required: true })}
							onChange={handleFile}
						/>
						{errors.Icon && <p className="text-sm text-destructive">Icon is required</p>}
						{fileError && <p className="text-sm text-destructive">File must be under 50KB</p>}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || fileError}>
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

export default CreateVendorCategoryModal;
