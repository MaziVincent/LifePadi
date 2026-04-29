import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
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
import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

interface CreateCategoryModalProps {
	open: boolean;
	handleClose: (action: any) => void;
}

interface CreateCategoryFormValues {
	Name: string;
	Description: string;
	Icon: FileList;
}

const CreateCategoryModal = ({ open, handleClose }: CreateCategoryModalProps) => {
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}category/create`;
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm<CreateCategoryFormValues>({ mode: "all" });

	const close = () => {
		reset();
		setFileError(false);
		handleClose({ type: "open" });
	};

	const create = async (data: CreateCategoryFormValues) => {
		const formData = new FormData();
		formData.append("Name", data.Name);
		formData.append("Description", data.Description);
		formData.append("Icon", data.Icon[0]);
		return post(url, formData, auth?.accessToken);
	};

	const { mutate, isPending: isLoading } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category created successfully");
			close();
		},
		onError: () => {
			toast.error("Error creating category");
		},
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setFileError(!file || file.size > 50 * 1024);
	};

	return (
		<Dialog open={open} onOpenChange={(o) => !o && close()}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Create Category</DialogTitle>
					<DialogDescription>Add a new product category.</DialogDescription>
				</DialogHeader>
				<form
					id="create-category-form"
					onSubmit={handleSubmit((d) => mutate(d))}
					className="space-y-3">
					<div>
						<Label htmlFor="Name">Name</Label>
						<Input
							id="Name"
							placeholder="Type name of category"
							{...register("Name", { required: "Name is required" })}
						/>
						{errors.Name && (
							<p className="mt-1 text-xs text-destructive">
								{errors.Name.message as string}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="Description">Description</Label>
						<Textarea
							id="Description"
							rows={4}
							placeholder="Write category description"
							{...register("Description", { required: "Description is required" })}
						/>
						{errors.Description && (
							<p className="mt-1 text-xs text-destructive">
								{errors.Description.message as string}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="Icon">
							Category Icon{" "}
							<span className="text-xs text-muted-foreground">
								(max 50kb)
							</span>
						</Label>
						<Input
							id="Icon"
							type="file"
							accept="image/*"
							{...register("Icon", { required: "Icon is required" })}
							onChange={(e) => {
								register("Icon").onChange(e);
								handleChange(e);
							}}
						/>
						{errors.Icon && (
							<p className="mt-1 text-xs text-destructive">
								{errors.Icon.message as string}
							</p>
						)}
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
						form="create-category-form"
						disabled={!isValid || fileError || isSubmitting || isLoading}>
						{isSubmitting || isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating…
							</>
						) : (
							<>
								<Plus className="mr-2 h-4 w-4" />
								Create Category
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCategoryModal;
