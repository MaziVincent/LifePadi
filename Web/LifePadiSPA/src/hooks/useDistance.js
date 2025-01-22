
import useAxiosPrivate from "./useAxiosPrivate"
import baseUrl from "../api/baseUrl";
import { useState, useEffect } from 'react';
 import axios from 'axios';

export const useDistance = (Origin, Destination, url, token) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDistance = async () => {
      const controller = new AbortController();
      try {
        const response = await axios.get(
          url,
          {
            params: { Origin, Destination },
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);
        controller.abort();
        setDistance(response.data.distance);
        setDuration(response.data.duration);
      } catch (err) {
        setError(err.message || "Error calculating distance");
      } finally {
        setLoading(false);
      }
    };

    if (Origin && Destination) {
      fetchDistance();
    }
  }, [Origin, Destination]);

  return { distance, duration, error, loading };
};
