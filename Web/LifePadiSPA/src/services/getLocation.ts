interface LocationResult {
	latitude: number | null;
	longitude: number | null;
	error: string | null;
}

const getLocation = (): LocationResult | void => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				return { longitude, latitude, error: null };
			},
			(err) => {
				return { longitude: null, latitude: null, error: err.message };
			},
		);
		return;
	}
	return {
		longitude: null,
		latitude: null,
		error: "Geolocation is not supported by this browser.",
	};
};

export default getLocation;
