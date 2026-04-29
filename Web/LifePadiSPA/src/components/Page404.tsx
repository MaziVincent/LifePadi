import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page404 = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
			<div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-lg sm:p-10">
				<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
					<Compass className="h-7 w-7" />
				</div>
				<p className="text-center text-7xl font-bold tracking-tight text-muted-foreground/60 sm:text-8xl">
					404
				</p>
				<h1 className="mt-4 text-center text-2xl font-semibold tracking-tight">
					Page not found
				</h1>
				<p className="mt-2 text-center text-sm text-muted-foreground">
					Sorry, the page you are looking for could not be found.
				</p>
				<div className="mt-6 flex justify-center">
					<Button asChild>
						<Link to="/">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Return home
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page404;
