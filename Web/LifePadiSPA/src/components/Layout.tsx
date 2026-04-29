import { Outlet } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";

const Layout = () => {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<TopBar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
