import axios from "axios";
import useAxiosPrivate from "./useAxiosPrivate"

const useFetch = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async (url, token) => {
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

      return  {data:response.data} ;
      // console.log(data)
    } catch (error) {
      console.log(error);

      return error;
      //navigate('/Login',{state:{from: location}, replace:true })
    }

   

    
  };

  return fetchData;
};

export default useFetch;
