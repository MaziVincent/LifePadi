import { Modal } from "@mui/material";
<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { ClickAwayListener } from "@mui/material";
import LoadingGif from "../shared/LodingGif";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import baseUrl from "../../api/baseUrl";
import axios from "axios";
import usePost from "../../hooks/usePost";
import { useDistance } from "../../hooks/useDistance";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

const SendPackage = ({ dispatch, open }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });
  const { auth } = useAuth();
  const post = usePost();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [selectedChips, setSelectedChips] = useState([]);
  const [senderSuggestions, setSenderSuggestions] = useState([]);
  const [recieverSuggestions, setRecieverSuggestions] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
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

    console.log(selectedChips);
  };

  const handleClickAway = () => {
    dispatch({ type: "send" });
  };

  const SenderAddress = watch("SenderAddress");
  const RecieverAddress = watch("RecieverAddress");

  const fetchSuggestions = async (value, field) => {
    if (value.length > 2) {
      console.log(value);
      try {
        const response = await axios.get(`${baseUrl}googlemaps/autocomplete`, {
          params: {
            input: value,
          },
        });
        console.log(response);
        const data = response.data.predictions;

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
  const handleSuggestionClick = (suggestion) => {
    if (focusedField === "SenderAddress") {
      setValue("SenderAddress", suggestion.description); // Set pickup address in the form
    } else if (focusedField === "RecieverAddress") {
      setValue("RecieverAddress", suggestion.description); // Set delivery address in the form
    }
    setSenderSuggestions([]);
    setRecieverSuggestions([]); // Clear suggestions after selection
  };

  const handleCurrentInfo = () => {
    setValue("SenderName", `${auth.FirstName} ${auth.LastName}`);
    setValue("SenderPhone", `${auth.PhoneNumber}`);
  };

  const { distance, duration, error, loading } = useDistance(
    SenderAddress,
    RecieverAddress
  );
  //console.log(distance)

  useEffect(() => {
    if (distance) {
      setDeliveryFee(Math.trunc((distance / 1000) * 300));
    }
  });

  const handleSend = async (data) => {
    selectedChips.forEach((chip) => {
      if (!data.Item) {
        data.Item = chip;
      } else {
        data.Item = `${data.Item} and ${chip}`;
      }
    });
<<<<<<< HEAD
//console.log(data);
=======

>>>>>>> 56c4b95 (completed logistics)
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

    console.log(res);

    data.OrderId = res.data.Id;

    const response = await post(url, data, auth.accessToken);
    if (response.error) {
      cartDispatch({
        type: "error",
        payload: "Error Creating logistics data ",
      });
      return;
    }
<<<<<<< HEAD
    //console.log(response);

    const delivery = {
      PickupAddress: SenderAddress,
      DeliveryAddress: RecieverAddress,
      OrderId: res.data?.Id,
      DeliveryFee: deliveryFee,
      PickupType: "Logistics",
    };
=======
    console.log(response);
>>>>>>> 56c4b95 (completed logistics)

    cartDispatch({ type: "order", payload: res.data });
    cartDispatch({ type: "amount", payload: deliveryFee });
    cartDispatch({ type: "deliveryFee", payload: deliveryFee });
    cartDispatch({ type: "total", payload: deliveryFee });
    cartDispatch({ type: "checkOut", payload: deliveryFee });
<<<<<<< HEAD
    localStorage.setItem("delivery", JSON.stringify(delivery));
=======
>>>>>>> 56c4b95 (completed logistics)
    dispatch({ type: "send" });
  };

  // console.log(auth)
  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch({ type: "send" });
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
<<<<<<< HEAD
          <div className="flex flex-col items-center justify-center px-6   mx-auto lg:py-0 h-svh ">
=======
          <div className="flex flex-col items-center justify-center px-6   mx-auto lg:py-0 h-screen ">
>>>>>>> 56c4b95 (completed logistics)
            <div className="w-full bg-primary rounded-lg shadow  lg:w-1/2 md:mt-0  xl:p-0 dark:bg-darkMenu dark:text-primary overflow-y-auto  pb-10 ">
              <div className="flex justify-between relative items-center p-4  ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "send" });
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
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-darkBg dark:text-primary">
                  Send Package
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleSend)}
                >
                  <div className="grid gap-4 mb-4  grid-cols-2">
                    <div className="col-span-2 ">
                      <label
                        htmlFor="pickup"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Pick up address
                      </label>
                      <div className="flex ">
                        <span
                          className={` text-gray "flex"
                           justify-center items-center relative `}
                        >
                          <svg
                            className="w-8 h-10 text-background absolute ml-2 dark:text-white"
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
=======

const sendPackage = () => {
    return ( 
        <Modal
        open={reg}
        onClose={() => {
          setRegister(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <!-- Main modal --> */}
        <div
          id="defaultModal"
          className=" overflow-y-auto overflow-x-auto absolute top-10 md:top-0  z-50 justify-center items-center  w-full "
        >
          <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-screen ">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="w-full bg-primary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu dark:text-primary overflow-y-auto max-h-screen pb-10 ">
                <div className="flex justify-between items-center p-4 sticky top-0 ">
                  <button
                    type="button"
                    onClick={() => {
                      setRegister(false);
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
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-scroll">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-darkBg md:text-2xl dark:text-primary">
                    Send Package
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(handleCreate)}
                  >
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label
                          htmlFor="fname"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Pick up address
                        </label>
>>>>>>> 07eaeb8 (logistics commit)
                        <input
                          type="text"
                          name="pickup"
                          id="pickup"
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 56c4b95 (completed logistics)
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
                    </div>

                    {/* Address Suggestions */}
                    {senderSuggestions.length > 0 && (
                      <ul className="list-none col-span-2 text-accent rounded-lg dark:bg-darkMenu">
                        {senderSuggestions.map((suggestion, index) => (
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
                      <label
                        htmlFor="delivery"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Delivery address
                      </label>
                      <div className="flex ">
                        <span
                          className={` text-gray "flex"
                           justify-center items-center relative  `}
                        >
                          <svg
                            className="w-8 h-10 text-background absolute ml-2 dark:text-white"
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
<<<<<<< HEAD
=======
                          {...register("PickUpAddress", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Pick up address"
=======
                        <input
                          type="text"
                          name="delivery"
                          id="delivery"
                          {...register("RecieverAddress", { required: true })}
                          className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter Delivery Address"
>>>>>>> 56c4b95 (completed logistics)
                          required=""
                          onChange={(e) =>
                            handleInputChange(e, "RecieverAddress")
                          }
                        />
<<<<<<< HEAD
                        {errors.PickUpAddress && (
=======
                       
                      </div>
                      {errors.RecieverAddress && (
>>>>>>> 56c4b95 (completed logistics)
                          <p className="text-sm text-redborder">
                            Delivery address is required
                          </p>
                        )}
<<<<<<< HEAD
                      </div>
  
                      <div className="sm:col-span-1">
                        <label
                          htmlFor="delivery address"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Delivery Address
                        </label>
>>>>>>> 07eaeb8 (logistics commit)
                        <input
                          type="text"
                          name="delivery"
                          id="delivery"
<<<<<<< HEAD
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
=======
>>>>>>> 56c4b95 (completed logistics)
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
                        Delivery Fee : &#8358;{deliveryFee}
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold col-span-2">
                      {" "}
                      Sender Information{" "}
                    </h2>
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
                          maxLength: 11,
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

                    <h2 className="col-span-2 font-bold text-2xl">
                      {" "}
                      Recipient Information{" "}
                    </h2>
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
<<<<<<< HEAD
                        {...register("ReceiverName", { required: true })}
=======
                        {...register("RecieverName", { required: true })}
>>>>>>> 56c4b95 (completed logistics)
                        className="bg-lightGray border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Reciever Name"
                        required=""
                      />
<<<<<<< HEAD
                      {errors.ReceiverName && (
=======
                      {errors.RecieverName && (
>>>>>>> 56c4b95 (completed logistics)
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
<<<<<<< HEAD
                        {...register("ReceiverPhone", {
=======
                        {...register("RecieverPhone", {
>>>>>>> 56c4b95 (completed logistics)
                          required: true,
                          maxLength: {
                            value: 11,
                            message: "Phone number must be 11 digits",
                          },
                        })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="08122334455"
                        required=""
                      />
<<<<<<< HEAD
                      {errors.ReceiverPhone && (
=======
                      {errors.RecieverPhone && (
>>>>>>> 56c4b95 (completed logistics)
                        <p className="text-sm text-redborder">
                          Phone Number is required
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <h3 className="py-3 text-xl font-bold">
                        {" "}
                        What do you want to send ?
                      </h3>
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
                    </div>

                    <div className="col-span-2">
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

                    <div className="col-span-2">
                      <p className="bg-lightForest rounded-xl p-2 text-accent ">
                        {" "}
                        Total : &#8358;{deliveryFee}
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
<<<<<<< HEAD
                    disabled={isSubmitting }
=======
                    disabled={isSubmitting || !isValid}
>>>>>>> 56c4b95 (completed logistics)
                    className="w-full text-accent bg-background flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting ? <LoadingGif /> : " Proceed "}
                  </button>
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
=======
                          {...register("DeliveryAddress", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Delivery Address"
                          required=""
                        />
                        {errors.DeliveryAddress && (
                          <p className="text-sm text-redborder">
                            Delivery Address is required
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phoneNumber"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          {...register("PhoneNumber", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="08112341234"
                          required
                        />
                        {errors.PhoneNumber && (
                          <p className="text-sm text-redborder">
                            Phone Number is required
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          {...register("Email", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="emailaddress@email.com"
                          required=""
                        />
                        {errors.Email && (
                          <p className="text-sm text-redborder">
                            Email is required
                          </p>
                        )}
                        {error && (
                          <p className="text-sm text-redborder">{error}</p>
                        )}
                      </div>
  
                      <div className="sm:col-span-2 ">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Password
                        </label>
                        <div className="flex">
                          <input
                            type={type}
                            name="password"
                            id="password"
                            {...register("Password", {
                              required: "Password is required",
                              minLength: {
                                value: 4,
                                message: "Password must be at least 4 characters",
                              },
                            })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:text-accent dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Password"
                            required
                          />
                          <span onClick={handleToggle} className={` text-gray ${icon ? 'hidden' : 'flex'} justify-center items-center  `}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white absolute mr-10"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </span>
                          <span onClick={handleToggle} className={` text-gray ${icon ? 'flex' : 'hidden'} justify-center items-center  `}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white absolute mr-10"
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
                                d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </span>
                        </div>
  
                        {errors.Password && (
                          <p className="text-sm text-redborder">
                            {errors.Password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="w-full text-white bg-secondary flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {isSubmitting || isLoading ? <LoadingGif /> : " Sign Up"}
                    </button>
                  </form>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </Modal>
     );
}
 
export default sendPackage;
>>>>>>> 07eaeb8 (logistics commit)
