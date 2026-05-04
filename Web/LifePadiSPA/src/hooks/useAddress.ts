import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";

export interface UseAddressResult<T = unknown> {
	address: T | null;
	error: string | null;
	loading: boolean;
}

export const useAddress = <T = unknown>(
	latitude: number | null | undefined,
	longitude: number | null | undefined,
): UseAddressResult<T> => {
	const [address, setAddress] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				setLoading(true);
				const response = await axios.get<T>(`${baseUrl}googlemaps/address`, {
					params: { latitude, longitude },
				});
				setAddress(response.data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error fetching address");
			} finally {
				setLoading(false);
			}
		};

		if (latitude && longitude) {
			fetchAddress();
		}
	}, [latitude, longitude]);

	return { address, error, loading };
};

export default useAddress;
