import usePost from "../../../../hooks/usePost";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import baseUrl from "../../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../../subcomponents/CustomTabPanel";
import SubmitButton from "../../subcomponents/SubmitButton";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateVendorModal = ({ open, handleClose, vendorCategory }) => {
  const post = usePost();
  const fetch = useFetch();
  const { auth } = useAuth();
  const url = `${baseUrl}vendor/create`;
  const queryClient = useQueryClient();
  const [states, setStates] = useState([]);
  const [lga, setLGAs] = useState([]);

  const getServices = async (url) => {
    const res = await fetch(url, auth.accessToken);

    return res.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(`${baseUrl}service/allLite`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

  //console.log(data);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  const create = async (data) => {
    const vendor = { ...data, VendorCategoryId: vendorCategory };
    // console.log(vendor)
    const formData = new FormData();
    for (const key in vendor) {
      formData.append(key, vendor[key]);
    }
    const response = await post(url, formData, auth?.accessToken);
    //console.log(response.data);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendorcategory");
      toast.success("Vendor Created Successfully");
      handleClose({ type: "open" });
      reset();
    },
  });

  const handleCreate = (vendor) => {
    //console.log(vendor)
    mutate(vendor);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getStates = async () => {
      const result = await fetch("https://nga-states-lga.onrender.com/fetch");
      setStates(result.data);
      //console.log(result.data);
    };

    getStates();
  }, [vendorCategory]);

  const handleStateChange = (e) => {
    e.preventDefault();
    const getLGAs = async (state) => {
      const result = await fetch(
        `https://nga-states-lga.onrender.com/?state=${state}`
      );

      console.log(result.data)
      setLGAs(result.data);
    };
    getLGAs(e.target.value);
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
        className=" overflow-y-scroll overflow-x-hidden pt-28 pb-10 flex z-50 justify-center items-center  w-full  h-full "
      >
        <Toaster />
        <div className=" overflow-y-auto relative p-4 bg-primary rounded-lg shadow dark:bg-darkMenu dark:text-primary sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Create Vendor
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

          <div className="border-b-2 bg-graybg rounded-md">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="primary"
              indicatorColor="primary"
              
            >
              <Tab
                label="Business Info."
                {...a11yProps(0)}
              />
              <Tab
                label="Address Info."
                {...a11yProps(1)}
              />
              <Tab
                label="Identity Info."
                {...a11yProps(2)}
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
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="bname"
                    id="bname"
                    {...register("Name", { required: true })}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-grayTxt dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Name of Business"
                    required=""
                  />
                  {errors.Name && (
                    <p className="text-sm text-red">
                      Name of Business is required
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
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-grayTxt dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Phone Number of Rider"
                    required
                  />
                  {errors.PhoneNumber && (
                    <p className="text-sm text-red">
                      Phone Number of Rider is required
                    </p>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    {...register("Tag", { required: true })}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-grayTxt dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type a Business Tag"
                    required=""
                  />
                  {errors.Tag && (
                    <p className="text-sm text-red">
                      Business Tag is required
                    </p>
                  )}
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="openingHours"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Opening Hours
                  </label>
                  <input
                    type="time"
                    name="openingHours"
                    id="openingHours"
                    {...register("OpeningHours", { required: true })}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type a Business Opening Hours"
                    required=""
                  />
                  {errors.OpeningHours && (
                    <p className="text-sm text-red">
                      Business Opening hours is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="tag"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Closing Hours
                  </label>
                  <input
                    type="time"
                    name="ClosingHours"
                    id="ClosingHours"
                    {...register("ClosingHours", { required: true })}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type a Business ClosingHours"
                    required=""
                  />
                  {errors.ClosingHours && (
                    <p className="text-sm text-red">
                      Business Closing Hours is required
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="Service"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Service Type
                  </label>
                  <select
                    id="Service"
                    name="Service"
                    {...register("ServiceId", {
                      required: "ID Service is required",
                    })}
                    defaultValue={"default"}
                    className="bg-graybg border border-gray-300 text-grayTxt text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                    >
                      Select Service Type
                    </option>
                    {isError && <option> Error Loading Service </option>}
                    {isLoading && <option> Loading Service... </option>}

                    {data?.map((service) => (
                      <option
                        key={service.Id}
                        value={service.Id}
                      >
                        {service.Name}
                      </option>
                    ))}
                  </select>

                  {errors.ServiceId && (
                    <span className="text-sm text-red">
                      {errors.ServiceId.message}
                    </span>
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
                    className="block p-2.5 w-full text-base text-grayTxt bg-graybg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write Contact Address here"
                  ></textarea>
                  {errors.ContactAddress && (
                    <p className="text-sm text-red">Address is required</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Vendor State
                  </label>
                  <select
                    id="state"
                    name="state"
                    {...register("State", {
                      required: "State is required",
                    })}
                    defaultValue={"default"}
                    onChange={(e, value) => handleStateChange(e)}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                      
                    >
                      Select State
                    </option>

                    {states?.map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>

                  {errors.State && (
                    <span className="text-sm text-red">
                      {errors.State.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Vendor City/LGA
                  </label>
                  <select
                    id="state"
                    name="state"
                    {...register("City", {
                      required: "City is required",
                    })}
                    defaultValue={"default"}
                    className="text-grayTxt bg-graybg border border-gray-300  text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-900 placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value="default"
                      className="text-gray-600"
                      selected
                    >
                      Select City/LGA
                    </option>

                    { lga.map((lga) => (
                      <option
                        key={lga}
                        value={lga}
                      >
                        {lga}
                      </option>
                    ))}
                  </select>

                  {errors.City && (
                    <span className="text-sm text-red">
                      {errors.City.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="town"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Vendor Town
                  </label>
                  <input
                    type="text"
                    name="town"
                    id="town"
                    {...register("Town", {
                      required: true,
                    })}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Town of Vendor"
                    required=""
                  />
                  {errors.Town && (
                    <p className="text-sm text-red">Town is required</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="code"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    {...register("PostalCode")}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Postal Code of Vendor"
                  />
                  {/* {errors.PostalCode && (
                    <p className="text-sm text-red-400">
                      Postal Code is required
                    </p>
                  )} */}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="longitude"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    id="longitude"
                    {...register("Longitude")}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Longitude of Vendor"
                  />
                  {/* {errors.Longitude && (
                    <p className="text-sm text-red-400">
                      Longitude is required
                    </p>
                  )} */}
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="latitude"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    id="latitude"
                    {...register("Latitude")}
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Latitude of Vendor"
                  />
                  {/* {errors.Latitude && (
                    <p className="text-sm text-red-400">Latitude is required</p>
                  )} */}
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
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Email Address of Rider"
                    required=""
                  />
                  {errors.Email && (
                    <p className="text-sm text-red">
                      {errors.Email.message}
                    </p>
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
                    className=" border border-gray-300 text-grayTxt bg-graybg text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="text-grayTxt bg-graybg border border-gray-300 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type confirm Password "
                    required=""
                  />

                  {errors.ConfirmPassword && (
                    <p className="text-sm text-red">
                      {errors.ConfirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <SubmitButton isSubmitting={isSubmitting} name="Create New Vendor" />
              {!isValid && (
                <p className="text-sm text-redborder pt-3">Fill the form correctly</p>
              )}
            </CustomTabPanel>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateVendorModal;
