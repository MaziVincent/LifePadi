import Marquee from "react-fast-marquee";
<<<<<<< HEAD
import Transparancy from "../../assets/images/Transparency - Lifepadi core values.webp"
import Speed from "../../assets/images/Speed - Lifepadi core values.webp"
import Customer from "../../assets/images/Customer Service - Lifepadi core values.webp"
import Innovation from "../../assets/images/Innovation - Lifepadi core values.webp"
import Values from "../../assets/images/Lifepadi core values.webp"

const MarqueeComp = () => {
  return (
    <div className="w-full  ">
      <Marquee>
        <div className="h-[20rem] bg-background rounded-lg w-[15rem] m-5">
          <img src={Transparancy} alt="transparency" className="w-full h-full rounded-lg"  />
        </div>
        <div className="h-[20rem] bg-background rounded-lg w-[15rem] m-5">
          <img src={Speed} alt="transparency" className="w-full h-full rounded-lg"  />
        </div>
        <div className="h-[20rem] bg-background rounded-lg w-[15rem] m-5">
          <img src={Customer} alt="transparency" className="w-full h-full rounded-lg"  />
        </div>
        <div className="h-[20rem] bg-background rounded-lg w-[15rem] m-5">
          <img src={Innovation} alt="transparency" className="w-full h-full rounded-lg"  />
        </div>
        <div className="h-[20rem] bg-background rounded-lg w-[15rem] m-5">
          <img src={Values} alt="transparency" className="w-full h-full rounded-lg"  />
        </div>
=======

const MarqueeComp = () => {
  return (
    <div className="">
      <Marquee>
        <div className="h-60 bg-background rounded-lg w-56 m-5">Heloo</div>
        <div className="h-60 bg-background rounded-lg w-56 m-5"> How are you</div>
        <div className="h-60 bg-background rounded-lg w-56 m-5 "> Leave me alone </div>
>>>>>>> 43afb5b (Landing page and about page)
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
