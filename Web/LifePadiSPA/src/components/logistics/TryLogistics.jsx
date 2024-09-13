import courier from "../../assets/images/courier.png";
import delivery from "../../assets/images/delivery (1).png";
import sendPackage from "../../assets/images/send package.png"
import recievePackage from "../../assets/images/recieve package.png"

const TryLogistics = () => {
  return (
    <div className="py-28 bg-lightGray">
      <div className=" flex flex-col items-center justify-center  gap-10   w-full  px-3">
        <div className="flex-col items-center w-full md:flex-row md:w-9/12 bg-secondary rounded-xl shadow-xl p-3 cursor-pointer hover:bg-background ">
          <h2 className="text-4xl text-center font-bold text-accent ">
            {" "}
            SEND PACKAGE{" "}
          </h2>
          <div className="flex justify-center">
            <img
              src={sendPackage}
              alt=""
              className=" border-accent "
            />
          </div>
        </div>

        <div className="flex-col items-center w-full md:flex-row md:w-9/12 bg-secondary rounded-xl shadow-xl p-3 cursor-pointer hover:bg-background ">
          <h2 className="text-4xl text-center font-bold text-accent">
            {" "}
            RECIEVE A PACKAGE{" "}
          </h2>
          <div>
          <img
            src={recievePackage}
            alt=""
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryLogistics;
