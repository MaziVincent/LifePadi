import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

interface RequireAuthAdminProps {
	allowedRole: string;
}

const RequireAuthAdmin = ({ allowedRole }: RequireAuthAdminProps) => {
	const { auth } = useAuth();
	const location = useLocation();
	const role = (auth as { Role?: string | string[] }).Role;
	const allowed = Array.isArray(role)
		? role.includes(allowedRole)
		: typeof role === "string"
			? role.includes(allowedRole)
			: false;

	return allowed ? (
		<Outlet />
	) : auth.accessToken ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuthAdmin;
