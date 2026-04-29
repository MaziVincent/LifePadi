import type { RouteObject } from "react-router-dom";
import KitchenSink from "@/components/dev/KitchenSink";

export const devRoutes: RouteObject[] = [
	{ path: "/__ui", element: <KitchenSink /> },
];
