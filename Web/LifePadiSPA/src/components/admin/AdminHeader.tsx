import { Link, useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import logo from "../../assets/images/Logo(dark).svg";
import useLogout from "../../hooks/useLogout";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../shared/ThemeToggle";

interface AdminHeaderProps {
	setAside: Dispatch<SetStateAction<boolean>>;
	aside: boolean;
}

const AdminHeader = ({ setAside, aside }: AdminHeaderProps) => {
	const logout = useLogout();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		toast.success("Logged out successfully");
		setTimeout(() => navigate("/login"), 800);
	};

	return (
		<header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b bg-card px-4 shadow-sm">
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					aria-label="Toggle sidebar"
					onClick={() => setAside((a) => !a)}>
					{aside ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</Button>
				<Link to="/admin" className="flex items-center gap-2">
					<img src={logo} alt="LifePadi" className="h-8" />
					<span className="hidden sm:inline font-semibold">
						Admin Dashboard
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
	);
};

export default AdminHeader;
