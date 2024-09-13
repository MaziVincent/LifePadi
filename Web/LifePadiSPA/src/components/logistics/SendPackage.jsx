import { Modal } from "@mui/material";

const sendPackage = () => {
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
                    Send Package
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
                          Pick up address
                        </label>
                        <input
                          type="text"
                          name="pickup"
                          id="pickup"
                          {...register("PickUpAddress", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Pick up address"
                          required=""
                        />
                        {errors.PickUpAddress && (
                          <p className="text-sm text-redborder">
                            Pick up address is required
                          </p>
                        )}
                      </div>
  
                      <div className="sm:col-span-1">
                        <label
                          htmlFor="delivery address"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          name="delivery"
                          id="delivery"
                          {...register("DeliveryAddress", { required: true })}
                          className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Delivery Address"
                          required=""
                        />
                        {errors.DeliveryAddress && (
                          <p className="text-sm text-redborder">
                            Delivery Address is required
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
                        {error && (
                          <p className="text-sm text-redborder">{error}</p>
                        )}
                      </div>
  
                      <div className="sm:col-span-2 ">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                        >
                          Password
                        </label>
                        <div className="flex">
                          <input
                            type={type}
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
                          <span onClick={handleToggle} className={` text-gray ${icon ? 'hidden' : 'flex'} justify-center items-center  `}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white absolute mr-10"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </span>
                          <span onClick={handleToggle} className={` text-gray ${icon ? 'flex' : 'hidden'} justify-center items-center  `}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white absolute mr-10"
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
                                d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </span>
                        </div>
  
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
                      {isSubmitting || isLoading ? <LoadingGif /> : " Sign Up"}
                    </button>
                  </form>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </Modal>
     );
}
 
export default sendPackage;