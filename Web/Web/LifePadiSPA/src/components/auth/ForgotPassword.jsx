import { set, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
//import useCart from "../../hooks/useCart";
import LoadingGif from "../shared/LodingGif";
import VerifyOTP from "./VerifyOTP";
import useFetch from "../../hooks/useFetch";
import ChangePassword from "./ChangePassword";

const ForgotPassword = () => {
  const {
    verifyOTP,
    setVerifyOTP,
    regData,
    setRegData,
    verificationInfo,
    setVerificationInfo,
  } = useAuth();
  //const {dispatch} = useCart();
  const post = usePost();
  const fetch = useFetch();
  const url = `${baseUrl}customer/send-otp`;
  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const checkPhone = async ( phone) => {

    setPhoneError("")

    try {

        const formData = new FormData();
        formData.append("phoneNumber", phone);
        const response = await post(`${baseUrl}customer/password-reset`, formData, "");
        console.log(response)

        if(response.error){
          setPhoneError(response.error)
          setIsLoading(false);
          return;
        }
        if (response.status == 200 || response.data.status == "200") {
          setVerificationInfo(response.data);
          const res = await fetch(`${baseUrl}customer/getByPhone/${phone}`);
          setRegData(res.data);
          setVerifyOTP(true);
          setIsLoading(false);
          reset();
        } else {
          setError("Error Sending OTP try again ");
          setIsLoading(false);
        }
   
     
      setIsLoading(false);
     
    } catch (error) {
      console.error(error);
      setError("Error Sending  OTP try again ");
      setIsLoading(false);
    }
  };

  const handleVerify = (data) => {
    setIsLoading(true);
    checkPhone(data.PhoneNumber);
    // sendOTP(data.PhoneNumber);
    
  };

 

  return (
    <main className="bg-lightGray dark:bg-darkBg" >
   
        <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-screen ">
          
            <div className="w-full bg-primary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu dark:text-primary overflow-y-auto max-h-screen pb-10 ">
             
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-darkBg md:text-2xl dark:text-primary">
                  Verify Phone Number
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleVerify)}
                >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                   
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
                      {phoneError && (
                        <p className="text-sm text-redborder">{phoneError}</p>
                      )}
                    </div>
                   
                  </div>
                  <div className="flex justify-center">
                    {
                       !phoneError && <> 
                      {error && <p className="text-sm text-redborder">{error}</p>}
                       </>
                    }
                    
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full text-white bg-secondary flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting || isLoading ? <LoadingGif /> : " Proceed "}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full text-white bg-redborder flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
         
        </div>
        <VerifyOTP />
        <ChangePassword />
      
    </main>
  );
};

export default ForgotPassword;
