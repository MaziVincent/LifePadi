import logo from "../../assets/images/Logonamedark.svg";
import motorbike from "../../assets/images/vintage-green-motorbike.avif";
import background1 from "../../assets/images/background1.webp";
import MarqueeComp from "./MarqueeComp";
import usePost from "../../hooks/usePost";
import baseUrl from "../../api/baseUrl";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import LoadingGif from "../shared/LodingGif";

const Contact = () => {
  const post = usePost();
  const url = `${baseUrl}customersupport/send`;
  const [delAcc, setDelAcc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
   const [successDel, setSuccessDel] = useState("");
   const [Delerror, setDelError] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const {
    register:registerDel,
    handleSubmit:handleSubmitDel,
    reset:resetDel,
    formState: { errors:errorsDel },
  } = useForm();
  
  const sendMessage = async (data) => {
   setSuccess("");
    setError("");
    setLoading(true);
    const message = {
      Subject: `Contact Form Message From ${data.email}`, 
      Message: `From: ${data.email} \n
      Subject: ${data.Subject} \n
      ${data.Message}` 
      
    }
    // console.log(message)
    const response = await post(url, message);
    if (response.status === 200) {
      setSuccess("Message Sent Successfully");
      reset()
      setLoading(false);
    
    } else {
      setError("An error occured, please try again later");
      setLoading(false);
    };
  }

  const sendDeleteRequest = async (data) => { 
    setSuccess("");
    setError("")
    setLoading(true);
    const message = {
      Subject: `Account Deletion Request From ${data.Email}`,
      Message: `From: ${data.Email} \n
      Account Deletion Request With the following reason : 
      ${data.Reason}`,
    };
    const response = await post(url, message);
    if (response.status === 200) {
      setSuccessDel("Account Deletion Request Sent Successfully");
      resetDel()
      setLoading(false);
    } else {
      setDelError("An error occured, please try again later");
      setLoading(false);
    }
  }


  return (
    <div>
      <div
        className="h-screen flex justify-center items-center "
        style={{
          backgroundImage: `url(${background1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className=" dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                We would love to hear from you
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Padi makes your life easy by providing reliable, fast, and
                affordable delivery and errand services.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Reach out to us
            </h2>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-secondary lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                  <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                How can we help you?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You can contact us via email with the following email address,
                <span className="text-background text-xl font-semibold">
                  {" "}
                  Info@lifepadi.com
                </span>
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-secondary lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Get in touch with us
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                For enquiries, the following phone number is always availiable
                to reach us,
                <span className="text-background text-xl font-semibold">
                  {" "}
                  09027628553
                </span>
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-secondary lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Are you ready for a visit?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our office address is{" "}
                <span className="text-background text-xl font-semibold">
                  {" "}
                  No. 150 Agbani Road, Igbariam, Enugu, Enugu State.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md border-4 rounded-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form
            className="space-y-8"
            onSubmit={handleSubmit(sendMessage)}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@email.com"
                required=""
              />
              <p>
                {errors.email && (
                  <span className="text-redborder">Email is required </span>
                )}
              </p>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                {...register("Subject", { required: true })}
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required=""
              />
              <p>
                {errors.Subject && (
                  <span className="text-redborder">Email is required </span>
                )}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                {...register("Message", { required: true })}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-secondary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loading ? <LoadingGif /> : " Send message "}
            </button>
          </form>
          {success && <p className="text-background">{success} </p>}
          {error && <p className="text-background">{error} </p>}
        </div>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <button
            className="text-background text-xl font-semibold hover:text-secondary"
            onClick={() => setDelAcc(!delAcc)}
          >
            {" "}
            Request Account Deletion{" "}
          </button>
          <form
            className={`space-y-8 border-4 p-4 rounded-lg mt-3 ${
              delAcc ? "block" : "hidden"
            }`}
            onSubmit={handleSubmitDel(sendDeleteRequest)}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...registerDel("Email", { required: true })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@email.com"
                required
              />
              <p>
                {errorsDel.Email && (
                  <span className="text-redborder">Email is required </span>
                )}
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your Reason
              </label>
              <textarea
                id="message"
                rows="6"
                {...registerDel("Reason", { required: true })}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Give us a Reason you want your account deleted..."
              ></textarea>
              <p>
                {errorsDel.Reason && (
                  <span className="text-redborder">Reason is required </span>
                )}
              </p>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-secondary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loading ? <LoadingGif /> : "Delete My Account"}
            </button>
          </form>
          {successDel && <p className="text-background">{successDel} </p>}
          {Delerror && <p className="text-background">{Delerror} </p>}
        </div>
      </section>
      <section className="bg-accent h-72 flex justify-center items-center mt-10">
        <MarqueeComp />
      </section>
    </div>
  );
};

export default Contact;
