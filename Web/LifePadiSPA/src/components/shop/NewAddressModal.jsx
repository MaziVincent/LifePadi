import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import useCart from "../../hooks/useCart";
import usePost from "../../hooks/usePost";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import LoadingGif from "../shared/LodingGif";
import axios from "axios";
import useAddressFromPlaceId from "../../hooks/useAddressFromPlaceId";

const NewAddressModal = ({ open, handleClose }) => {
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseUrl}address/create`;
  const queryClient = useQueryClient();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAddress = useAddressFromPlaceId();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const create = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await post(url, formData, auth?.accessToken);
    console.log(response);
    if (response.error) {
      toast.error("Error adding address");
      return;
    }
     //cartDispatch({ type: "deliveryAddress", payload: response.data?.Address });
  };

  const { mutate } = useMutation(create, {
    onSuccess: (data) => {
      
      queryClient.invalidateQueries("addresses");
      toast.success("Address Added Successfully");
      reset();
      handleClose({ type: "edit" });
    },
  });

  const handleCreate = (add) => {
    const data = { ...address, Name:add.Address, UserId: auth?.Id };
    console.log(data);
    mutate(data);
  };
    
    const fetchSuggestions = async (value, field) => {
      if (value.length > 2) {
        try {
          const response = await axios.get(
            `${baseUrl}googlemaps/autocomplete`,
            {
              params: {
                input: value,
              },
            }
          );
         // console.log(response);
          const data = response.data;

            setSuggestions(data);

        } catch (error) {
          console.log("Error Fetching Suggestions ", error);
        }
      } else {
        setSuggestions([]); //
      }
    };

     const handleInputChange = (e, field) => {
       const value = e.target.value;

       // Fetch suggestions based on the field in focus
       fetchSuggestions(value, field);
     };

     // Handle suggestion click
     const handleSuggestionClick = async (suggestion) => {
       
         setValue("Address", suggestion.description); // Set pickup address in the form
         // setOriginPlaceId(suggestion.placeId);
         const result = await getAddress(
           `${baseUrl}googlemaps/addressfromplaceid?placeid=${suggestion.placeId}`,
           auth.accessToken
         );      
        // console.log(result.data?.Address);
        setAddress(result.data?.Address);
       setSuggestions([]); // Clear suggestions after selection
     };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "edit" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-14 md:top-0  z-55 justify-center items-center  w-full  h-full "
      >
        <Toaster />

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-auto bg-primary dark:bg-darkBg rounded-lg shadow-lg">
            <div className="flex justify-between items-center   ">
              <button
                type="button"
                onClick={() => {
                  handleClose({ type: "edit" });
                }}
                className="text-gray bg-transparent hover:bg-graybg hover:text-graybg rounded-full border-2 border-gray text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            {/* 
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-darkBg dark:text-primary">
              Send Package
            </h1> */}
            {cartState.error && (
              <p className="text-redborder"> {cartState.error} </p>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleCreate)}
            >
              <div className="grid gap-4 mb-4  grid-cols-2">
                <div className="col-span-2 ">
                  <fieldset className="border-2 rounded-lg dark:border-graybg p-2">
                    <legend className="text-xl font-bold text-gray dark:text-lightGray">
                      Delivery Address
                    </legend>

                    <div className={`flex  `}>
                      <span
                        className={` text-gray "flex"
                           justify-center items-center relative cursor-pointer `}
                        title="use current location"
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
                        name="address"
                        id="address"
                        {...register("Address", { required: true })}
                        className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="What is your address?"
                        required=""
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    {errors.Address && (
                      <p className="text-sm text-redborder">
                        delivery address is required
                      </p>
                    )}
                  </fieldset>
                </div>

                {/* Address Suggestions */}
                {suggestions.length > 0 && (
                  <ul className="list-none col-span-2 text-accent rounded-lg dark:bg-darkMenu">
                    {suggestions.map((suggestion, index) => (
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
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-accent bg-background flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <LoadingGif /> : " Proceed "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewAddressModal;
