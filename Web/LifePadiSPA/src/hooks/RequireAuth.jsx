
import useAuth from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({allowedRole}) => {
    const {auth} = useAuth();
    const location = useLocation()

    return ( 
        
        auth?.Role?.includes(allowedRole)
                ? <Outlet />
                : auth ?
                <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/" state={{from: location}} replace />

        );
}
 
export default RequireAuth;