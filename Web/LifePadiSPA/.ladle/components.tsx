import "@/index.css";
import type { GlobalProvider } from "@ladle/react";
import { ThemeProvider } from "next-themes";

export const Provider: GlobalProvider = ({ children, globalState }) => (
	<ThemeProvider
		attribute="class"
		defaultTheme={globalState.theme === "dark" ? "dark" : "light"}
		enableSystem={false}
		storageKey="lifepadi-theme">
		<div className="bg-background text-foreground p-6 min-h-[40vh]">
			{children}
		</div>
	</ThemeProvider>
);
