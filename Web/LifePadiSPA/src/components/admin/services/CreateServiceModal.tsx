import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CreateServiceModalProps {
	open: boolean;
	handleClose: (action: any) => void;
}

interface CreateServiceFormValues {
	Name: string;
	Description: string;
	ServiceIcon: FileList;
}

const CreateServiceModal = ({ open, handleClose }: CreateServiceModalProps) => {
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}service/create`;
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<CreateServiceFormValues>({ mode: "all" });

	const create = async (data: CreateServiceFormValues) => {
		const formData = new FormData();
		formData.append("Name", data.Name);
		formData.append("Description", data.Description);
		formData.append("ServiceIcon", data.ServiceIcon[0]);
		await post(url, formData, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			toast.success("Service created successfully");
			reset();
			handleClose({ type: "open" });
		},
		onError: () => {
			toast.error("Error creating service");
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file || file.size > 50 * 1024) {
			setFileError(true);
		} else {
			setFileError(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={() => handleClose({ type: "open" })}
		>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>Create Service</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit((d) => mutate(d))}
					className="grid gap-4"
				>
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							placeholder="Type name of service"
							{...register("Name", { required: true })}
						/>
						{errors.Name && (
							<p className="text-sm text-destructive">Name is required</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							rows={4}
							placeholder="Write service description"
							{...register("Description", { required: true })}
						/>
						{errors.Description && (
							<p className="text-sm text-destructive">Description is required</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="icon">
							Service Icon{" "}
							<span className="text-xs text-muted-foreground">
								(must be ≤ 50kb)
							</span>
						</Label>
						<Input
							id="icon"
							type="file"
							accept="image/*"
							{...register("ServiceIcon", { required: true })}
							onChange={handleChange}
						/>
						{errors.ServiceIcon && (
							<p className="text-sm text-destructive">Service icon is required</p>
						)}
						{fileError && (
							<Alert variant="destructive">
								<AlertDescription>File should not be above 50kb</AlertDescription>
							</Alert>
						)}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="ghost"
							onClick={() => handleClose({ type: "open" })}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={fileError || isSubmitting || !isValid}
						>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Plus className="mr-2 h-4 w-4" />
							)}
							Create Service
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateServiceModal;
