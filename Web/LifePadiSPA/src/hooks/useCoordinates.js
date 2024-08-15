import { useState, useEffect } from 'react';

export const useCoordinates = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const success = (position) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    };

    const error = () => {
      setError('Unable to retrieve your location');
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { coordinates, error, loading };
};
