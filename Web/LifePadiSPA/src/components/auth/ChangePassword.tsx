import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/shared/PasswordInput";
import baseUrl from "@/api/baseUrl";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";

type PostResponse = { data?: any; status?: number; error?: any };

const schema = z
	.object({
		NewPassword: z.string().min(8, "Password must be at least 8 characters"),
		ConfirmPassword: z.string().min(1, "Please confirm your new password"),
	})
	.refine((data) => data.NewPassword === data.ConfirmPassword, {
		path: ["ConfirmPassword"],
		message: "Passwords do not match",
	});

type Values = z.infer<typeof schema>;

const ChangePassword = () => {
	const { forgotPassword, setForgotPassword, regData, setLogin } = useAuth();
	const post = usePost();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<Values>({
		resolver: zodResolver(schema),
		mode: "onTouched",
		defaultValues: { NewPassword: "", ConfirmPassword: "" },
	});

	const onSubmit = async (data: Values) => {
		setIsLoading(true);
		try {
			const fd = new FormData();
			fd.append("NewPassword", data.NewPassword);
			const id = (regData as { Id?: string | number })?.Id;
			const response = (await post(
				`${baseUrl}auth/password-reset/${id}`,
				fd,
				"",
			)) as PostResponse;
			if (response?.status === 200) {
				toast.success("Password changed successfully");
				setForgotPassword(false);
				setLogin(true);
			} else {
				toast.error("Could not change password");
			}
		} catch (err) {
			console.error(err);
			toast.error("Could not change password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={forgotPassword} onOpenChange={setForgotPassword}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Change password</DialogTitle>
					<DialogDescription>
						Choose a new password for your account.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="NewPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<PasswordInput
											autoComplete="new-password"
											placeholder="At least 8 characters"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ConfirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<PasswordInput
											autoComplete="new-password"
											placeholder="Repeat new password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating…
								</>
							) : (
								"Change password"
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ChangePassword;
