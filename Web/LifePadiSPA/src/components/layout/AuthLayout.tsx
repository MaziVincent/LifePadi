import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface AuthLayoutProps {
	children: ReactNode;
	title?: string;
	subtitle?: string;
	footer?: ReactNode;
}

export function AuthLayout({
	children,
	title,
	subtitle,
	footer,
}: AuthLayoutProps) {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			<aside className="hidden flex-col justify-between bg-brand p-10 text-white lg:flex">
				<Link to="/" className="inline-flex items-center gap-2">
					<Logo className="h-8 w-auto" />
				</Link>
				<div>
					<h2 className="text-3xl font-semibold leading-tight">
						Errands, deliveries & shopping made effortless.
					</h2>
					<p className="mt-3 max-w-md text-white/80">
						Sign in to manage your orders, riders, vendors and customers — all
						from one place.
					</p>
				</div>
				<p className="text-sm text-white/70">
					&copy; {new Date().getFullYear()} LifePadi. All rights reserved.
				</p>
			</aside>
			<main className="flex flex-col">
				<header className="flex items-center justify-between p-6">
					<Link to="/" className="lg:hidden">
						<Logo className="h-7 w-auto" />
					</Link>
					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<Button asChild variant="ghost" size="sm">
							<Link to="/">Back to home</Link>
						</Button>
					</div>
				</header>
				<div className="flex flex-1 items-center justify-center px-6 pb-10">
					<div className="w-full max-w-md">
						{title ? (
							<div className="mb-6">
								<h1 className="text-2xl font-semibold tracking-tight">
									{title}
								</h1>
								{subtitle ? (
									<p className="mt-1 text-sm text-muted-foreground">
										{subtitle}
									</p>
								) : null}
							</div>
						) : null}
						{children}
						{footer ? (
							<div className="mt-6 text-sm text-muted-foreground">{footer}</div>
						) : null}
					</div>
				</div>
			</main>
		</div>
	);
}

export default AuthLayout;
