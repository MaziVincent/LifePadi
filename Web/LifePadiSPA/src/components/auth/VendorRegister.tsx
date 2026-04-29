import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, Store, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/shared/PasswordInput";
import baseUrl from "@/api/baseUrl";

interface ServiceItem {
	id: number;
	name: string;
}
interface CategoryItem {
	id: number;
	name: string;
}

interface FormState {
	// step 1 — account
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
	// step 2 — business
	name: string;
	tag: string;
	timeTakesToPurchase: string;
	openingHours: string;
	closingHours: string;
	serviceId: string;
	vendorCategoryId: string;
	// step 3 — location
	contactAddress: string;
	town: string;
	city: string;
	localGovt: string;
	state: string;
	postalCode: string;
}

const initial: FormState = {
	email: "",
	phoneNumber: "",
	password: "",
	confirmPassword: "",
	name: "",
	tag: "",
	timeTakesToPurchase: "30 - 60 mins",
	openingHours: "09:00",
	closingHours: "21:00",
	serviceId: "",
	vendorCategoryId: "",
	contactAddress: "",
	town: "",
	city: "",
	localGovt: "",
	state: "",
	postalCode: "",
};

const STEPS = ["Account", "Business", "Location", "Review"] as const;

const VendorRegister = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [data, setData] = useState<FormState>(initial);
	const [services, setServices] = useState<ServiceItem[]>([]);
	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const [s, c] = await Promise.all([
					axios.get(`${baseUrl}service/allLite`).catch(() => ({ data: [] })),
					axios.get(`${baseUrl}vendorcategory/all?pageNumber=1&pageSize=100`).catch(() => ({
						data: { result: [] },
					})),
				]);
				const sd = Array.isArray(s.data) ? s.data : s.data?.result ?? [];
				const cd = Array.isArray(c.data) ? c.data : c.data?.result ?? [];
				setServices(
					sd.map((x: { Id?: number; id?: number; Name?: string; name?: string }) => ({
						id: x.Id ?? x.id ?? 0,
						name: x.Name ?? x.name ?? "",
					})),
				);
				setCategories(
					cd.map((x: { Id?: number; id?: number; Name?: string; name?: string }) => ({
						id: x.Id ?? x.id ?? 0,
						name: x.Name ?? x.name ?? "",
					})),
				);
			} catch {
				/* non-fatal — user can still type free-form ids */
			}
		})();
	}, []);

	const set = (k: keyof FormState, v: string) =>
		setData((d) => ({ ...d, [k]: v }));

	const validateStep = (): string | null => {
		if (step === 0) {
			const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const phoneRe = /^0\d{10}$/;
			if (!emailRe.test(data.email)) return "Enter a valid email";
			if (!phoneRe.test(data.phoneNumber))
				return "Enter a valid Nigerian phone (e.g. 08012345678)";
			if (data.password.length < 8) return "Password must be at least 8 characters";
			if (data.password !== data.confirmPassword)
				return "Passwords do not match";
		}
		if (step === 1) {
			if (data.name.trim().length < 2) return "Business name is required";
			if (data.tag.trim().length < 2) return "Tag is required";
			if (!data.serviceId) return "Pick a service";
			if (!data.vendorCategoryId) return "Pick a category";
		}
		if (step === 2) {
			if (data.contactAddress.trim().length < 4)
				return "Contact address is required";
			if (!data.town || !data.city || !data.state)
				return "Town, city and state are required";
		}
		return null;
	};

	const next = () => {
		const err = validateStep();
		if (err) {
			toast.error(err);
			return;
		}
		setStep((s) => Math.min(s + 1, STEPS.length - 1));
	};
	const prev = () => setStep((s) => Math.max(s - 1, 0));

	const submit = async () => {
		const err = validateStep();
		if (err) {
			toast.error(err);
			return;
		}
		setSubmitting(true);
		try {
			const fd = new FormData();
			fd.append("Email", data.email);
			fd.append("PhoneNumber", data.phoneNumber);
			fd.append("Password", data.password);
			fd.append("Name", data.name);
			fd.append("Tag", data.tag);
			fd.append("TimeTakesToPurchase", data.timeTakesToPurchase);
			fd.append("OpeningHours", data.openingHours);
			fd.append("ClosingHours", data.closingHours);
			fd.append("ServiceId", data.serviceId);
			fd.append("VendorCategoryId", data.vendorCategoryId);
			fd.append("ContactAddress", data.contactAddress);
			fd.append("Town", data.town);
			fd.append("City", data.city);
			fd.append("LocalGovt", data.localGovt);
			fd.append("State", data.state);
			fd.append("PostalCode", data.postalCode);
			await axios.post(`${baseUrl}vendor/create`, fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setDone(true);
			toast.success("Application submitted");
			setTimeout(() => navigate("/pending"), 1200);
		} catch (e) {
			const ax = e as AxiosError<{ message?: string } | string>;
			const msg =
				typeof ax.response?.data === "string"
					? ax.response.data
					: (ax.response?.data as { message?: string })?.message;
			toast.error(msg || "Could not submit your application");
		} finally {
			setSubmitting(false);
		}
	};

	if (done) {
		return (
			<div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-3 p-6 text-center">
				<CheckCircle2 className="h-16 w-16 text-primary" />
				<h1 className="text-2xl font-semibold">Thanks for applying!</h1>
				<p className="text-muted-foreground">
					Your vendor application is now being reviewed by our team. We'll
					email you once it's approved.
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl p-4 md:p-8">
			<div className="mb-6 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
					<Store className="h-5 w-5" />
				</div>
				<div>
					<h1 className="text-xl font-semibold">Become a LifePadi vendor</h1>
					<p className="text-sm text-muted-foreground">
						Tell us about your business — takes about 2 minutes.
					</p>
				</div>
			</div>

			{/* stepper */}
			<ol className="mb-6 flex items-center gap-2 text-xs">
				{STEPS.map((label, i) => (
					<li
						key={label}
						className={`flex flex-1 items-center gap-2 rounded-full px-3 py-1.5 ${
							i === step
								? "bg-primary text-primary-foreground"
								: i < step
								? "bg-primary/15 text-primary"
								: "bg-muted text-muted-foreground"
						}`}>
						<span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]">
							{i < step ? "✓" : i + 1}
						</span>
						<span className="truncate">{label}</span>
					</li>
				))}
			</ol>

			<div className="space-y-4 rounded-lg border bg-card p-5">
				{step === 0 && (
					<>
						<div className="grid gap-3 md:grid-cols-2">
							<Field label="Email">
								<Input
									type="email"
									value={data.email}
									onChange={(e) => set("email", e.target.value)}
									placeholder="you@business.com"
								/>
							</Field>
							<Field label="Phone number">
								<Input
									value={data.phoneNumber}
									onChange={(e) => set("phoneNumber", e.target.value)}
									placeholder="08012345678"
								/>
							</Field>
							<Field label="Password">
								<PasswordInput
									value={data.password}
									onChange={(e) => set("password", e.target.value)}
								/>
							</Field>
							<Field label="Confirm password">
								<PasswordInput
									value={data.confirmPassword}
									onChange={(e) => set("confirmPassword", e.target.value)}
								/>
							</Field>
						</div>
					</>
				)}

				{step === 1 && (
					<div className="grid gap-3 md:grid-cols-2">
						<Field label="Business name">
							<Input
								value={data.name}
								onChange={(e) => set("name", e.target.value)}
								placeholder="e.g. Mama Cass Kitchen"
							/>
						</Field>
						<Field label="Tag / handle">
							<Input
								value={data.tag}
								onChange={(e) => set("tag", e.target.value)}
								placeholder="e.g. mamacass"
							/>
						</Field>
						<Field label="Service">
							<select
								className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
								value={data.serviceId}
								onChange={(e) => set("serviceId", e.target.value)}>
								<option value="">Select service</option>
								{services.map((s) => (
									<option key={s.id} value={s.id}>
										{s.name}
									</option>
								))}
							</select>
						</Field>
						<Field label="Category">
							<select
								className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
								value={data.vendorCategoryId}
								onChange={(e) => set("vendorCategoryId", e.target.value)}>
								<option value="">Select category</option>
								{categories.map((c) => (
									<option key={c.id} value={c.id}>
										{c.name}
									</option>
								))}
							</select>
						</Field>
						<Field label="Avg. preparation time">
							<Input
								value={data.timeTakesToPurchase}
								onChange={(e) => set("timeTakesToPurchase", e.target.value)}
							/>
						</Field>
						<div className="grid grid-cols-2 gap-2">
							<Field label="Opens">
								<Input
									type="time"
									value={data.openingHours}
									onChange={(e) => set("openingHours", e.target.value)}
								/>
							</Field>
							<Field label="Closes">
								<Input
									type="time"
									value={data.closingHours}
									onChange={(e) => set("closingHours", e.target.value)}
								/>
							</Field>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className="grid gap-3 md:grid-cols-2">
						<Field label="Contact address" full>
							<Input
								value={data.contactAddress}
								onChange={(e) => set("contactAddress", e.target.value)}
								placeholder="Street + landmark"
							/>
						</Field>
						<Field label="Town">
							<Input
								value={data.town}
								onChange={(e) => set("town", e.target.value)}
							/>
						</Field>
						<Field label="City">
							<Input
								value={data.city}
								onChange={(e) => set("city", e.target.value)}
							/>
						</Field>
						<Field label="LGA">
							<Input
								value={data.localGovt}
								onChange={(e) => set("localGovt", e.target.value)}
							/>
						</Field>
						<Field label="State">
							<Input
								value={data.state}
								onChange={(e) => set("state", e.target.value)}
							/>
						</Field>
						<Field label="Postal code">
							<Input
								value={data.postalCode}
								onChange={(e) => set("postalCode", e.target.value)}
							/>
						</Field>
					</div>
				)}

				{step === 3 && (
					<div className="space-y-3 text-sm">
						<h2 className="text-base font-semibold">Review your details</h2>
						<KV k="Business" v={data.name} />
						<KV k="Tag" v={data.tag} />
						<KV k="Email" v={data.email} />
						<KV k="Phone" v={data.phoneNumber} />
						<KV k="Hours" v={`${data.openingHours} – ${data.closingHours}`} />
						<KV
							k="Address"
							v={`${data.contactAddress}, ${data.town}, ${data.city}, ${data.state}`}
						/>
						<p className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
							After submitting, an admin will review your application. You'll
							be able to sign in once approved.
						</p>
					</div>
				)}

				<div className="flex items-center justify-between pt-3">
					<Button
						variant="ghost"
						onClick={prev}
						disabled={step === 0 || submitting}>
						<ArrowLeft className="mr-1 h-4 w-4" /> Back
					</Button>
					{step < STEPS.length - 1 ? (
						<Button onClick={next}>
							Continue <ArrowRight className="ml-1 h-4 w-4" />
						</Button>
					) : (
						<Button onClick={submit} disabled={submitting}>
							{submitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
								</>
							) : (
								"Submit application"
							)}
						</Button>
					)}
				</div>
			</div>

			<p className="mt-4 text-center text-xs text-muted-foreground">
				Already have an account?{" "}
				<Link to="/login" className="font-medium text-primary hover:underline">
					Sign in
				</Link>
			</p>
		</div>
	);
};

const Field = ({
	label,
	children,
	full,
}: {
	label: string;
	children: React.ReactNode;
	full?: boolean;
}) => (
	<div className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
		<Label className="text-xs">{label}</Label>
		{children}
	</div>
);

const KV = ({ k, v }: { k: string; v: string }) => (
	<div className="flex justify-between gap-2 border-b border-border/50 pb-1.5">
		<span className="text-muted-foreground">{k}</span>
		<span className="text-right font-medium">{v || "—"}</span>
	</div>
);

export default VendorRegister;
