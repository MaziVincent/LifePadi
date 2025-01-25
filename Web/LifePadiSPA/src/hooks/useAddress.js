import baseUrl from "../api/baseUrl";
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAddress = (latitude, longitude ) => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}googlemaps/address`, {
          params: { latitude, longitude },
        });
        setAddress(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching address');
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchAddress();
    }
  }, [latitude, longitude]);

  return { address, error, loading };
};




export default useAddress;