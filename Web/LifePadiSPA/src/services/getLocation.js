const getLocation = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          return {longitude, latitude, error: null}
        },
        (err) => {
          return {longitude : null, latitude : null, error: err.message};
        }
      );
    } else {
      return  {longitude : null, latitude : null, error: "Geolocation is not supported by this browser."};
    }
  };

  export default getLocation