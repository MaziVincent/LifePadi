import Modal from "@mui/material/Modal";
<<<<<<< HEAD
import { set, useForm } from "react-hook-form";
=======
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
>>>>>>> 1bc8dd0 (still working on register)
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import VerifyCode from "./VerifyCode";
//import useCart from "../../hooks/useCart";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import LoadingGif from "../shared/LodingGif";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
const Register = () => {
  const {
    reg,
    setRegister,
    setLogin,
<<<<<<< HEAD
    verify,
    setVerify,
    regData,
    setRegData,
    verificationInfo,
    setVerificationInfo,
  } = useAuth();
=======
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
const Register = () => {
  const { reg, setRegister, verify, setVerify } = useAuth();
>>>>>>> eda1965 (User Dashboard and Landing Page)
  //const {dispatch} = useCart();
  const post = usePost();
  const url = `${baseUrl}customer/send-otp`;
=======
=======
import LoadingGif from "../shared/LodingGif";
>>>>>>> 074a7e6 (complete register)
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
const Register = () => {
  const {
    reg,
    setRegister,
=======
>>>>>>> a061db6 (phone login)
    verify,
    setVerify,
    regData,
    setRegData,
    verificationCode,
    setVerificationCode
  } = useAuth();
  //const {dispatch} = useCart();
  const post = usePost();
  const url = `${baseUrl}customer/create`;
>>>>>>> 1bc8dd0 (still working on register)
  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
=======
  const [error, setError] = useState("")
>>>>>>> 1bc8dd0 (still working on register)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a061db6 (phone login)

  const sendOTP = async (phoneNumber) => {
    const unformated = phoneNumber.slice(1);
    const formated = `234${unformated}`;

    try {
      const formData = new FormData();
      formData.append("phoneNumber", formated);
      const response = await post(url, formData, " ");
      // console.log(response)

<<<<<<< HEAD
      if (response.status == 200 || response.data.status == "200") {
=======
    try{

    const formData = new FormData()
    formData.append("phoneNumber", formated)
    const response = await post(url, formData ," ")
   // console.log(response)

      if(response.status == 200 || response.data.status == "200"){
>>>>>>> 5e0ac5f (edited customer create)
        setVerificationInfo(response.data);
        setVerify(true);
        setIsLoading(false);
        reset();
      } else {
        setError("Error Sending OTP");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("Error Sending  OTP");
      setIsLoading(false);
=======
const verifyEmail = async (email) => {
  const formData = new FormData();
  formData.append("Email", email)
  const response = await post(`${baseUrl}customer/verifyEmail`, formData, "");
  if(response.error){
    setError(response.error);
    setIsLoading(false);
  }else{
    setVerificationCode(response.data.Code)
    setVerify(true)
    setIsLoading(false);
  }
  
}

  const create = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
>>>>>>> 1bc8dd0 (still working on register)
    }
  };

<<<<<<< HEAD
  const checkForEmailAndPhone = async (email, phone) => {

<<<<<<< HEAD
    setPhoneError("")
    setEmailError("")

    const data = {
      Email: email,
      PhoneNumber: phone,
    };
    try {
      const response = await post(
        `${baseUrl}customer/check-user-exists`,
        data,
        ""
      );
      console.log(response);
      if (response.error?.includes("Phone number already exists")) {
        setPhoneError(response.error);
        setIsLoading(false);
        return;
      } else if (response.error?.includes("Email already exists")) {
        setEmailError("Email already exists");
        setIsLoading(false);
        return;
      }
      
      if (response.status == 200 || response.data == true ) {
       sendOTP(phone)
    }
     
      setIsLoading(false);
     
    } catch (error) {
      console.error(error);
      setError("Error Sending  OTP");
      setIsLoading(false);
    }
  };

  const handleCreate = (data) => {
    setIsLoading(true);
    checkForEmailAndPhone(data.Email, data.PhoneNumber);
    // sendOTP(data.PhoneNumber);
    setRegData(data);
  };

  const handleClickAway = () => {
    setRegister(false);
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
=======
=======
  const { mutate } = useMutation(create, {
    onSuccess: () => {
>>>>>>> 1bc8dd0 (still working on register)
      setRegister(false);
      reset();
    },
    onError: () => {
      toast.error("Error completing your sign up");
    },
  });

  const handleCreate = (data) => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(data)
   // mutate(data);
    setRegister(false)
    setVerify(true)
>>>>>>> eda1965 (User Dashboard and Landing Page)
=======
    
=======
    setIsLoading(true)
>>>>>>> 074a7e6 (complete register)
    verifyEmail(data.Email);
    setRegData(data);
>>>>>>> 1bc8dd0 (still working on register)
  };

  const handleClickAway = () => {
    setRegister(false);
  };

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
<<<<<<< HEAD
        className=" overflow-y-auto overflow-x-auto absolute top-10 md:top-0  z-50 justify-center outline-none items-center  w-full "
      >
        <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-svh ">
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
                  Sign Up
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
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        {...register("FirstName", { required: true })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type First Name"
                        required=""
                      />
                      {errors.FirstName && (
                        <p className="text-sm text-redborder">
                          First Name is required
                        </p>
                      )}
                    </div>
=======
        className=" overflow-y-auto overflow-x-auto absolute top-10 md:top-0  z-50 justify-center items-center  w-full "
      >
        <Toaster />
<<<<<<< HEAD
            
            <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-screen ">
              <ClickAwayListener onClickAway={handleClickAway}>
              <div className="w-full bg-primary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu overflow-y-auto max-h-screen pb-10 ">
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
                    Sign Up
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
                          First Name
                        </label>
                        <input
                          type="text"
                          name="fname"
                          id="fname"
                          {...register("FirstName", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-grayTxt dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type First Name"
                          required=""
                        />
                        {errors.FirstName && (
                          <p className="text-sm text-redborder">
                            First Name is required
                          </p>
                        )}
                      </div>
>>>>>>> eda1965 (User Dashboard and Landing Page)

=======

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
                  Sign Up
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
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        {...register("FirstName", { required: true })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type First Name"
                        required=""
                      />
                      {errors.FirstName && (
                        <p className="text-sm text-redborder">
                          First Name is required
                        </p>
                      )}
                    </div>

>>>>>>> 1bc8dd0 (still working on register)
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="lname"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        {...register("LastName", { required: true })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Last Name"
                        required=""
                      />
                      {errors.LastName && (
                        <p className="text-sm text-redborder">
                          Last Name is required
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
<<<<<<< HEAD
                      {phoneError && (
                        <p className="text-sm text-redborder">{phoneError}</p>
                      )}
=======
>>>>>>> 1bc8dd0 (still working on register)
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
<<<<<<< HEAD
                      {emailError && (
                        <p className="text-sm text-redborder">{emailError}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2 ">
=======
                      {
                        error && <p className="text-sm text-redborder">
                        {error }
                      </p>
                      }
                    </div>

                    <div className="sm:col-span-2">
>>>>>>> 1bc8dd0 (still working on register)
                      <label
                        htmlFor="password"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Password
                      </label>
<<<<<<< HEAD
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
                        <span
                          onClick={handleToggle}
                          className={` text-gray ${
                            icon ? "hidden" : "flex"
                          } justify-center items-center  `}
                        >
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
                        <span
                          onClick={handleToggle}
                          className={` text-gray ${
                            icon ? "flex" : "hidden"
                          } justify-center items-center  `}
                        >
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
=======
                      <input
                        type="password"
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
>>>>>>> 1bc8dd0 (still working on register)

                      {errors.Password && (
                        <p className="text-sm text-redborder">
                          {errors.Password.message}
                        </p>
                      )}
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="flex justify-center">
                    {
                      !emailError || !phoneError && <> 
                      {error && <p className="text-sm text-redborder">{error}</p>}
                       </>
                    }
                    
                  </div>
=======
>>>>>>> 1bc8dd0 (still working on register)
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full text-white bg-secondary flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
<<<<<<< HEAD
<<<<<<< HEAD
                    {isSubmitting || isLoading ? <LoadingGif /> : " Sign Up"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-lightGray">
                      Already have an account?{" "}
                      <span
                        onClick={() => {
                          setLogin(true);
                          setRegister(false);
                        }}
                        className="font-medium text-background cursor-pointer text-lg hover:underline dark:text-primary-500"
                      >
                        Login
                      </span>
                    </p>
<<<<<<< HEAD
                </form>
              </div>
              </ClickAwayListener>
            </div>
<<<<<<< HEAD
          </ClickAwayListener>
        </div>
=======
        
>>>>>>> eda1965 (User Dashboard and Landing Page)
=======
                    {isSubmitting ? (
                      <>
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-graybg animate-spin dark:text-darkHover fill-background"
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
                        <span className="sr-only">Loading...</span>{" "}
                      </>
                    ) : (
=======
                    {isSubmitting || isLoading ? 
                    <LoadingGif /> : (
>>>>>>> 074a7e6 (complete register)
                      " Sign Up"
                    )}
                  </button>
=======
>>>>>>> a061db6 (phone login)
                </form>
              </div>
            </div>
          </ClickAwayListener>
          <VerifyCode />
        </div>
>>>>>>> 1bc8dd0 (still working on register)
      </div>
    </Modal>
  );
};

export default Register;
