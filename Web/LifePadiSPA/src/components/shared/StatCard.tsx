import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
	label: string;
	value: ReactNode;
	icon?: ReactNode;
	hint?: string;
	className?: string;
	trend?: { value: string; positive?: boolean };
}

export function StatCard({
	label,
	value,
	icon,
	hint,
	trend,
	className,
}: StatCardProps) {
	return (
		<Card className={cn("transition hover:border-primary/40", className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{label}
				</CardTitle>
				{icon ? <div className="text-muted-foreground">{icon}</div> : null}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-semibold tracking-tight">{value}</div>
				{trend ? (
					<p
						className={cn(
							"mt-1 text-xs",
							trend.positive ? "text-emerald-600" : "text-destructive",
						)}>
						{trend.value}
					</p>
				) : null}
				{hint ? (
					<p className="mt-1 text-xs text-muted-foreground">{hint}</p>
				) : null}
			</CardContent>
		</Card>
	);
}

export default StatCard;
