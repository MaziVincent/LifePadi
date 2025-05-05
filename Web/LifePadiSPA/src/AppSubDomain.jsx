import { useEffect, useCallback } from "react";
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
				<a
					href={`https://app.lifepadi.com/payment/confirm?reference=${reference}`}
					className="p-3 bg-secondary text-white rounded-md cursor-pointer"
				>
					Continue 
				</a>
			</p>
		</div>
	);
};

export default AppSubdomain;
