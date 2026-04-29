import { useRoutes, type RouteObject } from "react-router-dom";
import Page404 from "@/components/Page404";
import Unauthorized from "@/components/Unauthorized";
import { publicRoutes } from "./routes/public";
import { authRoutes } from "./routes/auth";
import { shopRoutes } from "./routes/shop";
import { customerRoutes } from "./routes/customer";
import { vendorRoutes } from "./routes/vendor";
import { riderRoutes } from "./routes/rider";
import { adminRoutes } from "./routes/admin";
import { devRoutes } from "./routes/dev";

const fallbackRoutes: RouteObject[] = [
	{ path: "/unauthorized", element: <Unauthorized /> },
	{ path: "*", element: <Page404 /> },
];

export function AppMainDomain() {
	const element = useRoutes([
		...publicRoutes,
		...authRoutes,
		...shopRoutes,
		...customerRoutes,
		...vendorRoutes,
		...riderRoutes,
		...adminRoutes,
		...(import.meta.env.DEV ? devRoutes : []),
		...fallbackRoutes,
	]);
	return element;
}

export default AppMainDomain;
