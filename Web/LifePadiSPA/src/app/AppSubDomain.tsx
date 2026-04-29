import { ArrowLeft, Smartphone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const APP_STORE_URL = "https://apps.apple.com/";
const PLAY_STORE_URL = "https://play.google.com/store/apps";
const MAIN_DOMAIN_URL = "https://www.lifepadi.com";

export function AppSubDomain() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background flex items-center justify-center p-6">
			<Card className="w-full max-w-2xl shadow-xl">
				<CardContent className="p-8 md:p-12 space-y-8 text-center">
					<Badge className="mx-auto" variant="secondary">
						app.lifepadi.com
					</Badge>

					<div className="space-y-3">
						<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
							<Smartphone className="h-8 w-8 text-primary" />
						</div>
						<h1 className="text-3xl md:text-4xl font-bold tracking-tight">
							The LifePadi App
						</h1>
						<p className="text-muted-foreground max-w-md mx-auto">
							Your everyday errand assistant — order from vendors, send
							packages, and ride across town from a single app.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
						<Button asChild size="lg">
							<a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
								Get it on Play Store
							</a>
						</Button>
						<Button asChild size="lg" variant="outline">
							<a href={APP_STORE_URL} target="_blank" rel="noreferrer">
								Download on App Store
							</a>
						</Button>
					</div>

					<div>
						<Button asChild variant="link">
							<a href={MAIN_DOMAIN_URL}>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Go to lifepadi.com
							</a>
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}

export default AppSubDomain;
