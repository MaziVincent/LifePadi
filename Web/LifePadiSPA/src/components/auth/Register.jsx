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
  }else{
    setVerificationCode(response.data.Code)
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
