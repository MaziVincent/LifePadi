import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

interface RequireAuthProps {
	allowedRole: string;
}

const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
	const { auth } = useAuth();
	const location = useLocation();
	const role = (auth as { Role?: string }).Role;

	return role === allowedRole ? (
		<Outlet />
	) : auth.accessToken ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
};

export default RequireAuth;
