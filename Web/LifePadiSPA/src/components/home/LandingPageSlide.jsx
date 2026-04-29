import { useEffect, useState } from "react";
import Delivery2 from "../../assets/images/Delivery2.png";
import Pharmaceuticals from "../../assets/images/Pharmaceuticals.png";
import buyingfood from "../../assets/images/buyingfood.png";
import grocery from "../../assets/images/grocery.png";
import Fillinggas from "../../assets/images/Fillinggas.png";
import {
	ArrowLeft as ArrowBack,
	ArrowRight as ArrowForward,
} from "lucide-react";
import { Swiper, SwiperSlide } from "../shared/Swiper";
import Buyingfood from "../../assets/images/Buying food.png";
import Delivery1 from "../../assets/images/Delivery Logistics Bike.png";
import Delivery3 from "../../assets/images/Delivery Logistics trucks.png";
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

const LandingPageSlide = () => {
	const pictures = [
		{
			text: "Fast Delivery",
			src: Delivery2,
		},

		{
			text: "Buying Drugs",
			src: Pharmaceuticals,
		},

		{
			text: "Buying Food",
			src: buyingfood,
		},
		{
			text: "Filling Gas",
			src: Fillinggas,
		},
		{
			text: "Grocery Shopping",
			src: grocery,
		},
		{
			text: "Market Runs",
			src: Buyingfood,
		},
		{
			text: "Prompt Delivery",
			src: Delivery1,
		},

		{
			text: "Logistics Services",
			src: Delivery3,
		},
	];
	return (
		<>
			<section className="bg-gradient-to-b from-secondary to-background pb-10  ">
				<div className="flex flex-col items-center">
					<div className=" w-10/12 md:w-4/6 -mt-10 rounded-xl">
						<Swiper
							modules={[Autoplay, Pagination, EffectFade]}
							slidesPerView={1}
							loop={true}
							autoplay={{ delay: 4000, disableOnInteraction: false }}
							spaceBetween={30}
							breakpoints={{
								1200: { slidesPerView: 1 },
								768: { slidesPerView: 1 },
								320: { slidesPerView: 1 },
							}}
							effect="fade"
							pagination={{ clickable: true }}>
							{pictures.map((pic) => (
								<SwiperSlide key={pic.text}>
									<div className=" h-80 lg:h-[40rem] w-full bg-accent rounded-xl border-4 relative ">
										<img
											src={pic.src}
											alt={pic.text}
											className="w-full h-full object-fill rounded-xl"
											loading="lazy"
										/>
										<p className=" absolute text-2xl font-bold px-2 bottom-0 w-full border-t-4 rounded-b-xl z-10 bg-primary h-10">
											{" "}
											{pic.text}{" "}
										</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>
			<div className="bg-background flex justify-center">
				<div className=" grid grid-cols-1 md:grid-cols-2   gap-8 w-10/12 md:w-4/6 ">
					<h1 className=" text-5xl max-lg:text-3xl font-bold text-primary">
						Your life need a Padi
					</h1>
					<p className=" text-2xl text-justify max-lg:text-base font-normal text-primary">
						Are you Hungry? Do you want to buy drugs? Do you want to fill your
						gas?, or you want to shop for groceries? Padi dey for you, lets make
						your life easier in minutes
					</p>
				</div>
			</div>
		</>
	);
};

export default LandingPageSlide;
