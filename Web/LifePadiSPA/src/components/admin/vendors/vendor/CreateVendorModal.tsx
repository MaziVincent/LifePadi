import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import usePost from "../../../../hooks/usePost";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ServiceLite {
	Id: number | string;
	Name: string;
}

interface CreateVendorModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	vendorCategory: number | string;
}

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 capitalize",
);

const CreateVendorModal = ({
	open,
	handleClose,
	vendorCategory,
}: CreateVendorModalProps) => {
	const post = usePost();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}vendor/create`;
	const queryClient = useQueryClient();
	const [states, setStates] = useState<string[]>([]);
	const [lgas, setLGAs] = useState<string[]>([]);

	const { data: services } = useQuery<ServiceLite[]>({
		queryKey: ["services"],
		queryFn: async () => {
			const res = await fetch(`${baseUrl}service/allLite`, auth.accessToken);
			return res.data as ServiceLite[];
		},
		staleTime: 20000,
	});

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const create = async (payload: Record<string, any>) => {
		const vendor = { ...payload, VendorCategoryId: vendorCategory };
		const fd = new FormData();
		Object.entries(vendor).forEach(([k, v]) => fd.append(k, v as any));
		await post(url, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendorcategory"] });
			toast.success("Vendor Created");
			handleClose({ type: "open" });
			reset();
		},
		onError: () => {
			toast.error("Vendor failed to create");
		},
	});

	useEffect(() => {
		const getStates = async () => {
			try {
				const result = await fetch("https://nga-states-lga.onrender.com/fetch");
				setStates(result.data as string[]);
			} catch {
				/* ignore */
			}
		};
		getStates();
	}, [fetch]);

	const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		try {
			const result = await fetch(
				`https://nga-states-lga.onrender.com/?state=${e.target.value}`,
			);
			setLGAs(result.data as string[]);
		} catch {
			/* ignore */
		}
	};

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Vendor</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-6">
					<div>
						<h4 className="font-semibold mb-3">Business Info</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="space-y-1">
								<Label>Business Name</Label>
								<Input {...register("Name", { required: true })} />
								{errors.Name && (
									<p className="text-xs text-destructive">Required</p>
								)}
							</div>
							<div className="space-y-1">
								<Label>Phone Number</Label>
								<Input {...register("PhoneNumber", { required: true })} />
								{errors.PhoneNumber && (
									<p className="text-xs text-destructive">Required</p>
								)}
							</div>
							<div className="space-y-1">
								<Label>Tag</Label>
								<Input {...register("Tag", { required: true })} />
								{errors.Tag && (
									<p className="text-xs text-destructive">Required</p>
								)}
							</div>
							<div className="space-y-1">
								<Label>Opening Hours</Label>
								<Input
									type="time"
									{...register("OpeningHours", { required: true })}
								/>
							</div>
							<div className="space-y-1">
								<Label>Closing Hours</Label>
								<Input
									type="time"
									{...register("ClosingHours", { required: true })}
								/>
							</div>
							<div className="space-y-1">
								<Label>Service Type</Label>
								<select
									className={selectClasses}
									defaultValue=""
									{...register("ServiceId", {
										required: "Service is required",
									})}>
									<option value="" disabled>
										Select Service
									</option>
									{services?.map((s) => (
										<option key={s.Id} value={s.Id}>
											{s.Name}
										</option>
									))}
								</select>
								{errors.ServiceId && (
									<p className="text-xs text-destructive">
										{errors.ServiceId.message as string}
									</p>
								)}
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Address Info</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="space-y-1 sm:col-span-2">
								<Label>Contact Address</Label>
								<Textarea
									rows={3}
									{...register("ContactAddress", { required: true })}
								/>
							</div>
							<div className="space-y-1">
								<Label>State</Label>
								<select
									className={selectClasses}
									defaultValue=""
									{...register("State", { required: "State is required" })}
									onChange={handleStateChange}>
									<option value="" disabled>
										Select State
									</option>
									{states.map((s) => (
										<option key={s} value={s}>
											{s}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-1">
								<Label>Local Govt</Label>
								<select
									className={selectClasses}
									defaultValue=""
									{...register("LocalGovt", { required: "LGA is required" })}>
									<option value="" disabled>
										Select LGA
									</option>
									{lgas.map((l) => (
										<option key={l} value={l}>
											{l}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-1">
								<Label>City</Label>
								<Input {...register("City", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Town</Label>
								<Input {...register("Town", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Latitude</Label>
								<Input
									type="number"
									step="any"
									{...register("Latitude", { required: true })}
								/>
							</div>
							<div className="space-y-1">
								<Label>Longitude</Label>
								<Input
									type="number"
									step="any"
									{...register("Longitude", { required: true })}
								/>
							</div>
							<div className="space-y-1">
								<Label>Postal Code (optional)</Label>
								<Input {...register("PostalCode")} />
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Account</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="space-y-1 sm:col-span-2">
								<Label>Email</Label>
								<Input
									type="email"
									{...register("Email", {
										required: "Email is required",
										pattern: {
											value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
											message: "Invalid email",
										},
									})}
								/>
								{errors.Email && (
									<p className="text-xs text-destructive">
										{errors.Email.message as string}
									</p>
								)}
							</div>
							<div className="space-y-1">
								<Label>Password</Label>
								<Input
									type="password"
									{...register("Password", {
										required: "Password is required",
										minLength: { value: 4, message: "Min 4 chars" },
									})}
								/>
								{errors.Password && (
									<p className="text-xs text-destructive">
										{errors.Password.message as string}
									</p>
								)}
							</div>
							<div className="space-y-1">
								<Label>Confirm Password</Label>
								<Input
									type="password"
									{...register("ConfirmPassword", {
										required: "Confirm password is required",
										validate: (v: string) =>
											v === watch("Password") || "Passwords do not match",
									})}
								/>
								{errors.ConfirmPassword && (
									<p className="text-xs text-destructive">
										{errors.ConfirmPassword.message as string}
									</p>
								)}
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || !isValid}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Plus className="mr-2 h-4 w-4" />
							)}
							Create Vendor
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateVendorModal;
