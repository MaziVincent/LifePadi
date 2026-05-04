import useAxiosPrivate from "./useAxiosPrivate";
import type { ApiResponseBody } from "./types";

const useActivate = () => {
	const axiosPrivate = useAxiosPrivate();

	const activate = async <T = ApiResponseBody>(
		url: string,
		token?: string | null,
	): Promise<T> => {
		const controller = new AbortController();

		try {
			const response = await axiosPrivate.put<T>(url, null, {
				signal: controller.signal,
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			});
			return response.data;
		} catch (error) {
			console.log(error);
			return error as T;
		}
	};

	return activate;
};

export default useActivate;
