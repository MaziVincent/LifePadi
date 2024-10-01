
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import cancel from "../../assets/images/cancel.png"
import pending from "../../assets/images/commercial.png"
import ongoing from "../../assets/images/delivery-bike.png"
import completed from "../../assets/images/delivered.png"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const TrackOrder = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const {status} = useParams()
  const stages = [
    { id: 1, name: "Pending", icon: pending },
    { id: 2, name: "Ongoing", icon: ongoing },
    { id: 3, name: "Completed", icon: completed },
  ];

  useEffect(() => {
    if (status === "Pending") {
      setCurrentStage(1);
    } else if (status === "Ongoing") {
      setCurrentStage(2);
    } else if (status === "Completed") {
      setCurrentStage(3);
    }
  }, [status]);

  return (
    <div className="p-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/user"
          className="hover:border-b-2 dark:text-primary hover:border-b-secondary"
        >
          Dashboard
        </Link>
          
        <Link
          to="#"
          aria-current="page"
          className="hover:border-b-2 dark:text-primary hover:border-b-secondary"
        >
          Track Order
        </Link>
      </Breadcrumbs>
    
    <div className="flex flex-col items-center justify-center p-8">
        
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      {
        status === "Cancelled" ? 
         <div className="flex flex-col gap-6 ">
          <h2> Your Order was Cancelled  <SentimentVeryDissatisfiedIcon className="animate-bounce text-redborder " /> </h2>
          <div className=" flex justify-center">
          <img src={cancel} alt="Cancelled" className='text-white text-2xl ' />

          </div>
        </div>
      :
      <div className="flex w-full justify-between items-center">
        {stages.map((stage, index) => {
          const src = stage.icon;
          const isActive = index + 1 <= currentStage;
          return (
            <motion.div
              key={stage.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`p-4 rounded-full ${
                  isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <img src={src} alt={stage.name} className={`text-white text-2xl ${isActive && 'animate-bounce'}`} />
              </div>
              <motion.div
                className="mt-2 text-base"
                animate={{ opacity: isActive ? 1 : 0.5 }}
                transition={{ duration: 0.8 }}
              >
                {stage.name}
              </motion.div>
              {index < stages.length - 1 && (
                <motion.div
                  className={`w-20 h-1 ${
                    isActive ? "bg-background" : "bg-lightForest"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? "80px" : "0" }}
                  transition={{ duration: 0.7 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
}
    </div>
    </div>
  );
};

export default TrackOrder;
=======

const TrackOrder = () => {

    const currentStep = 3;
    const steps = [

      { step: 1, label: "Pending" },
      { step: 2, label: "Ongoing" },
      { step: 3, label: "Completed" },
    ];
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Track Your Order</h2>
        <div className="relative mb-4">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full 
                  ${step.step <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"} 
                  transition-all duration-500 ease-in-out`}
                >
                  {step.step}
                </div>
                <p className="mt-2 text-sm">{step.label}</p>
              </div>
            ))}
          </div>
  
          <div className="absolute top-5 left-0 w-full flex justify-between">
            <div className="w-full h-1 bg-gray-300 relative">
              <div
                className="absolute left-0 h-1 bg-blue-500 transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep - 1) * 33}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TrackOrder;
>>>>>>> 28e0a99 (rider corrections and other)
