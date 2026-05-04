import axios from "axios";
import type { ApiResponseBody } from "./types";

export interface UpdateError {
	error: unknown;
}

export type UpdateResult<T = ApiResponseBody> = any;

const useUpdate = () => {
	const updateData = async <T = ApiResponseBody>(
		url: string,
		data: unknown,
		token?: string | null,
	): Promise<UpdateResult<T>> => {
		const controller = new AbortController();
		let result: any;

		try {
			const response = await axios.put<T>(url, data, {
				signal: controller.signal,
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			});
			result = response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return { error: error.response?.data };
			}
			return { error };
		}
		return result;
	};

	return updateData;
};

export default useUpdate;
