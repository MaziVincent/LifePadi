import useCart from "../../hooks/useCart";
import { Modal } from "@mui/material";
import usePost from "../../hooks/usePost";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
//import PayStackPop from "@paystack/inline-js"

const CheckOut = () => {
  const { state, dispatch } = useCart();
  const postData = usePost();
  const url = `${baseUrl}transaction/paystackcheckout`;
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log(state);

  const handleMakePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Create Delivery

    const data = {
      Amount: state.total - state.deliveryFee,
      DeliveryFee: state.deliveryFee,
      VoucherCode: "",
      OrderId: state.order.Id,
      TotalAmount: state.total + state.deliveryFee,
    };

    try {
      const response = await postData(
        `${baseUrl}delivery/create`,
        state.delivery,
        auth.accessToken
      );

      if (response.status == 200) {
        const res = await postData(url, data, auth.token);

        if (res.status == 200) {
          setLoading(false);
          window.location.href = res.data.link;
        } else {
          setError("Error Proceeding to Payment");
          setLoading(false);
        }
      } else {
        setError("Error Creating Delivery! ");
        setLoading(false);
      }

      // // console.log(res.data.link)
      // setLoading(false)
    } catch (err) {
      console.log(err);
      setError("Error Making Payment ");
      loading(false);
    }
  };

  return (
    <Modal
      open={state.checkOut}
      onClose={() => {
        dispatch({ type: "checkOut" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute  top-20  z-50 justify-center items-center  w-full h-full pb-24 "
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
          <div className="w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md  dark:bg-darkMenu  dark:text-primary overflow-y-auto ">
            <div className="flex justify-end">
              {" "}
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "checkOut" });
                  setLoading(false);
                }}
                className="text-darkHover bg-transparent border-2 hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <h3 className="text-xl font-semibold text-background dark:text-gray-50 pb-3">
              Payment Confirmation
            </h3>

            {/* <!-- Modal body --> */}

            <div className=" w-full flex flex-col gap-10">
              <div className="bg-lightForest dark:bg-darkMenu p-3 flex justify-center rounded-lg">
                <p>
                  <span className="text-xl font-semibold">
                    {" "}
                    Total Amount :{" "}
                  </span>{" "}
                  <span className="text-2xl font-bold">
                    &#8358;{state.total}
                  </span>
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleMakePayment}
                  type="submit"
                  disabled={loading}
                  className={`inline-flex gap-1 items-center text-background dark:text-gray-50 bg-primary-700 ring-2 hover:ring-background hover:bg-graybg focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-darkHover dark:focus:ring-primary-800`}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                      d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                    />
                  </svg>

                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Proceed to payment"
                  )}
                </button>
              </div>
              {error && (
                <div className="text-sm text-redborder flex justify-center">
                  {" "}
                  <span> {error}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CheckOut;
