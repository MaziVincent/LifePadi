import type { RouteObject } from "react-router-dom";
import PersistLogin from "@/components/shared/PersistLogin";
import RequireAuthAdmin from "@/hooks/RequireAuthAdmin";
import RiderLayout from "@/components/rider/RiderLayout";
import RiderDashboard from "@/components/rider/RiderDashboard";
import ViewDelivery from "@/components/rider/ViewDelivery";
import { ROLES } from "./roles";

export const riderRoutes: RouteObject[] = [
	{
		element: <PersistLogin />,
		children: [
			{
				element: <RequireAuthAdmin allowedRole={ROLES.rider} />,
				children: [
					{
						path: "/rider",
						element: <RiderLayout />,
						children: [
							{ index: true, element: <RiderDashboard /> },
							{ path: "delivery/:id", element: <ViewDelivery /> },
						],
					},
				],
			},
		],
	},
];
