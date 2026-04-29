import useAuth from "./useAuth";
import axios from "../api/axios";

/**
 * Returns a function that attempts to refresh the access token using the
 * refreshToken stored in localStorage. Failures are swallowed so callers
 * (e.g. PersistLogin) don't crash. If the server rejects the refresh
 * token (4xx), it is removed from storage so we don't keep retrying with
 * a known-bad value. 5xx / network errors leave the token intact.
 */
const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const stored = localStorage.getItem("refreshToken");
		if (!stored) return null;

		let refreshToken;
		try {
			refreshToken = JSON.parse(stored);
		} catch {
			localStorage.removeItem("refreshToken");
			return null;
		}
		if (!refreshToken) return null;

		try {
			const response = await axios.get("auth/refreshToken", {
				params: { refreshToken },
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});

			const data = response.data?.Data ?? response.data;
			if (data) setAuth(data);
			return data?.accessToken ?? null;
		} catch (err) {
			const status = err?.response?.status;
			if (status && status >= 400 && status < 500) {
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");
			}
			return null;
		}
	};

	return refresh;
};

export default useRefreshToken;
