import { useState, useEffect } from "react";

export interface Coordinates {
	latitude: number | null;
	longitude: number | null;
}

export interface UseCoordinatesResult {
	coordinates: Coordinates;
	error: string | null;
	loading: boolean;
}

export const useCoordinates = (): UseCoordinatesResult => {
	const [coordinates, setCoordinates] = useState<Coordinates>({
		latitude: null,
		longitude: null,
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser");
			setLoading(false);
			return;
		}

		const success = (position: GeolocationPosition) => {
			setCoordinates({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
			setLoading(false);
		};

		const onError = () => {
			setError("Unable to retrieve your location");
			setLoading(false);
		};

		navigator.geolocation.getCurrentPosition(success, onError);
	}, []);

	return { coordinates, error, loading };
};

export default useCoordinates;
