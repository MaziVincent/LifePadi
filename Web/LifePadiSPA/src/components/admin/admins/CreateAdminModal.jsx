import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LoadingGif from "../../shared/LodingGif";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const CreateAdminModal = ({ open, handleClose }) => {
  const post = usePost();
  const { auth } = useAuth();
  const url = `${baseUrl}admin/create`;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const create = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await post(url, formData, auth?.accessToken);
    // console.log(response.data);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
      toast.success("Admin Created Successfully");
      handleClose({ type: "open" });
      reset();
    },
  });

  const handleCreate = (admin) => {
    //  console.log(data)
    mutate(admin);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "open" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-9   md:right-1/4 z-50 justify-center items-center  w-full md:w-2/4   h-modal md:h-full "
      >
        <Toaster />
        <div className="relative p-4 bg-primary rounded-lg shadow dark:bg-gray-800 dark:text-gray-50 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Create Admin
            </h3>
            <button
              type="button"
              onClick={() => {
                handleClose({ type: "open" });
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

          <div className="border-b-2">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Personal Info."
                {...a11yProps(0)}
              />
              <Tab
                label="Login Info."
                {...a11yProps(1)}
              />
             </Tabs>
          </div>
          <form onSubmit={handleSubmit(handleCreate)}>
            <CustomTabPanel
              value={value}
              index={0}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="fname"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    {...register("FirstName", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Firstname of Admin"
                    required=""
                  />
                  {errors.FirstName && (
                    <p className="text-sm text-red">
                      Name of Admin is required
                    </p>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="lname"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    {...register("LastName", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Lastname of Admin"
                    required=""
                  />
                  {errors.LastName && (
                    <p className="text-sm text-red">
                      Last Name of Admin is required
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Phone Number of Admin"
                    required
                  />
                  {errors.PhoneNumber && (
                    <p className="text-sm text-red">
                      Phone Number of Admin is required
                    </p>
                  )}
                </div>
               
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-50"
                  >
                    Contact Address
                  </label>
                  <textarea
                    id="address"
                    rows="4"
                    name="address"
                    {...register("ContactAddress", { required: true })}
                    className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write Contact Address here"
                  ></textarea>
                  {errors.ContactAddress && (
                    <p className="text-sm text-red">Address is required</p>
                  )}
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={1}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                    {...register("Email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Email Address of Admin"
                    required=""
                  />
                  {errors.Email && (
                    <p className="text-sm text-red">{errors.Email.message}</p>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    {...register("Password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Password"
                    required
                  />

                  {errors.Password && (
                    <p className="text-sm text-red">
                      {errors.Password.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    {...register("ConfirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("Password") || "Passwords do not match",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type confirm Password "
                    required=""
                  />

                  {errors.ConfirmPassword && (
                    <p className="text-sm text-red">
                      {errors.ConfirmPassword.message}
                    </p>
                  )}
                              </div>
                              
                              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="text-gray-700 cursor-pointer dark:text-white inline-flex items-center bg-graybg hover:ring-2 hover:ring-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg font-bold text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {isSubmitting ? <LoadingGif /> : "Create new Admin"}
              </button>
              {!isValid && (
                <p className="text-sm text-redborder">
                  Fill the form correctly
                </p>
              )}
              </div>
            </CustomTabPanel>
           
              
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAdminModal;
