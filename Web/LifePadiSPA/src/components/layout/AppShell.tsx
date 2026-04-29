import { useState, type ComponentType, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	Bell,
	ChevronDown,
	LogOut,
	Menu,
	Search,
	type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import useLogout from "@/hooks/useLogout";
import useAuth from "@/hooks/useAuth";

export interface AppShellNavItem {
	label: string;
	to: string;
	icon?: LucideIcon | ComponentType<{ className?: string }>;
	end?: boolean;
}

export interface AppShellNavGroup {
	title?: string;
	items: AppShellNavItem[];
}

interface AppShellProps {
	children: ReactNode;
	nav: AppShellNavGroup[];
	title?: string;
	homeLink?: string;
}

export function AppShell({
	children,
	nav,
	title,
	homeLink = "/",
}: AppShellProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const navigate = useNavigate();
	const logout = useLogout();
	const { auth } = useAuth() as {
		auth?: { fullName?: string; email?: string; userType?: string };
	};

	const initials = (auth?.fullName ?? auth?.email ?? "U")
		.split(" ")
		.map((s: string) => s[0])
		.filter(Boolean)
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	const SidebarContent = (
		<div className="flex h-full flex-col">
			<div className="flex h-16 items-center gap-2 border-b px-6">
				<Link to={homeLink} className="inline-flex items-center gap-2">
					<Logo className="h-7 w-auto" />
				</Link>
				{title ? (
					<>
						<Separator orientation="vertical" className="h-5" />
						<span className="text-sm font-medium text-muted-foreground">
							{title}
						</span>
					</>
				) : null}
			</div>
			<ScrollArea className="flex-1">
				<nav className="space-y-6 p-4">
					{nav.map((group, idx) => (
						<div key={idx}>
							{group.title ? (
								<p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									{group.title}
								</p>
							) : null}
							<ul className="space-y-1">
								{group.items.map((item) => {
									const Icon = item.icon;
									return (
										<li key={item.to}>
											<NavLink
												to={item.to}
												end={item.end}
												onClick={() => setMobileOpen(false)}
												className={({ isActive }) =>
													cn(
														"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
														isActive
															? "bg-primary/10 text-primary"
															: "text-muted-foreground hover:bg-accent hover:text-foreground",
													)
												}>
												{Icon ? <Icon className="h-4 w-4" /> : null}
												{item.label}
											</NavLink>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>
			</ScrollArea>
		</div>
	);

	return (
		<div className="flex min-h-screen bg-muted/20">
			<aside className="hidden w-64 shrink-0 border-r bg-background lg:block">
				{SidebarContent}
			</aside>
			<div className="flex min-w-0 flex-1 flex-col">
				<header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="lg:hidden"
								aria-label="Open menu">
								<Menu className="h-4 w-4" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-72 p-0">
							{SidebarContent}
						</SheetContent>
					</Sheet>
					<div className="relative hidden flex-1 max-w-md md:block">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Search…" className="pl-9" />
					</div>
					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<Button variant="outline" size="icon" aria-label="Notifications">
							<Bell className="h-4 w-4" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="gap-2 px-2">
									<Avatar className="h-8 w-8">
										<AvatarFallback>{initials || "U"}</AvatarFallback>
									</Avatar>
									<span className="hidden text-sm md:inline">
										{auth?.fullName ?? "Account"}
									</span>
									<ChevronDown className="hidden h-4 w-4 opacity-60 md:block" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>
									<div className="flex flex-col">
										<span className="text-sm font-medium">
											{auth?.fullName ?? "Signed in"}
										</span>
										{auth?.email ? (
											<span className="text-xs text-muted-foreground">
												{auth.email}
											</span>
										) : null}
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout}>
									<LogOut className="mr-2 h-4 w-4" /> Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
			</div>
		</div>
	);
}

export default AppShell;
