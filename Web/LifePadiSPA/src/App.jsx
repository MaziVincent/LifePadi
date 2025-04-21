import { Routes, Route } from "react-router-dom";
import AppMainDomain from "./AppMainDomain";
import AppSubdomain from "./AppSubDomain";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
	const isAppSubdomain = window.location.hostname === "app.lifepadi.com";

	const queryClient = new QueryClient();

	if (isAppSubdomain) {
		return (
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route
						path="*"
						element={<AppSubdomain />}
					/>
				</Routes>
			</QueryClientProvider>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<AppMainDomain />
		</QueryClientProvider>
	);
}

export default App;
