import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/shared/OTPInput";
import baseUrl from "@/api/baseUrl";
import useAuth from "@/hooks/useAuth";
import usePost from "@/hooks/usePost";

type PostResponse = { data?: any; status?: number; error?: any };

interface VerifyOTPProps {
	otpLength?: number;
}

const VerifyOTP = ({ otpLength = 4 }: VerifyOTPProps) => {
	const post = usePost();
	const {
		verifyOTP,
		setVerifyOTP,
		regData,
		verificationInfo,
		setVerificationInfo,
		setForgotPassword,
	} = useAuth();

	const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
	const [codeError, setCodeError] = useState("");
	const [attempts, setAttempts] = useState(3);
	const [resend, setResend] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setResend(true), 60000);
		return () => clearTimeout(t);
	}, []);

	const handleSubmit = async () => {
		setIsLoading(true);
		setCodeError("");
		const code = otp.join("");
		try {
			const response = (await post(
				`${baseUrl}customer/verify-otp?pinId=${verificationInfo?.pinId}&pin=${code}`,
			)) as PostResponse;
			if (response?.data?.verified === false) {
				setAttempts(response.data?.attemptsRemaining ?? 0);
				setCodeError("The code you entered is invalid.");
				return;
			}
			if (response?.data?.verified === "Expired ") {
				setResend(true);
				setCodeError("This code has expired. Request a new one.");
				return;
			}
			if (response?.data?.verified === true) {
				setForgotPassword(true);
				setVerifyOTP(false);
				setOtp(Array(otpLength).fill(""));
			}
		} catch (err) {
			console.error(err);
			toast.error("Could not verify the code.");
		} finally {
			setIsLoading(false);
		}
	};

	const resendOtp = async () => {
		const phone = (regData as { PhoneNumber?: string })?.PhoneNumber ?? "";
		if (!phone) return;
		setCodeError("");
		const formatted = `234${phone.slice(1)}`;
		try {
			const fd = new FormData();
			fd.append("phoneNumber", formatted);
			const response = (await post(
				`${baseUrl}customer/send-otp`,
				fd,
				" ",
			)) as PostResponse;
			if (response?.status === 200 || response?.data?.status === "200") {
				setVerificationInfo(response.data);
				toast.success("New code sent.");
			} else {
				setCodeError("Error sending OTP.");
			}
		} catch (err) {
			console.error(err);
			setCodeError("Error sending OTP.");
		}
	};

	return (
		<Dialog open={verifyOTP} onOpenChange={setVerifyOTP}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Verify your phone</DialogTitle>
					<DialogDescription>
						Enter the {otpLength}-digit code sent to your phone number.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-2">
					<OTPInput
						length={otpLength}
						value={otp}
						onChange={setOtp}
						disabled={isLoading}
					/>

					{codeError && (
						<p className="text-center text-sm text-destructive">{codeError}</p>
					)}
					{attempts < 3 && (
						<p className="text-center text-sm text-destructive">
							{attempts} attempt{attempts === 1 ? "" : "s"} remaining
						</p>
					)}
					{resend && (
						<p className="text-center text-sm text-muted-foreground">
							Didn&apos;t get the code?{" "}
							<button
								type="button"
								onClick={resendOtp}
								className="font-medium text-primary hover:underline">
								Resend
							</button>
						</p>
					)}

					<Button
						onClick={handleSubmit}
						disabled={isLoading || otp.join("").length !== otpLength}
						className="w-full">
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying…
							</>
						) : (
							"Verify code"
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default VerifyOTP;
