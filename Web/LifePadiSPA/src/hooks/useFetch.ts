import useAxiosPrivate from "./useAxiosPrivate";
import type { ApiResponseBody } from "./types";

export interface FetchResult<T = ApiResponseBody> {
	data: T;
}

const useFetch = () => {
	const axiosPrivate = useAxiosPrivate();

	const fetchData = async <T = ApiResponseBody>(
		url: string,
		token?: string | null,
	): Promise<FetchResult<T>> => {
		const controller = new AbortController();

		try {
			const response = await axiosPrivate.get<T>(url, {
				signal: controller.signal,
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			});
			return { data: response.data };
		} catch (error) {
			console.log(error);
			throw new Error(`Error: ${String(error)}`);
		}
	};

	return fetchData;
};

export default useFetch;
