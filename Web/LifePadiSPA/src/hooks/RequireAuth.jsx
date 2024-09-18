import useAuth from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const { auth, setLogin } = useAuth();
  console.log(auth);
  const location = useLocation();

  return auth?.Role === allowedRole ? (
    <Outlet />
  ) : auth.accessToken ? (
    <Navigate
      to="/unauthorized"
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
