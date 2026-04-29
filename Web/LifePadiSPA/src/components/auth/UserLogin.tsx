import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
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
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/shared/PasswordInput";
import baseUrl from "@/api/baseUrl";
import useAuth from "@/hooks/useAuth";

const schema = z.object({
	Input: z.string().min(1, "Email or phone number is required"),
	Password: z.string().min(1, "Password is required"),
});

type Values = z.infer<typeof schema>;

const UserLogin = () => {
	const { setAuth, persist, setPersist, login, setLogin, setRegister } =
		useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<Values>({
		resolver: zodResolver(schema),
		mode: "onTouched",
		defaultValues: { Input: "", Password: "" },
	});

	useEffect(() => {
		localStorage.setItem("persist", String(persist));
	}, [persist]);

	const buildPayload = (data: Values) => {
		const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRe = /^0\d{10}$/;
		if (emailRe.test(data.Input))
			return { Email: data.Input, Password: data.Password };
		if (phoneRe.test(data.Input))
			return { PhoneNumber: data.Input, Password: data.Password };
		return null;
	};

	const onSubmit = async (data: Values) => {
		setIsLoading(true);
		const payload = buildPayload(data);
		if (!payload) {
			form.setError("Input", {
				message: "Enter a valid email or phone number",
			});
			setIsLoading(false);
			return;
		}
		try {
			const response = await axios.post(`${baseUrl}auth/login`, payload, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			setAuth(response.data);
			localStorage.setItem(
				"refreshToken",
				JSON.stringify(response.data?.refreshToken),
			);
			toast.success("Logged in successfully");
			const role = response.data?.Role;
			setTimeout(() => {
				setLogin(false);
				if (role === "Customer") {
					// stay on current page; modal already closed
					return;
				}
				if (role === "Vendor") navigate("/vendor");
				else if (role === "Rider") navigate("/rider");
				else if (role === "Admin") navigate("/admin");
				else navigate("/unauthorized");
			}, 600);
		} catch (err) {
			const ax = err as AxiosError<{ message?: string }>;
			const apiMsg = (ax?.response?.data as { message?: string } | undefined)
				?.message;
			switch (ax?.response?.status) {
				case 400:
				case 404:
					toast.error(apiMsg || "Invalid email or password");
					break;
				case 401:
					toast.error(apiMsg || "Unauthorized");
					break;
				default:
					toast.error(apiMsg || "Login failed. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={login} onOpenChange={setLogin}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Sign in</DialogTitle>
					<DialogDescription>
						Welcome back! Sign in with your email or phone number.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="Input"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email or phone</FormLabel>
									<FormControl>
										<Input
											placeholder="08012345678 or you@email.com"
											autoComplete="username"
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
											autoComplete="current-password"
											placeholder="••••••••"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-between">
							<label className="flex cursor-pointer items-center gap-2 text-sm">
								<Checkbox
									checked={persist}
									onCheckedChange={(v) => setPersist(Boolean(v))}
								/>
								Remember me
							</label>
							<Link
								to="/forgotPassword"
								onClick={() => setLogin(false)}
								className="text-sm font-medium text-primary hover:underline">
								Forgot password?
							</Link>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…
								</>
							) : (
								"Sign in"
							)}
						</Button>

						<p className="text-center text-sm text-muted-foreground">
							New to LifePadi?{" "}
							<button
								type="button"
								onClick={() => {
									setLogin(false);
									setRegister(true);
								}}
								className="font-medium text-primary hover:underline">
								Create an account
							</button>
						</p>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UserLogin;
