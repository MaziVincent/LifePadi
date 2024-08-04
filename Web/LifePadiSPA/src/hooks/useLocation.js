import useAuth from "./useAuth";
import { useState } from "react";
import baseUrl from "../api/baseUrl";
import useFetch from "./useFetch";

const useLocation =  () => {

  const [data, setData] = useState({data: null, error: null})
  const fetch = useFetch()

  const handleAddress = async (longitude, latitude) => {
    
    try {
      const result = await fetch(`${baseUrl}GoogleMaps/address?Longitude=${longitude}&Latitude=${latitude}`);
      //console.log(result.data)
      return  result.data
     
    } catch (error) {
      console.error("Error fetching address:", error);
     // return { error : error.message };
    }
}

  const getLocation = async () => {
    //const controller = new AbortController();
   
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
          async (position) => {
            
            const {latitude, longitude, accuracy } = position.coords;
            //console.log(latitude, longitude , accuracy)

           const address = await handleAddress(longitude, latitude);
           //console.log(address)
<<<<<<< HEAD
            setData({latitude, longitude, accuracy, address })
=======
            setData({
              data: {latitude, longitude, accuracy, address },
              error: null
            })
>>>>>>> d189281 (worked on Login)
            
            
          },
          (err) => {
            console.log( err.message);
            setData({
<<<<<<< HEAD
=======
              data: null,
>>>>>>> d189281 (worked on Login)
              error: err.message
            })
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
<<<<<<< HEAD
        return data;
=======

>>>>>>> d189281 (worked on Login)
      } else {
        

         setData({
<<<<<<< HEAD
=======
          data: null,
>>>>>>> d189281 (worked on Login)
          error: "Geolocation is not supported by this browser."
        })
         
      }

<<<<<<< HEAD
     
=======
     return data; 
>>>>>>> d189281 (worked on Login)
    
  };

  return getLocation;
};

export default useLocation;
