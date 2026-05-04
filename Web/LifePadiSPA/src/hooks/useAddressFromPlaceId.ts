import useAxiosPrivate from "./useAxiosPrivate";

const useAddressFromPlaceId = () => {
	const axiosPrivate = useAxiosPrivate();

	const fetchAddress = async <T = any>(
		url: string,
		token?: string | null,
	): Promise<{ data: T }> => {
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

	return fetchAddress;
};

export default useAddressFromPlaceId;
