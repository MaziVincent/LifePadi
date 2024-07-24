import {
  FavoriteBorder,
  StarOutlined,
  StoreRounded,
  WatchLaterOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Rice1 from "../../assets/images/rice.jpeg";
import useFetch from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import baseUrl from "../../api/baseUrl";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";


const Shop = () => {

  const url = `${baseUrl}vendor`
  const fetch = useFetch();
  const {auth} = useAuth();
  const [vendorCategories, setVendorCategories] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  const getVendors = async (url) => {
    const response = await fetch(url, auth.accessToken);

    return response.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["vendors", page, search],
    queryFn: () =>
      getVendors(`${url}/all?PageNumber=${page}&SearchString=${search}`),
    keepPreviousData: true,
    staleTime: 20000,
    refetchOnMount: "always",
  });

  const getVendorCategories = useCallback(async () => {
    try {
      const result = await fetch(`${baseUrl}vendorcategory/all`);
      setVendorCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error fetching services. Please try again later.");
    }
  }, [baseUrl]);

  useEffect(() => {
    getVendorCategories();
    //console.log('services')

  }, []);

  return (
    <div className="flex flex-col dark:bg-darkBg dark:text-primary gap-4 ">
      <div className=" lg:pl-32  p-4 flex flex-col gap-5">
        <h1 className=" text-2xl font-normal">Explore Categories</h1>
        <div className="categories flex items-center gap-8 overflow-auto w-full ">
          <div className=" flex flex-col min-w-32 justify-center items-center bg-lightcyan bg-opacity-20 py-4 px-2 rounded-lg shadow-md">
            <Link className="flex flex-col items-center cursor-pointer">
              <span>
                <StoreRounded fontSize="large" />
              </span>
              <p>African Meals</p>
            </Link>
          </div>
          <div className=" flex flex-col min-w-32 justify-center items-center bg-lightorange bg-opacity-20 py-4 px-2 rounded-lg shadow-md">
            <Link className="flex flex-col items-center cursor-pointer">
              <span>
                <StoreRounded fontSize="large" />
              </span>
              <p>African Meals</p>
            </Link>
          </div>
          <div className=" flex flex-col min-w-32 justify-center items-center bg-lightteal bg-opacity-20 py-4 px-2 rounded-lg shadow-md">
            <Link className="flex flex-col items-center cursor-pointer">
              <span>
                <StoreRounded fontSize="large" />
              </span>
              <p>African Meals</p>
            </Link>
          </div>
          <div className=" flex flex-col min-w-32 justify-center items-center bg-lightviolet bg-opacity-20 py-4 px-2 rounded-lg shadow-md">
            <Link className="flex flex-col items-center cursor-pointer">
              <span>
                <StoreRounded fontSize="large" />
              </span>
              <p>African Meals</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 lg:pl-32 flex flex-col">
        <div className=" pb-6">
          <h1 className=" text-2xl font-normal">All Restaurant</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 w-full p-1 max-w-7xl">
          <div className=" flex flex-col items-center dark:hover:bg-darkHover rounded-lg  hover:shadow-md">
            <Link
              to="/store/product_details/"
              className=" w-full p-2"
            >
              <div className=" relative w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" absolute top-2 left-3 bg-secondary rounded-full h-8 w-8">
                  <span className=" w-full h-full flex items-center justify-center text-primary">
                    <FavoriteBorder fontSize="" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-lg font-normal">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-secondary">
                    <span className=" text-gray-600">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>
                <div className=" pb-1">
                  <span className=" flex items-center gap-1 text-background">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className=" text-gray-600">16-26 mins</span>
                  </span>
                </div>
                <div className=" flex flex-row gap-4 py-2 text-secondary">
                  <span className=" uppercase  text-sm font-medium">
                    Restaurant
                  </span>
                  <span className=" uppercase  text-sm font-medium">
                    Dinner
                  </span>
                  <span className=" uppercase text-sm font-medium">Food</span>
                </div>
              </div>
            </Link>
          </div>
          <div className=" flex flex-col items-center dark:hover:bg-darkHover rounded-lg  max-md:w-full hover:shadow-md">
            <Link
              to="/store/product_details/"
              className=" w-full p-2"
            >
              <div className=" relative w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" absolute top-2 left-3 bg-secondary rounded-full h-8 w-8">
                  <span className=" w-full h-full flex items-center justify-center text-primary">
                    <FavoriteBorder fontSize="" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-lg font-normal">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-secondary">
                    <span className=" text-gray-600">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>
                <div className=" pb-1">
                  <span className=" flex items-center gap-1 text-background">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className=" text-gray-600">16-26 mins</span>
                  </span>
                </div>
                <div className=" flex flex-row gap-4 py-2 text-secondary">
                  <span className=" uppercase  text-sm font-medium">
                    Restaurant
                  </span>
                  <span className=" uppercase  text-sm font-medium">
                    Dinner
                  </span>
                  <span className=" uppercase text-sm font-medium">Food</span>
                </div>
              </div>
            </Link>
          </div>
          <div className=" flex flex-col items-center dark:hover:bg-darkHover rounded-lg  max-md:w-full hover:shadow-md">
            <Link
              to="/store/product_details/"
              className=" w-full p-2"
            >
              <div className=" relative w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" absolute top-2 left-3 bg-secondary rounded-full h-8 w-8">
                  <span className=" w-full h-full flex items-center justify-center text-primary">
                    <FavoriteBorder fontSize="" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-lg font-normal">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-secondary">
                    <span className=" text-gray-600">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>
                <div className=" pb-1">
                  <span className=" flex items-center gap-1 text-background">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className=" text-gray-600">16-26 mins</span>
                  </span>
                </div>
                <div className=" flex flex-row gap-4 py-2 text-secondary">
                  <span className=" uppercase  text-sm font-medium">
                    Restaurant
                  </span>
                  <span className=" uppercase  text-sm font-medium">
                    Dinner
                  </span>
                  <span className=" uppercase text-sm font-medium">Food</span>
                </div>
              </div>
            </Link>
          </div>
          <div className=" flex flex-col items-center dark:hover:bg-darkHover rounded-lg  max-md:w-full hover:shadow-md">
            <Link
              to="/store/product_details/"
              className=" w-full p-2"
            >
              <div className=" relative w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" absolute top-2 left-3 bg-secondary rounded-full h-8 w-8">
                  <span className=" w-full h-full flex items-center justify-center text-primary">
                    <FavoriteBorder fontSize="" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-lg font-normal">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-secondary">
                    <span className=" text-gray-600">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>
                <div className=" pb-1">
                  <span className=" flex items-center gap-1 text-background">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className=" text-gray-600">16-26 mins</span>
                  </span>
                </div>
                <div className=" flex flex-row gap-4 py-2 text-secondary">
                  <span className=" uppercase  text-sm font-medium">
                    Restaurant
                  </span>
                  <span className=" uppercase  text-sm font-medium">
                    Dinner
                  </span>
                  <span className=" uppercase text-sm font-medium">Food</span>
                </div>
              </div>
            </Link>
          </div>
          <div className=" flex flex-col items-center dark:hover:bg-darkHover rounded-lg  max-md:w-full hover:shadow-md">
            <Link
              to="/store/product_details/"
              className=" w-full p-2"
            >
              <div className=" relative w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" absolute top-2 left-3 bg-secondary rounded-full h-8 w-8">
                  <span className=" w-full h-full flex items-center justify-center text-primary">
                    <FavoriteBorder fontSize="" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-lg font-normal">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-secondary">
                    <span className=" text-gray-600">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>
                <div className=" pb-1">
                  <span className=" flex items-center gap-1 text-background">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className=" text-gray-600">16-26 mins</span>
                  </span>
                </div>
                <div className=" flex flex-row gap-4 py-2 text-secondary">
                  <span className=" uppercase  text-sm font-medium">
                    Restaurant
                  </span>
                  <span className=" uppercase  text-sm font-medium">
                    Dinner
                  </span>
                  <span className=" uppercase text-sm font-medium">Food</span>
                </div>
              </div>
            </Link>
          </div>
          <div className=" flex flex-col items-center dark:hover:bg-darkHover rounded-lg  max-md:w-full hover:shadow-md">
            <Link
              to="/store/product_details/"
              className=" w-full p-2"
            >
              <div className=" relative w-full rounded-lg h-48">
                <img
                  src={Rice1}
                  alt=""
                  className=" w-full rounded-lg h-full"
                />
                <div className=" absolute top-2 left-3 bg-secondary rounded-full h-8 w-8">
                  <span className=" w-full h-full flex items-center justify-center text-primary">
                    <FavoriteBorder fontSize="" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" flex justify-between items-center py-2">
                  <h2 className=" text-lg font-normal">Food and Liquor</h2>
                  <span className=" flex items-center gap-1 text-sm text-secondary">
                    <span className=" text-gray-600">4.3</span>{" "}
                    <StarOutlined fontSize="" />
                  </span>
                </div>
                <div className=" pb-1">
                  <span className=" flex items-center gap-1 text-background">
                    <WatchLaterOutlined fontSize="s" />{" "}
                    <span className=" text-gray-600">16-26 mins</span>
                  </span>
                </div>
                <div className=" flex flex-row gap-4 py-2 text-secondary">
                  <span className=" uppercase  text-sm font-medium">
                    Restaurant
                  </span>
                  <span className=" uppercase  text-sm font-medium">
                    Dinner
                  </span>
                  <span className=" uppercase text-sm font-medium">Food</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className=" w-full flex justify-center p-4">
          <button className=" py-2 px-2 border border-background rounded-lg">
            <Link className=" text-secondary">View More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
