import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

import useUpdate from "../../../../hooks/useUpdate";
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

export interface VendorCategoryRow {
	Id: number | string;
	Name: string;
	Description?: string;
	IconUrl?: string;
}

interface EditVendorCategoryModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	vendorCategory: VendorCategoryRow | Record<string, unknown>;
}

const EditVendorCategoryModal = ({
	open,
	handleClose,
	vendorCategory,
}: EditVendorCategoryModalProps) => {
	const queryClient = useQueryClient();
	const update = useUpdate();
	const { auth } = useAuth();
	const url = `${baseUrl}vendorcategory`;
	const [fileError, setFileError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({ mode: "all" });

	const editCat = async (data: any) => {
		const fd = new FormData();
		fd.append("Name", data.Name);
		fd.append("Description", data.Description);
		if (data.Icon) fd.append("Icon", data.Icon);
		await update(`${url}/update/${data.Id}`, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: editCat,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendorcategories"] });
			reset();
			toast.success("Vendor Category Updated");
			handleClose({ type: "edit" });
		},
		onError: () => {
			toast.error("Update Failed");
		},
	});

	const onSubmit = (data: any) => {
		const cat = { ...data };
		if (cat.Icon && cat.Icon.length) cat.Icon = cat.Icon[0];
		mutate(cat);
	};

	useEffect(() => {
		Object.entries(vendorCategory || {}).forEach(([k, v]) => setValue(k, v as never));
	}, [vendorCategory, setValue]);

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.size > 50 * 1024) setFileError(true);
		else setFileError(false);
	};

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "edit" })}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Update Vendor Category</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="evc-name">Name</Label>
						<Input id="evc-name" {...register("Name")} />
						{errors.Name && <p className="text-sm text-destructive">Name is required</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="evc-desc">Description</Label>
						<Textarea id="evc-desc" rows={4} {...register("Description")} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="evc-icon">Icon (max 50KB)</Label>
						<Input
							id="evc-icon"
							type="file"
							accept="image/*"
							{...register("Icon")}
							onChange={handleFile}
						/>
						{fileError && <p className="text-sm text-destructive">File must be under 50KB</p>}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || fileError}>
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

export default EditVendorCategoryModal;
