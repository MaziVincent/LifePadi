import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Loader2, MapPin } from "lucide-react";

import baseUrl from "../../api/baseUrl";
import usePost from "../../hooks/usePost";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useDeliveryFee } from "../../hooks/useDeliveryFee";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";
import useAddressFromPlaceId from "../../hooks/useAddressFromPlaceId";
import ChooseAddressModal from "./ChooseAddressModal";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type PackageKind = "send" | "recieve";

interface PackageDialogProps {
	kind: PackageKind;
	open: boolean;
	handleClose: (action: any) => void;
}

interface AddressLike {
	Id?: number | string;
	Name?: string;
	Latitude?: number;
	Longitude?: number;
	[k: string]: any;
}

interface State {
	showPickUpAddresses: boolean;
	newPickUpAddress: boolean;
	showDeliveryAddresses: boolean;
	newDeliveryAddress: boolean;
	pickUpAddress: AddressLike | null;
	deliveryAddress: AddressLike | null;
	distance: number | null;
}

type Action =
	| {
			type:
				| "showPickUpAddresses"
				| "newPickUpAddress"
				| "showDeliveryAddresses"
				| "newDeliveryAddress";
	  }
	| { type: "pickUpAddress" | "deliveryAddress"; payload: AddressLike }
	| { type: "distance"; payload: number };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "showPickUpAddresses":
			return {
				...state,
				showPickUpAddresses: !state.showPickUpAddresses,
				newPickUpAddress: false,
			};
		case "newPickUpAddress":
			return {
				...state,
				newPickUpAddress: !state.newPickUpAddress,
				showPickUpAddresses: false,
			};
		case "showDeliveryAddresses":
			return {
				...state,
				showDeliveryAddresses: !state.showDeliveryAddresses,
				newDeliveryAddress: false,
			};
		case "newDeliveryAddress":
			return {
				...state,
				newDeliveryAddress: !state.newDeliveryAddress,
				showDeliveryAddresses: false,
			};
		case "pickUpAddress":
			return { ...state, pickUpAddress: action.payload };
		case "deliveryAddress":
			return { ...state, deliveryAddress: action.payload };
		case "distance":
			return { ...state, distance: action.payload };
		default:
			throw new Error();
	}
};

const ITEM_OPTIONS = [
	"Documents",
	"Food Stuff",
	"Money",
	"Clothing",
	"Electronics",
	"Phone",
	"I prefer not to say",
];

interface Suggestion {
	description: string;
	placeId: string;
}

