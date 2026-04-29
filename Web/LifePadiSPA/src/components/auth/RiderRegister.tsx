import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import {
	Loader2,
	Bike,
	ArrowLeft,
	ArrowRight,
	CheckCircle2,
	Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/shared/PasswordInput";
import baseUrl from "@/api/baseUrl";

interface FormState {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
	identityType: string;
	identityNumber: string;
	contactAddress: string;
	emergencyContact: string;
}

const initial: FormState = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	password: "",
	confirmPassword: "",
	identityType: "NIN",
	identityNumber: "",
	contactAddress: "",
	emergencyContact: "",
};

const STEPS = ["Profile", "Identity", "Review"] as const;

const RiderRegister = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [data, setData] = useState<FormState>(initial);
	const [identityImg, setIdentityImg] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);

	const set = (k: keyof FormState, v: string) =>
		setData((d) => ({ ...d, [k]: v }));

	const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f) return;
		if (f.size > 5 * 1024 * 1024) {
			toast.error("Image must be smaller than 5MB");
			return;
		}
		setIdentityImg(f);
		const reader = new FileReader();
		reader.onload = () => setPreview(reader.result as string);
		reader.readAsDataURL(f);
	};

	const validateStep = (): string | null => {
		if (step === 0) {
			if (data.firstName.trim().length < 2) return "First name is required";
			if (data.lastName.trim().length < 2) return "Last name is required";
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
			if (!data.identityType) return "Pick an ID type";
			if (data.identityNumber.trim().length < 4)
				return "Enter your ID number";
			if (!identityImg) return "Upload a photo of your ID";
			if (!data.contactAddress) return "Contact address is required";
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
			fd.append("FirstName", data.firstName);
			fd.append("LastName", data.lastName);
			fd.append("Email", data.email);
			fd.append("PhoneNumber", data.phoneNumber);
			fd.append("Password", data.password);
			fd.append("IdentityType", data.identityType);
			fd.append("IdentityNumber", data.identityNumber);
			fd.append("ContactAddress", data.contactAddress);
			fd.append("EmergencyContact", data.emergencyContact);
			if (identityImg) fd.append("IdentityImg", identityImg);
			await axios.post(`${baseUrl}rider/create`, fd, {
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
				<h1 className="text-2xl font-semibold">Application received</h1>
				<p className="text-muted-foreground">
					We're reviewing your details. You'll get an email the moment our
					team approves your account.
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl p-4 md:p-8">
			<div className="mb-6 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
					<Bike className="h-5 w-5" />
				</div>
				<div>
					<h1 className="text-xl font-semibold">Ride with LifePadi</h1>
					<p className="text-sm text-muted-foreground">
						Earn flexibly delivering for vendors near you.
					</p>
				</div>
			</div>

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
					<div className="grid gap-3 md:grid-cols-2">
						<Field label="First name">
							<Input
								value={data.firstName}
								onChange={(e) => set("firstName", e.target.value)}
							/>
						</Field>
						<Field label="Last name">
							<Input
								value={data.lastName}
								onChange={(e) => set("lastName", e.target.value)}
							/>
						</Field>
						<Field label="Email">
							<Input
								type="email"
								value={data.email}
								onChange={(e) => set("email", e.target.value)}
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
				)}

				{step === 1 && (
					<div className="grid gap-3 md:grid-cols-2">
						<Field label="ID type">
							<select
								className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
								value={data.identityType}
								onChange={(e) => set("identityType", e.target.value)}>
								<option value="NIN">NIN</option>
								<option value="DriversLicense">Driver's licence</option>
								<option value="VotersCard">Voter's card</option>
								<option value="Passport">International passport</option>
							</select>
						</Field>
						<Field label="ID number">
							<Input
								value={data.identityNumber}
								onChange={(e) => set("identityNumber", e.target.value)}
							/>
						</Field>
						<Field label="ID photo" full>
							<label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-6 text-sm text-muted-foreground hover:bg-muted/40">
								<Upload className="h-5 w-5" />
								<span>{identityImg ? identityImg.name : "Upload a clear photo"}</span>
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={onFile}
								/>
							</label>
							{preview && (
								<img
									src={preview}
									alt="ID preview"
									className="mt-2 max-h-40 rounded-md border object-cover"
								/>
							)}
						</Field>
						<Field label="Home address" full>
							<Input
								value={data.contactAddress}
								onChange={(e) => set("contactAddress", e.target.value)}
							/>
						</Field>
						<Field label="Emergency contact" full>
							<Input
								value={data.emergencyContact}
								onChange={(e) => set("emergencyContact", e.target.value)}
								placeholder="Name & phone"
							/>
						</Field>
					</div>
				)}

				{step === 2 && (
					<div className="space-y-3 text-sm">
						<h2 className="text-base font-semibold">Review your details</h2>
						<KV k="Name" v={`${data.firstName} ${data.lastName}`} />
						<KV k="Email" v={data.email} />
						<KV k="Phone" v={data.phoneNumber} />
						<KV k="ID" v={`${data.identityType} • ${data.identityNumber}`} />
						<KV k="Address" v={data.contactAddress} />
						<KV k="Emergency" v={data.emergencyContact} />
						<p className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
							We'll verify your ID and notify you by email once your account is
							approved.
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
				Already a rider?{" "}
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

export default RiderRegister;
