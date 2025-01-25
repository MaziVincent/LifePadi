import { Modal } from "@mui/material";
import { set, useForm } from "react-hook-form";
import { ClickAwayListener } from "@mui/material";
import LoadingGif from "../shared/LodingGif";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useState, useReducer } from "react";
import baseUrl from "../../api/baseUrl";
import axios from "axios";
import usePost from "../../hooks/usePost";
import { useDistance } from "../../hooks/useDistance";
import { useDeliveryFee } from "../../hooks/useDeliveryFee";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import ChooseAddressModal from "./ChooseAddressModal";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";
import useAddressFromPlaceId from "../../hooks/useAddressFromPlaceId";

const reducer = (state, action) => {
  switch (action.type) {
    case "showPickUpAddresses":
      return {
        ...state,
        showPickUpAddresses: !state.showPickUpAddresses,
        newPickUpAddress: false,
      };
    case "newPickUpAddress":
      return {
        ...state,
        newPickUpAddress: !state.newPickUpAddress,
        showPickUpAddresses: false,
      };
    case "showDeliveryAddresses":
      return {
        ...state,
        showDeliveryAddresses: !state.showDeliveryAddresses,
        newDeliveryAddress: false,
      };
    case "newDeliveryAddress":
      return {
        ...state,
        newDeliveryAddress: !state.newDeliveryAddress,
        showDeliveryAddresses: false,
      };
    case "pickUpAddress":
      return { ...state, pickUpAddress: action.payload };
    case "deliveryAddress":
      return { ...state, deliveryAddress: action.payload };
    case "pickUpAddressId":
      return { ...state, pickUpAddressId: action.payload };
    case "deliveryAddressId":
      return { ...state, deliveryAddressId: action.payload };

    case "distance":
      return { ...state, distance: action.payload };
    default:
      throw new Error();
  }
};

