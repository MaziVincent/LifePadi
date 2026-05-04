import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, Bike } from "lucide-react";
import logo from "../../assets/images/Logo(dark).svg";
import useLogout from "../../hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "../shared/ThemeToggle";

const NAV_ITEMS = [
	{ to: "/rider", label: "Overview", Icon: LayoutDashboard, end: true },
];

const SidebarBody = ({ onItemClick }: { onItemClick?: () => void }) => (
	<nav className="flex flex-col gap-1 p-3">
		{NAV_ITEMS.map(({ to, label, Icon, end }) => (
			<NavLink
				key={to}
				to={to}
				end={end}
				onClick={onItemClick}
				className={({ isActive }) =>
					`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
						isActive
							? "bg-primary/10 text-primary"
							: "text-foreground/80 hover:bg-muted"
					}`
				}>
				<Icon className="h-4 w-4" />
				{label}
			</NavLink>
		))}
	</nav>
);

const RiderLayout = () => {
	const [openMobile, setOpenMobile] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Top bar */}
			<header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b bg-card px-4 shadow-sm">
				<div className="flex items-center gap-2">
					<Sheet open={openMobile} onOpenChange={setOpenMobile}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label="Open menu">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-[260px] p-0">
							<div className="flex h-14 items-center gap-2 border-b px-4">
								<img src={logo} alt="LifePadi" className="h-8" />
								<span className="font-semibold">Rider</span>
							</div>
							<SidebarBody onItemClick={() => setOpenMobile(false)} />
						</SheetContent>
					</Sheet>

					<Link to="/" className="flex items-center gap-2">
						<img src={logo} alt="LifePadi" className="h-8" />
						<span className="hidden md:inline-flex items-center gap-1 font-semibold">
							<Bike className="h-4 w-4 text-primary" />
							Rider
						</span>
					</Link>
				</div>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="sm"
						onClick={handleLogout}
						className="text-destructive hover:text-destructive">
						<LogOut className="mr-2 h-4 w-4" />
						<span className="hidden sm:inline">Logout</span>
					</Button>
				</div>
			</header>

			{/* Desktop sidebar */}
			<aside className="fixed inset-y-0 left-0 top-14 hidden w-[220px] border-r bg-card md:block">
				<Separator />
				<SidebarBody />
			</aside>

			{/* Main */}
			<main className="pt-14 md:ml-[220px]">
				<div className="p-4 md:p-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default RiderLayout;
