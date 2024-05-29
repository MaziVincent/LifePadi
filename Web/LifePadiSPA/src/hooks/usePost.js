
import axios from "axios";

const usePost = () => {
  const postData = async (url,data, token) => {
    const controller = new AbortController();

    let result;

    try {
      const response = await axios.post(url, data, {
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
