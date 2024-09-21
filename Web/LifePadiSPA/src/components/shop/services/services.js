import usePost from "../../../hooks/usePost";
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
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(response)
<<<<<<< HEAD
=======
    //console.log(response)
=======
    console.log(response)
>>>>>>> 67ef8ba (updated payment)
    //console.log(url, token )
    //const response = post(url, data, token)
>>>>>>> e848b7b (Payment Response)
=======
>>>>>>> c99f576 (changed baseurl)

}

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
<<<<<<< HEAD
//     addAddressToDb(`${addressUrl}create`, location, auth.accessToken, auth.Id)
=======
//     addAddressToDb(`${addressUrl}create`, location, auth.accessToken, auth.user?.Id)
>>>>>>> e848b7b (Payment Response)
// }