import React, { useState, useRef } from 'react';

const OtpVerification = ({ otpLength = 6 }) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input
      if (value && index < otpLength - 1) {
        inputsRef.current[index + 1].focus();
      }

      // If backspace is pressed and input is empty, focus on previous input
      if (value === '' && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    console.log(otp.join(''));
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
      <div className="flex space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-10 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-secondary text-white rounded hover:bg-background transition duration-200"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpVerification;