const SendPackage = ({ handleClose, open }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const [state, dispatch] = useReducer(reducer, {
    showPickUpAddresses: false,
    newPickUpAddress: false,
    showDeliveryAddresses: false,
    newDeliveryAddress: false,
    pickUpAddress: null,
    deliveryAddress: null,
    distance: null,
    pickUpAddressId: null,
    deliveryAddressId: null,
  });
  const { auth, location } = useAuth();

  const post = usePost();
  const getAddress = useAddressFromPlaceId();
  const { calculateDistance } = useDistanceCalculator();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [selectedChips, setSelectedChips] = useState([]);
  const [senderSuggestions, setSenderSuggestions] = useState([]);
  const [recieverSuggestions, setRecieverSuggestions] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pkId, setPkId] = useState(null);
  const [dlId, setdlId] = useState(null);
  //const [deliveryFee, setDeliveryFee] = useState(0);
  // const [originPlaceId, setOriginPlaceId] = useState("");
  // const [destinationPlaceId, setDestinationPlaceId] = useState("");
  const url = `${baseUrl}logistics/create`;

  const options = [
    "Documents",
    "Food Stuff",
    "Money",
    "Clothing",
    "Elecronics",
    "Phone",
    "I prefer not to say",
  ];

  const handleChipClick = (option) => {
    setSelectedChips((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((chip) => chip !== option)
        : [...prevSelected, option]
    );

    // console.log(selectedChips);
  };

  const handleClickAway = () => {
    handleClose({ type: "send" });
  };

  const SenderAddress = watch("SenderAddress");
  const RecieverAddress = watch("ReceiverAddress");

  const fetchSuggestions = async (value, field) => {
    if (value.length > 2) {
      try {
        const response = await axios.get(`${baseUrl}googlemaps/autocomplete`, {
          params: {
            input: value,
          },
        });
        // console.log(response);
        const data = response.data;

        if (field === "SenderAddress") {
          setSenderSuggestions(data);
        } else {
          setRecieverSuggestions(data);
        }
        setFocusedField(field);
      } catch (error) {
        console.log("Error Fetching Suggestions ", error);
      }
    } else {
      setSenderSuggestions([]);
      setRecieverSuggestions([]); //
    }
  };

  // Handle input change for pickup and delivery
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Fetch suggestions based on the field in focus
    fetchSuggestions(value, field);
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion) => {
    if (focusedField === "SenderAddress") {
      setValue("SenderAddress", suggestion.description); // Set pickup address in the form
      // setOriginPlaceId(suggestion.placeId);
      const result = await getAddress(
        `${baseUrl}googlemaps/addressfromplaceid?placeid=${suggestion.placeId}`,
        auth.accessToken
      );
      // console.log(result.data?.Address);
      dispatch({ type: "pickUpAddress", payload: result.data?.Address });
    } else if (focusedField === "RecieverAddress") {
      setValue("ReceiverAddress", suggestion.description); // Set delivery address in the form
      // setDestinationPlaceId(suggestion.placeId);
      const result = await getAddress(
        `${baseUrl}googlemaps/addressfromplaceid?placeid=${suggestion.placeId}`,
        auth.accessToken
      );
      // console.log(result.data?.Address);
      dispatch({ type: "deliveryAddress", payload: result.data?.Address });
    }
    setSenderSuggestions([]);
    setRecieverSuggestions([]); // Clear suggestions after selection
  };

  const handleCurrentInfo = () => {
    setValue("SenderName", `${auth.FirstName} ${auth.LastName}`);
    setValue("SenderPhone", `${auth.PhoneNumber}`);
  };

  // const { distance, duration, error, loading } = useDistance(
  //   originPlaceId,
  //   destinationPlaceId,
  //   `${baseUrl}googlemaps/distancewithplaceid`,
  //   auth.accessToken
  // );

  const {
    deliveryFee,
    loading: feeLoading,
    error: feeError,
  } = useDeliveryFee(Math.ceil(state.distance));

  const createAddress = async (address) => {
    address.UserId = auth.Id;
    const formData = new FormData();
    Object.entries(address).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await post(
      `${baseUrl}address/create`,
      formData,
      auth.accessToken
    );
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

  const createLogistics = async (logistics) => {
    //  const formData = new FormData();
    //  Object.entries(logistics).forEach(([key, value]) => {
    //    formData.append(key, value);
    //  });

    const res = await post(url, logistics, auth.accessToken);
    if (res.error) {
      cartDispatch({
        type: "error",
        payload: "Error Creating logistics data ",
      });
      return null;
    }

    return res.data;
  };

  const handleSend = async (data) => {
    setLoading(true);

    try {
      selectedChips.forEach((chip) => {
        if (!data.Item) {
          data.Item = chip;
        } else {
          data.Item = `${data.Item} and ${chip}`;
        }
      });

      const pickUpAddressRes = state.pickUpAddress.Id
        ? state.pickUpAddress
        : await createAddress(state.pickUpAddress);
      //console.log(pickUpAddressRes.Id);
      if (!pickUpAddressRes) {
        return;
      }

      const deliveryAddressRes = state.deliveryAddress.Id
        ? state.deliveryAddress
        : await createAddress(state.deliveryAddress);
     // console.log(deliveryAddressRes.Id);
      if (!deliveryAddressRes) {
        return;
      }

      const order = {
        CustomerId: auth.Id,
        Type: "Logistics",
        Instruction: " ",
      };

      const res = await post(`${baseUrl}order/create`, order, auth.accessToken);
      if (res.error) {
        cartDispatch({ type: "error", payload: res.error });

        return;
      }

      data.OrderId = res.data?.Id;

      const logistics = {
        SenderAddressId: pickUpAddressRes?.Id,
        ReceiverAddressId: deliveryAddressRes?.Id,
        SenderName: data.SenderName,
        SenderPhone: data.SenderPhone,
        ReceiverName: data.ReceiverName,
        ReceiverPhone: data.ReceiverPhone,
        ItemDescription: data.ItemDescription,
        Item: data.Item,
        OrderId: res.data?.Id,
      };

      //console.log(logistics);

      const response = await createLogistics(logistics);
      //console.log(response);
      if (!response) {
        return;
      }

      const delivery = {
        PickUpAddressId: pickUpAddressRes?.Id,
        DeliveryAddressId: deliveryAddressRes?.Id,
        OrderId: data.OrderId,
        DeliveryFee: deliveryFee,
        PickupType: "Logistics",
      };
      const delResponse = await post(
        `${baseUrl}delivery/create`,
        delivery,
        auth.accessToken
      );
      if (delResponse.error) {
        cartDispatch({
          type: "error",
          payload: "Error Creating Delivery ",
        });
        setLoading(false);
        return;
      }
      cartDispatch({ type: "order", payload: res.data });
      cartDispatch({ type: "amount", payload: deliveryFee });
      cartDispatch({ type: "deliveryFee", payload: deliveryFee });
      cartDispatch({ type: "total", payload: deliveryFee });
      cartDispatch({ type: "checkOut", payload: deliveryFee });
      //localStorage.setItem("delivery", JSON.stringify(delivery));
      handleClose({ type: "send" });
    } catch (error) {
      console.log(error);
      if (error.response?.status == 409) {
        cartDispatch({
          type: "error",
          payload: error?.response?.data,
        });
      } else {
        cartDispatch({
          type: "error",
          payload: error.response?.data,
        });
      }
      
    } finally {
      setLoading(false);
    }
  };

  const handlePickUpAddress = (address) => {
    // console.log("picku ran");
    setValue("SenderAddress", address.Name);
    dispatch({ type: "newPickUpAddress" });
    dispatch({ type: "pickUpAddress", payload: address });
  };

  const handleDeliveryAddress = (address) => {
    //console.log(address);
    setValue("ReceiverAddress", address.Name);
    dispatch({ type: "newDeliveryAddress" });
    dispatch({ type: "deliveryAddress", payload: address });
  };

  const handlePickUpAddressAsLocation = (address) => {
    //console.log("picku ran");
    setValue("SenderAddress", address.Name);
    //dispatch({ type: "newPickUpAddress" });
    dispatch({ type: "pickUpAddress", payload: address });
  };

  const handleDeliveryAddressAsLocation = (address) => {
    setValue("ReceiverAddress", address.Name);
    // dispatch({ type: "newDeliveryAddress" });
    dispatch({ type: "deliveryAddress", payload: address });
  };

  useEffect(() => {
    if (state.pickUpAddress && state.deliveryAddress) {
      const distance = calculateDistance(
        {
          lat: state.pickUpAddress?.Latitude,
          lng: state.pickUpAddress?.Longitude,
        },
        {
          lat: state.deliveryAddress?.Latitude,
          lng: state.deliveryAddress?.Longitude,
        }
      );
      dispatch({ type: "distance", payload: distance });
      console.log(distance);
    }
  }, [state.pickUpAddress, state.deliveryAddress, calculateDistance]);

  //  console.log(state.pickUpAddress);
  //  console.log(state.deliveryAddress);
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "send" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-auto outline-none absolute top-10 md:top-0  z-50 justify-center items-center  w-full "
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="flex flex-col items-center justify-center px-6   mx-auto lg:py-0 h-svh ">
            <div className="w-full bg-primary rounded-lg shadow  lg:w-1/2 md:mt-0  xl:p-0 dark:bg-darkMenu dark:text-primary overflow-y-auto  pb-10 ">
              <div className="flex justify-between relative items-center p-4  ">
                <button
                  type="button"
                  onClick={() => {
                    handleClose({ type: "send" });
                  }}
                  className="text-gray-400 bg-transparent hover:bg-graybg hover:text-gray-900 rounded-full border-2 border-gray text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-darkBg dark:text-primary">
                  Send Package
                </h1>
                {cartState.error && (
                  <p className="text-redborder"> {cartState.error} </p>
                )}
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleSend)}
                >
                  <div className="grid gap-4 mb-4  grid-cols-2">
                    <div className="col-span-2 ">
                      <fieldset className="border-2 rounded-lg dark:border-graybg p-2">
                        <legend className="text-xl font-bold text-gray-800 dark:text-gray-50">
                          PickUp Address
                        </legend>

                        <div className="m-2 flex justify-between ">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({ type: "showPickUpAddresses" });
                            }}
                            className="text-base text-secondary hover:text-background cursor-pointer"
                          >
                            Choose Existing Address
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({ type: "newPickUpAddress" });
                            }}
                            className="text-base text-background hover:text-secondary cursor-pointer"
                          >
                            Add new Address
                          </button>
                        </div>
                        <div
                          className={`${
                            state.showPickUpAddresses ? "block" : "hidden"
                          }  mb-4`}
                        >
                          <ChooseAddressModal
                            handleAddress={handlePickUpAddress}
                          />
                        </div>
                        <div
                          className={`flex ${
                            state.newPickUpAddress ? "block" : "hidden"
                          } `}
                        >
                          <span
                            className={` text-gray "flex"
                           justify-center items-center relative cursor-pointer `}
                            title="use current location"
                            onClick={() =>
                              handlePickUpAddressAsLocation(location.address)
                            }
                          >
                            <svg
                              className="w-8 h-10 text-background hover:text-secondary  absolute ml-2 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                              />
                            </svg>
                          </span>
                          <input
                            type="text"
                            name="pickup"
                            id="pickup"
                            {...register("SenderAddress", { required: true })}
                            className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter Pick up address"
                            required=""
                            onChange={(e) =>
                              handleInputChange(e, "SenderAddress")
                            }
                          />
                        </div>
                        {errors.SenderAddress && (
                          <p className="text-sm text-redborder">
                            Pick up address is required
                          </p>
                        )}
                      </fieldset>
                    </div>

                    {/* Address Suggestions */}
                    {senderSuggestions.length > 0 && (
                      <ul className="list-none col-span-2 text-accent rounded-lg dark:bg-darkMenu">
                        {senderSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer text-accent dark:text-primary p-2 rounded-lg border mb-1 dark:hover:bg-darkHover"
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="col-span-2">
                      <fieldset className="border-2 rounded-lg dark:border-graybg p-2">
                        <legend className="text-xl font-bold text-gray-800 dark:text-gray-50">
                          Delivery Address
                        </legend>

                        <div className="m-2 flex justify-between ">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({ type: "showDeliveryAddresses" });
                            }}
                            className="text-base text-secondary hover:text-background cursor-pointer"
                          >
                            Choose Existing Address
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch({ type: "newDeliveryAddress" });
                            }}
                            className="text-base text-background hover:text-secondary cursor-pointer"
                          >
                            Add new Address
                          </button>
                        </div>
                        <div
                          className={`${
                            state.showDeliveryAddresses ? "block" : "hidden"
                          } border-2 rounded-lg border-graybg mb-4`}
                        >
                          <ChooseAddressModal
                            handleAddress={handleDeliveryAddress}
                          />
                        </div>
                        <div
                          className={`flex ${
                            state.newDeliveryAddress ? "block" : "hidden"
                          } `}
                        >
                          <span
                            className={` text-gray "flex"
                           justify-center items-center relative cursor-pointer  `}
                            onClick={() =>
                              handleDeliveryAddressAsLocation(location.address)
                            }
                          >
                            <svg
                              className="w-8 h-10 text-background hover:text-secondary absolute ml-2 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                              />
                            </svg>
                          </span>
                          <input
                            type="text"
                            name="delivery"
                            id="delivery"
                            {...register("ReceiverAddress", { required: true })}
                            className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter Delivery Address"
                            required=""
                            onChange={(e) =>
                              handleInputChange(e, "RecieverAddress")
                            }
                          />
                        </div>
                        {errors.ReceiverAddress && (
                          <p className="text-sm text-redborder">
                            Delivery address is required
                          </p>
                        )}
                      </fieldset>
                    </div>

                    {/* Address Suggestions */}
                    {recieverSuggestions.length > 0 && (
                      <ul className="list-none col-span-2 text-accent rounded-lg dark:bg-darkMenu">
                        {recieverSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer text-accent dark:text-primary p-2 rounded-lg border mb-1 dark:hover:bg-darkHover"
                            // style={{
                            //     cursor: 'pointer',
                            //     padding: '8px',
                            //     borderBottom: '1px solid #ccc',
                            //     backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                            // }}
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="col-span-2">
                      <p className="bg-lightForest rounded-xl p-2 text-accent ">
                        {" "}
                        {/* {
                          feeLoading && <LoadingGif />
                        } */}
                        {deliveryFee && (
                          <span> Delivery Fee : &#8358;{deliveryFee} </span>
                        )}
                        {feeError && (
                          <span className="text-redborder">
                            Couldn't Calculate Delivery Fee
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <fieldset className="border-2 rounded-lg w-full dark:border-graybg p-2">
                        <legend className="text-2xl font-bold col-span-2">
                          {" "}
                          Sender Information{" "}
                        </legend>
                        <div className="col-span-2">
                          <label
                            htmlFor="sender"
                            className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                          >
                            Sender Name
                          </label>
                          <input
                            type="text"
                            name="sender"
                            id="sender"
                            {...register("SenderName", { required: true })}
                            className="bg-lightGray border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter Sender Name"
                            required=""
                          />
                          {errors.SenderName && (
                            <p className="text-sm text-redborder">
                              Sender name is required
                            </p>
                          )}
                        </div>
                        <div className="col-span-2">
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                          >
                            Phone Number
                          </label>
                          <input
                            type="phone"
                            name="phone"
                            id="phone"
                            {...register("SenderPhone", {
                              required: true,
                              minLength: 11,
                            })}
                            className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="08122334455"
                            required=""
                          />
                          {errors.SenderPhone && (
                            <p className="text-sm text-redborder">
                              Phone Number is required
                            </p>
                          )}
                        </div>
                        <div className="col-span-2">
                          <input
                            type="checkbox"
                            onChange={() => handleCurrentInfo()}
                            className="border-4 border-gray bg-lightForest"
                          />
                          <label> Use current information </label>
                        </div>
                      </fieldset>
                    </div>

                     <div className="col-span-2">
                      <fieldset className="border-2 rounded-lg w-full dark:border-graybg p-2">
                        <legend className="text-2xl font-bold col-span-2">
                          {" "}
                          Recipient Information{" "}
                        </legend>
                    
                    <div className="col-span-2">
                      <label
                        htmlFor="reciever"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Reciever Name
                      </label>
                      <input
                        type="text"
                        name="reciever"
                        id="reciever"
                        {...register("ReceiverName", { required: true })}
                        className="bg-lightGray border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Reciever Name"
                        required=""
                      />
                      {errors.ReceiverName && (
                        <p className="text-sm text-redborder">
                          Reciever name is required
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Phone Number
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        {...register("ReceiverPhone", {
                          required: true,
                          minLength: {
                            value: 11,
                            message: "Phone number must be 11 digits",
                          },
                        })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="08122334455"
                        required=""
                      />
                      {errors.ReceiverPhone && (
                        <p className="text-sm text-redborder">
                          {errors.ReceiverPhone.message}
                        </p>
                      )}
                    </div>
                      </fieldset>
                    </div>
                    

                    <div className="col-span-2">
                       <fieldset className="border-2 rounded-lg w-full dark:border-graybg p-2">
                      <legend className="py-3 text-xl font-bold">
                        {" "}
                        What do you want to send ?
                      </legend>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {options.map((option) => (
                          <Chip
                            key={option}
                            label={option}
                            clickable
                            style={{
                              backgroundColor: selectedChips.includes(option)
                                ? "#609963"
                                : "#e0e0e0",
                              color: selectedChips.includes(option)
                                ? "white"
                                : "black",
                              padding: "2px",
                              fontSize: "1rem",
                            }}
                            onClick={() => handleChipClick(option)}
                          />
                        ))}
                      </Stack>
                   
                    <div className="col-span-2 mt-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-50"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        name="description"
                        {...register("ItemDescription")}
                        className="block p-2.5 w-full text-base text-accent bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write Service Descriptions here"
                      ></textarea>
                        </div>
                      </fieldset>
                      </div>

                    <div className="col-span-2">
                      <p className="bg-lightForest rounded-xl p-2 text-accent ">
                        {" "}
                        Total : &#8358;{deliveryFee}
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-accent bg-background flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {loading ? <LoadingGif /> : " Proceed "}
                  </button>
                  {cartState.error && (
                    <p className="text-redborder"> {cartState.error} </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Modal>
  );
};

export default SendPackage;
