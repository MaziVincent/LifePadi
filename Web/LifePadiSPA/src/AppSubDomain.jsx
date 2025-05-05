import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

const AppSubdomain = () => {
    const location = useLocation();
		const navigate = useNavigate();
		const params = new URLSearchParams(location.search);
    const reference = params.get("reference");
    


	return (
		<div className="flex flex-col items-center justify-center gap-5 h-screen">
			<h1 className="text-2xl">Payment Processing... </h1>
			<p className="flex flex-col items-center">
				<button
					onClick={() => (window.location.href = "lifepadi://payment/confirm")}
					className="p-3 bg-secondary text-white rounded-md"
				>
					Open in App
				</button>
{/* 
				<div className="flex justify-center gap-6">
					<a className="bg-secondary p-3" href="https://play.google.com/store/apps/details?id=com.lifepadi.app">
						Download App (Android){" "}
					</a>
					<a className="bg-secondary p-3 " href="https://apps.apple.com/us/app/lifepadi/id6741829265">
						Download App (IOS){" "}
					</a>
				</div> */}
			</p>
		</div>
	);
};

export default AppSubdomain;
