import type { Story } from "@ladle/react";
import { Badge } from "@/components/ui/badge";

export const Default: Story = () => <Badge>New</Badge>;

export const Variants: Story = () => (
	<div className="flex flex-wrap gap-2">
		<Badge>Default</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="outline">Outline</Badge>
	</div>
);
