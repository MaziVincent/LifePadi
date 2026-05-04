import { useState, useEffect } from "react";
import axios from "axios";

interface DistanceResponse {
	distance: number;
	duration: number;
}

export interface UseDistanceResult {
	distance: number | null;
	duration: number | null;
	error: string | null;
	loading: boolean;
}

export const useDistance = (
	Origin: string | null | undefined,
	Destination: string | null | undefined,
	url?: string,
	token?: string | null,
): UseDistanceResult => {
	const [distance, setDistance] = useState<number | null>(null);
	const [duration, setDuration] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		const fetchDistance = async () => {
			try {
				const response = await axios.get<DistanceResponse>(url ?? "", {
					params: { Origin, Destination },
					signal: controller.signal,
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				});
				setDistance(response.data.distance);
				setDuration(response.data.duration);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Error calculating distance",
				);
			} finally {
				setLoading(false);
			}
		};

		if (Origin && Destination && url) {
			fetchDistance();
		}
		return () => controller.abort();
	}, [Origin, Destination, url, token]);

	return { distance, duration, error, loading };
};

export default useDistance;
