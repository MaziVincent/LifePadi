import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";

interface DeliveryFeeResponse {
	DeliveryFee: number;
}

export interface UseDeliveryFeeResult {
	deliveryFee: number;
	error: string | null;
	loading: boolean;
}

export const useDeliveryFee = (
	Distance: number | null | undefined,
): UseDeliveryFeeResult => {
	const [deliveryFee, setDeliveryFee] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchDeliveryFee = async () => {
			try {
				const response = await axios.get<DeliveryFeeResponse>(
					`${baseUrl}delivery/getfee`,
					{ params: { Distance } },
				);
				setDeliveryFee(response.data.DeliveryFee);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Error calculating distance",
				);
			} finally {
				setLoading(false);
			}
		};

		if (Distance) {
			fetchDeliveryFee();
		}
	}, [Distance]);

	return { deliveryFee, error, loading };
};

export default useDeliveryFee;
