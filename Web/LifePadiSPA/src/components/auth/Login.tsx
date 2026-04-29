import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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
import { AuthLayout } from "@/components/layout/AuthLayout";
import baseUrl from "@/api/baseUrl";
import useAuth from "@/hooks/useAuth";

type LoginAuth = {
	auth: unknown;
	setAuth: (data: unknown) => void;
	persist: boolean;
	setPersist: (next: boolean | ((prev: boolean) => boolean)) => void;
};

type LoginResponse = {
	Data: {
		Role: "Customer" | "Admin" | "Rider" | "Vendor";
		refreshToken: string;
	};
};

const loginSchema = z.object({
	Email: z.string().email("Enter a valid email address"),
	Password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth() as unknown as LoginAuth;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		mode: "onTouched",
		defaultValues: { Email: "", Password: "" },
	});

	useEffect(() => {
		localStorage.setItem("persist", String(persist));
	}, [persist]);

	const onSubmit = async (data: LoginValues) => {
		setIsLoading(true);
		try {
			const response = await axios.post<LoginResponse>(
				`${baseUrl}auth/login`,
				data,
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				},
			);

			setAuth(response.data?.Data);
			localStorage.setItem(
				"refreshToken",
				JSON.stringify(response.data?.Data.refreshToken),
			);
			toast.success("Logged in successfully");

			const role = response.data?.Data.Role;
			setTimeout(() => {
				switch (role) {
					case "Customer":
						navigate("/");
						break;
					case "Admin":
						navigate("/admin");
						break;
					case "Rider":
						navigate("/rider");
						break;
					case "Vendor":
						navigate("/vendor");
						break;
					default:
						navigate("/unauthorized");
				}
			}, 1200);
		} catch (err) {
			const axErr = err as AxiosError;
			switch (axErr?.response?.status) {
				case 400:
					toast.error("Invalid email or password");
					break;
				case 401:
					toast.error("Unauthorized");
					break;
				default:
					toast.error("Login failed. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout
			title="Welcome back"
			subtitle="Sign in to your LifePadi account."
			footer={
				<p className="text-center">
					Don&apos;t have an account?{" "}
					<Link to="/" className="font-medium text-primary hover:underline">
						Get started
					</Link>
				</p>
			}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="Email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										autoComplete="email"
										placeholder="name@company.com"
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
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											autoComplete="current-password"
											placeholder="••••••••"
											{...field}
										/>
										<button
											type="button"
											onClick={() => setShowPassword((p) => !p)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
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
							className="text-sm font-medium text-primary hover:underline">
							Forgot password?
						</Link>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing in…
							</>
						) : (
							"Sign in"
						)}
					</Button>
				</form>
			</Form>
		</AuthLayout>
	);
};

export default Login;
