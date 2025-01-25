import axios from "axios";
import useAxiosPrivate from "./useAxiosPrivate";

const useAddressFromPlaceId = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchAddress = async (url, token) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.get(url, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });

      controller.abort();

      return { data: response.data };
      // console.log(data)
    } catch (error) {
      console.log(error);
      throw new Error(`Error: ${error}`);
      //return error;
      //navigate('/Login',{state:{from: location}, replace:true })
    }
  };

  return fetchAddress;
};

export default useAddressFromPlaceId;
