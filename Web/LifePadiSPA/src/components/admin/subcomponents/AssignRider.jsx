import useUpdate from "../../../hooks/useUpdate";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const AssignRider = ({ id, open, handleClose }) =>{
    const update = useUpdate();
    const fetch = useFetch();
    const { auth } = useAuth();
    const url = `${baseUrl}rider/all?PageSize=10`;
    const queryClient = useQueryClient();

    const getRiders = async (url) => {
      const res = await fetch(url, auth.accessToken);

      return res.data;
    };

    const { data, isError, isLoading, isSuccess } = useQuery({
      queryKey: ["riders"],
      queryFn: () => getRiders(url),
      keepPreviousData: true,
      staleTime: 20000,
      refetchOnMount: "always",
    });

    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors, isValid, isSubmitting },
    } = useForm({ mode: "all" });

    const create = async (data) => {
       
      const info = {riderId: data.RiderId, id}
      //const formData = new FormData();
      // for (const key in data) {
      //   formData.append(key, data[key]);
      // }
     const response = await update(`${baseUrl}delivery/assignRider/${id}/${data.RiderId}`, info, auth?.accessToken);
      console.log(response.data);
    };

    const { mutate } = useMutation(create, {
      onSuccess: () => {
        queryClient.invalidateQueries("delivery");
        toast.success("Rider Assigned Successfully");
        handleClose(false);
        reset();
      },
    });

    const handleCreate = (data) => {
      //console.log(data);
      mutate(data);
    };

    return (
      <Modal
        open={open}
        onClose={() => {
          handleClose(false)
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
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-primary rounded-lg shadow dark:bg-darkMenu dark:text-primary sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Assign Riders
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    handleClose(false)
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
              {/* <!-- Modal body --> */}
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="rider"
                      className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                    >
                      Select Rider
                    </label>
                    <select
                      id="rider"
                      name="rider"
                      {...register("RiderId", {
                        required: "Rider is required",
                      })}
                      defaultValue={"default"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base capitalize rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-grayTxt dark:bg-darkHover placeholder-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option
                        disabled
                        value="default"
                        className="text-gray-600"
                      >
                        Select Rider
                      </option>
                      {isError && <option> Error Loading Category </option>}
                      {isLoading && <option> Loading Category... </option>}

                      { isSuccess &&  data?.result?.map((rider) => (
                        <option
                          key={rider.Id}
                          value={rider.Id}
                        >
                          {rider.FirstName} {rider.LastName}
                        </option>
                      ))}
                    </select>

                    {errors.RiderId && (
                      <span className="text-sm text-red-400">
                        {errors.RiderId.message}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`inline-flex items-center ${
                    isValid ? "text-background" : "text-gray"
                  } dark:text-gray-50 bg-primary-700 hover:bg-secondary hover:text-accent focus:ring-4 focus:outline-none focus:ring-darkSecondaryText font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
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
                { isSubmitting ? <CircularProgress /> : 'Assign Rider'}  
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

export default AssignRider;
