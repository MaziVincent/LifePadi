import axios from "axios";
import useAxiosPrivate from "./useAxiosPrivate"

const useDeActivate = () => {
  const axiosPrivate = useAxiosPrivate();

  const deActivate = async (url, token) => {
    const controller = new AbortController();


    try {
      const response = await axiosPrivate.post(url, {
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

  return deActivate;
};

export default useDeActivate;
