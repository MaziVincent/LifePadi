import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import HeroAnimation5 from "../../assets/lottie/HeroAnimation5.json";
import HeroAnimation2 from "../../assets/lottie/HeroAnimation2.json";
import HeroAnimation4 from "../../assets/lottie/Heroanimation4.json";
import Hero1 from "../../assets/lottie/Hero1.json";
import LandingPageSlide from "./LandingPageSlide";
import AppStore from "../../assets/images/app-store-white.svg";
import PlayStore from "../../assets/images/app-store-black.svg";
import iphone from "../../assets/images/LifepadiPhone.png";
import vendor2 from "../../assets/images/vendor2.png";
import rider from "../../assets/images/rider.png";
import delivery from "../../assets/images/delivery.png";
import everyday from "../../assets/images/everyday.jpeg";
import sparlogo from "../../assets/images/sparlogo.jpeg";
import roban from "../../assets/images/roban.png";
import shoprite from "../../assets/images/shoprite.png";
import burger from "../../assets/images/burger.png";
import buyingfood from "../../assets/images/Buying food.png";
import kilimanjaro from "../../assets/images/Kilimanjaro.jpg";
import dominospizza from "../../assets/images/dominospizza.png";
import deliveryman from "../../assets/images/deliveryman.png";
import grocerybags from "../../assets/images/grocerybags.png";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MopedIcon from "@mui/icons-material/Moped";
import Groups3Icon from "@mui/icons-material/Groups3";
import FadeIn from "./FadeIn"
import ntachi from "../../assets/images/ntachi.png"

import { ChevronRight } from "@mui/icons-material";
import { green } from "@mui/material/colors";

