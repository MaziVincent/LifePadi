import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import LoadingGif from "../../shared/LodingGif";

const UploadImageModal = ({ open, handleClose,url, id, name }) => {
  const update = useUpdate();
  const { auth } = useAuth();
  const URI = `${url}/uploadImg/${id}`;
  const queryClient = useQueryClient();
  const [fileError, setFileError] = useState(false);
  const [file, setFile] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const create = async (data) => {
    const formData = new FormData();

    formData.append("Image", data.Image[0]);

    const response = await update(URI, formData, auth?.accessToken);
    console.log(response);
  };

  const { mutate } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${name}`);
      toast.success("Image Uploaded Successfully");
      reset();
      handleClose({ type: "upload" });
    },
  });

  const handleUpload = (image) => {
    // console.log(image)
    mutate(image);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    //console.log(file)

    if (!file || file.size > 200 * 1024) {
      setFileError(true);
      setFile(null)
    } else {
      setFileError(false);
      setFile(file)
    }
  };

  // console.log(data)
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose({ type: "upload" });
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
          <div className="relative p-4 bg-primary rounded-lg shadow dark:bg-gray-800 dark:text-gray-50 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 capitalize dark:text-gray-50">
                {`Upload ${name} Image`}
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleClose({ type: "upload" });
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
            <form onSubmit={handleSubmit(handleUpload)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="icon"
                    className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-50"
                  >
                     Image (
                    <span className="text-sm text-gray-500">
                      {" "}
                      Icon should not be above 200kb
                    </span>
                    )
                  </label>
                  <input
                    type="file"
                    name="icon"
                    id="icon"
                    accept="image/*"
                    {...register("Image", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Upload Vendor Image"
                    required
                    onChange={handleChange}
                  />
                  {errors.icon && (
                    <p className="text-sm text-red-400">
                      Vendor Image is required
                    </p>
                  )}
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
                disabled={fileError}
                className={`inline-flex items-center ${
                  fileError ? "text-green-700" : "text-gray-700"
                } dark:text-gray-50 bg-primary-700 hover:bg-gray-200 focus:ring-4 capitalize focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
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
                {isSubmitting ? <LoadingGif/> : `Upload ${name} Image` }
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadImageModal;
