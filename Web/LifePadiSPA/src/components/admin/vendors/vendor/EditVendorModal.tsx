import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

import useUpdate from "../../../../hooks/useUpdate";
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

interface EditVendorModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	vendorId: number | string | null;
}

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm capitalize ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);

const EditVendorModal = ({ open, handleClose, vendorId }: EditVendorModalProps) => {
	const update = useUpdate();
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}vendor`;
	const queryClient = useQueryClient();
	const [states, setStates] = useState<string[]>([]);
	const [services, setServices] = useState<ServiceLite[]>([]);
	const [lgas, setLGAs] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const updateVendor = async (data: any) => {
		const fd = new FormData();
		Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
		await update(`${url}/update/${vendorId}`, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: updateVendor,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendorcategory"] });
			toast.success("Vendor Updated");
			handleClose({ type: "edit" });
			reset();
		},
		onError: () => {
			toast.error("Update Failed");
		},
	});

	const getLGAs = useCallback(
		async (state: string) => {
			try {
				const result = await fetch(`https://nga-states-lga.onrender.com/?state=${state}`);
				if (!String(result.data).includes("Error")) setLGAs(result.data);
			} catch {
				/* ignore */
			}
		},
		[fetch],
	);

	const getVendor = useCallback(async () => {
		try {
			const result = await fetch(`${url}/get/${vendorId}`, auth.accessToken);
			if (result.data?.State) getLGAs(result.data.State);
			Object.entries(result.data).forEach(([k, v]) => setValue(k, v as never));
		} catch {
			/* ignore */
		}
	}, [vendorId, fetch, url, auth, setValue, getLGAs]);

	useEffect(() => {
		const init = async () => {
			try {
				const s = await fetch("https://nga-states-lga.onrender.com/fetch");
				setStates(s.data);
				const sv = await fetch(`${baseUrl}service/allLite`);
				setServices(sv.data);
			} catch {
				/* ignore */
			}
		};
		init();
	}, [fetch]);

	useEffect(() => {
		if (vendorId) getVendor();
	}, [vendorId, getVendor]);

	const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		getLGAs(e.target.value);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				handleClose({ type: "edit" });
				reset();
			}}
		>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Update Vendor</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-6">
					<div>
						<h4 className="font-semibold mb-3">Business Info</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="space-y-1">
								<Label>Business Name</Label>
								<Input {...register("Name", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Phone</Label>
								<Input {...register("PhoneNumber", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Tag</Label>
								<Input {...register("Tag", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Opening Hours</Label>
								<Input type="time" {...register("OpeningHours", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Closing Hours</Label>
								<Input type="time" {...register("ClosingHours", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Service</Label>
								<select
									className={selectClasses}
									{...register("ServiceId", { required: "Service is required" })}
								>
									<option value="">Select Service</option>
									{services.map((s) => (
										<option key={s.Id} value={s.Id}>
											{s.Name}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Address Info</h4>
						<Separator className="mb-4" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="space-y-1 sm:col-span-2">
								<Label>Contact Address</Label>
								<Textarea rows={3} {...register("ContactAddress", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>State</Label>
								<select
									className={selectClasses}
									{...register("State", { required: "State is required" })}
									onChange={handleStateChange}
								>
									<option value="">Select State</option>
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
									{...register("LocalGovt", { required: "LGA is required" })}
								>
									<option value="">Select LGA</option>
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
								<Input type="number" step="any" {...register("Latitude", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Longitude</Label>
								<Input type="number" step="any" {...register("Longitude", { required: true })} />
							</div>
							<div className="space-y-1">
								<Label>Postal Code</Label>
								<Input {...register("PostalCode")} />
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Identity</h4>
						<Separator className="mb-4" />
						<div className="space-y-1">
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
								<p className="text-xs text-destructive">{errors.Email.message as string}</p>
							)}
						</div>
					</div>

					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || !isValid}>
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 h-4 w-4" />
							)}
							Update
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditVendorModal;
