import type { Story } from "@ladle/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Default: Story = () => (
	<Card className="max-w-sm">
		<CardHeader>
			<CardTitle>Order #LP-2418</CardTitle>
			<CardDescription>Pending pickup</CardDescription>
		</CardHeader>
		<CardContent>
			<p className="text-sm text-muted-foreground">
				A driver will be assigned shortly. You will receive a notification when
				your package is on the way.
			</p>
		</CardContent>
		<CardFooter className="flex justify-end gap-2">
			<Button variant="outline">Cancel</Button>
			<Button>Track</Button>
		</CardFooter>
	</Card>
);
