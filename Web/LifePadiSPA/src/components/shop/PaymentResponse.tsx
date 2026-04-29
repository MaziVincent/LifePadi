import { useEffect, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import Lottie from "lottie-react";
import { Loader2, ArrowRight, RotateCcw } from "lucide-react";

import baseUrl from "../../api/baseUrl";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import successAnimation from "../../assets/lottie/Animation - 1725438178504.json";
import errAnimation from "../../assets/lottie/Animation - 1725438360134.json";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Status = "loading" | "success" | "error";

const lottieStyle: React.CSSProperties = {
	width: "100%",
	height: "100%",
};

const PaymentResponse = () => {
	const location = useLocation();
	const [status, setStatus] = useState<Status>("loading");
	const [message, setMessage] = useState("");

	const fetcher = useFetch();
	const { auth } = useAuth() as unknown as {
		auth: { accessToken?: string } | null;
	};

	const queryParams = new URLSearchParams(location.search);
	const reference = queryParams.get("reference");
	const url = `${baseUrl}transaction/paystack-confirmPayment?reference=${reference}`;

	const verifyTransaction = useCallback(async () => {
		if (!reference) {
			setStatus("error");
			setMessage("Missing payment reference.");
			return;
		}
		try {
			const res = (await fetcher(url, auth?.accessToken)) as { data?: any };

			const ok =
				res.data?.status === true ||
				res.data?.data?.status === "success" ||
				res.data?.message === "Verification successful";

			if (ok) {
				setStatus("success");
				setMessage(res.data?.message ?? "Your payment was confirmed.");
			} else {
				setStatus("error");
				setMessage(res.data?.message ?? "Payment verification failed.");
			}
		} catch (err) {
			const e = err as { response?: { data?: { message?: string } } };
			setMessage(e?.response?.data?.message ?? "Payment verification failed.");
			setStatus("error");
			console.error(err);
		}
	}, [reference, url, fetcher, auth?.accessToken]);

	useEffect(() => {
		verifyTransaction();
	}, [verifyTransaction]);

	return (
		<section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4 py-16">
			<Card className="w-full max-w-md border-border/60 shadow-lg">
				<CardContent className="flex flex-col items-center gap-4 p-8 text-center">
					{status === "loading" && (
						<>
							<div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10">
								<Loader2 className="h-7 w-7 animate-spin text-primary" />
							</div>
							<h2 className="text-xl font-semibold">Verifying payment…</h2>
							<p className="text-sm text-muted-foreground">
								Please wait while we confirm your transaction.
							</p>
						</>
					)}

					{status === "success" && (
						<>
							<div className="h-32 w-32">
								<Lottie
									animationData={successAnimation}
									loop={false}
									autoPlay
									style={lottieStyle}
								/>
							</div>
							<h2 className="text-xl font-semibold text-foreground">
								Payment successful
							</h2>
							{message && (
								<p className="text-sm text-muted-foreground">{message}</p>
							)}
							<Button asChild className="mt-2 w-full gap-2">
								<Link to="/user">
									Continue to dashboard
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						</>
					)}

					{status === "error" && (
						<>
							<div className="h-32 w-32">
								<Lottie
									animationData={errAnimation}
									loop={false}
									autoPlay
									style={lottieStyle}
								/>
							</div>
							<h2 className="text-xl font-semibold text-destructive">
								Payment failed
							</h2>
							<p className="text-sm text-muted-foreground">
								{message || "We couldn't verify your transaction."}
							</p>
							<div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
								<Button
									variant="outline"
									onClick={() => {
										setStatus("loading");
										verifyTransaction();
									}}
									className="flex-1 gap-1.5">
									<RotateCcw className="h-4 w-4" />
									Try again
								</Button>
								<Button asChild className="flex-1">
									<Link to="/user">Go to dashboard</Link>
								</Button>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</section>
	);
};

export default PaymentResponse;
