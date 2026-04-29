import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

interface CategoryRow {
	Id: number | string;
	Name?: string;
	Description?: string;
	Icon?: string;
}

interface EditCategoryModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	category: CategoryRow;
}

interface EditCategoryFormValues {
	Id: number | string;
	Name: string;
	Description: string;
	Icon?: FileList;
}

const EditCategoryModal = ({ open, handleClose, category }: EditCategoryModalProps) => {
	const queryClient = useQueryClient();
	const update = useUpdate();
	const { auth } = useAuth();
	const url = `${baseUrl}category`;
	const [fileError, setFileError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<EditCategoryFormValues>({ mode: "all" });

	useEffect(() => {
		if (category) {
			Object.entries(category).forEach(([key, value]) => {
				setValue(key as keyof EditCategoryFormValues, value as never);
			});
		}
	}, [category, setValue]);

	const close = () => {
		reset();
		setFileError(false);
		handleClose({ type: "edit" });
	};

	const editCategory = async (data: EditCategoryFormValues) => {
		const formData = new FormData();
		formData.append("Name", data.Name);
		formData.append("Description", data.Description);
		if (data.Icon && data.Icon.length > 0) {
			formData.append("Icon", data.Icon[0]);
			await update(`${url}/${data.Id}/uploadIcon`, formData, auth?.accessToken);
		}
		return update(`${url}/update/${data.Id}`, formData, auth?.accessToken);
	};

	const { mutate, isPending: isLoading } = useMutation({ mutationFn: editCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category updated successfully");
			close();
		},
		onError: () => {
			toast.error("Update failed");
		},
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			setFileError(false);
			return;
		}
		setFileError(file.size > 50 * 1024);
	};

	return (
		<Dialog open={open} onOpenChange={(o) => !o && close()}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Edit Category</DialogTitle>
					<DialogDescription>Update category details.</DialogDescription>
				</DialogHeader>
				<form
					id="edit-category-form"
					onSubmit={handleSubmit((d) => mutate(d))}
					className="space-y-3">
					<div>
						<Label htmlFor="EditName">Name</Label>
						<Input
							id="EditName"
							{...register("Name", { required: "Name is required" })}
						/>
						{errors.Name && (
							<p className="mt-1 text-xs text-destructive">
								{errors.Name.message as string}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="EditDescription">Description</Label>
						<Textarea
							id="EditDescription"
							rows={4}
							{...register("Description", { required: "Description is required" })}
						/>
						{errors.Description && (
							<p className="mt-1 text-xs text-destructive">
								{errors.Description.message as string}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="EditIcon">
							Category Icon{" "}
							<span className="text-xs text-muted-foreground">
								(max 50kb, optional)
							</span>
						</Label>
						<Input
							id="EditIcon"
							type="file"
							accept="image/*"
							{...register("Icon")}
							onChange={(e) => {
								register("Icon").onChange(e);
								handleChange(e);
							}}
						/>
						{fileError && (
							<Alert variant="destructive" className="mt-2">
								<AlertDescription>File should not exceed 50kb</AlertDescription>
							</Alert>
						)}
					</div>
				</form>
				<DialogFooter>
					<Button variant="outline" type="button" onClick={close}>
						Cancel
					</Button>
					<Button
						type="submit"
						form="edit-category-form"
						disabled={!isValid || fileError || isSubmitting || isLoading}>
						{isSubmitting || isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving…
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								Save Changes
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditCategoryModal;
