import useAxiosPrivate from "./useAxiosPrivate";
import type { ApiResponseBody } from "./types";

const useDelete = () => {
	const axiosPrivate = useAxiosPrivate();

	const deleteData = async <T = ApiResponseBody>(
		url: string,
		token?: string | null,
	): Promise<T> => {
		const controller = new AbortController();

		try {
			const response = await axiosPrivate.delete<T>(url, {
				signal: controller.signal,
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			});
			return response.data;
		} catch (error) {
			console.log(error);
			return error as T;
		}
	};

	return deleteData;
};

export default useDelete;
