import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import VerifyCode from "./VerifyCode";
//import useCart from "../../hooks/useCart";
import LoadingGif from "../shared/LodingGif";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
const Register = () => {
  const {
    reg,
    setRegister,
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
  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

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
    }
    const response = await post(url, formData, "");
    console.log(response.data);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      setRegister(false);
      reset();
    },
    onError: () => {
      toast.error("Error completing your sign up");
    },
  });

  const handleCreate = (data) => {
    setIsLoading(true)
    verifyEmail(data.Email);
    setRegData(data);
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
        className=" overflow-y-auto overflow-x-auto absolute top-10 md:top-0  z-50 justify-center items-center  w-full "
      >
        <Toaster />

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
                      {
                        error && <p className="text-sm text-redborder">
                        {error }
                      </p>
                      }
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Password
                      </label>
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
                    {isSubmitting || isLoading ? 
                    <LoadingGif /> : (
                      " Sign Up"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </ClickAwayListener>
          <VerifyCode />
        </div>
      </div>
    </Modal>
  );
};

export default Register;
