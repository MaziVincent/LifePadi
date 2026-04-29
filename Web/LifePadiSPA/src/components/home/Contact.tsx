import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
	Sparkles,
	Send,
	Loader2,
	Trash2,
	ChevronDown,
} from "lucide-react";

import background1 from "@/assets/images/background1.webp";
import baseUrl from "@/api/baseUrl";
import usePost from "@/hooks/usePost";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/shared/FadeIn";
import MarqueeComp from "@/components/home/MarqueeComp";

interface ContactFormValues {
	email: string;
	Subject: string;
	Message: string;
}

interface DeleteFormValues {
	Email: string;
	Reason: string;
}

const CONTACT_INFO = [
	{
		icon: Mail,
		title: "How can we help you?",
		body: "Send us an email and we will respond within 24 hours.",
		value: "Info@lifepadi.com",
		href: "mailto:Info@lifepadi.com",
	},
	{
		icon: Phone,
		title: "Call us directly",
		body: "Our customer support team is available daily.",
		value: "0902 762 8553",
		href: "tel:+2349027628553",
	},
	{
		icon: MapPin,
		title: "Stop by our office",
		body: "We would love to host you for a coffee.",
		value: "No. 150 Agbani Road, Igbariam, Enugu State.",
		href: "https://maps.google.com/?q=150+Agbani+Road+Enugu",
	},
];

