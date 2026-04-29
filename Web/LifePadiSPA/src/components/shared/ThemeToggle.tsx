import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle({ trigger }: { trigger?: ReactNode }) {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<Button variant="outline" size="icon" aria-label="Toggle theme">
				<Sun className="h-4 w-4" />
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{trigger ?? (
					<Button variant="outline" size="icon" aria-label="Toggle theme">
						<Sun className="h-4 w-4 dark:hidden" />
						<Moon className="hidden h-4 w-4 dark:block" />
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					disabled={theme === "light"}>
					<Sun className="mr-2 h-4 w-4" /> Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					disabled={theme === "dark"}>
					<Moon className="mr-2 h-4 w-4" /> Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("system")}
					disabled={theme === "system"}>
					<Monitor className="mr-2 h-4 w-4" /> System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ThemeToggle;
