import axios from "axios";
import apiClient from "../api/axios";
import useAuth from "./useAuth";

interface RefreshResponse {
	Data?: { accessToken?: string } & Record<string, unknown>;
	accessToken?: string;
	[key: string]: unknown;
}

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async (): Promise<string | null> => {
		const stored = localStorage.getItem("refreshToken");
		if (!stored) return null;

		let refreshToken: string | null;
		try {
			refreshToken = JSON.parse(stored);
		} catch {
			localStorage.removeItem("refreshToken");
			return null;
		}
		if (!refreshToken) return null;

		try {
			const response = await apiClient.get<RefreshResponse>(
				"auth/refreshToken",
				{
					params: { refreshToken },
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				},
			);

			const data = response.data?.Data ?? response.data;
			if (data) setAuth(data as Record<string, unknown>);
			return data?.accessToken ?? null;
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const status = err.response?.status;
				if (status && status >= 400 && status < 500) {
					localStorage.removeItem("refreshToken");
					localStorage.removeItem("user");
				}
			}
			return null;
		}
	};

	return refresh;
};

export default useRefreshToken;
