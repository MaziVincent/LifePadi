import axios from "axios";
import axiosPrivate from "../api/axios";
import type { ApiResponseBody } from "./types";

export interface PostError {
	error: unknown;
	status?: number;
}

export type PostResult<T = ApiResponseBody> = any;

const usePost = () => {
	const postData = async <T = ApiResponseBody>(
		url: string,
		data?: unknown,
		token?: string | null,
	): Promise<PostResult<T>> => {
		const controller = new AbortController();
		let result: any;

		try {
			const response = await axiosPrivate.post<T>(url, data, {
				signal: controller.signal,
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				withCredentials: true,
			});
			result = response;
		} catch (error) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				return { error: error.response?.data, status: error.response?.status };
			}
			return { error };
		}
		return result;
	};

	return postData;
};

export default usePost;
