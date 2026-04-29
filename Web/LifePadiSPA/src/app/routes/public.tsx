import type { RouteObject } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/components/home/Home";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Logistics from "@/components/home/Logistics";
import Faq from "@/components/home/Faq";
import PrivacyPolicy from "@/components/home/PrivacyPolicy";
import TermsAndCondition from "@/components/home/TermsAndCondition";

export const publicRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "logistics", element: <Logistics /> },
			{ path: "privacypolicy", element: <PrivacyPolicy /> },
			{ path: "termsandconditions", element: <TermsAndCondition /> },
			{ path: "faq", element: <Faq /> },
		],
	},
];
