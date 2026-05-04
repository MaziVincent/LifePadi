import { useCallback } from "react";

export interface LatLng {
	lat: number;
	lng: number;
}

const useDistanceCalculator = () => {
	const degreesToRadians = (degrees: number): number =>
		degrees * (Math.PI / 180);

	const calculateDistance = useCallback(
		(
			origin: LatLng | null | undefined,
			destination: LatLng | null | undefined,
		): number | null => {
			if (!origin || !destination) {
				console.error("Origin and destination coordinates are required.");
				return null;
			}

			const { lat: lat1, lng: lon1 } = origin;
			const { lat: lat2, lng: lon2 } = destination;

			if (
				lat1 === undefined ||
				lon1 === undefined ||
				lat2 === undefined ||
				lon2 === undefined
			) {
				console.error("Invalid coordinates provided.");
				return null;
			}

			const R = 6371;
			const latDistance = degreesToRadians(lat2 - lat1);
			const lonDistance = degreesToRadians(lon2 - lon1);

			const a =
				Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
				Math.cos(degreesToRadians(lat1)) *
					Math.cos(degreesToRadians(lat2)) *
					Math.sin(lonDistance / 2) *
					Math.sin(lonDistance / 2);

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			return R * c;
		},
		[],
	);

	return { calculateDistance };
};

export default useDistanceCalculator;
