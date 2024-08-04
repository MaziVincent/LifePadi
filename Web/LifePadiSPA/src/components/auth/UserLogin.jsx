import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../api/baseUrl";
import useAuth from "../../hooks/useAuth";
//import useCart from "../../hooks/useCart";

const UserLogin = () => {
<<<<<<< HEAD
  const { auth, setAuth, persist, setPersist, login, setLogin, setRegister } =
    useAuth();
  //const {dispatch} = useCart();
=======
  const { auth, setAuth, persist, setPersist, login, setLogin  } = useAuth();
>>>>>>> d189281 (worked on Login)
  const url = `${baseUrl}auth/login`;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  const handleInput = (data) => {
    // Simple email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^0\d{10}$/;
    if (emailPattern.test(data.Input)) {
      // Input is an email
      return { Email: data.Input, Password:data.Password };
    } else if (phonePattern.test(data.Input)) {
      // Input is a phone number (assuming only digits)
      return { PhoneNumber: data.Input, Password:data.Password };
    } else {
      setError("Please enter a valid email or phone number");
      return null;
    }
  };

  const Login = async (data) => {
    setIsLoading(true);
    setError("")
    const result = handleInput(data)

    if(!result){
      setIsLoading(false);
      
      return;
    }
    try {
      const response = await axios.post(url, result, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
      });

      //console.log(response.data);
      setAuth(response.data);
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data?.refreshToken)
      );
      toast.success("Logged in Successfully");
      const role = response.data?.Role;
      setTimeout(() => {
        switch (role) {
          case "Customer":
            setLogin(false);
            //navigate(from, {replace: true })
            break;
          default:
            navigate("/unauthorized");
        }
      }, 1000);

      setIsLoading(false);
    } catch (err) {
      switch (err?.response?.status) {
        case 400:
          toast.error("Invalid email or password");
          break;
        case 404:
          toast.error("Invalid email or password");
          break;
        case 401:
          toast.error("UnAuthorised User");
          break;
        default:
          toast.error("Login Failed or No Server Response");
          break;
      }
      setIsLoading(false);
      console.error(err);
    }
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };
  //console.log(auth);

  return (
    <Modal
      open={login}
      onClose={() => {
        setLogin(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute outline-none top-14 md:top-0  z-50 justify-center items-center  w-full  h-auto "
      >
        <Toaster />
        <div className="relative p-4 w-full h-auto  ">
          <section className="  ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen   lg:py-0 ">
              <div className="w-full bg-primary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkMenu ">
                <div className="flex justify-between items-center p-4  ">
                  <button
                    type="button"
                    onClick={() => {
                      setLogin(false);
                    }}
                    className="dark:text-lightGray bg-transparent hover:bg-graybg hover:text-gray-900 rounded-full border-2 border-gray text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-darkBg md:text-2xl dark:text-primary">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(Login)}
                  >
                    <div>
                      <label
                        htmlFor="input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-primary"
                      >
                        Your Phone number or email
                      </label>
                      <input
                        type="text"
                        name="input"
                        id="input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="08022233344 / myemail@email.com"
                        required=""
                        {...register("Input", { required: true })}
                      />
                      {errors.Input && (
                        <p className="text-sm text-redborder">
                          {" "}
                          phone number or email is required{" "}
                        </p>
                      )}

                      {error && 
                        <p className="text-sm text-redborder">
                          {error}
                          
                        </p>
                      }

                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-primary"
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
                        <span
                          onClick={handleToggle}
                          className={` text-gray ${
                            icon ? "hidden" : "flex"
                          } justify-center items-center  `}
                        >
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
                        <span
                          onClick={handleToggle}
                          className={` text-gray ${
                            icon ? "flex" : "hidden"
                          } justify-center items-center  `}
                        >
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
                          {" "}
                          password is required{" "}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                            checked={persist}
                            onChange={togglePersist}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-darkMenu dark:text-lightGray"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <span
                        onClick={() => {
                          navigate("/forgotpassword");
                          setLogin(false);
                        }}
                        className="text-sm cursor-pointer font-medium text-background hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || isSubmitting || !isValid}
                      className="w-full text-white bg-secondary flex justify-center items-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-graybg animate-spin dark:text-darkHover fill-background"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>{" "}
                        </>
                      ) : (
                        " Sign in"
                      )}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-lightGray">
                      Don’t have an account yet?{" "}
                      <Link
                        onClick={() => {
                          setLogin(false);
                          setRegister(true);
                        }}
                        className="font-medium text-background text-lg cursor-pointer hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default UserLogin;
