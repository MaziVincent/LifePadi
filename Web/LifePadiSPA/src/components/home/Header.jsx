import logo from "../../assets/images/Logonamedark.svg";
import { useNavigate } from "react-router-dom";
import {
  Clear,
  Home,
  HomeOutlined,
  Segment,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartOutlined,
  
} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showDiv, setShowDiv] = useState(false);

  const handleShowDiv = () => {
    setShowDiv(!showDiv);
  };
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
    handleShowDiv();
  }
  return (
    <header className=" fixed z-40 flex justify-between items-center px-4 w-full top-0 py-4">
      <div className="w-40 bg-primary rounded-xl">
        <Link to="/" className=" px-6 py-2 w rounded-full flex items-center gap-4 text-primary font-semibold">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className=" flex items-center gap-4">
        <ul className=" lg:flex items-center list-none gap-4 hidden">
          <li>
            <Link to="/shop" className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              Stores
            </Link>
          </li>
          <li>
            <Link to="/logistics" className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              Logistics
            </Link>
          </li>
          <li>
            <Link to="/about" className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className=" bg-primary px-10 py-3 rounded-full font-medium shadow-lg">
              Contacts
            </Link>
          </li>
        </ul>
        <Link
          to="/store"
          className=" bg-primary text-background flex cursor-pointer justify-center items-center p-2 rounded-full shadow-lg"
        >
          <ShoppingCartOutlined />
        </Link>
        <button
          onClick={handleShowDiv}
          className=" lg:hidden  flex justify-center items-center cursor-pointer bg-background text-primary rounded-full p-2 max-lg:block shadow-lg"
        >
          <MenuIcon fontSize="medium" />
        </button>
      </div>
      {showDiv && (
        <nav className=" absolute top-0 w-full left-0 bg-accent h-screen">
          <div className="fixed bg-accent w-full z-40 flex justify-end items-cente px-4 gap-4 ">
            <div className=" flex items-center gap-4 py-6">
              <button className="" onClick={() => handleClick('/shop') }>
                <span className="text-secondary bg-primary flex items-center rounded-full p-2">
                  <ShoppingCart />
                </span>
              </button>
              <button
                onClick={handleShowDiv}
                className=""
              >
                <Link className=" text-primary cursor-pointer ">
                  <Clear fontSize="large" />
                </Link>
              </button>
            </div>
          </div>
          <div className="menu pt-24 overflow-y-auto h-screen">
            <ul className="flex items-center flex-col list-none w-full">
              <li className=" w-full border-y border-grayTxt hover:bg-darkHover hover:bg-opacity-20">
                <Link to="/shop" onClick={() => handleClick('/shop')} className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <i className="line-icon-Shop-3 text-background"> </i> <span>Stores</span>
                </Link>
              </li>

              <li className=" w-full border-y border-grayTxt hover:bg-darkHover hover:bg-opacity-20">
                <Link to="logistics" onClick={() => handleClick('logistics')} className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <i className="line-icon-Scooter text-3xl text-background"> </i> <span>Logistics</span>
                </Link>
              </li>

              <li className=" w-full border-y border-grayTxt hover:bg-darkHover hover:bg-opacity-20">
                <Link  to="about" onClick={() => handleClick('about')} className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <i className="line-icon-Mens  text-background"> </i> <span>About</span>
                </Link>
              </li>

              <li className=" w-full border-y border-grayTxt hover:bg-darkHover hover:bg-opacity-20">
                <Link to="contact" onClick={() => handleClick('contact')} className=" py-6 px-4 flex w-full text-2xl text-primary items-center gap-3">
                  <i className="line-icon-Old-Telephone  text-background"> </i> <span>Contact</span>
                </Link>
              </li>
             
            </ul>
            <div className=" w-full py-8">
              <p className=" text-center flex items-center justify-center text-grayTxt">
                <span>&copy;</span>
                All right reserved. 2024 Lifepadi
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
