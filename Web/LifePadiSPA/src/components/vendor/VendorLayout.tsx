import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Store, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import useLogout from "../../hooks/useLogout";
import logo from "../../assets/images/Logo(dark).svg";
import { cn } from "@/lib/utils";

const navItems = [
	{ text: "Dashboard", icon: LayoutDashboard, path: "/vendor" },
	{ text: "Products", icon: Store, path: "/vendor/products" },
];

const SidebarBody = ({ onItemClick }: { onItemClick?: () => void }) => {
	const location = useLocation();
	const logout = useLogout();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center gap-3 px-4 py-4">
				<img src={logo} alt="LifePadi" className="h-9 w-9" />
				<span className="text-lg font-bold text-brand">Vendor</span>
			</div>
			<Separator />
			<nav className="flex-1 px-2 py-4 space-y-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					const active = location.pathname === item.path;
					return (
						<Link
							key={item.text}
							to={item.path}
							onClick={onItemClick}
							className={cn(
								"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
								active
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
							)}>
							<Icon className="h-5 w-5" />
							{item.text}
						</Link>
					);
				})}
			</nav>
			<Separator />
			<div className="p-3">
				<Button
					variant="ghost"
					className="w-full justify-start text-destructive hover:text-destructive"
					onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</Button>
			</div>
		</div>
	);
};

const VendorLayout = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Top bar */}
			<header className="fixed inset-x-0 top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="flex h-16 items-center gap-3 px-4 md:px-6">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label="Toggle menu">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-[260px] p-0">
							<SidebarBody onItemClick={() => setMobileOpen(false)} />
						</SheetContent>
					</Sheet>
					<img src={logo} alt="LifePadi" className="h-9 w-9" />
					<h1 className="flex-1 text-lg font-bold text-brand">
						Vendor Dashboard
					</h1>
					<ThemeToggle />
				</div>
			</header>

			<div className="flex pt-16">
				{/* Desktop sidebar */}
				<aside className="hidden md:flex md:w-[220px] md:flex-col md:fixed md:inset-y-0 md:top-16 md:border-r md:bg-card">
					<SidebarBody />
				</aside>

				{/* Main content */}
				<main className="flex-1 md:ml-[220px] p-4 md:p-8 min-h-[calc(100vh-4rem)]">
					<Outlet />
					<div className="mt-12 text-center text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} LifePadi. All rights reserved.
					</div>
				</main>
			</div>
		</div>
	);
};

export default VendorLayout;
