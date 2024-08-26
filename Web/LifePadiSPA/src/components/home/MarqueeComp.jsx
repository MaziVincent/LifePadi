import Marquee from "react-fast-marquee";

const MarqueeComp = () => {
  return (
    <div className="">
      <Marquee>
        <div className="h-60 bg-background rounded-lg w-56 m-5">Heloo</div>
        <div className="h-60 bg-background rounded-lg w-56 m-5"> How are you</div>
        <div className="h-60 bg-background rounded-lg w-56 m-5 "> Leave me alone </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
