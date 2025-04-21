import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import App from "./App.jsx";
import "./index.css";

//import "./assets/css/vendors.min.css";
import "./assets/css/icon.min.css";
// import "./assets/css/style.css";
// import "./assets/css/responsive.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<React.StrictMode>
				
					<App />
			</React.StrictMode>
		</AuthProvider>
	</BrowserRouter>
);
