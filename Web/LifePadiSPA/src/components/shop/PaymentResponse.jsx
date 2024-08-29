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
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");

  const fetch = useFetch();
  const post = usePost();
  const { auth } = useAuth();

  const lottieStyle = {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 20,
    padding: 0,
    margin: 0,
  };

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  // const status = queryParams.get("status");
  // const transactionId = queryParams.get("transaction_id");
  const tx_ref = queryParams.get("reference");
  const url = `${baseUrl}transaction/paystack-confirmPayment?reference=${tx_ref}`;
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
    } catch (error) {
      setResponseMsg(error.response.data.message);
      setPaymentStatus(false);
      console.log(error);
    }
  },[tx_ref, url]);

  useEffect(() => {
    verifyTransaction();
  }, []);

  return (
    <section className="flex justify-center items-center  pt-28 bg-lightGray dark:bg-darkBg">
      <div className="flex justify-center items-center rounded-xl shadow-xl h-[24rem] w-10/12">
        {paymentStatus == true && (
          <div className="h-64 py-10 lg:px-36 w-full bg-primary dark:bg-darkMenu">
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoPlay={true}
              style={lottieStyle}
            ></Lottie>{" "}
            <div className="flex flex-col justify-center gap-2 px-5">
              <h2 className="text-center text-xl text-accent dark:text-primary font-semibold">
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
        )}

        {paymentStatus === false && (
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

const PaymentResponse = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [paymentStatus, setPaymentStatus] = useState(null)

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
