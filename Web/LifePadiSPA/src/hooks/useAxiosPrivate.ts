import { useEffect } from "react";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

interface RetriableConfig extends InternalAxiosRequestConfig {
	sent?: boolean;
}

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${
						(auth as { token?: string; accessToken?: string }).token ??
						(auth as { token?: string; accessToken?: string }).accessToken ??
						""
					}`;
				}
				return config;
			},
			(error: AxiosError) => Promise.reject(error),
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				const prevRequest = error.config as RetriableConfig | undefined;
				if (
					error.response?.status === 403 &&
					prevRequest &&
					!prevRequest.sent
				) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					if (prevRequest.headers) {
						prevRequest.headers["Authorization"] =
							`Bearer ${newAccessToken ?? ""}`;
					}
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			},
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;
