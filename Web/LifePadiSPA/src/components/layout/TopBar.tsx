import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

const nav = [
	{ label: "Home", to: "/" },
	{ label: "Shop", to: "/shop" },
	{ label: "Logistics", to: "/logistics" },
	{ label: "About", to: "/about" },
	{ label: "Contact", to: "/contact" },
];

export function TopBar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
			<div className="container flex h-16 items-center gap-6">
				<Link to="/" className="inline-flex items-center gap-2">
					<Logo className="h-7 w-auto" />
				</Link>
				<nav className="hidden flex-1 items-center gap-1 md:flex">
					{nav.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.to === "/"}
							className={({ isActive }) =>
								cn(
									"rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
									isActive && "bg-accent text-foreground",
								)
							}>
							{item.label}
						</NavLink>
					))}
				</nav>
				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
					<Button
						asChild
						variant="outline"
						size="sm"
						className="hidden sm:inline-flex">
						<Link to="/login">Sign in</Link>
					</Button>
					<Button asChild size="sm" className="hidden sm:inline-flex">
						<Link to="/shop">Shop now</Link>
					</Button>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="md:hidden"
								aria-label="Open menu">
								<Menu className="h-4 w-4" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<div className="mt-6 flex flex-col gap-1">
								{nav.map((item) => (
									<NavLink
										key={item.to}
										to={item.to}
										end={item.to === "/"}
										onClick={() => setOpen(false)}
										className={({ isActive }) =>
											cn(
												"rounded-md px-3 py-2 text-sm font-medium",
												isActive
													? "bg-accent text-foreground"
													: "text-muted-foreground hover:bg-accent hover:text-foreground",
											)
										}>
										{item.label}
									</NavLink>
								))}
								<Button asChild className="mt-4">
									<Link to="/login" onClick={() => setOpen(false)}>
										Sign in
									</Link>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}

export default TopBar;
