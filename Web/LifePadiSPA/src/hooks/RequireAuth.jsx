
import useAuth from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({allowedRole}) => {
    const {auth} = useAuth();
    const location = useLocation()

    return ( 
        
        auth?.role?.includes(allowedRole)
                ? <Outlet />
                : auth.user ?
                <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{from: location}} replace />

        );
}
 
export default RequireAuth;