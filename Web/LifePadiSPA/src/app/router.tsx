import { Routes, Route } from "react-router-dom";
import AppMainDomain from "./AppMainDomain";
import AppSubDomain from "./AppSubDomain";

export function AppRouter() {
	const isAppSubdomain =
		typeof window !== "undefined" &&
		window.location.hostname === "app.lifepadi.com";

	if (isAppSubdomain) {
		return (
			<Routes>
				<Route path="*" element={<AppSubDomain />} />
			</Routes>
		);
	}

	return <AppMainDomain />;
}

export default AppRouter;
