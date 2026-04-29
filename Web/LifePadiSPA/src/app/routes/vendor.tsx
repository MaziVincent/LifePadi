import type { RouteObject } from "react-router-dom";
import PersistLogin from "@/components/shared/PersistLogin";
import RequireAuthAdmin from "@/hooks/RequireAuthAdmin";
import VendorLayout from "@/components/vendor/VendorLayout";
import VendorDashboard from "@/components/vendor/VendorDashboard";
import VendorViewProduct from "@/components/vendor/VendorViewProduct";
import VendorProductsRaw from "@/components/vendor/VendorProducts";
import { ROLES } from "./roles";

// VendorProducts is a JS component with implicit-any props; force loose typing here.
const VendorProducts = VendorProductsRaw as unknown as React.FC;

export const vendorRoutes: RouteObject[] = [
	{
		element: <PersistLogin />,
		children: [
			{
				element: <RequireAuthAdmin allowedRole={ROLES.vendor} />,
				children: [
					{
						path: "/vendor",
						element: <VendorLayout />,
						children: [
							{ index: true, element: <VendorDashboard /> },
							{ path: "product/:id", element: <VendorViewProduct /> },
							{ path: "products", element: <VendorProducts /> },
						],
					},
				],
			},
		],
	},
];
