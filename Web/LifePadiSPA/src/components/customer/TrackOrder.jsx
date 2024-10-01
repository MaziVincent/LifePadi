

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