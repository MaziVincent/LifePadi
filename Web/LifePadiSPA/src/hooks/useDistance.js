
import useAxiosPrivate from "./useAxiosPrivate"
import baseUrl from "../api/baseUrl";
import { useState, useEffect } from 'react';
 import axios from 'axios';

export const useDistance = (Origin, Destination,) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  // console.log(`Origin is ${Origin}`)
  // console.log(`Destination is ${Destination}`)

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const response = await axios.get(`${baseUrl}googlemaps/distance`, {
          params: { Destination, Origin },
        });

        console.log(response.data)
        setDistance(response.data.distance);
        setDuration(response.data.duration);
      } catch (err) {
        setError(err.message || 'Error calculating distance');
      } finally {
        setLoading(false);
      }
    };

    if (Destination && Origin) {
      fetchDistance();
    }
  }, [Destination, Origin]);

  return { distance, duration, error, loading };
};
