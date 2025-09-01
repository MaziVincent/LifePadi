import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	TextField,
	InputAdornment,
	Button,
	Alert,
	Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Reusable password change modal leveraging AuthController password-reset (PUT) with Email or PhoneNumber + NewPassword.
import { useForm } from "react-hook-form";
import { useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import baseUrl from "../../../api/baseUrl";
import toast, { Toaster } from "react-hot-toast";

const PasswordChangeModal = ({
	open,
	onClose,
	handleClose, // legacy prop name
	email,
	phone,
	title = "Change Password",
}) => {
	const update = useUpdate();
	const [show, setShow] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const form = useForm({ mode: "onChange" });
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = form;
	const newPassword = watch("NewPassword");
	const apiEndpoint = `${baseUrl}auth/password-reset`; // PUT expects ForgotPasswordDTO fields

	const closeModal = () => {
		(onClose || handleClose)?.();
	};

	const onSubmit = async (data) => {
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
			const res = await update(apiEndpoint, fd, "");
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
						// Aggregate model state errors if present
						const firstKey = Object.keys(errPayload.errors)[0];
						const firstErr = errPayload.errors[firstKey];
						if (Array.isArray(firstErr)) message = firstErr[0];
					}
				}
				toast.error(message);
				setErrorMsg(message);
			}
		} catch (e) {
			const msg = e?.message || "Error changing password";
			toast.error(msg);
			setErrorMsg(msg);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onClose={closeModal} maxWidth="xs" fullWidth>
			<Toaster />
			<DialogTitle>
				{typeof title === "string" ? title : "Change Password"}
			</DialogTitle>
			<DialogContent dividers sx={{ pt: 1 }}>
				<form id="password-change-form" onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={1}>
						{email && (
							<Alert severity="info">Resetting password for: {email}</Alert>
						)}
						{!email && phone && (
							<Alert severity="info">
								Resetting password for phone: {phone}
							</Alert>
						)}
						{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
						<TextField
							label="New Password"
							type={show ? "text" : "password"}
							margin="normal"
							fullWidth
							{...register("NewPassword", {
								required: "Password required",
								minLength: { value: 6, message: "Min 6 chars" },
							})}
							error={!!errors.NewPassword}
							helperText={errors.NewPassword?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShow((s) => !s)}
											edge="end"
											size="small">
											{show ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							label="Confirm Password"
							type={show ? "text" : "password"}
							margin="normal"
							fullWidth
							{...register("ConfirmPassword", {
								required: "Confirm password",
								validate: (v) => v === newPassword || "Passwords must match",
							})}
							error={!!errors.ConfirmPassword}
							helperText={errors.ConfirmPassword?.message}
						/>
						<Alert severity="info" sx={{ mt: 1 }}>
							Password must meet complexity: 6+ chars incl upper, lower, digit &
							special.
						</Alert>
					</Stack>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={submitting}>
					Cancel
				</Button>
				<Button
					type="submit"
					form="password-change-form"
					variant="contained"
					disabled={!isValid || submitting}>
					{submitting ? "Saving..." : "Change Password"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

// Backwards compatibility export name
export { PasswordChangeModal as AdminPasswordChange };
export default PasswordChangeModal;
