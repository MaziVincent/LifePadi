import useCart from "../../hooks/useCart";
import { Modal } from "@mui/material";
import usePost from "../../hooks/usePost";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import { Modal } from "@mui/material";
import usePost from "../../hooks/usePost";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const CheckOut = () => {
  const { state, dispatch } = useCart();
  const postData = usePost();
  const url = `${baseUrl}transaction/paystackcheckout`;
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
 
  // console.log(state);


  const handleMakePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    e.preventDefault()
    setLoading(true)
    console.log(state);
    
    e.preventDefault();
    setLoading(true);
    const data = {
      Amount: state.total - state.deliveryFee,
      DeliveryFee: state.deliveryFee,
      VoucherCode: "",
      VoucherCode: "",
      OrderId: state.order.Id,
      TotalAmount: state.total - state.deliveryFee,
    };

    const res = await postData(url, data, auth.token);
    
    // console.log(res)

    if (res.status == 200) {
      setLoading(false);
      window.location.href = res.link;
      setLoading(false)
      window.location.href = res.data.link
      setLoading(false);
      window.location.href = res.link;
      // window.open(res.data.link, '_blank')
      // state.checkOut = false
    } else {
      alert(res.response.data);
      setLoading(false);
      alert(res.response.data);
      setLoading(false);
    }
  };
  console.log(data)
    // setTimeout(() => {
    // }, 2000);
  };
  console.log(data)
  return (
    <Modal
      open={state.checkOut}
      onClose={() => {
        dispatch({ type: "checkOut" });
        dispatch({ type: "checkOut" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute  top-20  z-50 justify-center items-center  w-full h-full pb-24 "
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute  top-20  z-50 justify-center items-center  w-full h-full pb-24 "
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
          <div className="w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md  dark:bg-darkMenu  dark:text-primary overflow-y-auto ">
            <h3 className="text-xl font-semibold text-background dark:text-gray-50 pb-3">
              Payment Confirmation
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
          <div className="w-full bg-primary rounded-lg p-5 shadow md:mt-0 sm:max-w-md  dark:bg-darkMenu  dark:text-primary overflow-y-auto ">
            <h3 className="text-xl font-semibold text-background dark:text-gray-50 pb-3">
              Payment Confirmation
            </h3>

            {/* <!-- Modal body --> */}

            <div className=" w-full flex flex-col gap-10">
              <div className="bg-lightForest dark:bg-darkMenu p-3 flex justify-center rounded-lg">
            <div className=" w-full flex flex-col gap-10">
              <div className="bg-lightForest dark:bg-darkMenu p-3 flex justify-center rounded-lg">
                <p>
                  {" "}
                  <span className="text-xl font-semibold">
                    {" "}
                    Total Amount :{" "}
                  </span>{" "}
                  <span className="text-2xl font-bold">
                    &#8358;{state.total}
                  </span>
                  {" "}
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
                      strokeWineCap="round"
                      strokeWineJoin="round"
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
                      strokeWineCap="round"
                      strokeWineJoin="round"
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
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
  );
};

export default CheckOut;
export default CheckOut;
