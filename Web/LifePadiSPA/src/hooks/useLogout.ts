import apiClient from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
	const { setAuth } = useAuth();

	const logout = async (): Promise<unknown> => {
		setAuth({});
		localStorage.removeItem("refreshToken");
		try {
			const response = await apiClient.get("auth/logOut", {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			console.log({ error });
			return undefined;
		}
	};

	return logout;
};

export default useLogout;
