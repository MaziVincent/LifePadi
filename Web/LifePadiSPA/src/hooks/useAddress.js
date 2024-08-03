import baseUrl from "../api/baseUrl";
const useAddress = () => {

    const url = `${baseUrl}GoogleMaps`

    const getAddress = async (longitude, latitude ) => {
        try {
          const result = await fetch(`${url}/address?Longitude=${longitude}&Latitude=${latitude}`);
          
          return {data : result.data};
         
        } catch (error) {
          console.error("Error fetching address:", error);
          return { error : error.message };
        }
      };

 return getAddress
}



export default useAddress;