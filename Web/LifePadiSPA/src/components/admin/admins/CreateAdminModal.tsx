import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import usePost from "../../../hooks/usePost";
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
import { Separator } from "@/components/ui/separator";

interface CreateAdminModalProps {
	open: boolean;
	handleClose: (action: any) => void;
}

const CreateAdminModal = ({ open, handleClose }: CreateAdminModalProps) => {
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}admin/create`;
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const create = async (data: Record<string, any>) => {
		const fd = new FormData();
		Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
		await post(url, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admins"] });
			toast.success("Admin Created Successfully");
			handleClose({ type: "open" });
			reset();
		},
		onError: () => {
			toast.error("Failed to create admin");
		},
	});

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Admin</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-6">
					<div>
						<h4 className="font-semibold mb-3">Personal Info</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="space-y-1">
								<Label>First Name</Label>
								<Input {...register("FirstName", { required: true })} />
								{errors.FirstName && <p className="text-xs text-destructive">Required</p>}
							</div>
							<div className="space-y-1">
								<Label>Last Name</Label>
								<Input {...register("LastName", { required: true })} />
								{errors.LastName && <p className="text-xs text-destructive">Required</p>}
							</div>
							<div className="space-y-1 sm:col-span-2">
								<Label>Phone Number</Label>
								<Input {...register("PhoneNumber", { required: true })} />
							</div>
							<div className="space-y-1 sm:col-span-2">
								<Label>Contact Address</Label>
								<Textarea rows={3} {...register("ContactAddress", { required: true })} />
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Login Info</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
							<div className="space-y-1">
								<Label>Password</Label>
								<Input
									type="password"
									{...register("Password", {
										required: "Password is required",
										minLength: { value: 4, message: "Min 4 chars" },
									})}
								/>
								{errors.Password && (
									<p className="text-xs text-destructive">{errors.Password.message as string}</p>
								)}
							</div>
							<div className="space-y-1">
								<Label>Confirm Password</Label>
								<Input
									type="password"
									{...register("ConfirmPassword", {
										required: "Confirm password is required",
										validate: (v: string) => v === watch("Password") || "Passwords do not match",
									})}
								/>
								{errors.ConfirmPassword && (
									<p className="text-xs text-destructive">
										{errors.ConfirmPassword.message as string}
									</p>
								)}
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button type="submit" disabled={!isValid || isSubmitting}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Plus className="mr-2 h-4 w-4" />
							)}
							Create Admin
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateAdminModal;
