import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import HeroAnimation1 from "../../assets/lottie/HeroAnimation1.json"
import HeroAnimation2 from "../../assets/lottie/HeroAnimation2.json"
import Hero1 from "../../assets/lottie/Hero1.json"


const Home = () => {
  const lottieStyle = {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    padding:0,
    margin:0,
    border:"2px solid red"
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className=" w-screen h-5/6  text-center">
        <Lottie animationData={HeroAnimation2} loop={true} autoPlay={true} style={lottieStyle}  ></Lottie>
        {/* <button onClick={()=>getAddress()}>get address</button> */}
      </div>
    </section>
  );
};

export default Home;
