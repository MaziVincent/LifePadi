import { createContext, useState } from "react";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const persistValue = JSON.parse(localStorage.getItem("persist")) || false;
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
