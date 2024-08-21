import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import HeroAnimation1 from "../../assets/lottie/HeroAnimation1.json";
import HeroAnimation2 from "../../assets/lottie/HeroAnimation2.json";
import Hero1 from "../../assets/lottie/Hero1.json";
import LandingPageSlide from "./LandingPageSlide";
import AppStore from "../../assets/images/app-store-white.svg";
import PlayStore from "../../assets/images/app-store-black.svg";
import iphone from "../../assets/images/iphone.png";
import rice from "../../assets/images/rice.jpeg";


import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ChevronRight,
  ShoppingCart,
} from "@mui/icons-material";

const Home = () => {
  const lottieStyle = {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    padding: 0,
    margin: 0,
  };
  return (
    <main className="scroll-smooth">
      <section className="bg-white dark:bg-gray-900">
        <div className=" w-screen h-5/6  text-center">
          <Lottie
            animationData={HeroAnimation2}
            loop={true}
            autoPlay={true}
            style={lottieStyle}
          ></Lottie>
        </div>
      </section>

      <section className="flex justify-center">
        <div className=" md:flex w-full lg:w-3/4 ">
          <div className=" md:w-1/2 flex flex-col justify-center ">
            <div>
              <div className=" py-8 text-center md:text-start text-6xl max-md:text-3xl font-bold">
                <h2 className="text-center">Try the app</h2>
              </div>
              <div className=" pb-8">
                <p className=" text-center font-normal text-lg px-5">
                  Experience the convenience of swift delivery from numerous
                  restaurants, featuring a broad spectrum of cuisines, including
                  African, Continental, and many more! Your cravings will be
                  satisfied in no time.
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
              <button className="flex items-center py-2 px-4 rounded-xl border-2 bg-accent">
                <img
                  src={PlayStore}
                  alt="Button Image"
                  className="w-40 h-10 object-cover rounded-lg"
                />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-start ">
            <img
              src={iphone}
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className=" ">
          <div className=" py-8">
            <h1 className=" flex justify-center items-center text-5xl max-lg:text-3xl max-md:text-2xl max-lg:font-normal font-medium text-gray text-center">
              There is a Padi for your every need
              <span className=" pt-5 max-lg:pt-2">
                <svg
                  className=" max-lg:h-8 max-lg:w-8"
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
            <div className="grid grid-cols-1 md:w-9/12 lg:grid-cols-3 gap-4">
              <div className=" flex flex-col max-lg:w-11/12 max-sm:w-full shadow-lg bg-primary rounded p-4 ">
                <div className="h-40 rounded-xl bg-gradient-to-b from-secondary to-background flex items-center justify-center">
                  <img
                    src={rice}
                    alt=""
                    className=" w-11/12 h-full rounded-xl"
                  />
                </div>
                <div className=" ">
                  <span>icon</span>
                  <h2>Text</h2>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Facere eaque obcaecati neque sequi architecto, est non error
                    distinctio, voluptates qui quia, enim deserunt quas
                    doloribus consectetur temporibus. Mollitia ipsam culpa
                    deserunt quo iusto fugit, dolorem, atque perferendis,
                    facilis impedit a?
                  </p>
                  <button className=" my-4 p-2 rounded-xl">
                    <span className=" font-medium text-lg">
                      see more{" "}
                      <span>
                        <ChevronRight />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <div className=" flex flex-col max-lg:w-11/12 max-sm:w-full shadow-lg bg-primary rounded p-4">
                <div className="h-40 rounded-xl border">
                  <img
                    src=""
                    alt=""
                    className=" w-full"
                  />
                </div>
                <div className=" ">
                  <span>icon</span>
                  <h2>Text</h2>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Facere eaque obcaecati neque sequi architecto, est non error
                    distinctio, voluptates qui quia, enim deserunt quas
                    doloribus consectetur temporibus. Mollitia ipsam culpa
                    deserunt quo iusto fugit, dolorem, atque perferendis,
                    facilis impedit a?
                  </p>
                  <button className=" my-4 p-2 rounded-xl">
                    <span className=" font-medium text-lg">
                      see more{" "}
                      <span>
                        <ChevronRight />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <div className=" flex flex-col max-lg:w-11/12 max-sm:w-full shadow-lg bg-primary rounded p-4">
                <div className="h-40 rounded-xl border">
                  <img
                    src=""
                    alt=""
                    className=" w-full"
                  />
                </div>
                <div className=" ">
                  <span>icon</span>
                  <h2>Text</h2>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Facere eaque obcaecati neque sequi architecto, est non error
                    distinctio, voluptates qui quia, enim deserunt quas
                    doloribus consectetur temporibus. Mollitia ipsam culpa
                    deserunt quo iusto fugit, dolorem, atque perferendis,
                    facilis impedit a?
                  </p>
                  <button className=" my-4 p-2 rounded-xl">
                    <span className=" font-medium text-lg">
                      see more{" "}
                      <span>
                        <ChevronRight />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <LandingPageSlide />
      <section>
      <div>
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#9ec81d"
              fill-opacity="1"
              d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,101.3C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
            
          </svg> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#609963"
            fill-opacity="1"
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,101.3C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      </section>
    </main>
  );
};

export default Home;
