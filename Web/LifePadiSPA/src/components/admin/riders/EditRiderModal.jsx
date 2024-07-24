import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

const idTypes = [
  { name: "National ID " },
  { name: "Voters Card " },
  { name: "Drivers Licence " },
];

const EditRiderModal = ({ open, handleClose, rider }) => {
  const update = useUpdate();
  const { auth } = useAuth();
  const url = `${baseUrl}rider`;
  const queryClient = useQueryClient();
  const [fileError, setFileError] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const updateRider = async (data) => {
    const formData = new FormData();
    if (file) {
      data = { ...data, IdentityImg: file };
      console.log(data);
    }
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const response = await update(
      `${url}/update/${rider.Id}`,
      formData,
      auth?.accessToken
    );
    console.log(response.data);
  };

  const { mutate } = useMutation(updateRider, {
    onSuccess: () => {
      queryClient.invalidateQueries("riders");
      toast.success("Rider Updated Successfully");
      handleClose({ type: "edit" });
      reset();
    },
  });

  const handleUpdate = (rider) => {
    //  console.log(data)
    mutate(rider);
  };

  const [value, setVal] = useState(0);

  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];

    //console.log(file)

    if (!file || file.size > 200 * 1024) {
      setFileError(true);
      setFile(null);
    } else {
      setFile(file);
      setFileError(false);
    }
  };

  useEffect(() => {
    Object.entries(rider).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [rider, setValue]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "edit" });
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
              Update Rider
            </h3>
            <button
              type="button"
              onClick={() => {
                handleClose({ type: "edit" });
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
              <Tab
                label="Identity Info."
                {...a11yProps(2)}
              />
            </Tabs>
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
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
                    placeholder="Type Firstname of Rider"
                    required=""
                  />
                  {errors.FirstName && (
                    <p className="text-sm text-red-400">
                      Name of Rider is required
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
                    placeholder="Type Lastname of Rider"
                    required=""
                  />
                  {errors.LastName && (
                    <p className="text-sm text-red-400">
                      Last Name of Rider is required
                    </p>
                  )}
                </div>
                <div className="sm:col-span-1">
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
                    placeholder="Type Phone Number of Rider"
                    required
                  />
                  {errors.PhoneNumber && (
                    <p className="text-sm text-red-400">
                      Phone Number of Rider is required
                    </p>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="emergencyContact"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    id="emergencyContact"
                    {...register("EmergencyContact", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Emergency Contact of Rider"
                    required
                  />
                  {errors.EmergencyContact && (
                    <p className="text-sm text-red-400">
                      Emergency Contact of Rider is required
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
                    <p className="text-sm text-red-400">Address is required</p>
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
                    placeholder="Type Email Address of Rider"
                    required=""
                  />
                  {errors.Email && (
                    <p className="text-sm text-red-400">
                      {errors.Email.message}
                    </p>
                  )}
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={2}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="idType"
                    className="block mb-2 text-sm font-bold text-gray-900"
                  >
                    Identity Type
                  </label>
                  <select
                    id="idType"
                    name="idType"
                    {...register("IdentityType", {
                      required: "ID Type is required",
                    })}
                    defaultValue={"default"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                    >
                      Select ID type
                    </option>

                    {idTypes.map((id) => (
                      <option
                        key={id.name}
                        value={id.name}
                      >
                        {id.name}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="idNumber"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Identity Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    {...register("IdentityNumber", {
                      required: true,
                      minLength: {
                        value: 11,
                        message: "ID Number must be at least 11 characters",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type ID Number of Rider"
                    required
                  />
                  {errors.idNumber && (
                    <p className="text-sm text-red-400">
                      ID Number of Rider is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="idImage"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    ID Image (
                    <span className="text-sm text-gray-500">
                      {" "}
                      Image should not be above 200kb
                    </span>
                    )
                  </label>
                  <input
                    type="file"
                    name="idImage"
                    id="idImage"
                    accept="image/*"
                    {...register("IdentityImg")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Upload ID Image"
                    required
                    onChange={handleFile}
                  />
                  {/* {errors.IdentityImg && (
                      <p className="text-sm text-red-400">{errors.IdentityImg.message}</p>
                    )} */}
                  {fileError && (
                    <p className="text-sm text-red-400">
                      {" "}
                      File should not be above 200kb
                    </p>
                  )}
                  {file && (
                    <p className="text-sm text-green-600">
                      Selected Image: {file.name}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="text-background cursor-pointer dark:text-white inline-flex items-center bg-graybg hover:bg-gray-200 hover:ring-2 focus:outline-none hover:ring-background rounded-lg font-bold text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                Update Rider
              </button>
              {!isValid && (
                <p className="text-sm text-redborder">Fill the form correctly</p>
              )}
            </CustomTabPanel>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditRiderModal;