const Home = () => {
  const words = ["Food", "Groceries", "Logistics", "Errands"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const lottieStyle = {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    padding: 0,
    margin: 0,
  };

  const vendors = [
    {
      text: "Ntachi-Osa Restaurant",
      src: ntachi,
    },
    {
      text: "Shoprite Supermarket",
      src: shoprite,
    },
    {
      text: "Roban Supermarket",
      src: roban,
    },

    {
      text: "Spar Supermarket",
      src: sparlogo,
    },
    {
      text: "Domino's Pizza",
      src: dominospizza,
    },

    {
      text: "Kilimanjaro Restaurant",
      src: kilimanjaro,
    },
  ];
  return (
    <main className="scroll-smooth ">
      <section className=" dark:bg-gray-900 bg-lightgreen relative">
        <div className=" w-screen h-5/6  text-center ">
          <Lottie
            animationData={HeroAnimation4}
            loop={true}
            autoPlay={true}
            style={lottieStyle}
          ></Lottie>
        </div>
        <div className="text-center text-background text-4xl md:text-6xl font-bold  absolute top-0 h-full w-full flex justify-center items-center z-20 ">
          <span className="text-accent"> Padi for </span> &nbsp;
          <motion.div
            key={currentWord}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          >
            {words[currentWord]}
          </motion.div>
        </div>
      </section>

      <section className="flex justify-center px-4  md:h-auto py-5 ">
        <div className=" md:flex w-full lg:w-3/4 ">
          <div className="  flex flex-col justify-center ">
            <div className="">
              <div className=" py-3 text-center md:text-start ">
                <h2 className="text-center text-3xl md:text-6xl font-bold  ">
                  Try the app
                </h2>
              </div>
              <div className=" pb-3">
                <p className=" text-center font-normal text-base px-5 text-grayTxt">
                  Enjoy the ease of swift delivery from countless services,
                  offering a wide range of cuisines, grocery shopping, errands,
                  and more! We, your padi, we ensure your satisfaction every
                  time.
                </p>
              </div>
            </div>

            <div className=" flex justify-center items-center gap-8 px-5 ">
              <button className="flex items-center  py-2 px-4 rounded-xl border-2">
                <img
                  src={AppStore}
                  alt="Button Image"
                  className="w-40 h-10 object-cover rounded-lg"
                />
              </button>
              <a
                href="https://play.google.com/store/apps/details?id=com.lifepadi.app"
                className="flex items-center py-2 px-4 rounded-xl border-2 bg-accent"
              >
                <img
                  src={PlayStore}
                  alt="Button Image"
                  className="w-40 h-10 object-cover rounded-lg"
                />
              </a>
            </div>
          </div>
          <FadeIn
            delay={0.4}
            direction="left"
          >
            <div className=" flex justify-center items-start  md:h-auto p-6 md:p-4">
              <img
                src={iphone}
                alt=""
                className="w-3/6 h-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>
      <section className="pb-20">
        <div className=" ">
          <div className=" py-8">
            <h1 className=" flex justify-center items-center text-5xl max-lg:text-3xl max-md:text-2xl max-lg:font-normal font-medium text-grayTxt text-center px-3">
              There's a padi for everything you need!
              <span className=" pt-5 max-lg:pt-2">
                <svg
                  className=" max-lg:h-8 max-lg:w-8 "
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 0 24 24"
                  width="48px"
                  fill="#B7B7B7"
                >
                  <path
                    d="M0 0h24v24H0V0z"
                    fill="none"
                  />
                  <path d="M11 5v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L13 16.17V5c0-.55-.45-1-1-1s-1 .45-1 1z" />
                </svg>
              </span>
            </h1>
          </div>
          <section className=" flex justify-center ">
            <div className="grid grid-cols-1 md:w-9/12 md:grid-cols-2 xl:w-8/12 lg:grid-cols-3 gap-4">
              <div className=" flex flex-col max-lg:w-11/12 max-sm:w-full shadow-lg bg-primary rounded-lg p-2 ">
                <div className="rounded-xl  flex items-center justify-center ">
                  <img
                    src={vendor2}
                    alt="vendor"
                    className=" w-6/12 h-full rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className=" px-4 ">
                  <div className=" flex gap-2 justify-center">
                    <span className="animate-bounce">
                      <StorefrontIcon sx={{ color: green[600] }} />
                    </span>
                    <h2 className="text-2xl font-semibold">
                      Are you a Vendor?{" "}
                    </h2>
                  </div>
                  <p className="text-justify ">
                    Grow with Padi! Are you a vendor looking to grow your
                    business ? Our technology and user base will help you
                    increase sales, reach new customers and unlock new
                    opportunities.
                  </p>
                  {/* <button className=" my-4 rounded-xl">
                    <span className=" font-medium text-base text-grayTxt">
                      see more{" "}
                      <span>
                        <ChevronRight />
                      </span>
                    </span>
                  </button> */}
                </div>
              </div>
              <div className=" flex flex-col max-lg:w-11/12 max-sm:w-full shadow-lg bg-primary rounded-lg p-2 ">
                <div className="rounded-xl  flex items-center justify-center ">
                  <img
                    src={rider}
                    alt="vendor"
                    className=" w-6/12 h-full rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className=" px-4 ">
                  <div className=" flex gap-2 justify-center">
                    <span className="animate-bounce">
                      <MopedIcon sx={{ color: green[600] }} />
                    </span>
                    <h2 className="text-2xl font-semibold">Become a Padi </h2>
                  </div>
                  <p className="text-justify ">
                    Enjoy flexibility, freedom and deliver happiness to
                    customers while earning to achieve your dreams.
                  </p>
                  {/* <button className=" my-4 rounded-xl">
                    <span className=" font-medium text-base text-grayTxt">
                      see more{" "}
                      <span>
                        <ChevronRight />
                      </span>
                    </span>
                  </button> */}
                </div>
              </div>
              <div className=" flex flex-col max-lg:w-11/12 max-sm:w-full shadow-lg bg-primary rounded-lg p-2 ">
                <div className="rounded-xl  flex items-center justify-center ">
                  <img
                    src={delivery}
                    alt="vendor"
                    className=" w-6/12 h-full rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className=" px-4 ">
                  <div className=" flex gap-2 justify-center">
                    <span className="animate-bounce">
                      <Groups3Icon sx={{ color: green[600] }} />
                    </span>
                    <h2 className="text-2xl font-semibold">Build with us </h2>
                  </div>
                  <p className="text-justify ">
                    Are you passionate about helping us achieve our goal to make
                    life easy for our customers, we would like to hear from you.
                  </p>
                  {/* <button className=" my-4 rounded-xl">
                    <span className=" font-medium text-base text-grayTxt">
                      see more{" "}
                      <span>
                        <ChevronRight />
                      </span>
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <FadeIn
        delay={0.4}
        direction="up"
      >
        <LandingPageSlide />
      </FadeIn>

      <section className="pb-16">
        <div className=" ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 170"
          >
            <path
              fill="#609963"
              fillOpacity="1"
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,101.3C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col items-center gap-20">
          <h2 className="text-4xl lg:text-6xl font-bold"> Our Top Vendors </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-6 lg:w-4/6  px-6">
            {vendors.map((ven) => (
              <div
                key={ven.text}
                className="flex flex-col items-center justify-center "
              >
                <div
                  className="relative w-64 h-64 bg-contain bg-center bg-no-repeat "
                  style={{
                    backgroundImage: `url(${ven.src})`,
                    clipPath: `polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)`,
                  }}
                >
                  {/* <img src={ven.src} alt="" className="h-full w-full object-fill" /> */}
                </div>
                <h3 className=" text-xl text-center text-primary bg-background rounded-xl p-2 font-semibold">
                  {ven.text}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-center">
              We Deliver Everything
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 lg:w-4/6 ">
              <div className="flex flex-col items-center h-48 mb-6">
                <div
                  className="h-2/3 w-36 bg-cover bg-repeat bg-center "
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M772.5 652Q675 804 507 792T196.5 640Q54 500 167.5 310.5t328-182Q710 136 790 318t-17.5 334Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23609963%22 d=%22M772.5 652Q675 804 507 792T196.5 640Q54 500 167.5 310.5t328-182Q710 136 790 318t-17.5 334Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
                  }}
                >
                  <img
                    src={burger}
                    alt=""
                    className="w-full h-full"
                  />
                </div>

                <p className="h-1/3 px-5 text-center md:w-1/2 lg:w-full">
                  {" "}
                  From delicious local dishes to international cuisines, we've
                  got your cravings covered. Enjoy fresh, hot meals delivered
                  right to your doorstep. 🍲🚀
                </p>
              </div>
              <div className="flex flex-col items-center h-48 mb-6 ">
                <div
                  className="h-2/3 w-36 bg-cover bg-repeat bg-center "
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M772.5 652Q675 804 507 792T196.5 640Q54 500 167.5 310.5t328-182Q710 136 790 318t-17.5 334Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23609963%22 d=%22M772.5 652Q675 804 507 792T196.5 640Q54 500 167.5 310.5t328-182Q710 136 790 318t-17.5 334Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
                  }}
                >
                  <img
                    src={deliveryman}
                    alt=""
                    className="w-full h-full"
                  />
                </div>

                <p className="h-1/3 px-5 text-center md:w-1/2 lg:w-full">
                  {" "}
                  Experience lightning-fast delivery that gets your items to you
                  in no time. 🚀⏱️
                </p>
              </div>

              <div className="flex flex-col items-center h-48 mb-6 ">
                <div
                  className="h-2/3 w-36 bg-cover bg-repeat bg-center "
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M772.5 652Q675 804 507 792T196.5 640Q54 500 167.5 310.5t328-182Q710 136 790 318t-17.5 334Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23609963%22 d=%22M772.5 652Q675 804 507 792T196.5 640Q54 500 167.5 310.5t328-182Q710 136 790 318t-17.5 334Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
                  }}
                >
                  <img
                    src={grocerybags}
                    alt=""
                    className="w-full h-full"
                  />
                </div>

                <p className="h-1/3 px-5 text-center md:w-1/2 lg:w-full">
                  {" "}
                  Need errands run? We've got you covered. From picking up
                  packages to grocery shopping, we handle it all so you can
                  relax. 🚀🛒
                </p>
              </div>
            </div>
            <div className=" w-full flex justify-center mt-8">
              <Link
                to="/shop"
                className=" text-accent font-semibold bg-secondary rounded-xl flex justify-center items-center hover:bg-background focus:ring-4 focus:outline-none focus:ring-primary-300 px-7 py-3 text-center "
              >
                Explore our Store
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-accent">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,80C96,64,192,32,288,26.7C384,21,480,43,576,58.7C672,75,768,85,864,112C960,139,1056,181,1152,170.7C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className=" bg-accent h-auto pt-20 pb-10 flex justify-center">
          <div className=" flex w-10/12">
            <div className=" bg-background rounded-3xl w-11/12 py-8">
              <FadeIn
                delay={0.3}
                direction="up"
              >
                {" "}
                <h1 className=" text-4xl md:text-6xl  max-md:pr-10 font-bold px-3  ">
                  Place your order in seconds
                </h1>
              </FadeIn>

              <div className=" flex items-start  flex-col md:flex-row px-3 gap-3 py-5 ">
                <FadeIn
                  delay={0.4}
                  direction="up"
                >
                  <a
                    href="https://play.google.com/store/apps/details?id=com.lifepadi.app"
                    className=" rounded-lg "
                  >
                    <img
                      src={PlayStore}
                      alt=""
                      className="w-40"
                    />
                  </a>
                </FadeIn>

                <FadeIn
                  delay={0.5}
                  direction="up"
                >
                  <Link className=" rounded-lg">
                    <img
                      src={AppStore}
                      alt=""
                      className=" w-40"
                    />
                  </Link>
                </FadeIn>
              </div>

              <div className=" w-full flex justify-start px-3 ">
                <FadeIn
                  delay={0.8}
                  direction="up"
                >
                  <button
                    type="button"
                    className=" text-accent h-14 w-40 bg-secondary flex justify-center items-center hover:bg-background focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-base px-2 py-2.5 text-center "
                  >
                    Explore our Store
                  </button>
                </FadeIn>
              </div>
              <div className="flex justify-center">
                <FadeIn
                  delay={0.8}
                  direction="left"
                >
                  <div className="h-96 max-md:h-48 mt-8 px-2 ">
                    <img
                      src={buyingfood}
                      alt=""
                      className="h-full"
                    />
                  </div>
                </FadeIn>
                <div className="hidden w-1/2 md:flex md:justify-center  rounded-3xl h-96">
                  <img
                    src={iphone}
                    alt=""
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
