

import useAuth from "./useAuth";
import axios from "../api/axios";
//import useCart from "./useCart"


const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();
    //const {dispatch} = useCart();

    const refresh = async () => {

        const response = await axios.get('auth/refreshToken',{
            withCredentials:true,
            headers: {"Access-Control-Allow-Origin":"*", "Content-Type": "application/json",},
            credentials: "include",
            
        });

       // console.log(response.data);
        setAuth(response.data);
        //dispatch({type:"setAddress", payload:response.data?.user.ContactAddress})
   
    return response.data.accessToken;
    } 

    return refresh;
}
 
export default useRefreshToken;