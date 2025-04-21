import { Routes, Route } from "react-router-dom";
import AppMainDomain from "./AppMainDomain";
import AppSubdomain from "./AppSubDomain";

function App() {
	
	const isAppSubdomain = window.location.hostname === "app.lifepadi.com";

	const ROLES = {
		admin: "Admin",
		customer: "Customer",
		rider: "Rider",
		vendor: "Vendor",
	};

	return (
		<Routes>
			{isAppSubdomain ? (
				<Route
					path="*"
					element={<AppSubdomain />}
				/>
			) : (
				<Route
					path="*"
					element={<AppMainDomain />}
				/>
				// <QueryClientProvider client={queryClient}>

				// </QueryClientProvider>
			)}
		</Routes>
	);
}

export default App;
