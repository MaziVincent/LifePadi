import React, { useState, useRef, useEffect } from "react";
import { Modal } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "react-query";
import baseUrl from "../../api/baseUrl";
import LoadingGif from "../shared/LodingGif";
import usePost from "../../hooks/usePost";
import toast, { Toaster } from "react-hot-toast";

const VerifyCode = ({ otpLength = 4, }) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [codeError, setCodeError] = useState("")
  const [attempts, setAttempts ] = useState(3)
  const [resend, setResend] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputsRef = useRef([]);
  const post = usePost();
  const url = `${baseUrl}customer/create`;
  const verifyUrl = `${baseUrl}customer/verify-otp`;
  const {
    reg,
    setRegister,
    verify,
    setVerify,
    regData,
    setRegData,
    verificationInfo,
    setVerificationInfo
  } = useAuth();

  //console.log(verificationInfo);

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input
      if (value && index < otpLength - 1) {
        inputsRef.current[index + 1].focus();
      }

      // If backspace is pressed and input is empty, focus on previous input
      if (value === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const code = otp.join("");

    try{
      const response = await post(`${verifyUrl}?pinId=${verificationInfo.pinId}&pin=${code}`)

      console.log(response.data)

      
      if(response.data?.verified == false){
        setAttempts(response.data?.attemptsRemaining)
        setCodeError("Code Entered is invalid ")
        setIsLoading(false)
        return;
      }

      if(response.data?.verified == "Expired "){
        setResend(true)
        setCodeError("Code Entered has Expired ")
        setIsLoading(false)
        return;
      }

      if(response.data?.verified == true){
      
        mutate(regData)
        //console.log(regData)
      }

    }catch(error){
      console.log(error)
      isLoading(false)
    }
  
  };

  const create = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await post(url, formData, "");
    console.log(response.data)
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      setRegister(false);
      setIsLoading(false);
      setOtp(Array(otpLength).fill(""))
      toast.success(" Account Created Successfully")
      setTimeout(() => {
        setVerify(false);
      },1500)
     
      
      
    },
    onError: () => {
      toast.error("Error completing your sign up");
      setIsLoading(false)
    },
  });

  useEffect(()=> {
    setTimeout(()=>{
      setResend(true)
    }, 60000)
  },[])

  const resendOtp = async (phoneNumber) => {

    const unformated = phoneNumber.slice(1)
    const formated = `234${unformated}`

    try{

    const formData = new FormData()
    formData.append("phoneNumber", formated)
    const response = await post(url, formData ," ")
   // console.log(response)

      if(response.status == 200 || response.data.status == "200"){
        setVerificationInfo(response.data);
         
      }else{
        setCodeError("Error Sending OTP");
        
      }

    }catch(error){

      console.error(error)
      setCodeError("Error Sending  OTP");
    }

  };


  return (
    <Modal
      open={verify}
      onClose={() => {
        setVerify(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-14 md:top-0  z-50 justify-center items-center  w-full  h-auto "
      >
        <Toaster />
        <div className="relative p-4 w-full h-auto  ">
          <section className=" h-screen flex justify-center items-center ">
            <div className="flex flex-col items-center bg-primary dark:bg-darkMenu dark:text-primary w-3/4 md:w-2/4 pb-4 rounded-xl">
              <div className="flex justify-end items-center p-4 w-full ">
                <button
                  type="button"
                  onClick={() => {
                    setVerify(false);
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
              <h2 className="text-2xl font-semibold mb-4">Verify Phone Number</h2>
              <p className="text-darkHover dark:text-gray">Please Enter the code sent to your Phone Number </p>
              <div className="flex space-x-2 m-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-10 h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-background bg-graybg text-accent"
                  />
                ))}
              </div>
              { codeError && <p className="text-redborder text-sm"> {`${codeError}, `}</p> }
              {
                attempts < 3 && <p className="text-redborder text-sm"> {`Remaining ${attempts} attempts`} </p>
              }
              {
                resend && <p className="text-accent dark:text-primary pb-6"> You no see the code ? <button onClick={() => resendOtp(regData.PhoneNumber)} className="text-background">Oya Resend am!</button> </p>
              }
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-secondary text-white dark:text-accent font-semibold rounded-lg shadow hover:bg-background transition duration-200"
              > {
                isLoading ? <LoadingGif /> : 'Complete Sign Up '
              }
                
              </button>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyCode;
