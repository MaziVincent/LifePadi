import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  StarOutlined,
  WatchLaterOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MedPl from "../../assets/images/med_plus.png";
import Rfood from "../../assets/images/food.jpeg";

const VendorByLocation = () => {
  return (
    <div className="">
      <div className=" max-lg:mt-36 min-h-96 flex items-center justify-center">
        <div className=" flex flex-col gap-4">
          <div className=" flex justify-center items-center w-full">
            <h1 className=" text-center text-4xl font-bold ">
              Order your products from ...Vendor
            </h1>
          </div>
          <h2 className=" text-center text-gray-200 font-normal text-2xl">
            Choose from the top categories
          </h2>
          <div className=" flex justify-center gap-4 items-center flex-wrap">
            <h2 className=" px-3 py-1 dark:bg-darkHover bg-gray rounded-full text-sm text-cyan-800">
              All
            </h2>
            <h2 className=" px-3 py-1 dark:bg-darkHover bg-gray rounded-full text-sm text-cyan-800">
              Pizza
            </h2>
            <h2 className=" px-3 py-1 dark:bg-darkHover bg-gray rounded-full text-sm text-cyan-800">
              African
            </h2>
            <h2 className=" px-3 py-1 dark:bg-darkHover bg-gray rounded-full text-sm text-cyan-800">
              Chicken
            </h2>
            <h2 className=" px-3 py-1 dark:bg-darkHover bg-gray rounded-full text-sm text-cyan-800">
              Drinks
            </h2>
            <h2 className=" px-3 py-1 dark:bg-darkHover bg-gray rounded-full text-sm text-cyan-800">
              Fit Fam
            </h2>
            
          </div>
        </div>
      </div>
      <div className=" flex justify-end items-center">
        <div className="  w-1/3 ">
          <input
            type="search"
            placeholder="search the store"
            className=" w-full border p-3 rounded-lg focus:outline-none"
          />
        </div>
      </div>
      <div className=" flex justify-center flex-wrap items-center gap-8">
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={MedPl}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Pharmacy
                </Link>
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Dinner</Link> */}
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Food</Link> */}
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={MedPl}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Pharmacy
                </Link>
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Dinner</Link> */}
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Food</Link> */}
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={MedPl}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Pharmacy
                </Link>
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Dinner</Link> */}
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Food</Link> */}
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={MedPl}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Pharmacy
                </Link>
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Dinner</Link> */}
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Food</Link> */}
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={MedPl}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Pharmacy
                </Link>
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Dinner</Link> */}
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Food</Link> */}
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={MedPl}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Pharmacy
                </Link>
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Dinner</Link> */}
                {/* <Link className=' uppercase text-cyan-700 text-sm font-medium'>Food</Link> */}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className=" my-10 flex justify-center flex-wrap items-center gap-8">
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={Rfood}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Restaurant
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Dinner
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Food
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={Rfood}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Restaurant
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Dinner
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Food
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={Rfood}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Restaurant
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Dinner
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Food
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={Rfood}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Restaurant
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Dinner
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Food
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={Rfood}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Restaurant
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Dinner
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Food
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col items-center bg-white rounded-lg w-1/4 max-lg:w-1/2 max-md:w-full hover:shadow-md">
          <Link className=" w-full p-2">
            <div className=" relative w-full rounded-lg h-48 shadow-sm">
              <img
                src={Rfood}
                alt=""
                className=" w-full rounded-lg h-full"
              />
              <div className=" absolute top-2 left-3 bg-yellow-500 rounded-full h-8 w-8">
                <span className=" w-full h-full flex items-center justify-center text-white">
                  <FavoriteBorder fontSize="" />
                </span>
              </div>
            </div>
            <div>
              <div className=" flex justify-between items-center py-2">
                <h2 className=" text-lg font-normal">Food and Liquor</h2>
                <span className=" flex items-center gap-1 text-sm text-orange-300">
                  <span className=" text-gray-600">4.3</span>{" "}
                  <StarOutlined fontSize="" />
                </span>
              </div>
              <div className=" pb-1">
                <span className=" flex items-center text-blue-700">
                  <WatchLaterOutlined fontSize="s" />{" "}
                  <span className=" text-gray-600">16-26 mins</span>
                </span>
              </div>
              <div className=" flex flex-row gap-4 py-2">
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Restaurant
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Dinner
                </Link>
                <Link className=" uppercase text-cyan-700 text-sm font-medium">
                  Food
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorByLocation;
