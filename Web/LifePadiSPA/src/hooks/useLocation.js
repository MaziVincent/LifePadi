import useAuth from "./useAuth";

const useLocation = async () => {

    const {setLocation} = useAuth();

  const getLocation = () => {
    //const controller = new AbortController();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            
            const {latitude, longitude, accuracy } = position.coords;
            console.log(position.coords)
            setLocation({latitude, longitude, accuracy})
            
          },
          (err) => {
            console.log( err.message);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
         console.log( "Geolocation is not supported by this browser.");
      }
    
  };

  return getLocation;
};

export default useLocation;
