import axios, { AxiosInstance } from "axios";
import baseURL from "./baseUrl";

/**
 * Public axios instance — used for unauthenticated requests
 * (login, register, public catalog, etc.).
 */
const apiClient: AxiosInstance = axios.create({
	baseURL,
});

/**
 * Authenticated axios instance — interceptors are attached
 * by `useAxiosPrivate` at request time so the latest access
 * token from `useAuth` is always used.
 */
export const axiosPrivate: AxiosInstance = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" },
});

export default apiClient;