const PackageDialog = ({ kind, open, handleClose }: PackageDialogProps) => {
	const title = kind === "send" ? "Send Package" : "Receive Package";

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({ mode: "onTouched" });

	const [state, dispatch] = useReducer(reducer, {
		showPickUpAddresses: false,
		newPickUpAddress: false,
		showDeliveryAddresses: false,
		newDeliveryAddress: false,
		pickUpAddress: null,
		deliveryAddress: null,
		distance: null,
	});

	const { auth, location } = useAuth() as { auth: any; location: any };
	const post = usePost();
	const getAddress = useAddressFromPlaceId();
	const { calculateDistance } = useDistanceCalculator();
	const { state: cartState, dispatch: cartDispatch } = useCart();

	const [selectedChips, setSelectedChips] = useState<string[]>([]);
	const [senderSuggestions, setSenderSuggestions] = useState<Suggestion[]>([]);
	const [recieverSuggestions, setRecieverSuggestions] = useState<Suggestion[]>(
		[],
	);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const url = `${baseUrl}logistics/create`;
	const { deliveryFee, error: feeError } = useDeliveryFee(
		Math.ceil(state.distance ?? 0),
	) as {
		deliveryFee: number;
		loading: boolean;
		error: any;
	};

	const handleChipClick = (option: string) => {
		setSelectedChips((prev) =>
			prev.includes(option)
				? prev.filter((c) => c !== option)
				: [...prev, option],
		);
	};

	const fetchSuggestions = async (value: string, field: string) => {
		if (value.length > 2) {
			try {
				const r = await axios.get(`${baseUrl}googlemaps/autocomplete`, {
					params: { input: value },
				});
				if (field === "SenderAddress") setSenderSuggestions(r.data);
				else setRecieverSuggestions(r.data);
				setFocusedField(field);
			} catch (e) {
				console.log("Error Fetching Suggestions ", e);
			}
		} else {
			setSenderSuggestions([]);
			setRecieverSuggestions([]);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		fetchSuggestions(e.target.value, field);
	};

	const handleSuggestionClick = async (suggestion: Suggestion) => {
		if (focusedField === "SenderAddress") {
			setValue("SenderAddress", suggestion.description);
			const result = await getAddress(
				`${baseUrl}googlemaps/addressfromplaceid?placeid=${suggestion.placeId}`,
				auth.accessToken,
			);
			dispatch({ type: "pickUpAddress", payload: result.data?.Address });
		} else if (focusedField === "RecieverAddress") {
			setValue("ReceiverAddress", suggestion.description);
			const result = await getAddress(
				`${baseUrl}googlemaps/addressfromplaceid?placeid=${suggestion.placeId}`,
				auth.accessToken,
			);
			dispatch({ type: "deliveryAddress", payload: result.data?.Address });
		}
		setSenderSuggestions([]);
		setRecieverSuggestions([]);
	};

	const handleCurrentInfo = () => {
		setValue("SenderName", `${auth.FirstName} ${auth.LastName}`);
		setValue("SenderPhone", `${auth.PhoneNumber}`);
	};

	const createAddress = async (address: AddressLike) => {
		address.UserId = auth.Id;
		const fd = new FormData();
		Object.entries(address).forEach(([k, v]) => fd.append(k, v as any));
		const res: any = await post(
			`${baseUrl}address/create`,
			fd,
			auth.accessToken,
		);
		if (res.error && res.status === 409) {
			cartDispatch({
				type: "error",
				payload: "Address already exists. Choose from existing addresses.",
			});
			return null;
		}
		if (res.error) {
			cartDispatch({ type: "error", payload: "Error creating address" });
			return null;
		}
		return res.data;
	};

	const createLogistics = async (logistics: Record<string, any>) => {
		const res: any = await post(url, logistics, auth.accessToken);
		if (res.error) {
			cartDispatch({ type: "error", payload: "Error creating logistics data" });
			return null;
		}
		return res.data;
	};

	const handleSend = async (data: Record<string, any>) => {
		setLoading(true);
		try {
			selectedChips.forEach((chip) => {
				data.Item = data.Item ? `${data.Item} and ${chip}` : chip;
			});

			const pick = state.pickUpAddress?.Id
				? state.pickUpAddress
				: await createAddress(state.pickUpAddress as AddressLike);
			if (!pick) return;

			const drop = state.deliveryAddress?.Id
				? state.deliveryAddress
				: await createAddress(state.deliveryAddress as AddressLike);
			if (!drop) return;

			const order = {
				CustomerId: auth.Id,
				Type: "Logistics",
				Instruction: " ",
			};
			const res: any = await post(
				`${baseUrl}order/create`,
				order,
				auth.accessToken,
			);
			if (res.error) {
				cartDispatch({ type: "error", payload: res.error });
				return;
			}

			data.OrderId = res.data?.Id;
			const logistics = {
				SenderAddressId: pick?.Id,
				ReceiverAddressId: drop?.Id,
				SenderName: data.SenderName,
				SenderPhone: data.SenderPhone,
				ReceiverName: data.ReceiverName,
				ReceiverPhone: data.ReceiverPhone,
				ItemDescription: data.ItemDescription,
				Item: data.Item,
				OrderId: res.data?.Id,
			};

			const created = await createLogistics(logistics);
			if (!created) return;

			const delivery = {
				PickUpAddressId: pick?.Id,
				DeliveryAddressId: drop?.Id,
				OrderId: data.OrderId,
				DeliveryFee: deliveryFee,
				PickupType: "Logistics",
			};
			const delResp: any = await post(
				`${baseUrl}delivery/create`,
				delivery,
				auth.accessToken,
			);
			if (delResp.error) {
				cartDispatch({ type: "error", payload: "Error creating delivery" });
				return;
			}
			cartDispatch({ type: "order", payload: res.data });
			cartDispatch({ type: "amount", payload: deliveryFee });
			cartDispatch({ type: "deliveryFee", payload: deliveryFee });
			cartDispatch({ type: "total", payload: deliveryFee });
			cartDispatch({ type: "checkOut" });
			handleClose({ type: kind });
		} catch (error: any) {
			console.log(error);
			cartDispatch({ type: "error", payload: error?.response?.data });
		} finally {
			setLoading(false);
		}
	};

	const handlePickUp = (address: AddressLike) => {
		setValue("SenderAddress", address.Name);
		dispatch({ type: "newPickUpAddress" });
		dispatch({ type: "pickUpAddress", payload: address });
	};
	const handleDelivery = (address: AddressLike) => {
		setValue("ReceiverAddress", address.Name);
		dispatch({ type: "newDeliveryAddress" });
		dispatch({ type: "deliveryAddress", payload: address });
	};
	const handlePickUpAsLocation = (address: AddressLike) => {
		setValue("SenderAddress", address.Name);
		dispatch({ type: "pickUpAddress", payload: address });
	};
	const handleDeliveryAsLocation = (address: AddressLike) => {
		setValue("ReceiverAddress", address.Name);
		dispatch({ type: "deliveryAddress", payload: address });
	};

	useEffect(() => {
		if (state.pickUpAddress && state.deliveryAddress) {
			const distance = calculateDistance(
				{
					lat: state.pickUpAddress.Latitude as number,
					lng: state.pickUpAddress.Longitude as number,
				},
				{
					lat: state.deliveryAddress.Latitude as number,
					lng: state.deliveryAddress.Longitude as number,
				},
			);
			if (distance != null)
				dispatch({ type: "distance", payload: distance as number });
		}
	}, [state.pickUpAddress, state.deliveryAddress, calculateDistance]);

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: kind })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				{cartState.error && (
					<Alert variant="destructive">
						<AlertDescription>{cartState.error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit(handleSend)} className="space-y-5">
					<fieldset className="rounded-lg border p-3">
						<legend className="px-1 text-base font-semibold">
							Pickup Address
						</legend>
						<div className="flex justify-between mb-2">
							<Button
								type="button"
								variant="link"
								size="sm"
								onClick={() => dispatch({ type: "showPickUpAddresses" })}>
								Choose Existing Address
							</Button>
							<Button
								type="button"
								variant="link"
								size="sm"
								onClick={() => dispatch({ type: "newPickUpAddress" })}>
								Add New Address
							</Button>
						</div>
						<div
							className={cn(
								state.showPickUpAddresses ? "block" : "hidden",
								"mb-3",
							)}>
							<ChooseAddressModal handleAddress={handlePickUp} />
						</div>
						<div
							className={cn(
								"relative",
								state.newPickUpAddress ? "block" : "hidden",
							)}>
							<button
								type="button"
								title="Use current location"
								onClick={() => handlePickUpAsLocation(location.address)}
								className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
								<MapPin className="h-5 w-5" />
							</button>
							<Input
								className="pl-9"
								placeholder="Enter pickup address"
								{...register("SenderAddress", { required: true })}
								onChange={(e) => handleInputChange(e, "SenderAddress")}
							/>
						</div>
						{errors.SenderAddress && (
							<p className="text-xs text-destructive mt-1">
								Pickup address is required
							</p>
						)}
					</fieldset>

					{senderSuggestions.length > 0 && (
						<ul className="space-y-1">
							{senderSuggestions.map((s, i) => (
								<li
									key={i}
									onClick={() => handleSuggestionClick(s)}
									className="cursor-pointer rounded-md border p-2 text-sm hover:bg-muted">
									{s.description}
								</li>
							))}
						</ul>
					)}

					<fieldset className="rounded-lg border p-3">
						<legend className="px-1 text-base font-semibold">
							Delivery Address
						</legend>
						<div className="flex justify-between mb-2">
							<Button
								type="button"
								variant="link"
								size="sm"
								onClick={() => dispatch({ type: "showDeliveryAddresses" })}>
								Choose Existing Address
							</Button>
							<Button
								type="button"
								variant="link"
								size="sm"
								onClick={() => dispatch({ type: "newDeliveryAddress" })}>
								Add New Address
							</Button>
						</div>
						<div
							className={cn(
								state.showDeliveryAddresses ? "block" : "hidden",
								"mb-3",
							)}>
							<ChooseAddressModal handleAddress={handleDelivery} />
						</div>
						<div
							className={cn(
								"relative",
								state.newDeliveryAddress ? "block" : "hidden",
							)}>
							<button
								type="button"
								title="Use current location"
								onClick={() => handleDeliveryAsLocation(location.address)}
								className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
								<MapPin className="h-5 w-5" />
							</button>
							<Input
								className="pl-9"
								placeholder="Enter delivery address"
								{...register("ReceiverAddress", { required: true })}
								onChange={(e) => handleInputChange(e, "RecieverAddress")}
							/>
						</div>
						{errors.ReceiverAddress && (
							<p className="text-xs text-destructive mt-1">
								Delivery address is required
							</p>
						)}
					</fieldset>

					{recieverSuggestions.length > 0 && (
						<ul className="space-y-1">
							{recieverSuggestions.map((s, i) => (
								<li
									key={i}
									onClick={() => handleSuggestionClick(s)}
									className="cursor-pointer rounded-md border p-2 text-sm hover:bg-muted">
									{s.description}
								</li>
							))}
						</ul>
					)}

					<div className="rounded-md bg-muted/50 p-3 text-sm">
						{deliveryFee ? (
							<span>Delivery Fee: ₦{deliveryFee}</span>
						) : feeError ? (
							<span className="text-destructive">
								Couldn't calculate delivery fee
							</span>
						) : (
							<span className="text-muted-foreground">
								Calculating delivery fee…
							</span>
						)}
					</div>

					<fieldset className="rounded-lg border p-3 space-y-3">
						<legend className="px-1 text-base font-semibold">
							Sender Information
						</legend>
						<div className="space-y-1">
							<Label>Sender Name</Label>
							<Input
								placeholder="Enter sender name"
								{...register("SenderName", { required: true })}
							/>
							{errors.SenderName && (
								<p className="text-xs text-destructive">
									Sender name is required
								</p>
							)}
						</div>
						<div className="space-y-1">
							<Label>Phone Number</Label>
							<Input
								type="tel"
								placeholder="08122334455"
								{...register("SenderPhone", { required: true, minLength: 11 })}
							/>
							{errors.SenderPhone && (
								<p className="text-xs text-destructive">
									Phone number is required
								</p>
							)}
						</div>
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								onChange={() => handleCurrentInfo()}
								className="h-4 w-4 accent-primary"
							/>
							Use current information
						</label>
					</fieldset>

					<fieldset className="rounded-lg border p-3 space-y-3">
						<legend className="px-1 text-base font-semibold">
							Recipient Information
						</legend>
						<div className="space-y-1">
							<Label>Receiver Name</Label>
							<Input
								placeholder="Enter receiver name"
								{...register("ReceiverName", { required: true })}
							/>
							{errors.ReceiverName && (
								<p className="text-xs text-destructive">
									Receiver name is required
								</p>
							)}
						</div>
						<div className="space-y-1">
							<Label>Phone Number</Label>
							<Input
								type="tel"
								placeholder="08122334455"
								{...register("ReceiverPhone", {
									required: true,
									minLength: {
										value: 11,
										message: "Phone number must be 11 digits",
									},
								})}
							/>
							{errors.ReceiverPhone && (
								<p className="text-xs text-destructive">
									{(errors.ReceiverPhone.message as string) || "Required"}
								</p>
							)}
						</div>
					</fieldset>

					<fieldset className="rounded-lg border p-3 space-y-3">
						<legend className="px-1 text-base font-semibold">
							What do you want to send?
						</legend>
						<div className="flex flex-wrap gap-2">
							{ITEM_OPTIONS.map((option) => (
								<Badge
									key={option}
									variant={
										selectedChips.includes(option) ? "default" : "secondary"
									}
									className="cursor-pointer text-sm py-1 px-3"
									onClick={() => handleChipClick(option)}>
									{option}
								</Badge>
							))}
						</div>
						<Separator />
						<div className="space-y-1">
							<Label>Description</Label>
							<Textarea
								rows={4}
								placeholder="Write service description here"
								{...register("ItemDescription")}
							/>
						</div>
					</fieldset>

					<div className="rounded-md bg-muted/50 p-3 text-sm font-medium">
						Total: ₦{deliveryFee || 0}
					</div>

					<Button
						type="submit"
						disabled={isSubmitting || loading}
						className="w-full">
						{loading || isSubmitting ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : null}
						Proceed
					</Button>

					{cartState.error && (
						<Alert variant="destructive">
							<AlertDescription>{cartState.error}</AlertDescription>
						</Alert>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default PackageDialog;
