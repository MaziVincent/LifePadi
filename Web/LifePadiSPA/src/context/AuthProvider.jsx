import { createContext, useState } from "react";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const getPersistValue = () => {
    if (
      localStorage.getItem("persist") == undefined ||
      localStorage.getItem("persist") == "undefined"
    ) {
      return false;
    }

    return JSON.parse(localStorage.getItem("persist"));
  };
  const persistValue = getPersistValue();
  const [persist, setPersist] = useState(persistValue);
  const [login, setLogin] = useState(false);
  const [reg, setRegister] = useState(false);
  const [location, setLocation] = useState({});
  const [verify, setVerify] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5dffde0 (forgot password and live payment)
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [regData, setRegData] = useState({});
  const [verificationInfo, setVerificationInfo] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
<<<<<<< HEAD
=======
  const [regData, setRegData] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
>>>>>>> 1bc8dd0 (still working on register)
=======
>>>>>>> 5dffde0 (forgot password and live payment)

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        login,
        setLogin,
        location,
        setLocation,
        reg,
        setRegister,
        verify,
        setVerify,
        regData,
        setRegData,
<<<<<<< HEAD
        verificationInfo,
        setVerificationInfo,
        verifyOTP,
        setVerifyOTP,
        forgotPassword,
        setForgotPassword
<<<<<<< HEAD
=======
        verificationCode,
        setVerificationCode
>>>>>>> 1bc8dd0 (still working on register)
=======
>>>>>>> 5dffde0 (forgot password and live payment)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
