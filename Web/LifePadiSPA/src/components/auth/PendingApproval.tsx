import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PendingApproval = () => (
	<div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-3 p-6 text-center">
		<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
			<Clock className="h-8 w-8" />
		</div>
		<h1 className="text-2xl font-semibold">Application under review</h1>
		<p className="text-muted-foreground">
			Our team is verifying your details. We'll send you an email the moment
			your account is approved — usually within 24 hours.
		</p>
		<div className="flex gap-2 pt-2">
			<Button asChild variant="outline">
				<Link to="/">Back to home</Link>
			</Button>
			<Button asChild>
				<Link to="/contact">Contact support</Link>
			</Button>
		</div>
	</div>
);

export default PendingApproval;
