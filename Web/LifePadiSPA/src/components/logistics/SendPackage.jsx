import { Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import {ClickAwayListener} from "@mui/material";
import LoadingGif from "../shared/LodingGif";


const SendPackage = ({ dispatch, open }) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const handleSend = (data) => {
    console.log(data);
  };

  const handleClickAway = () => {
    dispatch({ type: "send" });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch({ type: "send" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-auto absolute top-10 md:top-0  z-50 justify-center items-center  w-full "
      >
        <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 h-screen ">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-full bg-primary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu dark:text-primary overflow-y-auto max-h-screen pb-10 ">
              <div className="flex justify-between items-center p-4 sticky top-0 ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "send" });
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
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow-y-auto">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-darkBg md:text-2xl dark:text-primary">
                  Send Package
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleSend)}
                >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pickup"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Pick up address
                      </label>
                      <div className="flex ">
                        <span
                          className={` text-gray "flex"
                           justify-center items-center relative `}
                        >
                          <svg
                            className="w-8 h-10 text-background absolute ml-2 dark:text-white"
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
                              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="pickup"
                          id="pickup"
                          {...register("PickUpAddress", { required: true })}
                          className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter Pick up address"
                          required=""
                        />
                        {errors.PickUpAddress && (
                          <p className="text-sm text-redborder">
                            Pick up address is required
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="delivery"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Delivery address
                      </label>
                      <div className="flex ">
                        <span
                          className={` text-gray "flex"
                           justify-center items-center relative  `}
                        >
                          <svg
                            className="w-8 h-10 text-background absolute ml-2 dark:text-white"
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
                              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="delivery"
                          id="delivery"
                          {...register("DeliveryAddress", { required: true })}
                          className="bg-lightGray border pl-10 border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Enter Delivery Address"
                          required=""
                        />
                        {errors.DeliveryAddress && (
                          <p className="text-sm text-redborder">
                            Pick up address is required
                          </p>
                        )}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold col-span-2"> Sender Information </h2>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="sender"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Sender Name
                      </label>
                      <input
                        type="text"
                        name="sender"
                        id="sender"
                        {...register("Sender", { required: true })}
                        className="bg-lightGray border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Sender Name"
                        required=""
                      />
                      {errors.Sender && (
                        <p className="text-sm text-redborder">
                          Sender name is required
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Phone Number
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        {...register("PhoneNumber", { required: true, maxLength:11 })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="08122334455"
                        required=""
                      />
                      {errors.PhoneNumber && (
                        <p className="text-sm text-redborder">
                          Phone Number is required
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <input type="checkbox" className="border-4 border-gray bg-lightForest" />
                      <label> Use current information </label>
                    </div>

                    <h2 className="col-span-2 font-bold text-2xl"> Recipient Information </h2>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="reciever"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Sender Name
                      </label>
                      <input
                        type="text"
                        name="reciever"
                        id="reciever"
                        {...register("Reciever", { required: true })}
                        className="bg-lightGray border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Reciever Name"
                        required=""
                      />
                      {errors.Sender && (
                        <p className="text-sm text-redborder">
                          Sender name is required
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                      >
                        Phone Number
                      </label>
                      <input
                        type="phone"
                        name="phone"
                        id="phone"
                        {...register("PhoneNumber", { required: true, maxLength:11 })}
                        className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="08122334455"
                        required=""
                      />
                      {errors.PhoneNumber && (
                        <p className="text-sm text-redborder">
                          Phone Number is required
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full text-white bg-secondary flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting ? <LoadingGif /> : " Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </Modal>
  );
};


export default SendPackage;
