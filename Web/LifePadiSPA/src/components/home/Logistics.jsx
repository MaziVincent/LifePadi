import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../assets/imgs/download.svg";
import Playstore from "../../assets/imgs/playstore.svg";
import Apple from "../../assets/imgs/apple.svg";
import Food1 from "../../assets/imgs/food1.jpg";
import Food2 from "../../assets/imgs/food2.jpeg";
import Food3 from "../../assets/imgs/food3.jpeg";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StackBike from "../../assets/imgs/stack-bike.svg";
import RelayApp from "../../assets/imgs/relay-app.webp";
import Promocode from "../../assets/imgs/Promo-code.svg";
import motorbike from "../../assets/images/vintage-green-motorbike.avif";
import bike from "../../assets/images/_57af53d1-7558-40a3-8d53-1f677c6c79da.jpeg";
import background1 from "../../assets/images/background1.webp";

//import Scroller from './Scroller'

const Logistics = () => {

  return (
    <>
      <div className=" ">
        <div
          className="h-screen flex justify-center items-center bg-opacity-5 "
          style={{
            backgroundImage: `url(${background1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            //opacity:0.5
          }}
        >
          <div className=" w-full ">
            <div>
              <h2 className=" text-8xl max-lg:text-6xl max-md:text-4xl font-bold text-center leading-tight">
                Lifepadi <br />
                Delivery
              </h2>
            </div>
            <p className=" text-xl text-center font-normal text-grayTxt">
              <span>
                Send and receive packages with ease using Lifepadi Logistics!
              </span>
            </p>
            <div className="mt-6 flex justify-center items-center gap-8 w-full">
              <Link className=" bg-primary py-3 px-2 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                <span className=" max-md:flex max-md:item-center max-md:justify-center">
                  <img
                    src={Playstore}
                    alt=""
                    className=" w-8 h-8"
                  />
                </span>
                <span className=" max-md:hidden text-background">
                  Download on Googleplay
                </span>
              </Link>
              <Link className=" bg-primary py-3 px-2 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                <span className=" max-md:flex max-md:item-center max-md:justify-center">
                  <img
                    src={Apple}
                    alt=""
                    className=" w-8 h-8"
                  />
                </span>
                <span className=" max-md:hidden text-background">
                  Download on App Store
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className=" my-20">
          <h1 className=" text-7xl px-5 pb-20 font-bold font-sans">
            How Lifepadi Delivery Works!
          </h1>
          <div className=" flex items-cente gap-6 bg-primary relative">
            <div className=" w-1/5 max-lg:hidden">
              <img
                src={Food1}
                alt="Image"
                className=" relative w-full h-96 max-md:h-80 object-cover rounded-r-2xl"
              />
            </div>
            <div className=" border max-lg:p-5 flex flex-row max-lg:flex-col h-auto max-md:h-lvh justify-between items-center relative rounded-2xl z-20 w-7/12 max-lg:w-full max-sm:w-full">
              <div className=" text-3xl font-bold z-10 w-2/5 text-center max-md:h-2/5 max-md:text-center">
                "slide"
              </div>
              <div className=" w-1/2 max-md:h-4/6 max-md:w-full">
                <img
                  src={Food2}
                  alt="Image"
                  className="main-img w-full max-md:h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className=" absolute bottom-12 max-lg:hidden left-28 flex gap-4">
              <button >
                <span className=" bg-secondary text-primary rounded-full flex items-center p-3">
                  <ArrowBack />
                </span>
              </button>
              <button >
                <span className=" bg-secondary text-primary rounded-full flex items-center p-3">
                  <ArrowForward />
                </span>
              </button>
            </div>
            <div className=" w-1/5 max-lg:hidden">
              <img
                src={Food3}
                alt="Image"
                className=" relative w-full h-96 max-md:h-80 object-cover rounded-l-2xl"
              />
            </div>
          </div>
        </div>
        <div className=" bg-background py-20 bg-opacity-70">
          <div className="">
            <h1 className=" text-7xl max-md:text-4xl text-center font-bold text-primary py-10">
              You need it? We'll bring it!
            </h1>
          </div>
          <div className=" flex justify-center items-center mt-10 max-md:w-96 max-md:m-auto max-md:pt-20">
            <img
              src={StackBike}
              alt=""
            />
          </div>
          <div className=" flex justify-center items-center gap-2 mt-20">
            <Link className=" w-14 bg-redborder p-4 flex items-center justify-center rounded-full">
              <img
                src={Playstore}
                alt=""
                className="w-full"
              />
            </Link>
            <Link className=" w-14 bg-redborder p-4 flex items-center justify-center rounded-full">
              <img
                src={Apple}
                alt=""
                className=" w-10"
              />
            </Link>
          </div>
          <div className=" flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-8 px-10 mt-20">
            <h1 className=" text-7xl max-md:text-3xl font-bold w-2/5 max-md:w-full text-primary">
              Life Padi got you covered
            </h1>
            <p className=" text-3xl max-md:text-xl font-semibold w-7/12 max-md:w-full text-primary">
              Say goodbye to harrowing deliveries and say hello to quick and
              easy deliveries. Relay’s here! Download the app, and let’s get
              racing!
            </p>
          </div>
        </div>
        {/* <div className=' bg-red bg-opacity-70 py-20'>
        <Scroller />
      </div> */}
        <div className=" px-4 max-lg:px-8 mb-16">
          <div className=" py-12 max-md:px-8">
            <h1 className=" text-7xl max-md:text-4xl font-bold">Stories</h1>
          </div>
          <div className=" flex items-center max-lg:flex-wrap max-lg:justify-center gap-4">
            <div className=" w-1/3 max-lg:w-11/12 max-sm:w-full border-4 border-accent rounded-lg pb-2">
              <div className=" w-full border rounded-t-lg">
                <img
                  src=""
                  alt="dsp image"
                  className="h-40 rounded-t-lg object-cover"
                />
              </div>
              <div className=" px-4 py-2">
                <h1 className=" text-xl font-semibold pb-2">For heading</h1>
                <p className=" text-lg font-normal text-grayTxt">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  qui.
                </p>
              </div>
              <div className=" px-4">
                <button className=" bg-lightgreen bg-opacity-15 hover:bg-background w-full py-3 rounded-lg text-background hover:text-primary">
                  <Link className=" font-semibold">Read more</Link>
                </button>
              </div>
            </div>
            <div className=" w-1/3 max-lg:w-11/12 max-sm:w-full border-4 border-accent rounded-lg pb-2">
              <div className=" w-full border rounded-t-lg">
                <img
                  src=""
                  alt="dsp image"
                  className="h-40 rounded-t-lg object-cover"
                />
              </div>
              <div className=" px-4 py-2">
                <h1 className=" text-xl font-semibold pb-2">For heading</h1>
                <p className=" text-lg font-normal text-grayTxt">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  qui.
                </p>
              </div>
              <div className=" px-4">
                <button className=" bg-lightgreen bg-opacity-15 hover:bg-background w-full py-3 rounded-lg text-background hover:text-primary">
                  <Link className=" font-semibold">Read more</Link>
                </button>
              </div>
            </div>
            <div className=" w-1/3 max-lg:w-11/12 max-sm:w-full border-4 border-accent rounded-lg pb-2">
              <div className=" w-full border rounded-t-lg">
                <img
                  src=""
                  alt="dsp image"
                  className="h-40 rounded-t-lg object-cover"
                />
              </div>
              <div className=" px-4 py-2">
                <h1 className=" text-xl font-semibold pb-2">For heading</h1>
                <p className=" text-lg font-normal text-grayTxt">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  qui.
                </p>
              </div>
              <div className=" px-4">
                <button className=" bg-lightgreen bg-opacity-15 hover:bg-background w-full py-3 rounded-lg text-background hover:text-primary">
                  <Link className=" font-semibold">Read more</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-accent h-auto pt-20 pb-10 mb-20">
          <div className=" px-4 max-lg:px-8 h-auto mb-12">
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6 max-lg:flex max-lg:justify-center">
              <div className=" bg-red rounded-3xl relative max-lg:w-11/12 max-sm:w-full">
                <h1 className=" text-7xl max-md:text-3xl max-md:pr-10 font-bold p-8 pr-32 text-primary">
                  <span className=" text-redborder">Send</span> and{" "}
                  <span className=" text-redborder">receive</span> swiftly
                </h1>
                <div className=" p-8">
                  <div className=" flex items-start gap-4 flex-col max-md:flex-row">
                    <Link className=" bg-primary py-3 px-2 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                      <span className=" max-md:flex max-md:item-center max-md:justify-center">
                        <img
                          src={Playstore}
                          alt=""
                          className=" w-8 h-8"
                        />
                      </span>
                      <span className=" max-md:hidden text-background">
                        Download on Googleplay
                      </span>
                    </Link>
                    <Link className=" bg-primary py-3 px-2 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                      <span className=" max-md:flex max-md:item-center max-md:justify-center">
                        <img
                          src={Apple}
                          alt=""
                          className=" w-8 h-8"
                        />
                      </span>
                      <span className=" max-md:hidden text-background">
                        Download on App Store
                      </span>
                    </Link>
                  </div>
                </div>
                <div className=" mt-12 px-8 max-lg:pb-4">
                  <div className=" flex items-start flex-col gap-4">
                    <img
                      src={Promocode}
                      alt=""
                    />
                    <div>
                      <p className=" border w-32 flex items-center py-3 gap-2 px-3 rounded-lg bg-secondary">
                        <span className=" border-4 rounded-full p-1 bg-background"></span>
                        <span className=" font-semibold">LGHDEN</span>
                      </p>
                      <p className=" text-xl max-md:text-sm font-normal pr-40 max-md:pr-10">
                        Get{" "}
                        <span className=" font-medium text-secondary">
                          &#8358;300 off
                        </span>{" "}
                        your first order when you use this promo code
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className='h-96 max-md:h-48 max-sm:h-32 p-0 m-0 absolute right-3 bottom-2'>
                        <img src={Drink} alt="" className='h-full' />
                    </div> */}
              </div>
              <div className=" max-lg:hidden">
                <img
                  src={RelayApp}
                  alt=""
                  className=" rounded-3xl h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logistics;
