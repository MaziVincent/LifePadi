<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import Lottie from "lottie-react";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";
import successAnimation from "../../assets/lottie/Animation - 1725438178504.json";
import errAnimation from "../../assets/lottie/Animation - 1725438360134.json";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";


const PaymentResponse = () => {
<<<<<<< HEAD
=======
  const { state, dispatch } = useCart();
>>>>>>> 5f61f19 (updated payment)
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
<<<<<<< HEAD

=======
 
>>>>>>> 5f61f19 (updated payment)
  const fetch = useFetch();
  const post = usePost();
  const { auth } = useAuth();

  const lottieStyle = {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
<<<<<<< HEAD
    zIndex: 20,
=======
    zIndex: -1,
>>>>>>> 5f61f19 (updated payment)
    padding: 0,
    margin: 0,
  };

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  // const status = queryParams.get("status");
  // const transactionId = queryParams.get("transaction_id");
  const tx_ref = queryParams.get("reference");
  const url = `${baseUrl}transaction/paystack-confirmPayment?reference=${tx_ref}`;
<<<<<<< HEAD
  const deliveryUrl = `${baseUrl}delivery/create`;

  const verifyTransaction = useCallback(async () => {
    try {
      const res = await fetch(url, auth.accessToken);
      

      if (
        res.data?.status ||
        res.data?.data.status == "success" ||
        res.data?.message == "Verification successful"
      ) {

        setPaymentStatus(true);
        setResponseMsg(res.data?.message);
        const delivery = localStorage.getItem("delivery");
        const deliveryData = JSON.parse(delivery);
        //console.log(deliveryData)
        const response = await post(
          deliveryUrl,
          deliveryData,
          auth.accessToken
        );
     // const res =   await post(`${baseUrl}order/updateStatus/${deliveryData?.OrderId}`)
        
          localStorage.removeItem("delivery");
          setTimeout(() => {
            navigate("/user");
          }, 3000);
       
      } else {
        setResponseMsg(res.data.message);
        setPaymentStatus(true);
      }
=======

  

  const verifyTransaction = async () => {
    try {
      const res = await fetch(url, auth.accessToken);
      //console.log(res.data);
      if (
        res.status === 200 ||
        res.data.status == "success" ||
        res.status == true
      ) {
        setPaymentStatus(true);
        setResponseMsg(res.data.message);
      } else {
        setResponseMsg(res.data.message);
        setPaymentStatus(true);
      }

>>>>>>> 5f61f19 (updated payment)
    } catch (error) {
      setResponseMsg(error.response.data.message);
      setPaymentStatus(false);
      console.log(error);
    }
<<<<<<< HEAD
  },[tx_ref, url]);
=======
  };
>>>>>>> 5f61f19 (updated payment)

  useEffect(() => {
    verifyTransaction();
  }, []);
<<<<<<< HEAD

  return (
    <section className="flex justify-center items-center  pt-28 bg-lightGray dark:bg-darkBg">
      <div className="flex justify-center items-center rounded-xl shadow-xl h-[24rem] w-10/12">
        {paymentStatus == true && (
          <div className="h-64 py-10 lg:px-36 w-full bg-primary dark:bg-darkMenu">
=======
  return (
    <section className="flex justify-center items-center  pt-28">
      <div className="flex justify-center items-center rounded-xl shadow-xl h-[24rem] w-10/12">
        {paymentStatus && (
          <div className="h-64 py-10 lg:px-36 w-full">
>>>>>>> 5f61f19 (updated payment)
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoPlay={true}
              style={lottieStyle}
            ></Lottie>{" "}
            <div className="flex flex-col justify-center gap-2 px-5">
<<<<<<< HEAD
              <h2 className="text-center text-xl text-accent dark:text-primary font-semibold">
=======
              <h2 className="text-center text-xl font-semibold">
>>>>>>> 5f61f19 (updated payment)
                {" "}
                Payment Successful{" "}
              </h2>
              <Link
                to="/user"
                className="text-lightgreen border-2 p-3 rounded-xl text-center cursor-pointer"
              >
                Continue to Dashboard
              </Link>
            </div>
          </div>
<<<<<<< HEAD
        )}

        {paymentStatus === false && (
=======
        ) }
        
        
        
        { paymentStatus === false && (
>>>>>>> 5f61f19 (updated payment)
          <div className="h-64 py-10 lg:px-36 w-full">
            <Lottie
              animationData={errAnimation}
              loop={false}
              autoPlay={true}
              style={lottieStyle}
            ></Lottie>{" "}
            <div className="flex flex-col justify-center gap-2 px-5">
              <h2 className="text-center text-xl font-semibold">
                {" "}
                {responseMsg && responseMsg}{" "}
              </h2>
              <Link
                to="/user"
                className="text-lightgreen border-2 p-3 rounded-xl text-center cursor-pointer"
              >
                Continue to Dashboard
              </Link>
            </div>
<<<<<<< HEAD
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentResponse;
=======
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import baseUrl from '../../api/baseUrl'
=======
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import Lottie from "lottie-react";
import successAnimation from "../../assets/lottie/Animation - 1725438178504.json";
import errAnimation from "../../assets/lottie/Animation - 1725438360134.json";
>>>>>>> e848b7b (Payment Response)

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

<<<<<<< HEAD
    useEffect(() => {
      // Extract query parameters from the URL
      const queryParams = new URLSearchParams(location.search)
      const status = queryParams.get('status')
      const transactionId = queryParams.get('transaction_id')
      const tx_ref = queryParams.get('tx_ref')
      const url = `${baseUrl}/transaction/confirmPayment?tx_ref=${tx_ref}&transaction_id=${transactionId}&status=${status}`


      // Verify the transaction status with your server
        const verifyTransaction = async () => {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
            if (res.status === 200) {
                setPaymentStatus('success')
            } else {
            setPaymentStatus('failed')
            }
        }
        verifyTransaction()
    }, [location.search])
  return <div>
    {paymentStatus === 'success' ? <h1>Payment was successful</h1> : <h1>Payment was not successful</h1>}
  </div>
}

export default PaymentResponse
>>>>>>> 7a64a18 (created a payment response page)
=======
  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const transactionId = queryParams.get("transaction_id");
    const tx_ref = queryParams.get("tx_ref");
    const url = `${baseUrl}transaction/confirmPayment?tx_ref=${tx_ref}&transaction_id=${transactionId}&status=${status}`;
    console.log(status);
    console.log(transactionId);
    console.log(tx_ref);
    // Verify the transaction status with your server
    const verifyTransaction = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
       console.log(res)
      if (res.status === 200) {
        setPaymentStatus("success");
        // navigate('/user')
      } else {
        setPaymentStatus("failed");
      }
    };
    verifyTransaction();
  }, []);
  return (
    <section className="h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center bg-lightGray rounded-xl shadow-xl h-1/2">
        {paymentStatus === "success" ? (
          <div className="h-[24rem] py-5 px-36">
            <Lottie
              animationData={successAnimation}
              loop={true}
              autoPlay={true}
              //style={lottieStyle}
            ></Lottie>
            <p>
              Go back to{" "}
              <Link
                to="/shop"
                className="text-lightgreen border px-1 rounded-md"
              >
                shop
              </Link>
            </p>
          </div>
        ) : (
          <div className="h-[24rem] py-5 px-36">
            <Lottie
              animationData={errAnimation}
              loop={false}
              autoPlay={true}
              //style={lottieStyle}
            ></Lottie>{" "}
            <p>
              Go back to{" "}
              <Link
                to="/shop"
                className="text-lightgreen border px-1 rounded-md"
              >
                shop
              </Link>
            </p>
=======
>>>>>>> 5f61f19 (updated payment)
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentResponse;
>>>>>>> e848b7b (Payment Response)
