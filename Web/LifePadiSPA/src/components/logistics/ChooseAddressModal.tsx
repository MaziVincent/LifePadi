import { Loader2 } from "lucide-react";

import baseUrl from "../../api/baseUrl";
import { useGet } from "../../hooks/useGet";
import useAuth from "../../hooks/useAuth";

import { Label } from "@/components/ui/label";

interface AddressLike {
	Id: number | string;
	Name: string;
	Town?: string;
	City?: string;
	[k: string]: any;
}

interface ChooseAddressModalProps {
	handleAddress: (address: AddressLike) => void;
}

const ChooseAddressModal = ({ handleAddress }: ChooseAddressModalProps) => {
	const { auth } = useAuth();
	const addressUrl = `${baseUrl}address/customer-addresses`;

	const { data: addresses, loading: addressLoading } = useGet(
		`${addressUrl}/${auth.Id}`,
	) as {
		data: AddressLike[] | null;
		loading: boolean;
		error: any;
	};

	return (
		<div className="w-full space-y-2 pb-4">
			{addressLoading && (
				<div className="flex justify-center py-4">
					<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
				</div>
			)}
			{addresses?.map((ad) => (
				<label
					key={ad.Id}
					htmlFor={`address-${ad.Id}`}
					className="flex items-center gap-3 rounded-md border bg-background px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer">
					<input
						type="radio"
						name="address"
						id={`address-${ad.Id}`}
						value={`${ad.Name}, ${ad.Town}, ${ad.City}`}
						onChange={() => handleAddress(ad)}
						className="h-4 w-4 accent-primary"
					/>
					<span>
						{ad.Name} {ad.Town}
					</span>
				</label>
			))}
			{addresses && addresses.length < 1 && (
				<div className="flex justify-center py-3">
					<Label className="text-muted-foreground text-center">
						No saved addresses
					</Label>
				</div>
			)}
		</div>
	);
};

export default ChooseAddressModal;
