import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

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

interface AdminLike {
	Id?: number | string;
	[k: string]: any;
}

interface EditAdminModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	admin: AdminLike | null;
}

const EditAdminModal = ({ open, handleClose, admin }: EditAdminModalProps) => {
	const update = useUpdate();
	const { auth } = useAuth();
	const url = `${baseUrl}admin`;
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const updateAdmin = async (data: Record<string, any>) => {
		const fd = new FormData();
		Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
		await update(`${url}/update/${admin?.Id}`, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: updateAdmin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admins"] });
			toast.success("Admin Updated");
			handleClose({ type: "edit" });
			reset();
		},
		onError: () => {
			toast.error("Update Failed");
		},
	});

	useEffect(() => {
		if (admin) {
			Object.entries(admin).forEach(([k, v]) => setValue(k, v as never));
		}
	}, [admin, setValue]);

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "edit" })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Update Admin</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>First Name</Label>
							<Input {...register("FirstName", { required: true })} />
							{errors.FirstName && <p className="text-xs text-destructive">Required</p>}
						</div>
						<div className="space-y-1">
							<Label>Last Name</Label>
							<Input {...register("LastName", { required: true })} />
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Phone Number</Label>
							<Input {...register("PhoneNumber", { required: true })} />
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Email</Label>
							<Input
								type="email"
								{...register("Email", {
									required: "Email is required",
									pattern: {
										value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
										message: "Invalid email",
									},
								})}
							/>
							{errors.Email && (
								<p className="text-xs text-destructive">{errors.Email.message as string}</p>
							)}
						</div>
						<div className="space-y-1 sm:col-span-2">
							<Label>Contact Address</Label>
							<Textarea rows={3} {...register("ContactAddress", { required: true })} />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={!isValid || isSubmitting}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 h-4 w-4" />
							)}
							Update Admin
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditAdminModal;
