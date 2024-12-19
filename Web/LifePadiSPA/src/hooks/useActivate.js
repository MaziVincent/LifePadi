import axios from "axios";
import useAxiosPrivate from "./useAxiosPrivate"

const useActivate = () => {
  const axiosPrivate = useAxiosPrivate();

  const activate = async (url, token) => {
    const controller = new AbortController();


    try {
      const response = await axiosPrivate.put(url, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });


        controller.abort();
       return response.data;
      // console.log(data)
    } catch (error) {
      console.log(error);

      return error;
      //navigate('/Login',{state:{from: location}, replace:true })
    }

  };

  return activate;
};

export default useActivate;
