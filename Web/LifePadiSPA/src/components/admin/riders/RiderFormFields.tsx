import { type ChangeEvent } from "react";
import {
	type UseFormRegister,
	type FieldErrors,
	type UseFormWatch,
} from "react-hook-form";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const idTypes = ["National ID", "Voters Card", "Drivers Licence"];

export type RiderSection = "personal" | "account" | "identity";
export type RiderFormMode = "create" | "edit";

interface RiderFormFieldsProps {
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	watch: UseFormWatch<any>;
	mode?: RiderFormMode;
	fileError?: string | false;
	onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	sections?: RiderSection[];
	previewUrl?: string;
	existingIdentityUrl?: string;
	clearFile?: () => void;
}

const fieldErr = (e: any): string | undefined =>
	(e?.message as string | undefined) ?? undefined;

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
	"ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
);

const PersonalSection = ({
	register,
	errors,
}: Pick<RiderFormFieldsProps, "register" | "errors">) => (
	<>
		<div className="grid gap-2">
			<Label htmlFor="FirstName">First Name</Label>
			<Input
				id="FirstName"
				{...register("FirstName", { required: "First name required" })}
			/>
			{errors.FirstName && (
				<p className="text-sm text-destructive">{fieldErr(errors.FirstName)}</p>
			)}
		</div>
		<div className="grid gap-2">
			<Label htmlFor="LastName">Last Name</Label>
			<Input
				id="LastName"
				{...register("LastName", { required: "Last name required" })}
			/>
			{errors.LastName && (
				<p className="text-sm text-destructive">{fieldErr(errors.LastName)}</p>
			)}
		</div>
		<div className="grid gap-2">
			<Label htmlFor="PhoneNumber">Phone Number</Label>
			<Input
				id="PhoneNumber"
				{...register("PhoneNumber", { required: "Phone number required" })}
			/>
			{errors.PhoneNumber && (
				<p className="text-sm text-destructive">
					{fieldErr(errors.PhoneNumber)}
				</p>
			)}
		</div>
		<div className="grid gap-2">
			<Label htmlFor="EmergencyContact">Emergency Contact</Label>
			<Input
				id="EmergencyContact"
				{...register("EmergencyContact", {
					required: "Emergency contact required",
				})}
			/>
			{errors.EmergencyContact && (
				<p className="text-sm text-destructive">
					{fieldErr(errors.EmergencyContact)}
				</p>
			)}
		</div>
		<div className="grid gap-2 sm:col-span-2">
			<Label htmlFor="ContactAddress">Contact Address</Label>
			<Textarea
				id="ContactAddress"
				rows={2}
				{...register("ContactAddress", {
					required: "Contact address required",
				})}
			/>
			{errors.ContactAddress && (
				<p className="text-sm text-destructive">
					{fieldErr(errors.ContactAddress)}
				</p>
			)}
		</div>
		<div className="grid gap-2 sm:col-span-2">
			<Label htmlFor="Email">Email Address</Label>
			<Input
				id="Email"
				type="email"
				{...register("Email", {
					required: "Email required",
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Invalid email",
					},
				})}
			/>
			{errors.Email && (
				<p className="text-sm text-destructive">{fieldErr(errors.Email)}</p>
			)}
		</div>
	</>
);

const AccountSection = ({
	register,
	errors,
	watch,
	mode,
}: Pick<RiderFormFieldsProps, "register" | "errors" | "watch" | "mode">) => {
	if (mode !== "create") return null;
	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="Password">Password</Label>
				<Input
					id="Password"
					type="password"
					{...register("Password", {
						required: "Password required",
						minLength: { value: 4, message: "Min 4 chars" },
					})}
				/>
				{errors.Password && (
					<p className="text-sm text-destructive">
						{fieldErr(errors.Password)}
					</p>
				)}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="ConfirmPassword">Confirm Password</Label>
				<Input
					id="ConfirmPassword"
					type="password"
					{...register("ConfirmPassword", {
						required: "Confirm password",
						validate: (v: string) =>
							v === watch("Password") || "Passwords do not match",
					})}
				/>
				{errors.ConfirmPassword && (
					<p className="text-sm text-destructive">
						{fieldErr(errors.ConfirmPassword)}
					</p>
				)}
			</div>
		</>
	);
};

const IdentitySection = ({
	register,
	errors,
	fileError,
	onFileChange,
	previewUrl,
	existingIdentityUrl,
	clearFile,
}: RiderFormFieldsProps) => (
	<>
		<div className="grid gap-2">
			<Label htmlFor="IdentityType">Identity Type</Label>
			<select
				id="IdentityType"
				className={selectClasses}
				defaultValue=""
				{...register("IdentityType", { required: "Identity type required" })}>
				<option value="" disabled>
					Select identity type
				</option>
				{idTypes.map((t) => (
					<option key={t} value={t}>
						{t}
					</option>
				))}
			</select>
			{errors.IdentityType && (
				<p className="text-sm text-destructive">
					{fieldErr(errors.IdentityType)}
				</p>
			)}
		</div>
		<div className="grid gap-2">
			<Label htmlFor="IdentityNumber">Identity Number</Label>
			<Input
				id="IdentityNumber"
				{...register("IdentityNumber", {
					required: "Identity number required",
					minLength: { value: 6, message: "Too short" },
				})}
			/>
			{errors.IdentityNumber && (
				<p className="text-sm text-destructive">
					{fieldErr(errors.IdentityNumber)}
				</p>
			)}
		</div>
		<div className="grid gap-2 sm:col-span-2">
			<Label htmlFor="IdentityImg">Identity Image</Label>
			<div className="flex flex-wrap gap-3 items-start">
				<div>
					<Input
						id="IdentityImg"
						type="file"
						accept="image/*"
						onChange={onFileChange}
					/>
					{fileError && (
						<Alert variant="destructive" className="mt-2">
							<AlertDescription>{fileError}</AlertDescription>
						</Alert>
					)}
					<p className="text-xs text-muted-foreground mt-1">Max 200KB image.</p>
				</div>
				{(previewUrl || existingIdentityUrl) && (
					<div className="relative">
						<img
							src={previewUrl || existingIdentityUrl}
							alt="Identity preview"
							className="w-36 h-36 object-cover rounded-md shadow"
						/>
						{previewUrl && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute top-1 right-1 h-6 w-6 bg-black/40 text-white hover:bg-black/60"
								onClick={clearFile}>
								<X className="h-3 w-3" />
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	</>
);

const RiderFormFields = (props: RiderFormFieldsProps) => {
	const sections = props.sections || ["personal", "account", "identity"];
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{sections.includes("personal") && <PersonalSection {...props} />}
			{sections.includes("account") && <AccountSection {...props} />}
			{sections.includes("identity") && <IdentitySection {...props} />}
		</div>
	);
};

export default RiderFormFields;
