import useAxiosPrivate from "./useAxiosPrivate";
import { useState, useEffect } from "react";
import axios from "axios";

export const useGet = (url, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
      const getData = async () => {
        const controller = new AbortController();
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

          // console.log(response.data);
          controller.abort();
        setData(response.data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      getData();
    }
  }, [url]);

  return { data, error, loading };
};
