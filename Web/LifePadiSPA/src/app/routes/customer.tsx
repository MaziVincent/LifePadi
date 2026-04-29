import type { RouteObject } from "react-router-dom";
import PersistLogin from "@/components/shared/PersistLogin";
import RequireAuth from "@/hooks/RequireAuth";
import UserLayout from "@/components/customer/UserLayout";
import UserDashboard from "@/components/customer/UserDashboard";
import Address from "@/components/customer/Address";
import Gift from "@/components/customer/Gift";
import Favourite from "@/components/customer/Favourite";
import OrderDetails from "@/components/customer/OrderDetails";
import TrackOrder from "@/components/customer/TrackOrder";
import { ROLES } from "./roles";

export const customerRoutes: RouteObject[] = [
	{
		element: <PersistLogin />,
		children: [
			{
				element: <RequireAuth allowedRole={ROLES.customer} />,
				children: [
					{
						path: "/user",
						element: <UserLayout />,
						children: [
							{ index: true, element: <UserDashboard /> },
							{ path: "address", element: <Address /> },
							{ path: "gift", element: <Gift /> },
							{ path: "favourite", element: <Favourite /> },
							{ path: "details/:id", element: <OrderDetails /> },
							{ path: "track/:status", element: <TrackOrder /> },
						],
					},
				],
			},
		],
	},
];
