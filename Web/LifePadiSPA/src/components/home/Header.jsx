import logo from "../../assets/images/Logo+name (dark).svg";
import {
  Clear,
  Home,
  HomeOutlined,
  Segment,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showDiv, setShowDiv] = useState(false);

  const handleShowDiv = () => {
    setShowDiv(!showDiv);
  };
  return (
    <header className=" fixed bg-inherit z-40 flex justify-between items-center px-4 w-full top-0 py-4">
      <div className="w-40">
        <Link to="/" className=" px-6 py-2 w rounded-full flex items-center gap-4 text-primary font-semibold">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className=" flex items-center gap-4">
        <ul className=" flex items-center list-none gap-4 max-lg:hidden">
          <li>
            <Link className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              About
            </Link>
          </li>
          <li>
            <Link className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              Logistics
            </Link>
          </li>
          <li>
            <Link className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              Order now
            </Link>
          </li>
        </ul>
        <Link
          to="/store"
          className=" bg-primary text-secondary flex justify-center items-center p-3 rounded-full shadow-lg"
        >
          <ShoppingCartOutlined />
        </Link>
        <button
          onClick={handleShowDiv}
          className=" max-2xl:hidden flex justify-center items-center bg-secondary text-primary rounded-full p-2 max-lg:block shadow-lg"
        >
          <Segment fontSize="large" />
        </button>
      </div>
      {showDiv && (
        <nav className=" absolute top-0 w-full left-0 bg-accent h-screen">
          <div className="fixed bg-accent w-full z-40 flex justify-end items-cente px-4 gap-4 border-b border-grayTxt">
            <div className=" flex items-center gap-4 py-6">
              <button className="">
                <Link className="text-secondary bg-primary flex items-center rounded-full p-3">
                  <ShoppingCart />
                </Link>
              </button>
              <button
                onClick={handleShowDiv}
                className=""
              >
                <Link className=" text-primary ">
                  <Clear fontSize="large" />
                </Link>
              </button>
            </div>
          </div>
          <div className="menu pt-24 overflow-y-auto h-screen">
            <ul className="flex items-center flex-col list-none w-full">
              <li className=" w-full border-y border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
              <li className=" w-full border-b border-grayTxt hover:bg-lightteal hover:bg-opacity-20">
                <Link className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <ShoppingBag /> <span>Company</span>
                </Link>
              </li>
            </ul>
            <div className=" w-full py-8">
              <p className=" text-center flex items-center justify-center text-grayTxt">
                <span>&copy;</span>
                All right reserved. 2024 Choplyf Technology
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
