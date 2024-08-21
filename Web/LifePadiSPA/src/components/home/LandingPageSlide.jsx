import { useEffect, useState } from "react";
import rice from "../../assets/images/rice.jpeg";
import med from "../../assets/images/med_plus.png";
import serv from "../../assets/images/services.png";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "../shared/Swiper";
import {
  Autoplay,
  Navigation,
  EffectFade,
  Pagination,
  EffectCube,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const LandingPageSlide = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-secondary to-background pb-10  ">
        <div className="flex flex-col items-center">
          <div className=" h-52 lg:h-80 w-5/6  -mt-10 rounded-xl">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={2}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={30}
              breakpoints={{
                1200: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                320: { slidesPerView: 1 },
              }}
              navigation
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <div className=" h-56 lg:h-80 w-full rounded-xl border-4 relative ">
                  <img
                    src={rice}
                    alt=""
                    className="w-full h-full object-fill rounded-xl"
                  />
                  <p className=" absolute bottom-0 w-full rounded-b-xl z-10 bg-primary h-10">
                    {" "}
                    FOOD{" "}
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" h-56 lg:h-80 w-full rounded-xl border-4 ">
                  <img
                    src={serv}
                    alt=""
                    className="w-full h-full object-fill rounded-xl"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" h-56 lg:h-80 w-full rounded-xl border-4 ">
                  <img
                    src={med}
                    alt=""
                    className="w-full h-full object-fill rounded-xl"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <div className="bg-background flex justify-center">
        
          <div className=" grid grid-cols-1 md:grid-cols-2   gap-8 w-5/6 ">
            <h1 className=" text-5xl max-lg:text-3xl font-bold text-primary">
              Your life needs a Padi
            </h1>
            <p className=" text-2xl text-justify max-lg:text-base font-normal text-primary">
              Are you Hungry? Not fit to cook? Have visitors, or u wan just chop
              life? Download chowdeck lets deliver happiness to your doorstep in
              minutes
            </p>
          </div>
        
      </div>
    </>
  );
};

export default LandingPageSlide;
