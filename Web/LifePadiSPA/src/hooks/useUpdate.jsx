

import axios from "axios";

const useUpdate = () => {

  const updateData = async (url,data, token) => {
    const controller = new AbortController();

    let result;

    try {
      const response = await axios.put(url, data, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });

      result =  response;

      
      // console.log(data)
    } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
      //console.log(error);
      return {error:error.response.data}
=======
      console.log(error);
      throw new Error(`Error : ${error }`)
>>>>>>> 7fa87ff (user dashboard commit)
=======
      //console.log(error);
      return {error:error.response.data}
>>>>>>> b7ff8e8 (voucher)
      //navigate('/Login',{state:{from: location}, replace:true })
    }
    controller.abort();
    return result;
    

  };

 

  return updateData;
};

export default useUpdate;
