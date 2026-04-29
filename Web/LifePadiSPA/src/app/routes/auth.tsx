import type { RouteObject } from "react-router-dom";
import Login from "@/components/auth/Login";
import ForgotPassword from "@/components/auth/ForgotPassword";

export const authRoutes: RouteObject[] = [
	{ path: "/login", element: <Login /> },
	{ path: "/forgotPassword", element: <ForgotPassword /> },
];
