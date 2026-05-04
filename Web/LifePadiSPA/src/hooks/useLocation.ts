import { useState } from "react";
import baseUrl from "../api/baseUrl";
import useFetch from "./useFetch";

export interface LocationData {
	latitude?: number;
	longitude?: number;
	accuracy?: number;
	address?: unknown;
	error?: string;
}

const useLocation = () => {
	const [data, setData] = useState<LocationData>({});
	const fetch = useFetch();

	const handleAddress = async (
		longitude: number,
		latitude: number,
	): Promise<unknown> => {
		try {
			const result = await fetch(
				`${baseUrl}GoogleMaps/address?Longitude=${longitude}&Latitude=${latitude}`,
			);
			return result.data;
		} catch (error) {
			console.error("Error fetching address:", error);
			return undefined;
		}
	};

	const getLocation = async (): Promise<LocationData | undefined> => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude, accuracy } = position.coords;
					const address = await handleAddress(longitude, latitude);
					setData({ latitude, longitude, accuracy, address });
				},
				(err) => {
					console.log(err.message);
					setData({ error: err.message });
				},
				{ enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
			);
			return data;
		}
		setData({ error: "Geolocation is not supported by this browser." });
		return undefined;
	};

	return getLocation;
};

export default useLocation;
