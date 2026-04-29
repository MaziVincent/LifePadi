import { lazy, Suspense, type ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PersistLogin from "@/components/shared/PersistLogin";

const ShopLayout = lazy(() => import("@/components/shop/ShopLayout"));
const Shop = lazy(() => import("@/components/shop/Shop"));
const Vendor = lazy(() => import("@/components/shop/Vendor"));
const PaymentResponse = lazy(() => import("@/components/shop/PaymentResponse"));
const TryLogistics = lazy(() => import("@/components/logistics/TryLogistics"));

const ShopFallback = () => (
	<div className="flex min-h-[60vh] items-center justify-center">
		<Loader2 className="h-6 w-6 animate-spin text-primary" />
	</div>
);

const withSuspense = (node: ReactNode) => (
	<Suspense fallback={<ShopFallback />}>{node}</Suspense>
);

export const shopRoutes: RouteObject[] = [
	{
		element: <PersistLogin />,
		children: [
			{
				path: "/shop",
				element: withSuspense(<ShopLayout />),
				children: [
					{ index: true, element: withSuspense(<Shop />) },
					{ path: "vendor/:id", element: withSuspense(<Vendor />) },
					{
						path: "payment-response",
						element: withSuspense(<PaymentResponse />),
					},
					{ path: "logistics", element: withSuspense(<TryLogistics />) },
				],
			},
		],
	},
];
