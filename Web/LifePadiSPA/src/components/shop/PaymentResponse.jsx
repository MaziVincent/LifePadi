import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import Lottie from "lottie-react";
import successAnimation from "../../assets/lottie/Animation - 1725438178504.json";
import errAnimation from "../../assets/lottie/Animation - 1725438360134.json";

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

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
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentResponse;
