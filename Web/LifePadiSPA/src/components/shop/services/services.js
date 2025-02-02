import usePost from "../../../hooks/usePost";
import baseUrl from "../../../api/baseUrl";
import { useDistance } from "../../../hooks/useDistance";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";



const post = usePost();



export const getCartFromLocalStorage = () => {
    
}

export const getAddresses = () => {

}
export const addAddressToDb = async (url, location, token, userId ) => {

    const address = location.address.split(",")
    const data = {
        Name: `${address[0]},${address[1]}`,
        Town: address[2].trim(),
        City:address[3].trim(),
        LocalGovt: address[3].trim(),
        PostalCode: address[3].trim().split(" ")[1],
        Country: address[4], //Nigeria
        State: address[4],
        Latitude: location.coordinates.latitude,
        Longitude: location.coordinates.longitude,
        UserId: userId
    }
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await post(url, formData, token)
    console.log(response)

}

  export const createAddress = async (address, token, userId, cartDispatch) => {
    address.UserId = userId;
    const formData = new FormData();
    Object.entries(address).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await post(`${baseUrl}address/create`, formData, token);
    if (res.error && res.status == 409) {
      cartDispatch({
        type: "error",
        payload: "Address already exists Choose from Existing Address ",
      });
      return null;
    } else if (res.error) {
      cartDispatch({
        type: "error",
        payload: "Error Creating Address ",
      });
      return null;
    }

    return res.data;
  };


// export const getDistanceFromAddress = (origin, destination) => {

//     const {distance, duration, error, loading } = useDistance(origin, destination)
//     return {distance, duration, error, loading}

// }

// export const setDeliveryAddressToLocation = () => {
//     console.log(location);
//     dispatch({ type: "setAddress", payload: location.address });
//     handleDeliveryFee();
//     console.log(state.deliveryAddress);
//     dispatch({ type: "address" });
//     dispatch({type:"error", payload:""})
//     addAddressToDb(`${addressUrl}create`, location, auth.accessToken, auth.Id)
// }