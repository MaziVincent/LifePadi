import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/shared/PasswordInput";
import baseUrl from "@/api/baseUrl";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";

type PostResponse = {
	data?: any;
	status?: number;
	error?: any;
};

const registerSchema = z.object({
	FirstName: z.string().min(1, "First name is required"),
	LastName: z.string().min(1, "Last name is required"),
	PhoneNumber: z
		.string()
		.regex(
			/^0\d{10}$/,
			"Enter a valid Nigerian phone number (e.g. 08012345678)",
		),
	Email: z.string().email("Enter a valid email address"),
	Password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterValues = z.infer<typeof registerSchema>;

const Register = () => {
	const {
		reg,
		setRegister,
		setLogin,
		setVerify,
		setRegData,
		setVerificationInfo,
	} = useAuth();
	const post = usePost();
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState("");

	const form = useForm<RegisterValues>({
		resolver: zodResolver(registerSchema),
		mode: "onTouched",
		defaultValues: {
			FirstName: "",
			LastName: "",
			PhoneNumber: "",
			Email: "",
			Password: "",
		},
	});

	const sendOTP = async (phoneNumber: string) => {
		const formatted = `234${phoneNumber.slice(1)}`;
		const fd = new FormData();
		fd.append("phoneNumber", formatted);
		const response = (await post(
			`${baseUrl}customer/send-otp`,
			fd,
			" ",
		)) as PostResponse;
		if (response?.status === 200 || response?.data?.status === "200") {
			setVerificationInfo(response.data);
			setVerify(true);
			form.reset();
		} else {
			setServerError("Error sending OTP. Please try again.");
		}
	};

	const onSubmit = async (data: RegisterValues) => {
		setIsLoading(true);
		setServerError("");
		try {
			const response = (await post(
				`${baseUrl}customer/check-user-exists`,
				{ Email: data.Email, PhoneNumber: data.PhoneNumber },
				"",
			)) as PostResponse;
			if (response?.error?.includes?.("Phone number already exists")) {
				form.setError("PhoneNumber", { message: response.error });
				return;
			}
			if (response?.error?.includes?.("Email already exists")) {
				form.setError("Email", { message: "Email already exists" });
				return;
			}
			if (response?.status === 200 || response?.data === true) {
				setRegData(data as unknown as Record<string, unknown>);
				await sendOTP(data.PhoneNumber);
			}
		} catch (err) {
			console.error(err);
			setServerError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={reg} onOpenChange={setRegister}>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Create your account</DialogTitle>
					<DialogDescription>
						Sign up in seconds to start ordering with LifePadi.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="FirstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input
												placeholder="Jane"
												autoComplete="given-name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="LastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input
												placeholder="Doe"
												autoComplete="family-name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="PhoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone number</FormLabel>
									<FormControl>
										<Input
											type="tel"
											placeholder="08012345678"
											autoComplete="tel"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="Email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="name@email.com"
											autoComplete="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="Password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput
											placeholder="At least 8 characters"
											autoComplete="new-password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{serverError && (
							<p className="text-sm text-destructive">{serverError}</p>
						)}

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
									account…
								</>
							) : (
								"Sign up"
							)}
						</Button>

						<p className="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<button
								type="button"
								onClick={() => {
									setRegister(false);
									setLogin(true);
								}}
								className="font-medium text-primary hover:underline">
								Sign in
							</button>
						</p>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default Register;
