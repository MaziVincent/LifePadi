import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";

const AddAddressModal = ({ open, handleClose }) => {
  const [states, setStates] = useState([]);
  const [lga, setLGAs] = useState([]);
  const fetch = useFetch();
  const post = usePost();
  const {auth} = useAuth();
  const url = `${baseUrl}address/create`
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const create = async (data) => {
    const formData = new FormData()

    for(const key in data){
      formData.append(key, data[key])
    }
    const response = await post(url, formData, auth?.accessToken);
    console.log(response);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries("addresses");
      toast.success("Address Added Successfully");
      reset();
      handleClose({ type: "edit" });
    },
  });

  const handleCreate = (address) => {

    const data = {...address, UserId: auth?.Id}
   console.log(data)
    mutate(data);
  };

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

      //console.log(result.data);
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
        className=" overflow-y-auto overflow-x-hidden absolute top-14 md:top-0  z-55 justify-center items-center  w-full  h-full "
      >
        <Toaster />

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
<<<<<<< HEAD
          <div className="w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md  dark:bg-darkMenu  dark:text-primary overflow-y-auto ">
=======
          <div className="w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu overflow-y-auto ">
>>>>>>> 0ab4b1c (Google Maps Controller)
            <div className="flex justify-between items-center   ">
              <button
                type="button"
                onClick={() => {
                  handleClose({ type: "edit" });
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
            <form className="" onSubmit={handleSubmit(handleCreate)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-50"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows="2"
                    name="address"
                    {...register("Name", { required: true })}
                    className="block p-2.5 w-full text-base text-grayTxt bg-graybg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter house number and street name "
                  ></textarea>
                  {errors.Name && (
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
                    placeholder="Type Your Town"
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
                    {...register("City", {
                      required: true,
                    })}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your City"
                    required=""
                  />
                  {errors.City && (
                    <p className="text-sm text-red">City is required</p>
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
                    htmlFor="lga"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Local Govt. Area
                  </label>
                  <select
                    id="lga"
                    name="lga"
                    {...register("LocalGovt", {
                      required: "Local govt is required",
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
                      Select LGA
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

                  {errors.LocalGovt && (
                    <span className="text-sm text-red">
                      {errors.LocalGovt.message}
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
          <div className="sm:col-span-2">

                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full text-white bg-secondary flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting  ? (
                      <>
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 text-graybg animate-spin dark:text-darkHover fill-background"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </>
                    ) : (
                      " Submit"
                    )}
                  </button>
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
