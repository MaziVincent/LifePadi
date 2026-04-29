import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Aside from "./Aside";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
	const [aside, setAside] = useState(false);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<AdminHeader setAside={setAside} aside={aside} />
			<Aside aside={aside} setAside={setAside} />
			<main className="pt-14 md:ml-[220px] pb-16">
				<div className="p-4 md:p-6">
					<Outlet />
				</div>
			</main>
			<AdminFooter />
		</div>
	);
};

export default AdminLayout;
