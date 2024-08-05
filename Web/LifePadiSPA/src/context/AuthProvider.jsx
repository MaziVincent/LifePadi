import { createContext, useState } from "react";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const getPersistValue = () => {
    if(localStorage.getItem("persist") == undefined || localStorage.getItem("persist") == 'undefined' ){
      return false;
    }
     
    return JSON.parse( localStorage.getItem("persist"))
  }
  const persistValue = getPersistValue();
  const [persist, setPersist] = useState(persistValue);
  const [login, setLogin] = useState(false);
  const [location, setLocation] = useState({});

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, login, setLogin, location, setLocation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
