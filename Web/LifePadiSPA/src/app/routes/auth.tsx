import type { RouteObject } from "react-router-dom";
import Login from "@/components/auth/Login";
import ForgotPassword from "@/components/auth/ForgotPassword";
import VendorRegister from "@/components/auth/VendorRegister";
import RiderRegister from "@/components/auth/RiderRegister";
import PendingApproval from "@/components/auth/PendingApproval";

export const authRoutes: RouteObject[] = [
	{ path: "/login", element: <Login /> },
	{ path: "/forgotPassword", element: <ForgotPassword /> },
	{ path: "/vendor-register", element: <VendorRegister /> },
	{ path: "/rider-register", element: <RiderRegister /> },
	{ path: "/pending", element: <PendingApproval /> },
];
