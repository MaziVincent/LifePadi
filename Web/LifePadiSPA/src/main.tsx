import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "@/app/providers";
import { AppRouter } from "@/app/router";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
	throw new Error("Failed to find #root element");
}

ReactDOM.createRoot(rootEl).render(
	<React.StrictMode>
		<AppProviders>
			<AppRouter />
		</AppProviders>
	</React.StrictMode>,
);
