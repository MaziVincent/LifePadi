import { Modal } from "@mui/material";
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

const RecievePackage = ({ dispatch, open }) => {
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
  const [receiverSuggestions, setReceiverSuggestions] = useState([]);
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

   // console.log(selectedChips);
  };

  const handleClickAway = () => {
    dispatch({ type: "recieve" });
  };

  const SenderAddress = watch("SenderAddress");
  const ReceiverAddress = watch("ReceiverAddress");

  const fetchSuggestions = async (value, field) => {
    if (value.length > 2) {
     // console.log(value);
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
          setReceiverSuggestions(data);
        }
        setFocusedField(field);
      } catch (error) {
        console.log("Error Fetching Suggestions ", error);
      }
    } else {
      setSenderSuggestions([]);
      setReceiverSuggestions([]); //
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
    } else if (focusedField === "ReceiverAddress") {
      setValue("ReceiverAddress", suggestion.description); // Set delivery address in the form
    }
    setSenderSuggestions([]);
    setReceiverSuggestions([]); // Clear suggestions after selection
  };

  const handleCurrentInfo = () => {
    setValue("ReceiverName", `${auth.FirstName} ${auth.LastName}`);
    setValue("ReceiverPhone", `${auth.PhoneNumber}`);
  };

  const { distance, duration, error, loading } = useDistance(
    SenderAddress,
    ReceiverAddress
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
    console.log(response);

    const delivery = {
        PickupAddress: SenderAddress,
        DeliveryAddress: ReceiverAddress,
        OrderId: res.data?.Id,
        DeliveryFee: deliveryFee,
        PickupType: "Logistics",
      };

    cartDispatch({ type: "order", payload: res.data });
    cartDispatch({ type: "amount", payload: deliveryFee });
    cartDispatch({ type: "deliveryFee", payload: deliveryFee });
    cartDispatch({ type: "total", payload: deliveryFee });
    cartDispatch({ type: "checkOut", payload: deliveryFee });
    localStorage.setItem("delivery", JSON.stringify(delivery));
    dispatch({ type: "send" });
  };

  // console.log(auth)
  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch({ type: "recieve" });
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
                    dispatch({ type: "recieve" });
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
                <h1 className="text-2xl text-center pb-3 font-bold leading-tight tracking-tight text-darkBg  dark:text-primary">
                  Recieve Package
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
                        <input
                          type="text"
                          name="delivery"
                          id="delivery"
                          {...register("ReceiverAddress", { required: true })}
                          className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter Delivery Address"
                          required=""
                          onChange={(e) =>
                            handleInputChange(e, "ReceiverAddress")
                          }
                        />
                      </div>
                      {errors.ReceiverAddress && (
                        <p className="text-sm text-redborder">
                          Delivery address is required
                        </p>
                      )}
                    </div>

                    {/* Address Suggestions */}
                    {receiverSuggestions.length > 0 && (
                      <ul className="list-none col-span-2 text-accent rounded-lg dark:bg-darkMenu">
                        {receiverSuggestions.map((suggestion, index) => (
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
                        htmlFor="receiver"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Receiver Name
                      </label>
                      <input
                        type="text"
                        name="receiver"
                        id="receiver"
                        {...register("ReceiverName", { required: true })}
                        className="bg-lightGray border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Receiver Name"
                        required=""
                      />
                      {errors.ReceiverName && (
                        <p className="text-sm text-redborder">
                          Receiver name is required
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
                          maxLength: {
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
                    disabled={isSubmitting || !isValid}
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

export default RecievePackage;
