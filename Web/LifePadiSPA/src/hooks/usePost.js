
import axios from "axios";
import axiosPrivate from "../api/axios"

const usePost = () => {
  const postData = async (url,data, token) => {
    const controller = new AbortController();

   // console.log(data);
    let result;

    try {
      const response = await axiosPrivate.post(url, data, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });

      result =  response;

      
      // console.log(data)
    } catch (error) {
      console.log(error);

      return error;
      //navigate('/Login',{state:{from: location}, replace:true })
    }
    controller.abort();
    return result;
    

  };

 

  return postData;
};

export default usePost;
