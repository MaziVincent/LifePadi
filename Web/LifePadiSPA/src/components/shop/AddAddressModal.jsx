import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";

const AddAddressModal = ({ open, handleClose }) => {
    const [states, setStates] = useState([]);
  const [lga, setLGAs] = useState([]);
  const fetch = useFetch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
      } = useForm({
        mode: "all",
      });

      useEffect(() => {
        const getStates = async () => {
          const result = await fetch("https://nga-states-lga.onrender.com/fetch");
          setStates(result.data);
          //console.log(result.data);
        };
    
        getStates();
      }, []);
    
      const handleStateChange = (e) => {
        e.preventDefault();
        const getLGAs = async (state) => {
          const result = await fetch(
            `https://nga-states-lga.onrender.com/?state=${state}`
          );
    
          console.log(result.data)
          setLGAs(result.data);
        };
        getLGAs(e.target.value);
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
        className=" overflow-y-auto overflow-x-hidden absolute top-14 md:top-0  z-55 justify-center items-center  w-full  h-auto "
      >
        <Toaster />

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
          <div className="w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu ">
            <div className="flex justify-between items-center   ">
              <button
                type="button"
                onClick={() => {
                  handleClose({type:"edit"});
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
            <h1 className="text-xl font-bold mb-5 text-center leading-tight tracking-tight text-darkBg md:text-2xl dark:text-primary">
                    Enter your Address Information
                  </h1>
            <form className="">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-50"
                  >
                    Contact Address
                  </label>
                  <textarea
                    id="address"
                    rows="4"
                    name="address"
                    {...register("ContactAddress", { required: true })}
                    className="block p-2.5 w-full text-base text-grayTxt bg-graybg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter house number and street name "
                  ></textarea>
                  {errors.ContactAddress && (
                    <p className="text-sm text-red">Address is required</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="town"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Town
                  </label>
                  <input
                    type="text"
                    name="town"
                    id="town"
                    {...register("Town", {
                      required: true,
                    })}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Town of Vendor"
                    required=""
                  />
                  {errors.Town && (
                    <p className="text-sm text-red">Town is required</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    {...register("Town", {
                      required: true,
                    })}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Town of Vendor"
                    required=""
                  />
                  {errors.Town && (
                    <p className="text-sm text-red">Town is required</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    {...register("State", {
                      required: "State is required",
                    })}
                    defaultValue={"default"}
                    onChange={(e, value) => handleStateChange(e)}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                    >
                      Select State
                    </option>

                    {states?.map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>

                  {errors.State && (
                    <span className="text-sm text-red">
                      {errors.State.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                     Local Govt. Area
                  </label>
                  <select
                    id="state"
                    name="state"
                    {...register("City", {
                      required: "City is required",
                    })}
                    defaultValue={"default"}
                    className="text-grayTxt bg-graybg border border-gray-300  text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                      selected
                    >
                      Select City/LGA
                    </option>

                    {lga.map((lga) => (
                      <option
                        key={lga}
                        value={lga}
                      >
                        {lga}
                      </option>
                    ))}
                  </select>

                  {errors.City && (
                    <span className="text-sm text-red">
                      {errors.City.message}
                    </span>
                  )}
                </div>

               

                <div className="sm:col-span-1">
                  <label
                    htmlFor="code"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    {...register("PostalCode")}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Postal Code of Vendor"
                  />
                  {/* {errors.PostalCode && (
            <p className="text-sm text-red-400">
              Postal Code is required
            </p>
          )} */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
