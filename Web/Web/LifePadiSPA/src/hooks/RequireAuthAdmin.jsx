
import useAuth from "./useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuthAdmin = ({allowedRole}) => {
    const {auth} = useAuth();
    const location = useLocation()

    //console.log(auth);

    return ( 
        
        auth?.Role?.includes(allowedRole)
                ? <Outlet />
                : auth.accessToken ?
                <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{from: location}} replace />

        );
}
 
export default RequireAuthAdmin;