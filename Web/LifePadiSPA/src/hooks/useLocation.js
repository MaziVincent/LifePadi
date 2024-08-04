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
            setData({
              data: {latitude, longitude, accuracy, address },
              error: null
            })
            
            
          },
          (err) => {
            console.log( err.message);
            setData({
              data: null,
              error: err.message
            })
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );

      } else {
        

         setData({
          data: null,
          error: "Geolocation is not supported by this browser."
        })
         
      }

     return data; 
    
  };

  return getLocation;
};

export default useLocation;
