/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUpdate from "../../../hooks/useUpdate";
import baseUrl from "../../../api/baseUrl";

interface PasswordChangeModalProps {
	open: boolean;
	onClose?: () => void;
	handleClose?: () => void;
	email?: string;
	phone?: string;
	title?: string;
}

interface PasswordFormValues {
	NewPassword: string;
	ConfirmPassword: string;
}

const PasswordChangeModal = ({
	open,
	onClose,
	handleClose,
	email,
	phone,
	title = "Change Password",
}: PasswordChangeModalProps) => {
	const update = useUpdate();
	const [show, setShow] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm<PasswordFormValues>({ mode: "onChange" });

	const newPassword = watch("NewPassword");
	const apiEndpoint = `${baseUrl}auth/password-reset`;

	const closeModal = () => {
		reset();
		setErrorMsg("");
		(onClose || handleClose)?.();
	};

	const onSubmit = async (data: PasswordFormValues) => {
		setSubmitting(true);
		setErrorMsg("");
		try {
			if (!email && !phone) {
				toast.error("No identifier (email/phone) provided");
				setSubmitting(false);
				return;
			}
			const fd = new FormData();
			fd.append("NewPassword", data.NewPassword);
			if (email) fd.append("Email", email);
			else if (phone) fd.append("PhoneNumber", phone);

			const res: any = await update(apiEndpoint, fd, "");
			if (res?.status === 200) {
				toast.success("Password changed");
				closeModal();
			} else {
				const errPayload = res?.error;
				let message = "Failed to change password";
				if (errPayload) {
					if (typeof errPayload === "string") message = errPayload;
					else if (typeof errPayload?.message === "string")
						message = errPayload.message;
					else if (errPayload?.errors) {
						const firstKey = Object.keys(errPayload.errors)[0];
						const firstErr = errPayload.errors[firstKey];
						if (Array.isArray(firstErr)) message = firstErr[0];
					}
				}
				toast.error(message);
				setErrorMsg(message);
			}
		} catch (e: any) {
			const msg = e?.message || "Error changing password";
			toast.error(msg);
			setErrorMsg(msg);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={(o) => !o && closeModal()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{typeof title === "string" ? title : "Change Password"}
					</DialogTitle>
				</DialogHeader>
				<form
					id="password-change-form"
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-3">
					{email && (
						<Alert>
							<AlertDescription>
								Resetting password for: {email}
							</AlertDescription>
						</Alert>
					)}
					{!email && phone && (
						<Alert>
							<AlertDescription>
								Resetting password for phone: {phone}
							</AlertDescription>
						</Alert>
					)}
					{errorMsg && (
						<Alert variant="destructive">
							<AlertDescription>{errorMsg}</AlertDescription>
						</Alert>
					)}

					<div>
						<Label htmlFor="NewPassword">New Password</Label>
						<div className="relative">
							<Input
								id="NewPassword"
								type={show ? "text" : "password"}
								{...register("NewPassword", {
									required: "Password required",
									minLength: { value: 6, message: "Min 6 chars" },
								})}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
								onClick={() => setShow((s) => !s)}
								aria-label="Toggle password visibility">
								{show ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</Button>
						</div>
						{errors.NewPassword && (
							<p className="mt-1 text-xs text-destructive">
								{errors.NewPassword.message as string}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="ConfirmPassword">Confirm Password</Label>
						<Input
							id="ConfirmPassword"
							type={show ? "text" : "password"}
							{...register("ConfirmPassword", {
								required: "Confirm password",
								validate: (v) => v === newPassword || "Passwords must match",
							})}
						/>
						{errors.ConfirmPassword && (
							<p className="mt-1 text-xs text-destructive">
								{errors.ConfirmPassword.message as string}
							</p>
						)}
					</div>

					<Alert>
						<AlertDescription className="text-xs">
							Password must meet complexity: 6+ chars incl upper, lower, digit &
							special.
						</AlertDescription>
					</Alert>
				</form>
				<DialogFooter>
					<Button
						variant="outline"
						type="button"
						onClick={closeModal}
						disabled={submitting}>
						Cancel
					</Button>
					<Button
						type="submit"
						form="password-change-form"
						disabled={!isValid || submitting}>
						{submitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving…
							</>
						) : (
							"Change Password"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { PasswordChangeModal as AdminPasswordChange };
export default PasswordChangeModal;
