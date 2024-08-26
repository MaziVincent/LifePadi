import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Playstore from "../../assets/imgs/playstore.svg";
import Apple from "../../assets/imgs/apple.svg";
import delivery1 from "../../assets/images/_2d580ecb-fb18-4132-91e7-6e2be260dfdc.jpeg";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StackBike from "../../assets/imgs/stack-bike.svg";
import RelayApp from "../../assets/imgs/relay-app.webp";
import Promocode from "../../assets/imgs/Promo-code.svg";
import deliveryMan from "../../assets/images/deliveryMan.webp";
import dropOff from "../../assets/images/dropOff.webp";
import insurePackage from "../../assets/images/insurePackage.webp";
import packageHandOver from "../../assets/images/packageHandOver.webp";
import pickUp from "../../assets/images/pickUp.webp";
import background1 from "../../assets/images/background1.webp";
import { Swiper, SwiperSlide } from "../shared/Swiper";

import {
  Autoplay,
  Navigation,
  EffectFade,
  Pagination,
  EffectCube,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Logistics = () => {
<<<<<<< HEAD
  const slides = [
    {
      text: "Get Your Package Ready!",
      src: insurePackage,
    },
    {
      text: "Hand it Over to your Padi ",
      src: packageHandOver,
    },

    {
      text: " Padi will take off to your delivery destination ",
      src: dropOff,
    },

    {
      text: "Your package will be delivered promptly and safely",
      src: deliveryMan,
    },

    {
      text: "The smile on your face says it all",
      src: pickUp,
    },
  ];

  return (
    <main className="w-full ">
      <div className=" flex flex-col gap-10 ">
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
            <div className="mt-6 flex flex-col justify-center items-center gap-8 w-full">
              <div>
                <Link to="/shop/logistics" className=" bg-secondary hover:bg-background rounded-xl p-3 text-accent font-semibold cursor-pointer">
                  Use Lifepadi Logistics
                </Link>
              </div>
              <div className="w-full flex justify-center gap-5">
                <Link className=" bg-primary py-3 px-2 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                  <span className=" max-md:flex max-md:item-center max-md:justify-center">
                    <img
                      src={Playstore}
                      alt=""
                      className=" w-8 h-8 animate-bounce"
                    />
                  </span>
                  <span className=" max-md:hidden text-background">
                    Download on GooglePlay
                  </span>
                </Link>
                <Link className=" bg-primary py-3 px-2 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                  <span className=" max-md:flex max-md:item-center max-md:justify-center">
                    <img
                      src={Apple}
                      alt=""
                      className=" w-8 h-8 animate-bounce"
                    />
                  </span>
                  <span className=" max-md:hidden text-background">
                    Download on AppStore
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" ">
          <h1 className=" text-7xl px-5 pb-20 text-center font-bold font-sans">
            How Lifepadi Delivery Works!
          </h1>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={30}
            breakpoints={{
              1200: { slidesPerView: 2 },
              768: { slidesPerView: 1 },
              320: { slidesPerView: 1 },
            }}
            //effect="fade"
            pagination={{ clickable: true }}
          >
            {slides.map((sld) => (
              <SwiperSlide key={sld.text}>
                <div className=" flex justify-center gap-6 bg-primary ">
                  <div className=" flex flex-col md:flex-row md:w-10/12 px-2 rounded-xl justify-between bg-lightForest items-center ">
                    <div className=" text-3xl font-bold flex items-center  w-full md:w-1/2 text-center max-md:h-2/5 ">
                      {sld.text}
                    </div>
                    <div className=" w-1/2 max-md:h-4/6 max-md:w-full">
                      <img
                        src={sld.src}
                        alt="Image"
                        className="main-img w-full max-md:h-full object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className=" bg-background w-full">
          <div className="">
            <h1 className=" text-7xl max-md:text-4xl text-center font-bold text-primary py-10">
              You need it? We'll bring it!
            </h1>
          </div>
          <div className=" flex justify-center items-center mt-10 max-md:w-96 max-md:m-auto max-md:pt-20">
            <img
              src={delivery1}
              alt=""
              className="w-full"
            />
          </div>
          <div className=" flex justify-center items-center gap-2 mt-20">
            <Link className=" w-14 bg-primary p-4 flex items-center justify-center rounded-full">
              <img
                src={Playstore}
                alt=""
                className="w-full"
              />
            </Link>
            <Link className=" w-14 bg-primary p-4 flex items-center justify-center rounded-full">
              <img
                src={Apple}
                alt=""
                className=" w-10"
              />
            </Link>
          </div>
          <div className=" lg:flex justify-center ">
          <div className=" flex justify-between lg:w-10/12 items-center max-md:flex-col max-md:items-start max-md:gap-8 px-10 mt-20">
            <h1 className=" text-6xl max-md:text-3xl text-center font-bold w-2/5 max-md:w-full text-primary">
              LifePadi got you covered
            </h1>
            <p className=" text-3xl max-md:text-xl text-center font-semibold w-7/12 max-md:w-full text-primary">
              Say goodbye to harrowing deliveries and say hello to quick and
              easy deliveries. LifePadi is here!. Get started and experience the fastest delivery ever.
            </p>
          </div>
          </div>
          
        </div>

        <div className=" bg-accent h-auto flex justify-center  py-10 ">
          
            <div className="flex justify-center md:grid md:grid-cols-5 lg:w-10/12  ">
              <div className=" bg-primary rounded-3xl relative max-sm:w-full md:col-span-3">
                <h1 className=" text-7xl max-md:text-4xl max-md:pr-10 font-bold p-8 pr-32 text-accent text-center">
                  <span className=" text-background">Send</span> and{" "}
                  <span className=" text-background">Receive</span> swiftly
                </h1>
                <div className=" flex flex-col justify-center  p-8">
                  <div className=" flex justify-center gap-4 flex-row pb-10">
                    <Link className=" bg-accent py-3 md:px-2 md:rounded-lg flex items-center gap-2 rounded-full px-3">
                      <span className=" max-md:flex max-md:item-center max-md:justify-center">
                        <img
                          src={Playstore}
                          alt=""
                          className=" w-8 h-8"
                        />
                      </span>
                      <span className=" max-md:hidden text-background">
                        Download on GooglePlay
                      </span>
                    </Link>
                    <Link className=" bg-accent   py-3 px-3 rounded-lg flex items-center gap-2 max-md:rounded-full max-md:px-3">
                      <span className=" max-md:flex max-md:item-center max-md:justify-center">
                        <img
                          src={Apple}
                          alt=""
                          className=" w-8 h-8"
                        />
                      </span>
                      <span className=" max-md:hidden text-background ">
                        Download on AppStore
                      </span>
                    </Link>
                    
                  </div>
                  <div className="flex justify-center">
                      <Link to="/shop/logistics" className=" bg-secondary hover:bg-background rounded-xl p-3 px-8 text-accent font-semibold cursor-pointer">
                        Use Lifepadi Logistics
                      </Link>
                    </div>
                </div>

              </div>
              <div className=" max-lg:hidden md:col-span-2">
                <img
                  src={pickUp}
                  alt=""
                  className=" rounded-3xl w-full h-[36rem]"
                />
              </div>
            </div>
         
        </div>
      </div>
    </main>
  );
};

export default Logistics;
=======
    return ( <>

    <div> Logistics </div>
    
    </> );
}
 
export default Logistics;
>>>>>>> 43afb5b (Landing page and about page)
