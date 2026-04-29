import type { Story } from "@ladle/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Default: Story = () => (
	<div className="grid w-full max-w-sm items-center gap-1.5">
		<Label htmlFor="email">Email</Label>
		<Input id="email" type="email" placeholder="you@lifepadi.com" />
	</div>
);

export const Disabled: Story = () => <Input disabled placeholder="Disabled" />;

export const Invalid: Story = () => (
	<div className="grid w-full max-w-sm items-center gap-1.5">
		<Label htmlFor="phone">Phone</Label>
		<Input id="phone" aria-invalid className="border-destructive" />
		<span className="text-xs text-destructive">Phone number is required.</span>
	</div>
);
