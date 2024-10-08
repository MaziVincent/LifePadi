
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 50bdb11 (added amount to voucher)
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
<<<<<<< HEAD
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

=======
>>>>>>> 50bdb11 (added amount to voucher)
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
<<<<<<< HEAD
    );
  };
  
  export default TrackOrder;
>>>>>>> 28e0a99 (rider corrections and other)
=======
}
    </div>
    </div>
  );
};

export default TrackOrder;
>>>>>>> 50bdb11 (added amount to voucher)
