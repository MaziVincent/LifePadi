import axios from "axios";
import useAxiosPrivate from "./useAxiosPrivate"

const useDelete = () => {
  const axiosPrivate = useAxiosPrivate();

  const deleteData = async (url, token) => {
    const controller = new AbortController();


    try {
      const response = await axiosPrivate.delete(url, {
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

  return deleteData;
};

export default useDelete;
