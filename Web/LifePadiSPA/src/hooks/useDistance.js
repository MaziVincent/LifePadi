
import useAxiosPrivate from "./useAxiosPrivate"
import baseUrl from "../api/baseUrl";
import { useState, useEffect } from 'react';
 import axios from 'axios';

export const useDistance = (OriginPlaceId, DestinationPlaceId) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}googlemaps/distancewithplaceid`,
          {
            params: { OriginPlaceId, DestinationPlaceId },
          }
        );

       // console.log(response.data);
        setDistance(response.data.distance);
        setDuration(response.data.duration);
      } catch (err) {
        setError(err.message || "Error calculating distance");
      } finally {
        setLoading(false);
      }
    };

    if (OriginPlaceId && DestinationPlaceId) {
      fetchDistance();
    }
  }, [OriginPlaceId, DestinationPlaceId]);

  return { distance, duration, error, loading };
};
