import { NavLink } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import {
	LayoutDashboard,
	Settings,
	ListOrdered,
	Store,
	Bike,
	Users,
	ShieldCheck,
	Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ to: "/admin", label: "Overview", Icon: LayoutDashboard, end: true },
	{ to: "/admin/service", label: "Services", Icon: Settings },
	{ to: "/admin/category", label: "Categories", Icon: ListOrdered },
	{ to: "/admin/vendorcategory", label: "Vendors", Icon: Store },
	{ to: "/admin/rider", label: "Riders", Icon: Bike },
	{ to: "/admin/customer", label: "Customers", Icon: Users },
	{ to: "/admin/admin", label: "Admins", Icon: ShieldCheck },
	{ to: "/admin/voucher", label: "Vouchers", Icon: Ticket },
];

interface AsideProps {
	aside: boolean;
	setAside: Dispatch<SetStateAction<boolean>>;
}

const Aside = ({ aside, setAside }: AsideProps) => {
	const handleClick = () => setAside?.(false);

	return (
		<>
			{/* Mobile backdrop */}
			{aside && (
				<button
					aria-label="Close sidebar"
					className="fixed inset-0 z-30 bg-black/40 md:hidden"
					onClick={() => setAside(false)}
				/>
			)}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 top-14 z-40 w-[220px] border-r bg-card transition-transform md:translate-x-0",
					aside ? "translate-x-0" : "-translate-x-full",
				)}
				aria-label="Sidenav">
				<nav className="flex flex-col gap-1 overflow-y-auto p-3 pb-20">
					{NAV_ITEMS.map(({ to, label, Icon, end }) => (
						<NavLink
							key={to}
							to={to}
							end={end}
							onClick={handleClick}
							className={({ isActive }) =>
								cn(
									"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
									isActive
										? "bg-primary/10 text-primary"
										: "text-foreground/80 hover:bg-muted",
								)
							}>
							<Icon className="h-4 w-4 shrink-0" />
							<span>{label}</span>
						</NavLink>
					))}
				</nav>
			</aside>
		</>
	);
};

export default Aside;
