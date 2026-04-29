import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import baseUrl from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";

interface AddAddressModalProps {
	open: boolean;
	handleClose: (action: { type: string }) => void;
}

interface AddressFormValues {
	Name: string;
	Town: string;
	City: string;
	State: string;
	LocalGovt: string;
	PostalCode?: string;
}

const AddAddressModal = ({ open, handleClose }: AddAddressModalProps) => {
	const [states, setStates] = useState<string[]>([]);
	const [lga, setLGAs] = useState<string[]>([]);
	const [selectedState, setSelectedState] = useState<string>("");
	const [selectedLga, setSelectedLga] = useState<string>("");
	const fetcher = useFetch();
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}address/create`;
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting, isValid },
	} = useForm<AddressFormValues>({ mode: "all" });

	const create = async (data: AddressFormValues & { UserId?: string }) => {
		const formData = new FormData();
		Object.entries(data).forEach(([k, v]) => {
			if (v !== undefined && v !== null) formData.append(k, String(v));
		});
		await post(url, formData, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] });
			toast.success("Address added successfully");
			reset();
			setSelectedState("");
			setSelectedLga("");
			handleClose({ type: "edit" });
		},
	});

	const onSubmit = (address: AddressFormValues) => {
		mutate({ ...address, UserId: auth?.Id as string | undefined });
	};

	useEffect(() => {
		(async () => {
			const result = (await fetcher(
				"https://nga-states-lga.onrender.com/fetch",
			)) as {
				data?: string[];
			};
			setStates(result.data ?? []);
		})();
	}, [fetcher]);

	const handleStateChange = async (state: string) => {
		setSelectedState(state);
		setValue("State", state, { shouldValidate: true });
		const result = (await fetcher(
			`https://nga-states-lga.onrender.com/?state=${state}`,
		)) as { data?: string[] };
		setLGAs(result.data ?? []);
	};

	const handleLgaChange = (lgaValue: string) => {
		setSelectedLga(lgaValue);
		setValue("LocalGovt", lgaValue, { shouldValidate: true });
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				if (!next) handleClose({ type: "edit" });
			}}>
			<DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add address</DialogTitle>
					<DialogDescription>
						Enter your delivery address information.
					</DialogDescription>
				</DialogHeader>

				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<Label htmlFor="address">Address</Label>
						<Textarea
							id="address"
							rows={2}
							placeholder="Enter house number and street name"
							{...register("Name", { required: true })}
						/>
						{errors.Name && (
							<p className="text-sm text-destructive">Address is required</p>
						)}
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="town">Town</Label>
							<Input
								id="town"
								placeholder="Type your town"
								{...register("Town", { required: true })}
							/>
							{errors.Town && (
								<p className="text-sm text-destructive">Town is required</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								placeholder="Enter your city"
								{...register("City", { required: true })}
							/>
							{errors.City && (
								<p className="text-sm text-destructive">City is required</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>State</Label>
							<input
								type="hidden"
								{...register("State", { required: "State is required" })}
							/>
							<Select value={selectedState} onValueChange={handleStateChange}>
								<SelectTrigger>
									<SelectValue placeholder="Select state" />
								</SelectTrigger>
								<SelectContent>
									{states.map((s) => (
										<SelectItem key={s} value={s}>
											{s}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.State && (
								<p className="text-sm text-destructive">
									{errors.State.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Local Govt. Area</Label>
							<input
								type="hidden"
								{...register("LocalGovt", {
									required: "Local govt is required",
								})}
							/>
							<Select
								value={selectedLga}
								onValueChange={handleLgaChange}
								disabled={!selectedState}>
								<SelectTrigger>
									<SelectValue placeholder="Select LGA" />
								</SelectTrigger>
								<SelectContent>
									{lga.map((l) => (
										<SelectItem key={l} value={l}>
											{l}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.LocalGovt && (
								<p className="text-sm text-destructive">
									{errors.LocalGovt.message}
								</p>
							)}
						</div>

						<div className="space-y-2 sm:col-span-2">
							<Label htmlFor="code">Postal code (optional)</Label>
							<Input
								id="code"
								placeholder="Type postal code"
								{...register("PostalCode")}
							/>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting || !isValid}>
						{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddAddressModal;
