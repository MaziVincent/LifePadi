import { useCallback } from "react";
import usePost from "../../../hooks/usePost";
import baseUrl from "../../../api/baseUrl";

export interface LocationLike {
	address: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
}

export interface AddressInput {
	[key: string]: unknown;
	UserId?: number | string;
}

export type CartDispatch = (action: {
	type: string;
	payload?: unknown;
}) => void;

export const getCartFromLocalStorage = (): void => {
	// no-op (preserved from original)
};

export const getAddresses = (): void => {
	// no-op (preserved from original)
};

/**
 * React hook returning a function that POSTs an address derived from a
 * `LocationLike` to the API.
 */
export const useAddAddressToDb = () => {
	const post = usePost();
	return useCallback(
		async (
			url: string,
			location: LocationLike,
			token?: string | null,
			userId?: number | string,
		): Promise<void> => {
			const address = location.address.split(",");
			const data: Record<string, unknown> = {
				Name: `${address[0]},${address[1]}`,
				Town: address[2]?.trim(),
				City: address[3]?.trim(),
				LocalGovt: address[3]?.trim(),
				PostalCode: address[3]?.trim().split(" ")[1],
				Country: address[4],
				State: address[4],
				Latitude: location.coordinates.latitude,
				Longitude: location.coordinates.longitude,
				UserId: userId,
			};
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, String(data[key] ?? ""));
			}
			await post(url, formData, token ?? undefined);
		},
		[post],
	);
};

/**
 * React hook returning a function that creates an address record. Dispatches
 * cart errors on failure (409 conflict or generic).
 */
export const useCreateAddress = () => {
	const post = usePost();
	return useCallback(
		async (
			address: AddressInput | string,
			token?: string | null,
			userId?: number | string,
			cartDispatch?: CartDispatch,
		): Promise<unknown> => {
			const addr: AddressInput =
				typeof address === "string"
					? ({ Name: address } as AddressInput)
					: address;
			addr.UserId = userId;
			const formData = new FormData();
			Object.entries(addr).forEach(([key, value]) => {
				formData.append(key, value as string | Blob);
			});

			const res = await post(
				`${baseUrl}address/create`,
				formData,
				token ?? undefined,
			);
			const errorRes = res as { error?: unknown; status?: number } | undefined;
			if (errorRes?.error && errorRes.status === 409) {
				cartDispatch?.({
					type: "error",
					payload: "Address already exists Choose from Existing Address ",
				});
				return null;
			}
			if (errorRes?.error) {
				cartDispatch?.({
					type: "error",
					payload: "Error Creating Address ",
				});
				return null;
			}

			return (res as { data?: unknown } | undefined)?.data;
		},
		[post],
	);
};
