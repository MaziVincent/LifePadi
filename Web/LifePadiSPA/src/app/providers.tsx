import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

// Best-effort extraction of an HTTP status code from whatever the various
// fetch helpers throw (axios errors, our custom `new Error("Error: ...")`, etc.)
function extractStatus(err: unknown): number | undefined {
	if (!err || typeof err !== "object") return undefined;
	const e = err as Record<string, any>;
	const direct = e.status ?? e.response?.status ?? e.cause?.response?.status;
	if (typeof direct === "number") return direct;
	if (typeof e.message === "string") {
		const m = e.message.match(/\b(\d{3})\b/);
		if (m) return Number(m[1]);
	}
	return undefined;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			gcTime: 5 * 60_000,
			refetchOnWindowFocus: false,
			// Retry up to 3 times only for transient errors (429 / 5xx / network).
			retry: (failureCount, error) => {
				if (failureCount >= 3) return false;
				const status = extractStatus(error);
				if (status === undefined) return failureCount < 2; // network / unknown
				if (status === 429) return true; // rate-limited — back off & retry
				if (status >= 500 && status < 600) return true;
				return false;
			},
			// Exponential backoff with jitter, capped at 30s.
			retryDelay: (attempt) =>
				Math.min(1000 * 2 ** attempt + Math.random() * 500, 30_000),
		},
	},
});

export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<BrowserRouter>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
				storageKey="lifepadi-theme">
				<AuthProvider>
					<QueryClientProvider client={queryClient}>
						{children}
						<Toaster richColors closeButton position="top-right" />
						{import.meta.env.DEV && (
							<ReactQueryDevtools
								initialIsOpen={false}
								buttonPosition="bottom-left"
							/>
						)}
					</QueryClientProvider>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
