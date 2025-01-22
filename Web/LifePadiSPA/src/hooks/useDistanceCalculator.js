import { useCallback } from "react";

const useDistanceCalculator = () => {
  // Function to convert degrees to radians
  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  // Function to calculate the distance
  const calculateDistance = useCallback((origin, destination) => {
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

    const R = 6371; // Earth's radius in kilometers
    const latDistance = degreesToRadians(lat2 - lat1);
    const lonDistance = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(lonDistance / 2) *
        Math.sin(lonDistance / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }, []);

  return { calculateDistance };
};

export default useDistanceCalculator;
