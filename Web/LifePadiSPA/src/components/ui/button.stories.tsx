import type { Story } from "@ladle/react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const Default: Story = () => <Button>Continue</Button>;

export const Variants: Story = () => (
	<div className="flex flex-wrap gap-3">
		<Button>Default</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="destructive">Destructive</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="link">Link</Button>
	</div>
);

export const Sizes: Story = () => (
	<div className="flex items-center gap-3">
		<Button size="sm">Small</Button>
		<Button>Default</Button>
		<Button size="lg">Large</Button>
		<Button size="icon" aria-label="delete">
			<Trash2 className="h-4 w-4" />
		</Button>
	</div>
);

export const Disabled: Story = () => (
	<div className="flex gap-3">
		<Button disabled>Disabled</Button>
		<Button variant="destructive" disabled>
			Disabled
		</Button>
	</div>
);