const Contact = () => {
	const post = usePost();
	const url = `${baseUrl}customersupport/send`;
	const [delAcc, setDelAcc] = useState(false);
	const [loading, setLoading] = useState(false);
	const [delLoading, setDelLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [successDel, setSuccessDel] = useState("");
	const [delError, setDelError] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormValues>();

	const {
		register: registerDel,
		handleSubmit: handleSubmitDel,
		reset: resetDel,
		formState: { errors: errorsDel },
	} = useForm<DeleteFormValues>();

	const sendMessage = async (data: ContactFormValues) => {
		setSuccess("");
		setError("");
		setLoading(true);
		const message = {
			Subject: `Contact Form Message From ${data.email}`,
			Message: `From: ${data.email}\nSubject: ${data.Subject}\n${data.Message}`,
		};
		const response = await post(url, message);
		if (response?.status === 200) {
			setSuccess("Message sent successfully — we'll be in touch shortly.");
			reset();
		} else {
			setError("Something went wrong. Please try again.");
		}
		setLoading(false);
	};

	const sendDeleteRequest = async (data: DeleteFormValues) => {
		setSuccessDel("");
		setDelError("");
		setDelLoading(true);
		const message = {
			Subject: `Account Deletion Request From ${data.Email}`,
			Message: `From: ${data.Email}\nReason: ${data.Reason}`,
		};
		const response = await post(url, message);
		if (response?.status === 200) {
			setSuccessDel("Account deletion request received.");
			resetDel();
		} else {
			setDelError("Something went wrong. Please try again.");
		}
		setDelLoading(false);
	};

	return (
		<main className="bg-background text-foreground">
			{/* HERO */}
			<section className="relative overflow-hidden">
				<div
					className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 dark:opacity-15"
					style={{ backgroundImage: `url(${background1})` }}
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" />
				<div className="mx-auto max-w-5xl px-4 pb-16 pt-24 text-center lg:px-8 lg:pt-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						<Badge
							variant="secondary"
							className="mb-6 gap-2 rounded-full px-4 py-1.5">
							<Sparkles className="h-3.5 w-3.5" />
							Get in touch
						</Badge>
						<h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
							We would love to{" "}
							<span className="text-primary">hear from you</span>
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
							Questions, feedback, partnership ideas? Drop us a line — our team
							replies fast.
						</p>
					</motion.div>
				</div>
			</section>

			{/* CONTACT INFO */}
			<section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
				<div className="grid gap-6 md:grid-cols-3">
					{CONTACT_INFO.map((c, i) => (
						<FadeIn key={c.title} delay={i * 0.1}>
							<Card className="h-full border-border/60 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
								<CardContent className="flex h-full flex-col p-6">
									<div className="mb-4 inline-flex w-fit items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
										<c.icon className="h-6 w-6" />
									</div>
									<h3 className="text-lg font-semibold">{c.title}</h3>
									<p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
									<a
										href={c.href}
										target="_blank"
										rel="noreferrer"
										className="mt-4 text-sm font-medium text-primary hover:underline">
										{c.value}
									</a>
								</CardContent>
							</Card>
						</FadeIn>
					))}
				</div>
			</section>

			{/* CONTACT FORM */}
			<section className="border-y bg-card/40">
				<div className="mx-auto max-w-3xl px-4 py-20 lg:px-8 lg:py-28">
					<FadeIn className="mb-10 text-center">
						<Badge variant="outline" className="mb-3 rounded-full">
							Send a message
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Contact us
						</h2>
						<p className="mt-4 text-muted-foreground">
							Got a technical issue, feedback or business enquiry? Let us know.
						</p>
					</FadeIn>

					<FadeIn>
						<Card className="border-border/60 shadow-lg">
							<CardContent className="p-6 sm:p-8">
								<form
									className="space-y-5"
									onSubmit={handleSubmit(sendMessage)}>
									<div className="space-y-2">
										<Label htmlFor="email">Your email</Label>
										<Input
											id="email"
											type="email"
											placeholder="name@email.com"
											{...register("email", { required: true })}
										/>
										{errors.email && (
											<p className="text-xs text-destructive">
												Email is required
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="subject">Subject</Label>
										<Input
											id="subject"
											type="text"
											placeholder="Let us know how we can help you"
											{...register("Subject", { required: true })}
										/>
										{errors.Subject && (
											<p className="text-xs text-destructive">
												Subject is required
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">Your message</Label>
										<Textarea
											id="message"
											rows={6}
											placeholder="Leave a comment..."
											{...register("Message", { required: true })}
										/>
										{errors.Message && (
											<p className="text-xs text-destructive">
												Message is required
											</p>
										)}
									</div>

									<Button type="submit" className="gap-2" disabled={loading}>
										{loading ? (
											<>
												<Loader2 className="h-4 w-4 animate-spin" />
												Sending...
											</>
										) : (
											<>
												<Send className="h-4 w-4" />
												Send message
											</>
										)}
									</Button>

									{success && <p className="text-sm text-primary">{success}</p>}
									{error && <p className="text-sm text-destructive">{error}</p>}
								</form>
							</CardContent>
						</Card>
					</FadeIn>
				</div>
			</section>

			{/* DELETE ACCOUNT */}
			<section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
				<FadeIn>
					<Card
						id="DeleteAccount"
						className="border-dashed border-border/70 bg-muted/30">
						<CardContent className="p-6 sm:p-8">
							<button
								type="button"
								onClick={() => setDelAcc((v) => !v)}
								className="flex w-full items-center justify-between text-left">
								<div className="flex items-center gap-3">
									<span className="rounded-full bg-destructive/10 p-2 text-destructive">
										<Trash2 className="h-5 w-5" />
									</span>
									<div>
										<h3 className="font-semibold">Request account deletion</h3>
										<p className="text-xs text-muted-foreground">
											We'll process your request within 7 days.
										</p>
									</div>
								</div>
								<ChevronDown
									className={`h-5 w-5 text-muted-foreground transition ${
										delAcc ? "rotate-180" : ""
									}`}
								/>
							</button>

							{delAcc && (
								<form
									onSubmit={handleSubmitDel(sendDeleteRequest)}
									className="mt-6 space-y-5 border-t pt-6">
									<div className="space-y-2">
										<Label htmlFor="del-email">Your email</Label>
										<Input
											id="del-email"
											type="email"
											placeholder="name@email.com"
											{...registerDel("Email", { required: true })}
										/>
										{errorsDel.Email && (
											<p className="text-xs text-destructive">
												Email is required
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="del-reason">Reason</Label>
										<Textarea
											id="del-reason"
											rows={5}
											placeholder="Tell us why you want to delete your account..."
											{...registerDel("Reason", { required: true })}
										/>
										{errorsDel.Reason && (
											<p className="text-xs text-destructive">
												Reason is required
											</p>
										)}
									</div>
									<Button
										type="submit"
										variant="destructive"
										className="gap-2"
										disabled={delLoading}>
										{delLoading ? (
											<>
												<Loader2 className="h-4 w-4 animate-spin" />
												Submitting...
											</>
										) : (
											<>
												<Trash2 className="h-4 w-4" />
												Delete my account
											</>
										)}
									</Button>
									{successDel && (
										<p className="text-sm text-primary">{successDel}</p>
									)}
									{delError && (
										<p className="text-sm text-destructive">{delError}</p>
									)}
								</form>
							)}
						</CardContent>
					</Card>
				</FadeIn>
			</section>

			{/* MARQUEE */}
			<section className="bg-primary py-12 text-primary-foreground">
				<MarqueeComp />
			</section>
		</main>
	);
};

export default Contact;
