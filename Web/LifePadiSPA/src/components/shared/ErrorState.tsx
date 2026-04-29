import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
	title?: string;
	description?: string;
	icon?: ReactNode;
	onRetry?: () => void;
	retryLabel?: string;
	className?: string;
}

export function ErrorState({
	title = "Something went wrong",
	description,
	icon,
	onRetry,
	retryLabel = "Try again",
	className,
}: ErrorStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-12 text-center",
				className,
			)}>
			<div className="mb-3 rounded-full bg-destructive/10 p-3 text-destructive">
				{icon ?? <AlertTriangle className="h-6 w-6" />}
			</div>
			<h3 className="text-base font-medium">{title}</h3>
			{description ? (
				<p className="mt-1 max-w-sm text-sm text-muted-foreground">
					{description}
				</p>
			) : null}
			{onRetry ? (
				<Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
					{retryLabel}
				</Button>
			) : null}
		</div>
	);
}

export default ErrorState;
