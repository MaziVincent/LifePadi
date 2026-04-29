import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<TopBar />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}

export default PublicLayout;
