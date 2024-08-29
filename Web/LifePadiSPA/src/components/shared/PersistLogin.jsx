
import { Outlet } from "react-router-dom";  
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth"
import useRefreshToken from "../../hooks/useRefreshToken";
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../../assets/images/Logonamedark.svg"


const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth()

    useEffect(()=> {

        //let isMounted = true;
        const verifyRefreshToken = async ()=> {

            try{
                await refresh();
            }
            catch(err){
                console.error(err)
            }
            finally{
                setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
        //return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
       // console.log(`token: ${JSON.stringify(auth.accessToken)}`)
        

    },[isLoading])

    return ( <>

        {
            !persist 
            ? <Outlet /> :  
            isLoading ? <p className="flex items-center justify-center p-20"> <img src={logo} className="h-28 animate-pulse" alt="" /> </p>
            : <Outlet />
        }
    
    
    </> );
}
 
export default PersistLogin;