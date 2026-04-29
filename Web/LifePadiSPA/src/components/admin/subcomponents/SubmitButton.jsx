import LoadingGif from "../../shared/LodingGif";

const SubmitButton = ({ isSubmitting, name }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`inline-flex items-center text-background dark:text-gray-50 bg-primary-700 ring-2 hover:ring-background hover:bg-graybg focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-muted dark:focus:ring-primary-800`}
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
      {isSubmitting ? <LoadingGif /> : `${name}`}
    </button>
  );
};

export default SubmitButton;
