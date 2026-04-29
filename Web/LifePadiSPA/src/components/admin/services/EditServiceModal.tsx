import { useEffect, useState, type ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import useUpdate from "../../../hooks/useUpdate";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export interface ServiceRow {
	Id: number | string;
	Name: string;
	Description: string;
	ServiceIconUrl?: string;
	IsActive: boolean;
}

interface EditServiceModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	service: ServiceRow | Record<string, unknown>;
}

interface EditServiceFormValues {
	Id: number | string;
	Name: string;
	Description: string;
	IsActive: string;
	ServiceIcon?: FileList;
}

const EditServiceModal = ({ open, handleClose, service }: EditServiceModalProps) => {
	const queryClient = useQueryClient();
	const update = useUpdate();
	const { auth } = useAuth();
	const url = `${baseUrl}service`;
	const [fileError, setFileError] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		control,
		formState: { errors, isSubmitting },
	} = useForm<EditServiceFormValues>({ mode: "all" });

	const editService = async (data: EditServiceFormValues) => {
		const formData = new FormData();
		formData.append("Name", data.Name);
		formData.append("Description", data.Description);
		formData.append("IsActive", String(data.IsActive));

		if (data.ServiceIcon && data.ServiceIcon.length > 0) {
			const iconForm = new FormData();
			iconForm.append("Image", data.ServiceIcon[0]);
			await update(`${url}/uploadImg/${data.Id}`, iconForm, auth?.accessToken);
		}

		await update(`${url}/update/${data.Id}`, formData, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: editService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			reset();
			toast.success("Service updated successfully");
			handleClose({ type: "edit" });
		},
		onError: () => {
			toast.error("Update failed");
		},
	});

	useEffect(() => {
		if (!service) return;
		Object.entries(service).forEach(([key, value]) => {
			setValue(key as keyof EditServiceFormValues, value as never);
		});
	}, [service, setValue]);

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
			onOpenChange={() => handleClose({ type: "edit" })}
		>
			<DialogContent className="max-w-xl">
				<DialogHeader>
					<DialogTitle>Update Service</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit((d) => mutate(d))}
					className="grid gap-4"
				>
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
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
							{...register("Description", { required: true })}
						/>
						{errors.Description && (
							<p className="text-sm text-destructive">Description is required</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="status">Status</Label>
						<Controller
							control={control}
							name="IsActive"
							rules={{ required: "Status is required" }}
							render={({ field }) => (
								<Select
									value={String(field.value ?? "")}
									onValueChange={field.onChange}
								>
									<SelectTrigger id="status">
										<SelectValue placeholder="Change status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="true">Active</SelectItem>
										<SelectItem value="false">De-Activate</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.IsActive && (
							<p className="text-sm text-destructive">
								{errors.IsActive.message as string}
							</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="icon">
							Service Icon{" "}
							<span className="text-xs text-muted-foreground">
								(must be ≤ 50kb, optional)
							</span>
						</Label>
						<Input
							id="icon"
							type="file"
							accept="image/*"
							{...register("ServiceIcon")}
							onChange={handleChange}
						/>
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
							onClick={() => handleClose({ type: "edit" })}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={fileError || isSubmitting}
						>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 h-4 w-4" />
							)}
							Update Service
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditServiceModal;
