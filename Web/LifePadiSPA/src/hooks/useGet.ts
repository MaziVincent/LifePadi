import { useState, useEffect } from "react";
import axios from "axios";
import type { ApiResponseBody } from "./types";

export interface UseGetResult<T = ApiResponseBody> {
	data: T | null;
	error: string | null;
	loading: boolean;
}

export const useGet = <T = ApiResponseBody>(
	url: string | null | undefined,
	token?: string | null,
): UseGetResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		const getData = async () => {
			try {
				const response = await axios.get<T>(url as string, {
					signal: controller.signal,
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				});
				setData(response.data);
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Error fetching data";
				setError(message);
			} finally {
				setLoading(false);
			}
		};

		if (url) {
			getData();
		}
		return () => controller.abort();
	}, [url, token]);

	return { data, error, loading };
};

export default useGet;
