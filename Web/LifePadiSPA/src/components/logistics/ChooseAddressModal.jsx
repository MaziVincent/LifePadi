import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useGet } from "../../hooks/useGet";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import LoadingGif from "../shared/LodingGif";
const ChooseAddressModal = ({handleAddress}) => {
  const { auth } = useAuth();
  const addressUrl = `${baseUrl}address/customer-addresses`;

  const {
    data: addresses,
    loading: addressLoading,
    error: addressError,
  } = useGet(`${addressUrl}/${auth.Id}`);
  console.log(addresses);
  const handleChange = (e, ad) => {
    handleAddress(ad);
  }
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
          className=" flex gap-3 text-gray text-sm border-2 border-graybg rounded-lg px-5 py-2"
        >
          {" "}
          <input
            type="radio"
            name="address"
            id={`address${ad.Id}`}
            value={`${ad.Name}, ${ad.Town}, ${ad.City}`}
            onChange={(e) => handleChange(e, ad)
            }
          />
          <label htmlFor={`address${ad.Id}`}>
            {" "}
            {ad.Name} {ad.Town}
          </label>
        </div>
      ))}
      <div>
        {addresses?.length < 1 && (
          <div className="flex justify-center items-center">
            <p className="text-center text-gray">You have no saved address</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAddressModal;
