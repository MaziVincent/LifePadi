import { useEffect, useState } from "react";
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
  const {state, dispatch} = useCart()
  const fetch = useFetch();
  const post = usePost();
  const {auth} = useAuth();

  const lottieStyle = {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    padding: 0,
    margin: 0,
  };

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    // const status = queryParams.get("status");
    // const transactionId = queryParams.get("transaction_id");
    const tx_ref = queryParams.get("reference");
    const url = `${baseUrl}transaction/paystack-confirmPayment?reference=${tx_ref}`
    
    // Verify the transaction status with your server
    const verifyTransaction = async () => {
      const res = await fetch(url, auth.accessToken );
       console.log(res)
      if (res.status === 200 || res.data.Status == "success" ) {
        setPaymentStatus("success");

        const response = await post(`${baseUrl}delivery/create`, state.delivery, auth.accessToken);
        console.log(response)
        setTimeout(() => {
          navigate("/user");
        }, 3000)
      } else {
        setPaymentStatus("failed");
      }
    };
    verifyTransaction();
  }, [auth.accessToken, fetch, location.search, navigate, post, state.delivery]);
  return (
    <section className="flex justify-center items-center  pt-28">
      <div className="flex justify-center items-center rounded-xl shadow-xl h-[24rem] w-10/12">
        {paymentStatus === "success" ? (
           <div className="h-64 py-10 lg:px-36 w-full">
           <Lottie
             animationData={successAnimation}
             loop={false}
             autoPlay={true}
             style={lottieStyle}
           ></Lottie>{" "}
           <p className="flex flex-col justify-center gap-2 px-5">
           <h2 className="text-center text-xl font-semibold"> Payment Successful {" "} </h2>
             <Link
               to="/shop"
               className="text-lightgreen border-2 p-3 rounded-xl text-center cursor-pointer"
             >
               Continue to Dashboard
             </Link>
           </p>
         </div>
        ) : (
          <div className="h-64 py-10 lg:px-36 w-full">
            <Lottie
              animationData={errAnimation}
              loop={false}
              autoPlay={true}
              style={lottieStyle}
            ></Lottie>{" "}
            <p className="flex flex-col justify-center gap-2 px-5">
            <h2 className="text-center text-xl font-semibold"> Payment failed {" "} </h2>
              <Link
                to="/shop"
                className="text-lightgreen border-2 p-3 rounded-xl text-center cursor-pointer"
              >
                Continue to Dashboard
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentResponse;
