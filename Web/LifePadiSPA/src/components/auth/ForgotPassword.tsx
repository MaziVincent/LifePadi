import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
import { AuthLayout } from "@/components/layout/AuthLayout";
import VerifyOTP from "./VerifyOTP";
import ChangePassword from "./ChangePassword";
import baseUrl from "@/api/baseUrl";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";
import useFetch from "@/hooks/useFetch";

type PostResponse = { data?: any; status?: number; error?: any };

const schema = z.object({
	PhoneNumber: z
		.string()
		.regex(
			/^0\d{10}$/,
			"Enter a valid Nigerian phone number (e.g. 08012345678)",
		),
});

type Values = z.infer<typeof schema>;

const ForgotPassword = () => {
	const post = usePost();
	const fetcher = useFetch();
	const navigate = useNavigate();
	const { setVerifyOTP, setRegData, setVerificationInfo } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<Values>({
		resolver: zodResolver(schema),
		mode: "onTouched",
		defaultValues: { PhoneNumber: "" },
	});

	const onSubmit = async (data: Values) => {
		setIsLoading(true);
		try {
			const fd = new FormData();
			fd.append("phoneNumber", data.PhoneNumber);
			const response = (await post(
				`${baseUrl}customer/password-reset`,
				fd,
				"",
			)) as PostResponse;

			if (response?.error) {
				form.setError("PhoneNumber", { message: response.error });
				return;
			}
			if (response?.status === 200 || response?.data?.status === "200") {
				setVerificationInfo(response.data);
				const res = await fetcher(
					`${baseUrl}customer/getByPhone/${data.PhoneNumber}`,
				);
				setRegData(res?.data ?? {});
				setVerifyOTP(true);
				form.reset();
			} else {
				toast.error("Error sending OTP. Please try again.");
			}
		} catch (err) {
			console.error(err);
			toast.error("Error sending OTP. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<AuthLayout
				title="Reset your password"
				subtitle="Enter your phone number to receive a verification code."
				footer={
					<p className="text-center">
						Remembered your password?{" "}
						<Link
							to="/login"
							className="font-medium text-primary hover:underline">
							Sign in
						</Link>
					</p>
				}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
									code…
								</>
							) : (
								"Continue"
							)}
						</Button>

						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => navigate("/")}>
							Cancel
						</Button>
					</form>
				</Form>
			</AuthLayout>
			<VerifyOTP />
			<ChangePassword />
		</>
	);
};

export default ForgotPassword;
