import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useGet } from "../../hooks/useGet";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import LoadingGif from "../shared/LodingGif";
const ChooseAddressModal = () => {
  const { auth } = useAuth();
  const addressUrl = `${baseUrl}address/customer-addresses`;

  const {
    data: addresses,
    loading: addressLoading,
    error: addressError,
  } = useGet(`${addressUrl}/${auth.Id}`);

  return (
   
            <div className=" w-full bg-cover overflow-y-auto overflow-x-hidden justify-center pb-8">
              {addressLoading && (
                <div className="flex justify-center items-center">
                  {" "}
                  <LoadingGif />{" "}
                </div>
              )}
              {addresses?.map((ad) => (
                <div
                  key={ad.Id}
                  className=" flex gap-3 text-gray text-sm rounded-lg px-5 py-2"
                >
                  {" "}
                  <input
                    type="radio"
                    name="address"
                    id={`address${ad.Id}`}
                    value={`${ad.Name}, ${ad.Town}, ${ad.City}`}
                    onChange={(e) => {
                     // handleClick(e);
                      //handleDeliveryAddress(e)
                    }}
                  />
                  <label htmlFor={`address${ad.Id}`}>
                    {" "}
                    {ad.Name} {ad.Town}
                  </label>
                </div>
              ))}

              {/* <div className="text-sm flex justify-between px-2 py-2">
                <button
                  onClick={() => handleLocation()}
                  className="text-background border p-2 rounded-xl border-gray cursor-pointer"
                >
                  {" "}
                  Use Current Location{" "}
                </button>
                <button
                  onClick={() => handleNewAddress({ type: "edit" })}
                  className="text-background border p-2 rounded-xl border-gray cursor-pointer"
                >
                  {" "}
                  Add new Address{" "}
                </button>
              </div> */}
            </div>
        
  );
};

export default ChooseAddressModal;
