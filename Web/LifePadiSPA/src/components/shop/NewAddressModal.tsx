import axios from "axios";
import { MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import baseUrl from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddressFromPlaceId from "@/hooks/useAddressFromPlaceId";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import usePost from "@/hooks/usePost";

interface NewAddressModalProps {
	open: boolean;
	handleClose: (action: { type: string }) => void;
}

interface FormValues {
	Address: string;
}

interface Suggestion {
	description: string;
	placeId: string;
}

type PostResponse = { data?: any; status?: number; error?: any };

const NewAddressModal = ({ open, handleClose }: NewAddressModalProps) => {
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}address/create`;
	const queryClient = useQueryClient();
	const { state: cartState } = useCart();
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [address, setAddress] = useState<any>(null);
	const getAddress = useAddressFromPlaceId();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ mode: "all" });

	const create = async (data: any) => {
		const formData = new FormData();
		Object.entries(data).forEach(([k, v]) => {
			if (v !== undefined && v !== null) formData.append(k, String(v));
		});
		const response = (await post(url, formData, auth?.accessToken)) as PostResponse;
		if (response.error) {
			toast.error("Error adding address");
			throw new Error("create-address-failed");
		}
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] });
			toast.success("Address added successfully");
			reset();
			setAddress(null);
			handleClose({ type: "edit" });
		},
	});

	const onSubmit = (form: FormValues) => {
		const data = { ...address, Name: form.Address, UserId: auth?.Id };
		mutate(data);
	};

	const fetchSuggestions = async (value: string) => {
		if (value.length > 2) {
			try {
				const response = await axios.get(`${baseUrl}googlemaps/autocomplete`, {
					params: { input: value },
				});
				setSuggestions(response.data ?? []);
			} catch (err) {
				console.error("Error fetching suggestions", err);
			}
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = async (suggestion: Suggestion) => {
		setValue("Address", suggestion.description, { shouldValidate: true });
		const result = (await getAddress(
			`${baseUrl}googlemaps/addressfromplaceid?placeid=${suggestion.placeId}`,
			auth?.accessToken,
		)) as PostResponse;
		setAddress(result.data?.Address);
		setSuggestions([]);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				if (!next) handleClose({ type: "edit" });
			}}
		>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Delivery address</DialogTitle>
				</DialogHeader>

				{cartState.error && (
					<p className="text-sm text-destructive">{String(cartState.error)}</p>
				)}

				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<Label htmlFor="address">Address</Label>
						<div className="relative">
							<MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="address"
								placeholder="What is your address?"
								className="pl-9"
								{...register("Address", { required: true })}
								onChange={(e) => fetchSuggestions(e.target.value)}
							/>
						</div>
						{errors.Address && (
							<p className="text-sm text-destructive">
								Delivery address is required
							</p>
						)}
					</div>

					{suggestions.length > 0 && (
						<ul className="max-h-48 space-y-1 overflow-y-auto rounded-md border bg-popover p-1">
							{suggestions.map((s, i) => (
								<li key={i}>
									<button
										type="button"
										onClick={() => handleSuggestionClick(s)}
										className="w-full rounded px-2 py-2 text-left text-sm hover:bg-accent"
									>
										{s.description}
									</button>
								</li>
							))}
						</ul>
					)}

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Proceed
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default NewAddressModal;
