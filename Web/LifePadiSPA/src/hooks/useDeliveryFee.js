import useAxiosPrivate from "./useAxiosPrivate";
import baseUrl from "../api/baseUrl";
import { useState, useEffect } from "react";
import axios from "axios";

export const useDeliveryFee = (Distance) => {
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchDeliveryFee = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}delivery/getfee`,
          {
            params: { Distance },
          }
        );

       // console.log(response.data);
        setDeliveryFee(response.data.DeliveryFee);
      } catch (err) {
        setError(err.message || "Error calculating distance");
      } finally {
        setLoading(false);
      }
    };

    if (Distance) {
      fetchDeliveryFee();
    }
  }, [Distance]);

  return { deliveryFee, error, loading };
};
